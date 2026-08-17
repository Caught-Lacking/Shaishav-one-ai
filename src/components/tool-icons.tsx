import {
  Atom,
  BookMarked,
  BookOpen,
  Calculator,
  CalendarCheck,
  CircleHelp,
  Dna,
  FileSearch,
  Flame,
  FlaskConical,
  Languages,
  Layers,
  Lightbulb,
  ListChecks,
  NotebookPen,
  PenLine,
  Sigma,
  Sparkles,
  Timer,
  type LucideIcon,
} from "lucide-react";

/** Icon map used by sidebar nav, dashboard cards and tool pages. */
export const TOOL_ICON_MAP: Record<string, LucideIcon> = {
  Layers,
  ListChecks,
  NotebookPen,
  Timer,
  Calculator,
  PenLine,
  Sparkles,
  Languages,
  BookMarked,
  CircleHelp,
  Lightbulb,
  FileSearch,
  Sigma,
  Flame,
  CalendarCheck,
};

export const SUBJECT_ICON_MAP: Record<string, LucideIcon> = {
  physics: Atom,
  chemistry: FlaskConical,
  biology: Dna,
  maths: Sigma,
};

export function getIcon(name: string): LucideIcon {
  return TOOL_ICON_MAP[name] ?? SUBJECT_ICON_MAP[name] ?? BookOpen;
}
