import { Fragment, type ReactNode } from "react";
import { cn } from "@/lib/utils";

/**
 * Minimal markdown renderer for AI tutor responses.
 * Supports: headings, bold, italics, inline code, code blocks,
 * bullet/numbered lists, blockquotes, and paragraphs.
 */

function renderInline(text: string, keyPrefix: string): ReactNode[] {
  const nodes: ReactNode[] = [];
  // Split by code spans first
  const parts = text.split(/(`[^`]+`)/g);
  parts.forEach((part, i) => {
    if (part.startsWith("`") && part.endsWith("`") && part.length > 2) {
      nodes.push(
        <code
          key={`${keyPrefix}-code-${i}`}
          className="rounded bg-muted px-1.5 py-0.5 font-mono text-[0.85em] text-rose-600"
        >
          {part.slice(1, -1)}
        </code>,
      );
      return;
    }
    // Bold **text**
    const boldParts = part.split(/(\*\*[^*]+\*\*)/g);
    boldParts.forEach((bp, j) => {
      if (bp.startsWith("**") && bp.endsWith("**") && bp.length > 4) {
        nodes.push(
          <strong key={`${keyPrefix}-b-${i}-${j}`} className="font-semibold">
            {bp.slice(2, -2)}
          </strong>,
        );
        return;
      }
      // Italic *text*
      const italParts = bp.split(/(\*[^*\n]+\*)/g);
      italParts.forEach((ip, k) => {
        if (ip.startsWith("*") && ip.endsWith("*") && ip.length > 2) {
          nodes.push(<em key={`${keyPrefix}-i-${i}-${j}-${k}`}>{ip.slice(1, -1)}</em>);
        } else {
          nodes.push(<Fragment key={`${keyPrefix}-t-${i}-${j}-${k}`}>{ip}</Fragment>);
        }
      });
    });
  });
  return nodes;
}

export function Markdown({ content }: { content: string }) {
  const lines = content.split("\n");
  const blocks: ReactNode[] = [];
  let list: { ordered: boolean; items: string[] } | null = null;
  let codeBlock: { lang: string; lines: string[] } | null = null;
  let paragraph: string[] = [];

  const flushParagraph = () => {
    if (paragraph.length) {
      blocks.push(
        <p key={`p-${blocks.length}`} className="leading-relaxed">
          {renderInline(paragraph.join(" "), `p-${blocks.length}`)}
        </p>,
      );
      paragraph = [];
    }
  };
  const flushList = () => {
    if (list) {
      const Tag = list.ordered ? "ol" : "ul";
      blocks.push(
        <Tag
          key={`l-${blocks.length}`}
          className={cn(
            "my-1.5 space-y-1",
            list.ordered ? "list-decimal" : "list-disc",
            "pl-5 marker:text-teal-600",
          )}
        >
          {list.items.map((item, i) => (
            <li key={i} className="leading-relaxed">
              {renderInline(item, `li-${blocks.length}-${i}`)}
            </li>
          ))}
        </Tag>,
      );
      list = null;
    }
  };
  const flushCode = () => {
    if (codeBlock) {
      blocks.push(
        <pre
          key={`c-${blocks.length}`}
          className="my-2 overflow-x-auto rounded-lg border border-border bg-muted/60 p-3 font-mono text-[13px] leading-relaxed"
        >
          <code>{codeBlock.lines.join("\n")}</code>
        </pre>,
      );
      codeBlock = null;
    }
  };

  for (const raw of lines) {
    const line = raw.trimEnd();

    if (codeBlock) {
      if (line.startsWith("```")) {
        flushCode();
      } else {
        codeBlock.lines.push(line);
      }
      continue;
    }

    if (line.startsWith("```")) {
      flushParagraph();
      flushList();
      codeBlock = { lang: line.slice(3).trim(), lines: [] };
      continue;
    }

    const heading = line.match(/^(#{1,3})\s+(.*)$/);
    if (heading) {
      flushParagraph();
      flushList();
      const level = heading[1].length;
      const text = heading[2];
      if (level === 1) {
        blocks.push(
          <h3 key={`h-${blocks.length}`} className="mt-3 mb-1.5 text-base font-bold">
            {renderInline(text, `h-${blocks.length}`)}
          </h3>,
        );
      } else {
        blocks.push(
          <h4 key={`h-${blocks.length}`} className="mt-2.5 mb-1 text-[15px] font-semibold text-teal-700">
            {renderInline(text, `h-${blocks.length}`)}
          </h4>,
        );
      }
      continue;
    }

    if (/^\s*>\s?/.test(line)) {
      flushParagraph();
      flushList();
      blocks.push(
        <blockquote
          key={`q-${blocks.length}`}
          className="my-2 border-l-2 border-amber-400 bg-amber-50/70 pl-3 pr-2 py-1.5 text-sm italic text-foreground/80"
        >
          {renderInline(line.replace(/^\s*>\s?/, ""), `q-${blocks.length}`)}
        </blockquote>,
      );
      continue;
    }

    const ordered = line.match(/^\s*\d+[.)]\s+(.*)$/);
    if (ordered) {
      flushParagraph();
      if (!list || !list.ordered) {
        flushList();
        list = { ordered: true, items: [] };
      }
      list.items.push(ordered[1]);
      continue;
    }

    const bullet = line.match(/^\s*[-*]\s+(.*)$/);
    if (bullet) {
      flushParagraph();
      if (!list || list.ordered) {
        flushList();
        list = { ordered: false, items: [] };
      }
      list.items.push(bullet[1]);
      continue;
    }

    if (line.trim() === "") {
      flushParagraph();
      flushList();
      continue;
    }

    if (list) {
      flushList();
    }
    paragraph.push(line);
  }

  flushParagraph();
  flushList();
  flushCode();

  return <div className="space-y-0.5 text-[14px] leading-6">{blocks}</div>;
}
