import { useEffect, useMemo, useRef, useState } from "react";
import { useSearchParams } from "react-router";
import { useAction, useMutation, useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import type { Id } from "@/convex/_generated/dataModel";
import { AppShell } from "@/components/AppShell";
import { StreamPicker } from "@/components/StreamPicker";
import { Markdown } from "@/components/Markdown";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { ScrollArea } from "@/components/ui/scroll-area";
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
  Loader2,
  Menu,
  MessageSquareText,
  Send,
  Sparkles,
  Trash2,
  X,
} from "lucide-react";
import { toast } from "sonner";

const SUBJECT_ICONS: Record<string, React.ReactNode> = {
  physics: <FlaskConical className="size-4" />,
  chemistry: <Sparkles className="size-4" />,
  biology: <BookOpen className="size-4" />,
  maths: <Layers className="size-4" />,
};

const SUGGESTIONS = [
  "Explain this topic simply, like I'm hearing it for the first time",
  "Give me a 5-question PYQ drill on this topic",
  "Summarise this topic into revision notes",
  "Where do students usually go wrong here?",
];

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
  const [expandedChapters, setExpandedChapters] = useState<Set<string>>(
    () => new Set(chapterId ? [chapterId] : []),
  );
  const [isGenerating, setIsGenerating] = useState(false);
  const [input, setInput] = useState("");
  const [activeChatId, setActiveChatId] = useState<Id<"chats"> | null>(null);
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

  const doneMap = useMemo(() => {
    const map = new Map<string, boolean>();
    for (const p of progress ?? []) {
      map.set(`${p.subjectId}|${p.chapterId}|${p.topicId}`, p.done);
    }
    return map;
  }, [progress]);

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
        "Something went wrong while asking Shaishav. Please try again.",
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
      <div className="mx-auto flex w-full max-w-7xl flex-col gap-4 px-4 py-5 sm:px-6 lg:h-[calc(100dvh-6rem)] lg:flex-row">
        {/* ============================ SYLLABUS ============================ */}
        <aside
          className={cn(
            "shrink-0 flex-col gap-4 lg:flex lg:w-[340px]",
            showSyllabus ? "flex" : "hidden",
          )}
        >
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
            <div className="flex items-center justify-between border-b border-border/70 px-4 py-3">
              <p className="text-xs font-bold uppercase tracking-[0.18em] text-muted-foreground">
                NCERT syllabus · Class 11 & 12
              </p>
              <span className="rounded-full bg-muted px-2 py-0.5 text-[10px] font-bold text-muted-foreground">
                {activeSubject.chapters.length} chapters
              </span>
            </div>
            <ScrollArea className="min-h-0 flex-1">
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
                                  {chapter.topics.map((topic) => {
                                    const isActive = topic.id === topicId;
                                    const done = doneMap.get(
                                      `${activeSubject.id}|${chapter.id}|${topic.id}`,
                                    );
                                    return (
                                      <button
                                        key={topic.id}
                                        type="button"
                                        onClick={() =>
                                          selectTopic(
                                            activeSubject.id,
                                            chapter.id,
                                            topic.id,
                                          )
                                        }
                                        className={cn(
                                          "flex w-full cursor-pointer items-center gap-2 px-3 py-2 pl-7 text-left transition-colors",
                                          isActive
                                            ? "bg-teal-100/70"
                                            : "hover:bg-accent/60",
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
                                            isActive
                                              ? "font-semibold text-teal-800"
                                              : "text-foreground/80",
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
                                  })}
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

        {/* ============================= CHAT ============================= */}
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
                Pick a chapter & topic from the syllabus to start
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
                    Choose a subject, expand a chapter, and tap a topic — then
                    chat with the AI tutor about it. Every conversation is
                    saved in your notebook.
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
                              <Bot className="size-3.5" /> Shaishav AI
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
                        <span className="text-[13px] font-medium text-muted-foreground">
                          Shaishav is explaining…
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
      </div>
    </AppShell>
  );
}
