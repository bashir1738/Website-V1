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
import {
  BTN_GHOST,
  BTN_PRIMARY,
  CUSTOM_SCROLL,
  FIELD_ERROR,
  FIELD_FILE,
  FIELD_INPUT,
  FIELD_LABEL,
  FIELD_TEXTAREA,
} from "@/lib/styles";

interface Blog extends Record<string, unknown> {
  id: number;
  title: string;
  slug: string;
  author: string;
  content: string;
  image_url?: string | null;
  published_at?: string | null;
}

type Mode = "closed" | "create" | "edit";

const SLUG_PATTERN = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;

export default function AdminBlogsPage() {
  const { data, loading, error, reload } = useCollection<Blog>("blogs");
  const [mode, setMode] = useState<Mode>("closed");
  const [editingId, setEditingId] = useState<number | null>(null);
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [slug, setSlug] = useState("");
  const [publishedAt, setPublishedAt] = useState("");
  const [content, setContent] = useState("");
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
    setAuthor("");
    setSlug("");
    setPublishedAt("");
    setContent("");
    setImage(null);
    setExistingImage(null);
    setFieldErrors({});
  };

  const openEdit = (blog: Blog) => {
    setMode("edit");
    setEditingId(blog.id);
    setTitle(blog.title);
    setAuthor(blog.author);
    setSlug(blog.slug);
    setPublishedAt(toLocalInput(blog.published_at));
    setContent(blog.content);
    setImage(null);
    setExistingImage(blog.image_url ?? null);
    setFieldErrors({});
  };

  const closeEditor = () => {
    setMode("closed");
    setFieldErrors({});
  };

  const handleDelete = async (blog: Blog) => {
    if (!window.confirm(`Delete "${blog.title}"? This can't be undone.`)) return;
    toast.promise(
      deleteJson(`/blogs/${blog.id}`).then(() => {
        reload();
      }),
      {
        loading: "Deleting post…",
        success: "Post deleted.",
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
      body.append("author", author);
      body.append("content", content);
      const publishedIso = fromLocalInput(publishedAt);
      body.append("published_at", publishedIso ?? "");
      if (image) body.append("image", image);

      if (mode === "edit" && editingId !== null) {
        await putForm(`/blogs/${editingId}`, body);
        toast.success("Changes saved.");
      } else {
        await postForm("/blogs", body);
        toast.success("Post published.");
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
      <AdminHeader eyebrow="Admin" title="Blog posts">
        {mode === "closed" && (
          <button type="button" onClick={openCreate} className={BTN_PRIMARY}>
            <Plus className="h-4 w-4" />
            New post
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
                {mode === "edit" ? "Edit post" : "New post"}
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
                <label htmlFor="blog-title" className={FIELD_LABEL}>Title</label>
                <input
                  id="blog-title"
                  required
                  minLength={3}
                  value={title}
                  onChange={(e) => {
                    setTitle(e.target.value);
                    clearFieldError("title");
                  }}
                  className={`${FIELD_INPUT} mt-1.5`}
                  data-invalid={fieldErrors.title ? "true" : undefined}
                  aria-invalid={Boolean(fieldErrors.title)}
                  aria-describedby={fieldErrors.title ? "blog-title-error" : undefined}
                />
                {fieldErrors.title && (
                  <p id="blog-title-error" className={FIELD_ERROR}>
                    {fieldErrors.title}
                  </p>
                )}
              </div>
              <div>
                <label htmlFor="blog-slug" className={FIELD_LABEL}>Slug</label>
                <input
                  id="blog-slug"
                  required
                  pattern="[a-z0-9]+(?:-[a-z0-9]+)*"
                  value={slug}
                  onChange={(e) => {
                    setSlug(e.target.value);
                    clearFieldError("slug");
                  }}
                  className={`${FIELD_INPUT} mt-1.5 font-mono text-xs`}
                  placeholder="field-notes-from-jos"
                  data-invalid={fieldErrors.slug ? "true" : undefined}
                  aria-invalid={Boolean(fieldErrors.slug)}
                  aria-describedby={fieldErrors.slug ? "blog-slug-error" : undefined}
                />
                {fieldErrors.slug && (
                  <p id="blog-slug-error" className={FIELD_ERROR}>
                    {fieldErrors.slug}
                  </p>
                )}
              </div>
              <div>
                <label htmlFor="blog-author" className={FIELD_LABEL}>Author</label>
                <input
                  id="blog-author"
                  required
                  minLength={2}
                  value={author}
                  onChange={(e) => {
                    setAuthor(e.target.value);
                    clearFieldError("author");
                  }}
                  className={`${FIELD_INPUT} mt-1.5`}
                  data-invalid={fieldErrors.author ? "true" : undefined}
                  aria-invalid={Boolean(fieldErrors.author)}
                  aria-describedby={fieldErrors.author ? "blog-author-error" : undefined}
                />
                {fieldErrors.author && (
                  <p id="blog-author-error" className={FIELD_ERROR}>
                    {fieldErrors.author}
                  </p>
                )}
              </div>
              <div>
                <label htmlFor="blog-published" className={FIELD_LABEL}>Published at</label>
                <input
                  id="blog-published"
                  type="datetime-local"
                  value={publishedAt}
                  onChange={(e) => {
                    setPublishedAt(e.target.value);
                    clearFieldError("published_at");
                  }}
                  className={`${FIELD_INPUT} mt-1.5`}
                />
              </div>
            </div>

            <div className="mt-5">
              <label htmlFor="blog-content" className={FIELD_LABEL}>Content</label>
              <textarea
                id="blog-content"
                required
                minLength={10}
                rows={10}
                value={content}
                onChange={(e) => {
                  setContent(e.target.value);
                  clearFieldError("content");
                }}
                className={`${FIELD_TEXTAREA} mt-1.5`}
                data-invalid={fieldErrors.content ? "true" : undefined}
                aria-invalid={Boolean(fieldErrors.content)}
                aria-describedby={fieldErrors.content ? "blog-content-error" : undefined}
              />
              {fieldErrors.content && (
                <p id="blog-content-error" className={FIELD_ERROR}>
                  {fieldErrors.content}
                </p>
              )}
            </div>

            {existingImage && (
              <div className="mt-5">
                <span className={FIELD_LABEL}>Current image</span>
                <div className="relative mt-1.5 aspect-16/8 max-w-90 overflow-hidden rounded-xl bg-(--surface-2)">
                  <Image
                    src={existingImage}
                    alt="Current post image"
                    fill
                    sizes="360px"
                    className="object-cover"
                  />
                </div>
              </div>
            )}

            <label htmlFor="blog-image" className={`${FIELD_FILE} mt-5`} data-invalid={fieldErrors.image ? "true" : undefined}>
              <span aria-hidden="true" className="text-[15px]">↑</span>
              <span>{image ? image.name : `Upload an image (JPG or PNG, up to ${MAX_UPLOAD_LABEL})`}</span>
              <input
                id="blog-image"
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
              <p id="blog-image-error" className={FIELD_ERROR}>
                {fieldErrors.image}
              </p>
            )}

            <div className="mt-6 flex flex-wrap items-center gap-3">
              <button type="submit" disabled={saving} className={BTN_PRIMARY}>
                {saving ? (
                  <>
                    <Loader2 className="h-4 w-4 animate-spin" />
                    Saving…
                  </>
                ) : (
                  mode === "edit" ? "Save changes" : "Publish post"
                )}
              </button>
              <button type="button" onClick={closeEditor} className={BTN_GHOST}>
                Cancel
              </button>
            </div>
          </form>
        )}

        {loading && (
          <div className="flex flex-col items-center gap-3 py-16 text-(--dim)">
            <Loader2 className="h-5 w-5 animate-spin text-(--accent)" />
            <span className="text-xs">Loading posts…</span>
          </div>
        )}

        {!loading && error && (
          <p className="rounded-xl border border-[rgba(248,113,113,0.35)] bg-[rgba(248,113,113,0.1)] px-4 py-3 text-sm text-[#fca5a5]">
            {error}
          </p>
        )}

        {!loading && !error && (
          <div className={`${CUSTOM_SCROLL} overflow-x-auto rounded-xl border border-(--line)`}>
            <table className="w-full min-w-180 border-collapse text-left text-sm">
              <thead>
                <tr className="border-b border-(--line-strong) bg-(--surface-2) text-[11px] uppercase tracking-wider text-(--dim)">
                  <th className="px-4 py-3 font-semibold">Post</th>
                  <th className="px-4 py-3 font-semibold">Author</th>
                  <th className="px-4 py-3 font-semibold">Published</th>
                  <th className="px-4 py-3 font-semibold text-right">Actions</th>
                </tr>
              </thead>
              <tbody>
                {data.length === 0 && (
                  <tr>
                    <td colSpan={4} className="bg-(--card) px-4 py-12 text-center text-sm text-(--muted)">
                      No posts yet. Start with &quot;New post&quot;.
                    </td>
                  </tr>
                )}
                {data.map((blog) => (
                  <tr
                    key={blog.id}
                    className="border-b border-(--line) bg-(--card) last:border-b-0 hover:bg-(--card-hover)"
                  >
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-3">
                        <div className="relative h-12 w-16 shrink-0 overflow-hidden rounded-lg bg-(--surface-2)">
                          {blog.image_url ? (
                            <Image
                              src={blog.image_url}
                              alt=""
                              fill
                              sizes="64px"
                              className="object-cover"
                            />
                          ) : null}
                        </div>
                        <div className="min-w-0">
                          <p className="truncate font-semibold text-(--page-fg)">
                            {blog.title}
                          </p>
                          <p className="truncate font-mono text-xs text-(--dim)">
                            /community/blog/{blog.slug}
                          </p>
                        </div>
                      </div>
                    </td>
                    <td className="px-4 py-3 text-(--muted)">{blog.author}</td>
                    <td className="whitespace-nowrap px-4 py-3 text-(--muted)">
                      {formatDate(blog.published_at)}
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex justify-end gap-2">
                        <button
                          type="button"
                          onClick={() => openEdit(blog)}
                          className="inline-flex items-center gap-1.5 rounded-lg border border-(--line-strong) px-3 py-1.5 text-xs font-semibold text-(--muted) transition-colors hover:text-(--page-fg)"
                        >
                          <Pencil className="h-3.5 w-3.5" />
                          Edit
                        </button>
                        <button
                          type="button"
                          onClick={() => handleDelete(blog)}
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