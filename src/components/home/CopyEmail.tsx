"use client";

import { useEffect, useState } from "react";
import styles from "./Contact.module.css";

export function CopyEmail({ email, labels }: { email: string; labels: { copy: string; copied: string; aria: string } }) {
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (!copied) return;
    const id = window.setTimeout(() => setCopied(false), 2200);
    return () => window.clearTimeout(id);
  }, [copied]);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(email);
      setCopied(true);
    } catch {
      window.location.href = `mailto:${email}`;
    }
  };

  return (
    <button type="button" className={styles.copy} onClick={copy} aria-label={labels.aria} data-copied={copied || undefined}>
      <span aria-hidden="true">{copied ? labels.copied : labels.copy}</span>
      <span className="visually-hidden" aria-live="polite">
        {copied ? labels.copied : ""}
      </span>
    </button>
  );
}
