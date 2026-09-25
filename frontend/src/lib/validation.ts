import type { FormField, FormKey } from "@/lib/forms";

/**
 * Client-side validation, kept in lockstep with `backend/schemas/index.js`.
 *
 * Rules:
 *   • "letters" fields accept letters of any script plus spaces and the modest
 *     punctuation people actually use ( . ' - & , ) — digits and code-like
 *     symbols are rejected.
 *   • Everything has a min/max length; a bare "m" is rejected everywhere.
 *   • Phone fields reject letters outright.
 *   • github/linkedin fields must be the right kind of link for the field.
 */

export const NAME_RE = /^[\p{L}][\p{L}\s.'-]{1,99}$/u;
export const ORG_RE = /^[\p{L}][\p{L}\s.'&-]{1,199}$/u;
export const STATUS_RE = /^[\p{L}][\p{L}\s,'&-]{1,199}$/u;
export const TOPIC_RE = /^[\p{L}\p{N}][\p{L}\p{N}\s.,'&-]{1,99}$/u;
export const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
export const PHONE_RE = /^\+[1-9]\d{0,3}\s[\d\s\-().]{4,18}$/;
export const GITHUB_URL_RE =
  /^https?:\/\/(?:www\.)?github\.com\/[A-Za-z0-9][A-Za-z0-9._-]*\/?$/i;
export const LINKEDIN_URL_RE =
  /^https?:\/\/(?:www\.)?linkedin\.com\/in\/[A-Za-z0-9][A-Za-z0-9-]*\/?$/i;
export const REPO_RE = /^[a-zA-Z0-9-]+\/[a-zA-Z0-9._-]+$/;

function isHttpUrl(value: string): boolean {
  try {
    const url = new URL(value);
    return url.protocol === "http:" || url.protocol === "https:";
  } catch {
    return false;
  }
}

interface Rule {
  pattern?: RegExp;
  /** Value must also be a parseable http(s) URL. */
  needUrl?: boolean;
  min?: number;
  max?: number;
  message: string;
  what: string;
}

function ruleFor(field: FormField, formKey: FormKey | string): Rule | null {
  const what = field.label;
  switch (field.name) {
    case "name":
      return {
        pattern: NAME_RE,
        min: 2,
        max: 100,
        message: "can only contain letters, spaces, and . ' -",
        what,
      };
    case "company":
    case "organisation":
      return {
        pattern: ORG_RE,
        min: 2,
        max: 200,
        message: "can only contain letters, spaces, and & . ' -",
        what,
      };
    case "location":
      return {
        pattern: ORG_RE,
        min: 2,
        max: 200,
        message: "can only contain letters, spaces, and & . ' -",
        what,
      };
    case "current_status":
      return {
        pattern: STATUS_RE,
        min: 2,
        max: 200,
        message: "can only contain letters, commas, spaces, and & . ' -",
        what,
      };
    case "topic":
      return {
        pattern: TOPIC_RE,
        min: 2,
        max: 100,
        message: "can only contain letters, numbers, spaces, and . , & ' -",
        what,
      };
    case "phone":
      return {
        pattern: PHONE_RE,
        min: 10,
        max: 20,
        message: "must include your country code, e.g. +234 802 546 3838",
        what: "Phone",
      };
    case "github":
      if (formKey === "opensource") {
        return {
          pattern: REPO_RE,
          min: 3,
          max: 200,
          message: "must be in owner/repo format (e.g. blockfuse/contract-kit)",
          what,
        };
      }
      if (formKey === "alumni") {
        return {
          pattern: GITHUB_URL_RE,
          needUrl: true,
          max: 500,
          message: "must be a profile like https://github.com/username",
          what,
        };
      }
      return {
        needUrl: true,
        max: 500,
        message: "must be a full link starting with https://",
        what,
      };
    case "linkedin":
      return {
        pattern: LINKEDIN_URL_RE,
        needUrl: true,
        max: 500,
        message: "must be a profile like https://linkedin.com/in/username",
        what,
      };
    case "motivation":
    case "details":
    case "message":
      return { min: 10, max: 5000, message: "", what };
    case "metrics":
    case "goals":
    case "focus":
      return { min: 2, max: 5000, message: "", what };
    case "verification_info":
      return { min: 2, max: 5000, message: "", what };
    default:
      if (field.kind === "textarea") {
        return { min: field.required ? 10 : 1, max: 5000, message: "", what };
      }
      return { max: 500, message: "", what };
  }
}

/**
 * Validate one field value. Returns an error message for the field, or null
 * when the value is fine. Native `required`/`type="email"` inputs keep their
 * built-in behaviour; email shape is also checked here so forms that opt out
 * of native validation still reject malformed addresses before posting.
 */
export function validateFieldValue(
  field: FormField,
  rawValue: string,
  formKey: FormKey | string,
): string | null {
  const value = rawValue.trim();

  if (value === "") {
    if (field.required) return "This field is required.";
    return null;
  }

  if (field.type === "email") {
    return EMAIL_RE.test(value) ? null : "Enter a valid email address.";
  }

  const rule = ruleFor(field, formKey);
  if (!rule) return null;

  if (rule.needUrl && !isHttpUrl(value)) return `${rule.what} ${rule.message}.`;
  if (rule.pattern && !rule.pattern.test(value)) return `${rule.what} ${rule.message}.`;
  if (rule.min && value.length < rule.min)
    return `${rule.what} must be at least ${rule.min} characters.`;
  if (rule.max && value.length > rule.max)
    return `${rule.what} must be ${rule.max} characters or fewer.`;
  return null;
}