"use client"

import { useRef, useState } from "react"
import { Loader2, Paperclip, CheckCircle2, X } from "lucide-react"

export function FileUpload({
  name,
  accept,
  label,
}: {
  name: string
  accept?: string
  label: string
}) {
  const inputRef = useRef<HTMLInputElement>(null)
  const [status, setStatus] = useState<"idle" | "uploading" | "done" | "error">("idle")
  const [fileName, setFileName] = useState("")
  const [pathname, setPathname] = useState("")
  const [error, setError] = useState("")

  async function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0]
    if (!file) return
    setStatus("uploading")
    setError("")
    setFileName(file.name)
    try {
      const fd = new FormData()
      fd.append("file", file)
      const res = await fetch("/api/upload", { method: "POST", body: fd })
      const data = await res.json()
      if (!res.ok) throw new Error(data.error || "Upload failed")
      setPathname(data.pathname)
      setStatus("done")
    } catch (err) {
      setStatus("error")
      setError(err instanceof Error ? err.message : "Upload failed")
    }
  }

  function reset() {
    setStatus("idle")
    setFileName("")
    setPathname("")
    setError("")
    if (inputRef.current) inputRef.current.value = ""
  }

  return (
    <div>
      <input type="hidden" name={name} value={pathname} />
      <input
        ref={inputRef}
        type="file"
        accept={accept}
        onChange={handleChange}
        className="sr-only"
        id={`file-${name}`}
      />
      {status === "done" ? (
        <div className="flex items-center justify-between gap-3 rounded-xl border border-primary/30 bg-primary/5 px-4 py-3">
          <span className="flex min-w-0 items-center gap-2 text-sm text-foreground">
            <CheckCircle2 className="size-4 shrink-0 text-primary" />
            <span className="truncate">{fileName}</span>
          </span>
          <button
            type="button"
            onClick={reset}
            className="shrink-0 rounded-full p-1 text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
            aria-label="Remove file"
          >
            <X className="size-4" />
          </button>
        </div>
      ) : (
        <label
          htmlFor={`file-${name}`}
          className="flex cursor-pointer items-center gap-2 rounded-xl border border-dashed border-border bg-background px-4 py-3 text-sm text-muted-foreground transition-colors hover:border-primary/50 hover:text-foreground"
        >
          {status === "uploading" ? (
            <>
              <Loader2 className="size-4 animate-spin" />
              Uploading {fileName}...
            </>
          ) : (
            <>
              <Paperclip className="size-4" />
              {label}
            </>
          )}
        </label>
      )}
      {error && <p className="mt-1 text-xs text-destructive">{error}</p>}
    </div>
  )
}
