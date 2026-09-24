'use strict';

/**
 * ⚠️ REVIEW BEFORE PRODUCTION DEPLOY ⚠️
 *
 * Render's preDeployCommand runs `npm run migrate` automatically, so this
 * migration WILL run against the production database on the next deploy.
 *
 * Semantics (all conservative / non-destructive):
 *   • Creates `tracks`, `payments`, `payment_review_logs`.
 *   • Adds `status_token`, `track_legacy`, `program_start_date` to
 *     `program_applications`.
 *   • Seeds the 6 new academy tracks with their canonical prices.
 *   • BACKFILL: every applicant whose Paystack-era payment_status was 'paid'
 *     gets one Payment row (status 'verified', installment 1, track_id NULL,
 *     amount converted kobo → naira) and is flagged `track_legacy = true`.
 *     Legacy payments/tracks cannot be mapped onto the new track ids with
 *     confidence, so track_id is left NULL for an admin to reconcile.
 *   • No rows are deleted or overwritten anywhere.
 *
 * The number of backfilled payments is printed to stdout for the reviewer.
 */
const { TRACKS } = require('../config/tracks');

module.exports = {
  async up(queryInterface, Sequelize) {
    const sequelize = queryInterface.sequelize;

    await queryInterface.createTable('tracks', {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      key: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true,
      },
      name: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      price: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      duration: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      description: {
        type: Sequelize.TEXT,
        allowNull: false,
      },
      curriculum: {
        type: Sequelize.TEXT,
        allowNull: true,
      },
      total_installments: {
        type: Sequelize.INTEGER,
        allowNull: false,
        defaultValue: 1,
      },
      createdAt: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.literal('NOW()'),
      },
      updatedAt: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.literal('NOW()'),
      },
    });

    await queryInterface.createTable('payments', {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      applicant_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: { model: 'program_applications', key: 'id' },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
      },
      track_id: {
        type: Sequelize.INTEGER,
        allowNull: true,
        references: { model: 'tracks', key: 'id' },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL',
      },
      amount: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      installment_number: {
        type: Sequelize.INTEGER,
        allowNull: false,
        defaultValue: 1,
      },
      installment_status: {
        type: Sequelize.STRING,
        allowNull: false,
        defaultValue: 'due',
      },
      status: {
        type: Sequelize.STRING,
        allowNull: false,
        defaultValue: 'pending_review',
      },
      proof_file: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      reference_note: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      non_refundable: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
        defaultValue: true,
      },
      submitted_at: {
        type: Sequelize.DATE,
        allowNull: true,
      },
      reviewed_at: {
        type: Sequelize.DATE,
        allowNull: true,
      },
      reviewed_by: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      rejection_reason: {
        type: Sequelize.TEXT,
        allowNull: true,
      },
      createdAt: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.literal('NOW()'),
      },
      updatedAt: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.literal('NOW()'),
      },
    });

    await queryInterface.createTable('payment_review_logs', {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      payment_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: { model: 'payments', key: 'id' },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
      },
      action: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      actor: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      note: {
        type: Sequelize.TEXT,
        allowNull: true,
      },
      createdAt: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.literal('NOW()'),
      },
      updatedAt: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.literal('NOW()'),
      },
    });

    await queryInterface.addColumn('program_applications', 'status_token', {
      type: Sequelize.STRING(64),
      allowNull: true,
      unique: true,
    });
    await queryInterface.addColumn('program_applications', 'track_legacy', {
      type: Sequelize.BOOLEAN,
      allowNull: false,
      defaultValue: false,
    });
    await queryInterface.addColumn('program_applications', 'program_start_date', {
      type: Sequelize.DATEONLY,
      allowNull: true,
    });

    // Seed the canonical tracks.
    await queryInterface.bulkInsert('tracks', TRACKS.map((track) => ({
      key: track.key,
      name: track.name,
      price: track.price,
      duration: track.duration,
      description: track.description,
      curriculum: JSON.stringify(track.curriculum),
      total_installments: track.total_installments,
    })));

    // ── BACKFILL legacy paid applicants (flag for review) ──────────────────
    const legacy = await sequelize.query(
      'SELECT id, name, email, track, payment_amount, payment_reference FROM program_applications WHERE payment_status = \'paid\'',
      { type: sequelize.QueryTypes.SELECT }
    );

    const now = new Date();
    for (const row of legacy) {
      const amountNaira = Math.round(Number(row.payment_amount || 0) / 100);
      await queryInterface.bulkInsert('payments', [
        {
          applicant_id: row.id,
          track_id: null,
          amount: amountNaira,
          installment_number: 1,
          installment_status: 'paid',
          status: 'verified',
          proof_file: '',
          reference_note:
            `Legacy Paystack payment (ref ${row.payment_reference || 'unknown'})`,
          non_refundable: true,
          submitted_at: now,
          reviewed_at: now,
          reviewed_by: 'system (legacy backfill)',
          createdAt: now,
          updatedAt: now,
        },
      ]);
    }

    if (legacy.length > 0) {
      await sequelize.query(
        "UPDATE program_applications SET track_legacy = true WHERE payment_status = 'paid'"
      );
      // Audit-log each backfilled payment for the admin trail.
      const paymentRows = await sequelize.query(
        'SELECT id, applicant_id FROM payments WHERE reviewed_by = \'system (legacy backfill)\'',
        { type: sequelize.QueryTypes.SELECT }
      );
      const logs = paymentRows.map((payment) => {
        const applicant = legacy.find((row) => Number(row.id) === Number(payment.applicant_id));
        return {
          payment_id: payment.id,
          action: 'submitted',
          actor: 'system (legacy backfill)',
          note: `Imported legacy Paystack payment (${applicant?.payment_reference || 'ref unknown'}). track_id null — assign during review.`,
          createdAt: now,
          updatedAt: now,
        };
      });
      if (logs.length > 0) {
        await queryInterface.bulkInsert('payment_review_logs', logs);
      }
    }

    const backfilled = legacy.map((row) => ({
      id: row.id,
      name: row.name,
      email: row.email,
      legacyTrack: row.track,
      amountNaira: Math.round(Number(row.payment_amount || 0) / 100),
    }));

    console.log(
      `[migration] ⚠️  REVIEW REQUIRED: backfilled ${backfilled.length} legacy paid application(s) as verified Payment rows with track_id NULL.`
    );
    console.table(backfilled);

    return { backfilledCount: backfilled.length };
  },

  async down(queryInterface) {
    await queryInterface.removeColumn('program_applications', 'program_start_date');
    await queryInterface.removeColumn('program_applications', 'track_legacy');
    await queryInterface.removeColumn('program_applications', 'status_token');
    await queryInterface.dropTable('payment_review_logs');
    await queryInterface.dropTable('payments');
    await queryInterface.dropTable('tracks');
  },
};