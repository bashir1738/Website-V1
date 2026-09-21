"use client";

import { useState } from "react";
import Image from "next/image";
import { Plus, Pencil, Trash2, X, Loader2 } from "lucide-react";
import toast from "react-hot-toast";
import { postForm, putForm, deleteJson, ApiError } from "@/lib/api";
import { AdminHeader } from "@/components/admin/admin-header";
import { formatDate } from "@/components/admin/data-table";
import { useCollection } from "@/components/admin/use-collection";
import { toLocalInput, fromLocalInput } from "@/lib/utils";
import { MAX_UPLOAD_LABEL, validateUpload } from "@/lib/file-upload";

interface EventRow extends Record<string, unknown> {
  id: number;
  title: string;
  slug: string;
  description: string;
  date: string;
  location?: string | null;
  link?: string | null;
  image_url?: string | null;
}

const SLUG_PATTERN = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;

export default function AdminEventsPage() {
  const { data, loading, error, reload } = useCollection<EventRow>("events");
  const [mode, setMode] = useState<"closed" | "create" | "edit">("closed");
  const [editingId, setEditingId] = useState<number | null>(null);
  const [title, setTitle] = useState("");
  const [slug, setSlug] = useState("");
  const [description, setDescription] = useState("");
  const [date, setDate] = useState("");
  const [location, setLocation] = useState("");
  const [link, setLink] = useState("");
  const [image, setImage] = useState<File | null>(null);
  const [existingImage, setExistingImage] = useState<string | null>(null);
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});
  const [saving, setSaving] = useState(false);

  const clearFieldError = (name: string) => {
    setFieldErrors((prev) => {
      if (!prev[name]) return prev;
      const next = { ...prev };
      delete next[name];
      return next;
    });
  };

  const openCreate = () => {
    setMode("create");
    setEditingId(null);
    setTitle("");
    setSlug("");
    setDescription("");
    setDate("");
    setLocation("");
    setLink("");
    setImage(null);
    setExistingImage(null);
    setFieldErrors({});
  };

  const openEdit = (event: EventRow) => {
    setMode("edit");
    setEditingId(event.id);
    setTitle(event.title);
    setSlug(event.slug);
    setDescription(event.description);
    setDate(toLocalInput(event.date));
    setLocation(event.location ?? "");
    setLink(event.link ?? "");
    setImage(null);
    setExistingImage(event.image_url ?? null);
    setFieldErrors({});
  };

  const closeEditor = () => {
    setMode("closed");
    setFieldErrors({});
  };

  const handleDelete = async (event: EventRow) => {
    if (!window.confirm(`Delete "${event.title}"? This can't be undone.`)) return;
    toast.promise(
      deleteJson(`/events/${event.id}`).then(() => {
        reload();
      }),
      {
        loading: "Deleting event…",
        success: "Event deleted.",
        error: (err) => (err instanceof ApiError ? err.message : "Delete failed."),
      },
    );
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (saving) return;

    const nextErrors: Record<string, string> = {};
    if (!SLUG_PATTERN.test(slug)) {
      nextErrors.slug = "Slug must be lowercase letters, numbers, and hyphens.";
    }
    if (!fromLocalInput(date)) {
      nextErrors.date = "Pick a date and time for the event.";
    }
    if (image) {
      const problem = validateUpload(image, "image/jpeg,image/jpg,image/png");
      if (problem) nextErrors.image = problem;
    }
    if (Object.keys(nextErrors).length > 0) {
      setFieldErrors(nextErrors);
      toast.error("Please fix the highlighted fields.");
      return;
    }
    setFieldErrors({});
    setSaving(true);
    try {
      const body = new FormData();
      body.append("title", title);
      body.append("slug", slug);
      body.append("description", description);
      body.append("date", fromLocalInput(date) as string);
      if (location) body.append("location", location);
      if (link) body.append("link", link);
      if (image) body.append("image", image);

      if (mode === "edit" && editingId !== null) {
        await putForm(`/events/${editingId}`, body);
        toast.success("Changes saved.");
      } else {
        await postForm("/events", body);
        toast.success("Event created.");
      }
      closeEditor();
      reload();
    } catch (err) {
      toast.error(err instanceof ApiError ? err.message : "Save failed.");
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="pb-16">
      <AdminHeader eyebrow="Admin" title="Events">
        {mode === "closed" && (
          <button type="button" onClick={openCreate} className="btn-primary">
            <Plus className="h-4 w-4" />
            New event
          </button>
        )}
      </AdminHeader>

      <div className="px-5 py-6 sm:px-8">
        {mode !== "closed" && (
          <form
            onSubmit={handleSave}
            className="mb-8 rounded-2xl border border-(--line) bg-(--card) p-5 sm:p-7"
          >
            <div className="flex items-center justify-between gap-4">
              <h2 className="font-heading text-lg font-bold text-(--page-fg)">
                {mode === "edit" ? "Edit event" : "New event"}
              </h2>
              <button
                type="button"
                onClick={closeEditor}
                aria-label="Cancel"
                className="grid h-9 w-9 place-items-center rounded-full border border-(--line-strong) text-(--muted) hover:text-(--page-fg)"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            <div className="mt-6 grid gap-5 sm:grid-cols-2">
              <div>
                <label htmlFor="event-title" className="field-label">Title</label>
                <input
                  id="event-title"
                  required
                  minLength={3}
                  value={title}
                  onChange={(e) => {
                    setTitle(e.target.value);
                    clearFieldError("title");
                  }}
                  className="field-input mt-1.5"
                  data-invalid={fieldErrors.title ? "true" : undefined}
                  aria-invalid={Boolean(fieldErrors.title)}
                  aria-describedby={fieldErrors.title ? "event-title-error" : undefined}
                />
                {fieldErrors.title && (
                  <p id="event-title-error" className="field-error">
                    {fieldErrors.title}
                  </p>
                )}
              </div>
              <div>
                <label htmlFor="event-slug" className="field-label">Slug</label>
                <input
                  id="event-slug"
                  required
                  pattern="[a-z0-9]+(?:-[a-z0-9]+)*"
                  value={slug}
                  onChange={(e) => {
                    setSlug(e.target.value);
                    clearFieldError("slug");
                  }}
                  className="field-input mt-1.5 font-mono text-xs"
                  placeholder="prodfest-2026"
                  data-invalid={fieldErrors.slug ? "true" : undefined}
                  aria-invalid={Boolean(fieldErrors.slug)}
                  aria-describedby={fieldErrors.slug ? "event-slug-error" : undefined}
                />
                {fieldErrors.slug && (
                  <p id="event-slug-error" className="field-error">
                    {fieldErrors.slug}
                  </p>
                )}
              </div>
              <div>
                <label htmlFor="event-date" className="field-label">Date &amp; time</label>
                <input
                  id="event-date"
                  type="datetime-local"
                  required
                  value={date}
                  onChange={(e) => {
                    setDate(e.target.value);
                    clearFieldError("date");
                  }}
                  className="field-input mt-1.5"
                  data-invalid={fieldErrors.date ? "true" : undefined}
                  aria-invalid={Boolean(fieldErrors.date)}
                  aria-describedby={fieldErrors.date ? "event-date-error" : undefined}
                />
                {fieldErrors.date && (
                  <p id="event-date-error" className="field-error">
                    {fieldErrors.date}
                  </p>
                )}
              </div>
              <div>
                <label htmlFor="event-location" className="field-label">Location</label>
                <input
                  id="event-location"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  className="field-input mt-1.5"
                />
              </div>
              <div className="sm:col-span-2">
                <label htmlFor="event-link" className="field-label">Link</label>
                <input
                  id="event-link"
                  type="url"
                  value={link}
                  onChange={(e) => setLink(e.target.value)}
                  className="field-input mt-1.5"
                  placeholder="https://…"
                />
              </div>
            </div>

            <div className="mt-5">
              <label htmlFor="event-description" className="field-label">Description</label>
              <textarea
                id="event-description"
                required
                minLength={10}
                rows={7}
                value={description}
                onChange={(e) => {
                  setDescription(e.target.value);
                  clearFieldError("description");
                }}
                className="field-textarea mt-1.5"
                data-invalid={fieldErrors.description ? "true" : undefined}
                aria-invalid={Boolean(fieldErrors.description)}
                aria-describedby={fieldErrors.description ? "event-description-error" : undefined}
              />
              {fieldErrors.description && (
                <p id="event-description-error" className="field-error">
                  {fieldErrors.description}
                </p>
              )}
            </div>

            {existingImage && (
              <div className="mt-5">
                <span className="field-label">Current image</span>
                <div className="relative mt-1.5 aspect-16/8 max-w-90 overflow-hidden rounded-xl bg-(--surface-2)">
                  <Image
                    src={existingImage}
                    alt="Current event image"
                    fill
                    sizes="360px"
                    className="object-cover"
                  />
                </div>
              </div>
            )}

            <label htmlFor="event-image" className="field-file mt-5" data-invalid={fieldErrors.image ? "true" : undefined}>
              <span aria-hidden="true" className="text-[15px]">↑</span>
              <span>{image ? image.name : `Upload an image (JPG or PNG, up to ${MAX_UPLOAD_LABEL})`}</span>
              <input
                id="event-image"
                type="file"
                accept="image/jpeg,image/jpg,image/png"
                className="sr-only"
                onChange={(e) => {
                  const file = e.target.files?.[0] ?? null;
                  clearFieldError("image");
                  if (!file) {
                    setImage(null);
                    return;
                  }
                  const problem = validateUpload(file, "image/jpeg,image/jpg,image/png");
                  if (problem) {
                    setFieldErrors((prev) => ({ ...prev, image: problem }));
                    setImage(null);
                    e.target.value = "";
                    return;
                  }
                  setImage(file);
                }}
              />
            </label>
            {fieldErrors.image && (
              <p id="event-image-error" className="field-error">
                {fieldErrors.image}
              </p>
            )}

            <div className="mt-6 flex flex-wrap items-center gap-3">
              <button type="submit" disabled={saving} className="btn-primary">
                {saving ? (
                  <>
                    <Loader2 className="h-4 w-4 animate-spin" />
                    Saving…
                  </>
                ) : (
                  mode === "edit" ? "Save changes" : "Create event"
                )}
              </button>
              <button type="button" onClick={closeEditor} className="btn-ghost">
                Cancel
              </button>
            </div>
          </form>
        )}

        {loading && (
          <div className="flex flex-col items-center gap-3 py-16 text-(--dim)">
            <Loader2 className="h-5 w-5 animate-spin text-(--accent)" />
            <span className="text-xs">Loading events…</span>
          </div>
        )}

        {!loading && error && (
          <p className="rounded-xl border border-[rgba(248,113,113,0.35)] bg-[rgba(248,113,113,0.1)] px-4 py-3 text-sm text-[#fca5a5]">
            {error}
          </p>
        )}

        {!loading && !error && (
          <div className="custom-scroll overflow-x-auto rounded-xl border border-(--line)">
            <table className="w-full min-w-180 border-collapse text-left text-sm">
              <thead>
                <tr className="border-b border-(--line-strong) bg-(--surface-2) text-[11px] uppercase tracking-wider text-(--dim)">
                  <th className="px-4 py-3 font-semibold">Event</th>
                  <th className="px-4 py-3 font-semibold">Date</th>
                  <th className="px-4 py-3 font-semibold">Location</th>
                  <th className="px-4 py-3 font-semibold text-right">Actions</th>
                </tr>
              </thead>
              <tbody>
                {data.length === 0 && (
                  <tr>
                    <td colSpan={4} className="bg-(--card) px-4 py-12 text-center text-sm text-(--muted)">
                      No events yet. Start with &quot;New event&quot;.
                    </td>
                  </tr>
                )}
                {data.map((event) => (
                  <tr
                    key={event.id}
                    className="border-b border-(--line) bg-(--card) last:border-b-0 hover:bg-(--card-hover)"
                  >
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-3">
                        <div className="relative h-12 w-16 shrink-0 overflow-hidden rounded-lg bg-(--surface-2)">
                          {event.image_url ? (
                            <Image
                              src={event.image_url}
                              alt=""
                              fill
                              sizes="64px"
                              className="object-cover"
                            />
                          ) : null}
                        </div>
                        <div className="min-w-0">
                          <p className="truncate font-semibold text-(--page-fg)">
                            {event.title}
                          </p>
                          <p className="truncate font-mono text-xs text-(--dim)">
                            /events/{event.slug}
                          </p>
                        </div>
                      </div>
                    </td>
                    <td className="whitespace-nowrap px-4 py-3 text-(--muted)">
                      {formatDate(event.date)}
                    </td>
                    <td className="px-4 py-3 text-(--muted)">
                      {event.location || "—"}
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex justify-end gap-2">
                        <button
                          type="button"
                          onClick={() => openEdit(event)}
                          className="inline-flex items-center gap-1.5 rounded-lg border border-(--line-strong) px-3 py-1.5 text-xs font-semibold text-(--muted) transition-colors hover:text-(--page-fg)"
                        >
                          <Pencil className="h-3.5 w-3.5" />
                          Edit
                        </button>
                        <button
                          type="button"
                          onClick={() => handleDelete(event)}
                          className="inline-flex items-center gap-1.5 rounded-lg border border-[rgba(248,113,113,0.35)] px-3 py-1.5 text-xs font-semibold text-[#f87171] transition-colors hover:bg-[rgba(248,113,113,0.1)]"
                        >
                          <Trash2 className="h-3.5 w-3.5" />
                          Delete
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}