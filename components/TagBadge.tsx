"use client";

import { getTagStyle } from "@/lib/tag-categories";

interface TagBadgeProps {
  tag: string;
  size?: "sm" | "md";
}

export function TagBadge({ tag, size = "sm" }: TagBadgeProps) {
  const style = getTagStyle(tag);

  return (
    <span
      className={`inline-flex items-center rounded-md border font-medium ${
        size === "sm"
          ? "px-2 py-0.5 text-[10px]"
          : "px-2.5 py-1 text-xs"
      }`}
      style={{
        background: style.bg,
        borderColor: style.border,
        color: style.text,
      }}
    >
      {tag}
    </span>
  );
}
