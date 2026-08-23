import { useEffect, useMemo, useRef, useState } from "react";
import { useSearchParams } from "react-router";
import { useAction, useMutation, useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import type { Id } from "@/convex/_generated/dataModel";
import { AppShell } from "@/components/AppShell";
import { PageTransition } from "@/components/PageTransition";
import { StreamPicker } from "@/components/StreamPicker";
import { Markdown } from "@/components/Markdown";
import { ToolPanel } from "@/components/ToolPanel";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useAuth } from "@/hooks/use-auth";
import { useStream } from "@/hooks/use-stream";
import { cn } from "@/lib/utils";
import {
  getChapter,
  getStream,
  getStreamSubjects,
  getSubject,
  getTopic,
  subjectChaptersByClass,
  type StreamId,
  type Topic,
} from "@/lib/curriculum";
import {
  BookOpen,
  Bot,
  Check,
  CheckCircle2,
  ChevronDown,
  ChevronRight,
  Circle,
  FlaskConical,
  Layers,
  ListChecks,
  Loader2,
  Menu,
  MessageSquareText,
  MousePointerClick,
  NotebookPen,
  PenLine,
  Search,
  Send,
  Sparkles,
  Trash2,
  Wand2,
  X,
} from "lucide-react";
import { toast } from "sonner";
import { TOOL_DEFS, type ToolId } from "@/lib/tools";

const SUBJECT_ICONS: Record<string, React.ReactNode> = {
  physics: <FlaskConical className="size-4" />,
  chemistry: <Sparkles className="size-4" />,
  biology: <BookOpen className="size-4" />,
  maths: <Layers className="size-4" />,
};

// Study page's inline generator panel — the five topic-based generators.
// Every other tool lives in the sidebar under /tool/:id.
const GENERATOR_TOOL_IDS = new Set([
  "flashcards",
  "quiz",
  "notes",
  "essay",
  "summarizer",
]);

const SUGGESTIONS = [
  "Explain this topic simply, like I'm hearing it for the first time",
  "Give me a 5-question PYQ drill on this topic",
  "Summarise this topic into revision notes",
  "Where do students usually go wrong here?",
];

const TOOL_ICONS: Record<string, React.ReactNode> = {
  flashcards: <Layers className="size-4" />,
  quiz: <ListChecks className="size-4" />,
  notes: <NotebookPen className="size-4" />,
  essay: <PenLine className="size-4" />,
  summarizer: <Sparkles className="size-4" />,
};

export default function Study() {
  const { user } = useAuth();
  const { stream } = useStream();
  const [searchParams, setSearchParams] = useSearchParams();

  const chats = useQuery(api.chats.list);
  const progress = useQuery(api.progress.list);
  const generate = useAction(api.chat.generate);
  const setDone = useMutation(api.progress.setDone);
  const removeChat = useMutation(api.chats.remove);

  const subjectId = searchParams.get("subject") ?? undefined;
  const chapterId = searchParams.get("chapter") ?? undefined;
  const topicId = searchParams.get("topic") ?? undefined;
  const chatParam = searchParams.get("chat");

  const [showSyllabus, setShowSyllabus] = useState(false);
  const [syllabusQuery, setSyllabusQuery] = useState("");
  const [expandedChapters, setExpandedChapters] = useState<Set<string>>(
    () => new Set(chapterId ? [chapterId] : []),
  );
  const [isGenerating, setIsGenerating] = useState(false);
  const [input, setInput] = useState("");
  const [activeChatId, setActiveChatId] = useState<Id<"chats"> | null>(null);
  const [activeTool, setActiveTool] = useState<ToolId | null>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  const streamId = (stream ?? "neet") as StreamId;
  const streamDef = getStream(streamId);
  const subjectDefs = getStreamSubjects(streamId);
  const effectiveSubjectId =
    subjectId && getSubject(subjectId) ? subjectId : subjectDefs[0].id;
  const activeSubject = getSubject(effectiveSubjectId)!;

  const activeChapter = chapterId
    ? getChapter(effectiveSubjectId, chapterId)
    : undefined;
  const activeTopic =
    chapterId && topicId
      ? getTopic(effectiveSubjectId, chapterId, topicId)
      : undefined;

  // resolve chat from ?chat= param once chats load
  useEffect(() => {
    if (!chatParam || !chats) return;
    const chat = chats.find((c) => c._id === chatParam);
    if (chat) {
      const params = new URLSearchParams(searchParams);
      params.set("subject", chat.subjectId);
      params.set("chapter", chat.chapterId);
      params.set("topic", chat.topicId);
      setSearchParams(params, { replace: true });
      setActiveChatId(chat._id);
    }
  }, [chatParam, chats, searchParams, setSearchParams]);

  // chat bound to the current topic context (most recent)
  const contextChat = useMemo(() => {
    if (!activeTopic) return null;
    return (
      chats?.find(
        (c) =>
          c.subjectId === effectiveSubjectId &&
          c.chapterId === chapterId &&
          c.topicId === topicId,
      ) ?? null
    );
  }, [chats, effectiveSubjectId, chapterId, topicId, activeTopic]);

  const chat = useQuery(
    api.chats.get,
    activeChatId ? { id: activeChatId } : "skip",
  );

  // when a topic is selected and there's an existing chat, open it
  useEffect(() => {
    if (activeTopic && contextChat && !activeChatId) {
      setActiveChatId(contextChat._id);
    }
  }, [activeTopic, contextChat, activeChatId]);

  // auto-scroll to the newest message
  useEffect(() => {
    const el = scrollRef.current;
    if (el) el.scrollTop = el.scrollHeight;
  }, [chat?.messages.length, isGenerating]);

  // a generator tool needs a selected topic
  useEffect(() => {
    if (!activeTopic) setActiveTool(null);
  }, [activeTopic]);

  const doneMap = useMemo(() => {
    const map = new Map<string, boolean>();
    for (const p of progress ?? []) {
      map.set(`${p.subjectId}|${p.chapterId}|${p.topicId}`, p.done);
    }
    return map;
  }, [progress]);

  // filtered syllabus tree while searching (chapter matches show all its topics)
  const filteredTree = useMemo(() => {
    const q = syllabusQuery.trim().toLowerCase();
    if (!q) return null;
    return subjectChaptersByClass(activeSubject)
      .map(({ cls, chapters }) => {
        const kept = chapters
          .map((chapter) => {
            const chapterMatch = chapter.name.toLowerCase().includes(q);
            const topics = chapter.topics.filter((t) =>
              t.name.toLowerCase().includes(q),
            );
            return {
              chapter,
              topics:
                chapterMatch && topics.length === 0 ? chapter.topics : topics,
            };
          })
          .filter((row) => row.topics.length > 0);
        return { cls, chapters: kept };
      })
      .filter((g) => g.chapters.length > 0);
  }, [activeSubject, syllabusQuery]);

  // reset the syllabus search whenever the subject changes
  useEffect(() => {
    setSyllabusQuery("");
  }, [effectiveSubjectId]);

  const selectTopic = (sid: string, cid: string, tid: string) => {
    const params = new URLSearchParams(searchParams);
    params.set("subject", sid);
    params.set("chapter", cid);
    params.set("topic", tid);
    params.delete("chat");
    setSearchParams(params, { replace: true });
    setExpandedChapters((prev) => new Set(prev).add(cid));
    setActiveChatId(null);
    setShowSyllabus(false);
  };

  const switchSubject = (sid: string) => {
    const params = new URLSearchParams(searchParams);
    params.set("subject", sid);
    params.delete("chapter");
    params.delete("topic");
    params.delete("chat");
    setSearchParams(params, { replace: true });
    setExpandedChapters(new Set());
    setActiveChatId(null);
  };

  const switchChapter = (cid: string) => {
    const params = new URLSearchParams(searchParams);
    params.set("subject", effectiveSubjectId);
    params.set("chapter", cid);
    params.delete("topic");
    params.delete("chat");
    setSearchParams(params, { replace: true });
    setExpandedChapters((prev) => new Set(prev).add(cid));
    setActiveChatId(null);
  };

  const renderTopicButton = (cid: string, topic: Topic) => {
    const isActive = topic.id === topicId;
    const done = doneMap.get(`${activeSubject.id}|${cid}|${topic.id}`);
    return (
      <button
        key={topic.id}
        type="button"
        onClick={() => selectTopic(activeSubject.id, cid, topic.id)}
        className={cn(
          "flex w-full cursor-pointer items-center gap-2 px-3 py-2 pl-7 text-left transition-colors",
          isActive ? "bg-teal-100/70" : "hover:bg-accent/60",
        )}
      >
        {done ? (
          <CheckCircle2 className="size-3.5 shrink-0 text-emerald-500" />
        ) : (
          <Circle className="size-3.5 shrink-0 text-border" />
        )}
        <span
          className={cn(
            "flex-1 text-[12.5px] leading-snug",
            isActive ? "font-semibold text-teal-800" : "text-foreground/80",
            done && "text-muted-foreground",
          )}
        >
          {topic.name}
        </span>
        <span className="shrink-0 rounded bg-amber-100 px-1.5 py-0.5 text-[10px] font-bold text-amber-700">
          {topic.pyq} PYQs
        </span>
      </button>
    );
  };

  const handleSend = async (content?: string) => {
    const text = (content ?? input).trim();
    if (!text || !activeTopic || !activeChapter || isGenerating) return;
    setIsGenerating(true);
    setInput("");
    try {
      const result = await generate({
        chatId: activeChatId ?? undefined,
        stream: streamId,
        subjectId: effectiveSubjectId,
        chapterId: activeChapter.id,
        topicId: activeTopic.id,
        content: text,
        title: activeTopic.name,
      });
      if (result.chatId) {
        setActiveChatId(result.chatId);
        const params = new URLSearchParams(searchParams);
        params.set("chat", result.chatId);
        setSearchParams(params, { replace: true });
      }
    } catch (error) {
      console.error("Generate error:", error);
      toast.error(
        "Something went wrong while asking One AI. Please try again.",
      );
    } finally {
      setIsGenerating(false);
    }
  };

  const handleToggleDone = async () => {
    if (!activeTopic || !activeChapter) return;
    const key = `${effectiveSubjectId}|${activeChapter.id}|${activeTopic.id}`;
    const next = !doneMap.get(key);
    await setDone({
      subjectId: effectiveSubjectId,
      chapterId: activeChapter.id,
      topicId: activeTopic.id,
      done: next,
    });
    toast.success(next ? "Topic marked as done 📚" : "Topic reopened");
  };

  const handleDeleteChat = async () => {
    if (!activeChatId) return;
    await removeChat({ id: activeChatId });
    setActiveChatId(null);
    const params = new URLSearchParams(searchParams);
    params.delete("chat");
    setSearchParams(params, { replace: true });
    toast.success("Notebook deleted");
  };

  if (!stream) {
    return <StreamPicker />;
  }

  const messages = chat?.messages ?? [];

  return (
    <AppShell stream={stream}>
      <PageTransition>
      <div className="mx-auto flex w-full max-w-7xl flex-col gap-4 px-4 py-5 sm:px-6 lg:h-[calc(100dvh-6rem)] lg:flex-row">
        {/* ============================ SYLLABUS ============================ */}
        <aside
          className={cn(
            "shrink-0 flex-col gap-4 lg:flex lg:w-[340px]",
            showSyllabus ? "flex" : "hidden",
          )}
        >
          {/* study tools — collapsible generator panel */}
          <Collapsible defaultOpen className="sheet p-3">
            <CollapsibleTrigger className="flex w-full cursor-pointer items-center gap-2">
              <span className="flex size-7 items-center justify-center rounded-lg bg-gradient-to-br from-amber-400 to-rose-400 text-white">
                <Wand2 className="size-3.5" />
              </span>
              <p className="text-xs font-bold uppercase tracking-[0.18em] text-foreground">
                Study tools
              </p>
              <ChevronDown className="ml-auto size-3.5 text-muted-foreground transition-transform data-[state=closed]:-rotate-90" />
            </CollapsibleTrigger>
            <CollapsibleContent className="mt-3 space-y-1.5">
              {TOOL_DEFS.filter((t) => GENERATOR_TOOL_IDS.has(t.id)).map((t) => {
                const disabled = !activeTopic;
                const active = activeTool === t.id;
                return (
                  <button
                    key={t.id}
                    type="button"
                    disabled={disabled}
                    onClick={() => setActiveTool(t.id)}
                    title={
                      disabled
                        ? "Pick a chapter & topic first"
                        : `${t.label} — ${t.description}`
                    }
                    className={cn(
                      "flex w-full cursor-pointer items-center gap-2.5 rounded-lg border-2 px-2.5 py-2 text-left transition-colors disabled:cursor-not-allowed disabled:opacity-40",
                      active
                        ? "border-teal-300 bg-teal-50"
                        : "border-transparent hover:bg-accent",
                    )}
                  >
                    <span
                      className={cn(
                        "flex size-7 shrink-0 items-center justify-center rounded-md text-white",
                        t.iconBg,
                      )}
                    >
                      {TOOL_ICONS[t.id]}
                    </span>
                    <span className="min-w-0">
                      <span className="block text-[13px] font-semibold leading-tight">
                        {t.label}
                      </span>
                      <span className="block truncate text-[10.5px] leading-tight text-muted-foreground">
                        {t.description}
                      </span>
                    </span>
                  </button>
                );
              })}
              {!activeTopic && (
                <p className="px-1 pt-1 text-[10.5px] leading-4 text-muted-foreground">
                  Pick a chapter &amp; topic from the syllabus below to enable
                  generators.
                </p>
              )}
            </CollapsibleContent>
          </Collapsible>

          {/* subject tabs */}
          <div className="sheet p-3">
            <p className="px-1 pb-2 text-[11px] font-bold uppercase tracking-[0.18em] text-muted-foreground">
              Subjects · {streamDef.name}
            </p>
            <div className="flex gap-2">
              {subjectDefs.map((s) => {
                const active = s.id === effectiveSubjectId;
                return (
                  <button
                    key={s.id}
                    type="button"
                    onClick={() => {
                      const params = new URLSearchParams(searchParams);
                      params.set("subject", s.id);
                      params.delete("chapter");
                      params.delete("topic");
                      params.delete("chat");
                      setSearchParams(params, { replace: true });
                      setExpandedChapters(new Set());
                      setActiveChatId(null);
                    }}
                    className={cn(
                      "flex flex-1 cursor-pointer flex-col items-center gap-1 rounded-xl border-2 px-2 py-2.5 text-xs font-semibold transition-colors",
                      active
                        ? cn("border-transparent", s.palette.chip)
                        : "border-border text-muted-foreground hover:bg-accent",
                    )}
                  >
                    {SUBJECT_ICONS[s.id]}
                    {s.short}
                  </button>
                );
              })}
            </div>
          </div>

          {/* chapter / topic tree */}
          <div className="sheet flex min-h-0 flex-1 flex-col">
            <div className="border-b border-border/70 px-4 py-3">
              <div className="flex items-center justify-between gap-2">
                <p className="text-xs font-bold uppercase tracking-[0.18em] text-muted-foreground">
                  NCERT syllabus · Class 11 & 12
                </p>
                <span className="rounded-full bg-muted px-2 py-0.5 text-[10px] font-bold text-muted-foreground">
                  {activeSubject.chapters.length} chapters
                </span>
              </div>
              <div className="relative mt-2.5">
                <Search className="absolute left-2.5 top-1/2 size-3.5 -translate-y-1/2 text-muted-foreground" />
                <Input
                  value={syllabusQuery}
                  onChange={(e) => setSyllabusQuery(e.target.value)}
                  placeholder="Search chapter or topic…"
                  className="h-8 rounded-lg bg-background pl-8 pr-8 text-[12.5px]"
                />
                {syllabusQuery && (
                  <button
                    type="button"
                    onClick={() => setSyllabusQuery("")}
                    aria-label="Clear search"
                    className="absolute right-2 top-1/2 -translate-y-1/2 cursor-pointer rounded-full p-0.5 text-muted-foreground transition-colors hover:text-foreground"
                  >
                    <X className="size-3.5" />
                  </button>
                )}
              </div>
              {!syllabusQuery && (
                <div className="mt-2 flex items-center gap-1.5 text-[11px]">
                  <button
                    type="button"
                    onClick={() =>
                      setExpandedChapters(
                        new Set(activeSubject.chapters.map((c) => c.id)),
                      )
                    }
                    className="cursor-pointer font-semibold text-teal-600 hover:underline"
                  >
                    Expand all
                  </button>
                  <span className="text-border">·</span>
                  <button
                    type="button"
                    onClick={() => setExpandedChapters(new Set())}
                    className="cursor-pointer font-semibold text-muted-foreground transition-colors hover:text-foreground"
                  >
                    Collapse all
                  </button>
                </div>
              )}
            </div>
            <ScrollArea className="min-h-0 flex-1">
              {syllabusQuery.trim() ? (
                <div className="space-y-5 p-4">
                  {filteredTree?.map(({ cls, chapters }) => (
                    <div key={cls}>
                      <p className="pb-1.5 font-display text-sm font-bold text-foreground">
                        Class {cls}
                      </p>
                      <div className="space-y-1.5">
                        {chapters.map(({ chapter, topics }) => (
                          <div
                            key={chapter.id}
                            className="overflow-hidden rounded-lg border border-teal-300/70 bg-teal-50/40"
                          >
                            <div className="flex items-center gap-2 px-3 py-2.5">
                              <ChevronDown className="size-3.5 shrink-0 text-teal-600" />
                              <span className="flex-1 text-[13px] font-semibold leading-snug text-teal-800">
                                {chapter.name}
                              </span>
                            </div>
                            <div className="border-t border-dashed border-teal-300/50">
                              {topics.map((topic) =>
                                renderTopicButton(chapter.id, topic),
                              )}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                  {filteredTree && filteredTree.length === 0 && (
                    <p className="py-6 text-center text-xs text-muted-foreground">
                      No chapters or topics match “{syllabusQuery.trim()}”.
                    </p>
                  )}
                </div>
              ) : (
                <div className="space-y-5 p-4">
                  {subjectChaptersByClass(activeSubject).map(
                    ({ cls, chapters }) => (
                      <div key={cls}>
                        <p className="pb-1.5 font-display text-sm font-bold text-foreground">
                          Class {cls}
                        </p>
                        <div className="space-y-1.5">
                          {chapters.map((chapter) => {
                            const expanded = expandedChapters.has(chapter.id);
                            const doneCount = chapter.topics.filter((t) =>
                              doneMap.get(
                                `${activeSubject.id}|${chapter.id}|${t.id}`,
                              ),
                            ).length;
                            return (
                              <div
                                key={chapter.id}
                                className="overflow-hidden rounded-lg border border-border/70"
                              >
                                <button
                                  type="button"
                                  onClick={() =>
                                    setExpandedChapters((prev) => {
                                      const next = new Set(prev);
                                      if (next.has(chapter.id)) {
                                        next.delete(chapter.id);
                                      } else {
                                        next.add(chapter.id);
                                      }
                                      return next;
                                    })
                                  }
                                  className={cn(
                                    "flex w-full cursor-pointer items-center gap-2 px-3 py-2.5 text-left transition-colors",
                                    chapter.id === chapterId
                                      ? "bg-teal-50"
                                      : "hover:bg-accent",
                                  )}
                                >
                                  {expanded ? (
                                    <ChevronDown className="size-3.5 shrink-0 text-muted-foreground" />
                                  ) : (
                                    <ChevronRight className="size-3.5 shrink-0 text-muted-foreground" />
                                  )}
                                  <span
                                    className={cn(
                                      "flex-1 text-[13px] font-medium leading-snug",
                                      chapter.id === chapterId &&
                                        "text-teal-700",
                                    )}
                                  >
                                    {chapter.name}
                                  </span>
                                  {doneCount > 0 && (
                                    <span className="shrink-0 rounded-full bg-emerald-100 px-1.5 py-0.5 text-[10px] font-bold text-emerald-700">
                                      {doneCount}/{chapter.topics.length}
                                    </span>
                                  )}
                                </button>
                                {expanded && (
                                  <div className="border-t border-dashed border-border/70 bg-card/60">
                                    {chapter.topics.map((topic) =>
                                      renderTopicButton(chapter.id, topic),
                                    )}
                                  </div>
                                )}
                              </div>
                            );
                          })}
                        </div>
                      </div>
                    ),
                  )}
                </div>
              )}
            </ScrollArea>
          </div>

          {/* notebooks list */}
          <div className="sheet p-4">
            <div className="flex items-center gap-2">
              <MessageSquareText className="size-4 text-rose-500" />
              <p className="text-xs font-bold uppercase tracking-[0.18em] text-muted-foreground">
                Your notebooks
              </p>
              <span className="ml-auto rounded-full bg-muted px-2 py-0.5 text-[10px] font-bold">
                {chats?.length ?? 0}
              </span>
            </div>
            <ScrollArea className="mt-2 max-h-48">
              {chats && chats.length > 0 ? (
                <div className="space-y-1">
                  {chats.map((c) => {
                    const ch = getChapter(c.subjectId, c.chapterId);
                    const tp = getTopic(c.subjectId, c.chapterId, c.topicId);
                    return (
                      <button
                        key={c._id}
                        type="button"
                        onClick={() => {
                          const params = new URLSearchParams(searchParams);
                          params.set("subject", c.subjectId);
                          params.set("chapter", c.chapterId);
                          params.set("topic", c.topicId);
                          params.set("chat", c._id);
                          setSearchParams(params, { replace: true });
                          setActiveChatId(c._id);
                          setExpandedChapters((prev) =>
                            new Set(prev).add(c.chapterId),
                          );
                        }}
                        className={cn(
                          "block w-full cursor-pointer rounded-lg px-2.5 py-2 text-left transition-colors hover:bg-accent",
                          c._id === activeChatId && "bg-teal-50",
                        )}
                      >
                        <p className="truncate text-[13px] font-semibold">
                          {c.title}
                        </p>
                        <p className="truncate text-[11px] text-muted-foreground">
                          {ch?.name} · {tp?.name}
                        </p>
                      </button>
                    );
                  })}
                </div>
              ) : (
                <p className="py-2 text-xs text-muted-foreground">
                  No notebooks yet — ask your first question below.
                </p>
              )}
            </ScrollArea>
          </div>
        </aside>

        {/* =================== MAIN COLUMN =================== */}
        <div className="flex min-w-0 flex-1 flex-col gap-4 lg:min-h-0">
          {/* quick chapter/topic picker — fast access to any topic */}
          <div className="sheet flex flex-wrap items-center gap-2 p-2.5 sm:p-3">
            <div className="flex items-center gap-1.5 pr-1">
              <span className="flex size-6 items-center justify-center rounded-md bg-gradient-to-br from-violet-500 to-indigo-500 text-white">
                <MousePointerClick className="size-3.5" />
              </span>
              <p className="text-[10.5px] font-bold uppercase tracking-[0.16em] text-muted-foreground">
                Quick pick
              </p>
            </div>
            <Select value={effectiveSubjectId} onValueChange={switchSubject}>
              <SelectTrigger
                size="sm"
                className="h-8 min-w-[112px] flex-1 rounded-lg text-[12.5px] sm:flex-none"
              >
                <SelectValue placeholder="Subject" />
              </SelectTrigger>
              <SelectContent>
                {subjectDefs.map((s) => (
                  <SelectItem key={s.id} value={s.id}>
                    <span
                      className={cn(
                        "flex items-center gap-2",
                        s.palette.text,
                      )}
                    >
                      {SUBJECT_ICONS[s.id]}
                      {s.name}
                    </span>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Select value={chapterId ?? ""} onValueChange={switchChapter}>
              <SelectTrigger
                size="sm"
                className="h-8 min-w-[170px] flex-[2] rounded-lg text-[12.5px] sm:flex-none"
              >
                <SelectValue placeholder="Choose chapter" />
              </SelectTrigger>
              <SelectContent className="max-w-[340px]">
                {subjectChaptersByClass(activeSubject).map(
                  ({ cls, chapters }) => (
                    <SelectGroup key={cls}>
                      <SelectLabel>Class {cls}</SelectLabel>
                      {chapters.map((c) => (
                        <SelectItem key={c.id} value={c.id} className="pr-8">
                          {c.name}
                        </SelectItem>
                      ))}
                    </SelectGroup>
                  ),
                )}
              </SelectContent>
            </Select>
            <Select
              value={topicId ?? ""}
              onValueChange={(v) =>
                chapterId && selectTopic(effectiveSubjectId, chapterId, v)
              }
              disabled={!chapterId}
            >
              <SelectTrigger
                size="sm"
                className="h-8 min-w-[170px] flex-[2] rounded-lg text-[12.5px] sm:flex-none"
              >
                <SelectValue
                  placeholder={chapterId ? "Choose topic" : "Pick a chapter first"}
                />
              </SelectTrigger>
              <SelectContent className="max-w-[340px]">
                {activeChapter?.topics.map((t) => (
                  <SelectItem key={t.id} value={t.id} className="pr-8">
                    {t.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* =================== GENERATOR TOOL PANEL =================== */}
          {activeTool && activeTopic && activeChapter ? (
            <ToolPanel
              key={`${activeTool}-${activeTopic.id}`}
              tool={activeTool}
              stream={stream}
              subjectId={effectiveSubjectId}
              chapterId={activeChapter.id}
              topicId={activeTopic.id}
              topicName={activeTopic.name}
              contextLine={`${activeSubject.name} · Class ${activeChapter.class} · ${activeChapter.name}`}
              existingChatId={contextChat?._id ?? null}
              onChatIdChange={(id) => setActiveChatId(id)}
              onClose={() => setActiveTool(null)}
            />
          ) : (
          /* ============================= CHAT ============================= */
          <section className="sheet flex min-h-[70vh] flex-1 flex-col overflow-hidden lg:min-h-0">
          {/* context header */}
          <div className="flex flex-wrap items-center gap-2 border-b border-border/70 px-4 py-3">
            <button
              type="button"
              onClick={() => setShowSyllabus((v) => !v)}
              className="inline-flex cursor-pointer items-center gap-1.5 rounded-lg border border-border px-2.5 py-1.5 text-xs font-semibold lg:hidden"
            >
              {showSyllabus ? (
                <X className="size-3.5" />
              ) : (
                <Menu className="size-3.5" />
              )}
              Syllabus
            </button>

            {activeTopic && activeChapter ? (
              <>
                <span
                  className={cn(
                    "rounded-full px-2.5 py-1 text-[11px] font-bold",
                    activeSubject.palette.chip,
                  )}
                >
                  {SUBJECT_ICONS[activeSubject.id]}
                  {activeSubject.name} · Class {activeChapter.class}
                </span>
                <span className="hidden rounded-full bg-muted px-2.5 py-1 text-[11px] font-semibold text-foreground/80 sm:inline">
                  {activeChapter.name}
                </span>
                <span className="rounded-full border border-amber-200 bg-amber-50 px-2.5 py-1 text-[11px] font-bold text-amber-700">
                  {activeTopic.name} · {activeTopic.pyq} PYQs
                </span>
                <div className="ml-auto flex items-center gap-1.5">
                  <Button
                    variant="outline"
                    size="sm"
                    className={cn(
                      "h-8 rounded-full text-xs",
                      doneMap.get(
                        `${effectiveSubjectId}|${activeChapter.id}|${activeTopic.id}`,
                      ) &&
                        "border-emerald-300 bg-emerald-50 text-emerald-700",
                    )}
                    onClick={handleToggleDone}
                  >
                    <Check className="size-3.5" />
                    {doneMap.get(
                      `${effectiveSubjectId}|${activeChapter.id}|${activeTopic.id}`,
                    )
                      ? "Done"
                      : "Mark done"}
                  </Button>
                  {chat && (
                    <Button
                      variant="ghost"
                      size="icon-sm"
                      className="text-muted-foreground hover:text-destructive"
                      onClick={handleDeleteChat}
                      title="Delete notebook"
                    >
                      <Trash2 className="size-4" />
                    </Button>
                  )}
                </div>
              </>
            ) : (
              <p className="text-sm font-semibold text-muted-foreground">
                Pick a chapter & topic above to start
              </p>
            )}
          </div>

          {/* messages */}
          <div
            ref={scrollRef}
            className="min-h-0 flex-1 overflow-y-auto"
          >
            <div className="flex flex-col gap-4 p-4 sm:p-6">
              {!activeTopic ? (
                <div className="mx-auto flex max-w-md flex-col items-center py-10 text-center">
                  <div className="flex size-14 items-center justify-center rounded-2xl bg-gradient-to-br from-teal-500 to-indigo-500 text-white shadow-md">
                    <Bot className="size-7" />
                  </div>
                  <h3 className="mt-4 font-display text-xl font-bold">
                    Ask anything from the {streamDef.name} syllabus
                  </h3>
                  <p className="mt-2 text-sm leading-6 text-muted-foreground">
                    Use the <span className="font-semibold text-foreground">Quick pick</span>{" "}
                    bar above (subject → chapter → topic) or browse the
                    syllabus — then chat with the AI tutor about any topic.
                    Every conversation is saved in your notebook.
                  </p>
                  <div className="mt-6 grid w-full grid-cols-1 gap-2 sm:grid-cols-2">
                    {subjectDefs.map((s) => (
                      <button
                        key={s.id}
                        type="button"
                        onClick={() => {
                          const params = new URLSearchParams(searchParams);
                          params.set("subject", s.id);
                          setSearchParams(params, { replace: true });
                          setShowSyllabus(true);
                        }}
                        className="flex cursor-pointer items-center gap-2 rounded-xl border-2 border-border px-3 py-2.5 text-left text-sm font-semibold transition-colors hover:border-teal-300 hover:bg-teal-50"
                      >
                        {SUBJECT_ICONS[s.id]}
                        {s.name}
                      </button>
                    ))}
                  </div>
                </div>
              ) : (
                <>
                  {messages.length === 0 && !isGenerating && (
                    <div className="mx-auto w-full max-w-xl rounded-2xl border border-amber-200 bg-amber-50/80 p-4">
                      <p className="flex items-center gap-2 text-sm font-bold text-amber-800">
                        <Sparkles className="size-4" />
                        Fresh notebook page: {activeTopic.name}
                      </p>
                      <p className="mt-1 text-xs leading-5 text-amber-900/80">
                        Class {activeChapter?.class} · {activeSubject.name} ·{" "}
                        {activeChapter?.name} — {activeTopic.pyq} PYQs mapped.
                        Try one of these to begin:
                      </p>
                      <div className="mt-3 flex flex-col gap-1.5">
                        {SUGGESTIONS.map((s) => (
                          <button
                            key={s}
                            type="button"
                            onClick={() => handleSend(s)}
                            className="cursor-pointer rounded-lg border border-amber-200 bg-white/70 px-3 py-2 text-left text-[13px] text-foreground/80 transition-colors hover:border-amber-400 hover:bg-white"
                          >
                            {s}
                          </button>
                        ))}
                      </div>
                    </div>
                  )}

                  {messages.map((m, i) => (
                    <div
                      key={i}
                      className={cn(
                        "flex w-full",
                        m.role === "user" ? "justify-end" : "justify-start",
                      )}
                    >
                      <div
                        className={cn(
                          "max-w-[85%] rounded-2xl px-4 py-3 shadow-sm",
                          m.role === "user"
                            ? "rounded-br-md bg-gradient-to-br from-teal-600 to-indigo-600 text-white"
                            : "rounded-bl-md border border-border bg-card",
                        )}
                      >
                        {m.role === "assistant" ? (
                          <>
                            <p className="mb-1.5 flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-[0.16em] text-teal-600">
                              <Bot className="size-3.5" /> One AI
                            </p>
                            <Markdown content={m.content} />
                          </>
                        ) : (
                          <p className="whitespace-pre-wrap text-[14px] leading-6">
                            {m.content}
                          </p>
                        )}
                      </div>
                    </div>
                  ))}

                  {isGenerating && (
                    <div className="flex justify-start">
                      <div className="flex items-center gap-2 rounded-2xl rounded-bl-md border border-border bg-card px-4 py-3 shadow-sm">
                        <Loader2 className="size-4 animate-spin text-teal-600" />
                        <span className="text-[13px] font-medium text-muted-foreground">                              One AI is explaining…
                        </span>
                      </div>
                    </div>
                  )}
                </>
              )}
            </div>
          </div>

          {/* composer */}
          <div className="border-t border-border/70 p-3 sm:p-4">
            <div className="mx-auto flex max-w-3xl items-end gap-2">
              <Textarea
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter" && !e.shiftKey) {
                    e.preventDefault();
                    handleSend();
                  }
                }}
                placeholder={
                  activeTopic
                    ? `Ask about ${activeTopic.name}…`
                    : "Pick a topic from the syllabus first"
                }
                disabled={!activeTopic || isGenerating}
                rows={1}
                className="max-h-32 min-h-11 flex-1 rounded-xl bg-background"
              />
              <Button
                size="icon"
                className="h-11 w-11 shrink-0 rounded-xl bg-gradient-to-br from-teal-600 to-indigo-600 hover:from-teal-600/90 hover:to-indigo-600/90"
                disabled={!activeTopic || isGenerating || !input.trim()}
                onClick={() => handleSend()}
                aria-label="Send message"
              >
                {isGenerating ? (
                  <Loader2 className="size-4 animate-spin" />
                ) : (
                  <Send className="size-4" />
                )}
              </Button>
            </div>
            <p className="mx-auto mt-2 max-w-3xl px-1 text-center text-[10px] text-muted-foreground sm:text-left">
              {user?.name ?? "You"} · {streamDef.name} · {activeSubject.name}{" "}
              {activeChapter ? `· Class ${activeChapter.class}` : ""} — AI can
              make mistakes; verify against NCERT.
            </p>
          </div>
          </section>
          )}
        </div>
      </div>
      </PageTransition>
    </AppShell>
  );
}
