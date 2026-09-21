/** Maximum size allowed for any uploaded photo or document: 1MB. */
export const MAX_UPLOAD_BYTES = 1024 * 1024;

/** Human-readable counterpart to MAX_UPLOAD_BYTES, for messages and hints. */
export const MAX_UPLOAD_LABEL = "1MB";

export function formatFileSize(bytes: number) {
  if (bytes >= 1024 * 1024) return `${(bytes / (1024 * 1024)).toFixed(1)}MB`;
  if (bytes >= 1024) return `${Math.round(bytes / 1024)}KB`;
  return `${bytes}B`;
}

/**
 * Validates an upload against the 1MB cap and, when an `accept` list is given,
 * its allowed types. Returns an error message, or null when the file is valid.
 */
export function validateUpload(file: File, accept?: string): string | null {
  if (file.size > MAX_UPLOAD_BYTES) {
    return `"${file.name}" is ${formatFileSize(file.size)}. The maximum size is ${MAX_UPLOAD_LABEL}.`;
  }

  if (accept) {
    const tokens = accept
      .split(",")
      .map((token) => token.trim().toLowerCase())
      .filter(Boolean);
    const name = file.name.toLowerCase();
    const type = (file.type || "").toLowerCase();
    const matches = tokens.some((token) => {
      if (token.startsWith(".")) return name.endsWith(token);
      if (token.endsWith("/*")) return type.startsWith(token.slice(0, -1));
      return type === token;
    });
    if (!matches) return "That file type isn't supported.";
  }

  return null;
}
