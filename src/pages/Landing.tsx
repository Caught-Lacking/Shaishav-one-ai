import { motion } from "framer-motion";
import {
  ArrowRight,
  Bot,
  BookOpenCheck,
  FileQuestion,
  ListTree,
  Sparkles,
  Stethoscope,
  Wrench,
  TrendingUp,
  PenLine,
  Check,
} from "lucide-react";
import { useNavigate } from "react-router";
import { Button } from "@/components/ui/button";
import { Brand, BrandMark } from "@/components/Brand";
import { useAuth } from "@/hooks/use-auth";
import { cn } from "@/lib/utils";
import {
  countStreamChapters,
  countStreamPyqs,
  countStreamTopics,
  getStreamSubjects,
  streams,
  totalPyqs,
  type StreamId,
} from "@/lib/curriculum";

const SUBJECT_ICONS: Record<string, React.ReactNode> = {
  physics: <Wrench className="size-5" />,
  chemistry: <Sparkles className="size-5" />,
  biology: <Stethoscope className="size-5" />,
  maths: <TrendingUp className="size-5" />,
};

function StreamCard({
  streamId,
  onPick,
}: {
  streamId: StreamId;
  onPick: (id: StreamId) => void;
}) {
  const stream = streams[streamId];
  const isNeet = streamId === "neet";
  const subjectDefs = getStreamSubjects(streamId);

  return (
    <motion.button
      type="button"
      whileHover={{ y: -6, rotate: isNeet ? -0.4 : 0.4 }}
      transition={{ type: "spring", stiffness: 260, damping: 20 }}
      onClick={() => onPick(streamId)}
      className={cn(
        "group relative flex w-full cursor-pointer flex-col overflow-hidden rounded-2xl border-2 bg-card text-left shadow-[0_2px_6px_rgba(40,30,10,0.06),0_18px_40px_-18px_rgba(40,30,10,0.25)] transition-colors",
        isNeet
          ? "border-teal-200 hover:border-teal-400"
          : "border-indigo-200 hover:border-indigo-400",
      )}
    >
      {/* top ribbon */}
      <div
        className={cn(
          "flex items-center justify-between px-6 py-4 text-white",
          stream.palette.gradient,
        )}
      >
        <div>
          <p className="font-display text-2xl font-bold tracking-tight">
            {stream.name}
          </p>
          <p className="text-xs font-medium uppercase tracking-[0.18em] text-white/85">
            {stream.tagline} · Class 11 & 12
          </p>
        </div>
        <div className="flex size-11 items-center justify-center rounded-xl bg-white/20 backdrop-blur">
          {isNeet ? (
            <Stethoscope className="size-6" />
          ) : (
            <Wrench className="size-6" />
          )}
        </div>
      </div>

      {/* body on ruled paper */}
      <div className="ruled relative flex-1 px-6 pb-6 pt-4">
        <p className="text-[13px] leading-5 text-muted-foreground">
          {stream.description}
        </p>

        <div className="mt-4 flex flex-wrap gap-2">
          {subjectDefs.map((s) => (
            <span
              key={s.id}
              className={cn(
                "inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-semibold",
                s.palette.chip,
              )}
            >
              {SUBJECT_ICONS[s.id]}
              {s.name}
            </span>
          ))}
        </div>

        <div className="mt-5 flex items-center gap-4 text-xs font-medium text-muted-foreground">
          <span>
            <span className="font-bold text-foreground">
              {countStreamChapters(streamId)}
            </span>{" "}
            chapters
          </span>
          <span>
            <span className="font-bold text-foreground">
              {countStreamTopics(streamId)}
            </span>{" "}
            topics
          </span>
          <span>
            <span className="font-bold text-foreground">
              {countStreamPyqs(streamId)}+
            </span>{" "}
            PYQs
          </span>
        </div>
      </div>

      {/* CTA strip */}
      <div
        className={cn(
          "flex items-center justify-between border-t px-6 py-3.5",
          isNeet ? "border-teal-100 bg-teal-50/70" : "border-indigo-100 bg-indigo-50/70",
        )}
      >
        <span className="text-sm font-semibold text-foreground">
          {isNeet ? "I'm preparing for MBBS / medical" : "I'm preparing for B.Tech / engineering"}
        </span>
        <span
          className={cn(
            "inline-flex items-center gap-1 text-sm font-bold",
            isNeet ? "text-teal-600" : "text-indigo-600",
          )}
        >
          Choose {stream.name}
          <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" />
        </span>
      </div>
    </motion.button>
  );
}

const FEATURES = [
  {
    icon: BookOpenCheck,
    color: "text-teal-600 bg-teal-100",
    title: "100% NCERT coverage",
    body: "Every chapter of the NCERT syllabus for Class 11 & 12 — organised, searchable and always in your stream's order.",
  },
  {
    icon: FileQuestion,
    color: "text-rose-600 bg-rose-100",
    title: "PYQ-mapped topics",
    body: "Each topic shows how many NEET/JEE previous-year questions are mapped to it, so you know exactly where marks hide.",
  },
  {
    icon: Bot,
    color: "text-indigo-600 bg-indigo-100",
    title: "AI tutor in chat",
    body: "Ask Shaishav anything — concepts, derivations, numericals or doubts. It explains like a patient, exam-smart teacher.",
  },
  {
    icon: ListTree,
    color: "text-emerald-600 bg-emerald-100",
    title: "Chapter & topic selection",
    body: "Drill from stream → subject → chapter → topic. Your study notebook is personalised to your stream from day one.",
  },
  {
    icon: PenLine,
    color: "text-amber-600 bg-amber-100",
    title: "Notebook-style notes",
    body: "Every chat is saved like a page in your notebook — revisit, continue and build your own revision notes.",
  },
  {
    icon: TrendingUp,
    color: "text-violet-600 bg-violet-100",
    title: "Progress tracking",
    body: "Tick topics as done, watch chapter coverage grow, and keep every conversation in your history.",
  },
];

const STEPS = [
  {
    n: "1",
    color: "bg-teal-500",
    title: "Choose your stream",
    body: "Pick NEET or JEE — everything from subjects to AI explanations adapts to your goal.",
  },
  {
    n: "2",
    color: "bg-indigo-500",
    title: "Pick chapter & topic",
    body: "Browse the full NCERT syllabus, see PYQ weight, and open a fresh notebook page for any topic.",
  },
  {
    n: "3",
    color: "bg-rose-500",
    title: "Ask, learn, revise",
    body: "Chat with the AI tutor, tick the topic as done, and keep going — your notes stay saved.",
  },
];

export default function Landing() {
  const { isAuthenticated, isLoading } = useAuth();
  const navigate = useNavigate();

  const handlePickStream = (id: StreamId) => {
    if (isAuthenticated) {
      navigate(`/dashboard?stream=${id}`);
    } else {
      navigate(
        `/auth?returnTo=${encodeURIComponent(`/dashboard?stream=${id}`)}`,
      );
    }
  };

  return (
    <div className="min-h-screen">
      {/* nav */}
      <header className="sticky top-0 z-40 border-b border-border/70 bg-background/85 backdrop-blur">
        <div className="mx-auto flex h-16 w-full max-w-6xl items-center justify-between px-4 sm:px-6">
          <Brand markSize="sm" />
          <div className="flex items-center gap-2">
            {isAuthenticated ? (
              <Button onClick={() => navigate("/dashboard")}>
                Open dashboard
                <ArrowRight className="size-4" />
              </Button>
            ) : (
              <Button variant="outline" onClick={() => navigate("/auth")}>
                Sign in
              </Button>
            )}
          </div>
        </div>
      </header>

      {/* hero */}
      <section className="relative overflow-hidden">
        <div className="dotted-paper pointer-events-none absolute inset-0 opacity-60" />
        <div className="pointer-events-none absolute -right-24 -top-24 size-72 rounded-full bg-teal-200/40 blur-3xl" />
        <div className="pointer-events-none absolute -left-24 top-40 size-72 rounded-full bg-rose-200/40 blur-3xl" />

        <div className="relative mx-auto grid w-full max-w-6xl gap-12 px-4 py-16 sm:px-6 lg:grid-cols-[1.1fr_0.9fr] lg:items-center lg:py-24">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full border border-teal-200 bg-teal-50 px-3 py-1 text-xs font-semibold text-teal-700">
              <Sparkles className="size-3.5" />
              Your personal AI study notebook
            </div>
            <h1 className="mt-5 font-display text-4xl font-bold leading-[1.08] tracking-tight sm:text-5xl lg:text-6xl">
              Crack{" "}
              <span className="marker">NEET & JEE</span> with your
              <span className="scribble"> NCERT-first</span> AI study buddy
            </h1>
            <p className="mt-5 max-w-xl text-base leading-7 text-muted-foreground sm:text-lg">
              Shaishav One AI turns the full Class 11 & 12 NCERT syllabus into
              your personal notebook — stream-wise chapters, topic-level PYQ
              mapping, and an AI tutor that explains everything in chat.
            </p>
            <div className="mt-7 flex flex-wrap items-center gap-3">
              <Button
                size="lg"
                className="gap-2 rounded-full px-6 text-[15px] font-semibold shadow-md shadow-teal-600/20"
                onClick={() => handlePickStream("neet")}
              >
                Start with your stream
                <ArrowRight className="size-4" />
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="rounded-full px-6 text-[15px]"
                onClick={() => navigate("/auth")}
              >
                Sign in
              </Button>
            </div>
            <div className="mt-8 flex flex-wrap gap-x-6 gap-y-2 text-sm text-muted-foreground">
              <span className="inline-flex items-center gap-1.5">
                <Check className="size-4 text-teal-600" />
                <strong className="text-foreground">{countStreamChapters("neet")}+</strong>{" "}
                NCERT chapters
              </span>
              <span className="inline-flex items-center gap-1.5">
                <Check className="size-4 text-rose-500" />
                <strong className="text-foreground">{totalPyqs()}+</strong>{" "}
                PYQs mapped
              </span>
              <span className="inline-flex items-center gap-1.5">
                <Check className="size-4 text-indigo-500" />
                <strong className="text-foreground">24×7</strong> AI tutor
              </span>
            </div>
          </div>

          {/* hero notebook mock */}
          <div className="relative hidden lg:block">
            <div className="notebook-page relative mx-auto w-full max-w-md rounded-lg border border-border/70 p-6 shadow-[0_20px_50px_-20px_rgba(40,30,10,0.35)]">
              <div className="flex items-center justify-between border-b border-dashed border-border pb-3">
                <p className="font-display text-sm font-bold">Physics · Class 12</p>
                <span className="rounded-full bg-indigo-100 px-2 py-0.5 text-[10px] font-bold text-indigo-700">
                  Chapter 1
                </span>
              </div>
              <p className="mt-3 font-display text-xl font-bold leading-snug">
                Electric Charges and Fields
              </p>
              <p className="mt-1 text-xs text-muted-foreground">
                Topic: Coulomb's law · PYQs: 5
              </p>
              <div className="mt-3 space-y-3 text-[13px] leading-5 text-foreground/80">
                <p className="pl-6">
                  <span className="marker">Key idea:</span> force between two
                  charges is{" "}
                  <span className="rounded bg-muted px-1 font-mono text-[12px]">
                    F = k·q₁q₂/r²
                  </span>
                </p>
                <p className="pl-6">
                  <span className="pencil-note">
                    ↑ NEET 2023 & JEE Main 2022 asked exactly this — watch the
                    sign convention!
                  </span>
                </p>
                <p className="pl-6">
                  <span className="inline-block rounded bg-indigo-50 px-1.5 text-indigo-700">
                    ✔ done — add to revision notes
                  </span>
                </p>
              </div>
              <div className="mt-4 rounded-lg border border-amber-200 bg-amber-50 p-3 text-[12px] leading-5">
                <span className="font-semibold text-amber-800">✦ Shaishav:</span>{" "}
                <span className="text-amber-900/80">
                  Think of the electric field as the "reach" of a charge — the
                  closer you stand, the harder it pushes you…
                </span>
              </div>
            </div>
            <div className="sticky-note absolute -left-8 top-10 bg-rose-100 px-4 py-3 text-xs font-semibold text-rose-800">
              AI explains everything!
            </div>
            <div className="sticky-note absolute -bottom-4 right-6 bg-amber-100 px-4 py-3 text-xs font-semibold text-amber-800">
              {totalPyqs()}+ PYQs mapped
            </div>
          </div>
        </div>

        {/* coloured pencils */}
        <div className="relative mx-auto flex w-full max-w-6xl justify-center gap-1 px-4 pb-2">
          {[
            "bg-rose-400",
            "bg-amber-400",
            "bg-emerald-400",
            "bg-teal-400",
            "bg-indigo-400",
            "bg-violet-400",
          ].map((c, i) => (
            <span
              key={i}
              className={cn(
                "h-9 w-5 rounded-t-md rounded-b-sm shadow-sm",
                c,
                i % 2 === 0 ? "rotate-1" : "-rotate-1",
              )}
            />
          ))}
        </div>
      </section>

      {/* stream selection — the first page decision */}
      <section id="choose-stream" className="py-16 sm:py-20">
        <div className="mx-auto w-full max-w-6xl px-4 sm:px-6">
          <div className="mx-auto max-w-2xl text-center">
            <p className="text-xs font-bold uppercase tracking-[0.22em] text-teal-600">
              Step one · the most important choice
            </p>
            <h2 className="mt-3 font-display text-3xl font-bold tracking-tight sm:text-4xl">
              Pick your stream to personalise everything
            </h2>
            <p className="mt-3 text-sm leading-6 text-muted-foreground sm:text-base">
              Subjects, chapters, PYQs and AI explanations — all tailored to
              your goal from the very first page.
            </p>
          </div>

          <div className="mt-10 grid gap-6 md:grid-cols-2">
            <StreamCard streamId="neet" onPick={handlePickStream} />
            <StreamCard streamId="jee" onPick={handlePickStream} />
          </div>

          {isLoading ? null : isAuthenticated ? (
            <p className="mt-6 text-center text-sm text-muted-foreground">
              Signed in?{" "}
              <button
                type="button"
                onClick={() => navigate("/study")}
                className="cursor-pointer font-semibold text-teal-600 underline-offset-4 hover:underline"
              >
                Jump straight into your study notebook →
              </button>
            </p>
          ) : (
            <p className="mt-6 text-center text-sm text-muted-foreground">
              Already have an account?{" "}
              <button
                type="button"
                onClick={() => navigate("/auth")}
                className="cursor-pointer font-semibold text-teal-600 underline-offset-4 hover:underline"
              >
                Sign in →
              </button>
            </p>
          )}
        </div>
      </section>

      {/* features */}
      <section className="border-y border-border/70 bg-card/60 py-16 sm:py-20">
        <div className="mx-auto w-full max-w-6xl px-4 sm:px-6">
          <div className="mx-auto max-w-2xl text-center">
            <p className="text-xs font-bold uppercase tracking-[0.22em] text-rose-500">
              Everything in one notebook
            </p>
            <h2 className="mt-3 font-display text-3xl font-bold tracking-tight sm:text-4xl">
              Built like a notebook.{" "}
              <span className="marker">Powered like an AI.</span>
            </h2>
          </div>
          <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {FEATURES.map((f, i) => (
              <motion.div
                key={f.title}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.05, duration: 0.4 }}
                className="sheet relative p-6"
              >
                <div
                  className={cn(
                    "flex size-11 items-center justify-center rounded-xl",
                    f.color,
                  )}
                >
                  <f.icon className="size-5" />
                </div>
                <h3 className="mt-4 font-display text-lg font-bold">{f.title}</h3>
                <p className="mt-1.5 text-sm leading-6 text-muted-foreground">
                  {f.body}
                </p>
                <span className="absolute right-5 top-5 text-2xl font-display font-bold text-border select-none">
                  {String(i + 1).padStart(2, "0")}
                </span>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* how it works */}
      <section className="py-16 sm:py-20">
        <div className="mx-auto w-full max-w-6xl px-4 sm:px-6">
          <div className="mx-auto max-w-2xl text-center">
            <p className="text-xs font-bold uppercase tracking-[0.22em] text-indigo-500">
              Three steps
            </p>
            <h2 className="mt-3 font-display text-3xl font-bold tracking-tight sm:text-4xl">
              From stream to full marks
            </h2>
          </div>
          <div className="mt-12 grid gap-6 md:grid-cols-3">
            {STEPS.map((s, i) => (
              <div key={s.n} className="relative">
                <div className="flex items-center gap-3">
                  <span
                    className={cn(
                      "flex size-9 items-center justify-center rounded-full font-display text-sm font-bold text-white shadow-sm",
                      s.color,
                    )}
                  >
                    {s.n}
                  </span>
                  <div className="dotted-rule flex-1" />
                </div>
                <h3 className="mt-4 font-display text-lg font-bold">{s.title}</h3>
                <p className="mt-1.5 text-sm leading-6 text-muted-foreground">
                  {s.body}
                </p>
                {i < STEPS.length - 1 && (
                  <ArrowRight className="absolute -right-4 top-1 hidden size-5 text-border md:block" />
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="pb-20">
        <div className="mx-auto w-full max-w-6xl px-4 sm:px-6">
          <div
            className={cn(
              "relative overflow-hidden rounded-2xl bg-gradient-to-br from-teal-600 via-indigo-600 to-rose-500 px-6 py-14 text-center text-white shadow-xl sm:px-12",
            )}
          >
            <div className="dotted-paper pointer-events-none absolute inset-0 opacity-20" />
            <div className="relative">
              <BrandMark size="lg" className="mx-auto border-2 border-white/40" />
              <h2 className="mx-auto mt-5 max-w-2xl font-display text-3xl font-bold tracking-tight sm:text-4xl">
                Your NEET / JEE notebook is one click away
              </h2>
              <p className="mx-auto mt-3 max-w-xl text-sm leading-6 text-white/85 sm:text-base">
                Sign in free, choose your stream, and start asking the AI tutor
                anything from the NCERT syllabus.
              </p>
              <div className="mt-7 flex flex-wrap items-center justify-center gap-3">
                <Button
                  size="lg"
                  className="rounded-full bg-white px-7 text-[15px] font-bold text-indigo-700 shadow-md hover:bg-white/90"
                  onClick={() =>
                    isAuthenticated
                      ? navigate("/dashboard")
                      : navigate("/auth")
                  }
                >
                  Get started free
                  <ArrowRight className="size-4" />
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* footer */}
      <footer className="border-t border-border/70 py-8">
        <div className="mx-auto flex w-full max-w-6xl flex-col items-center justify-between gap-4 px-4 sm:flex-row sm:px-6">
          <Brand markSize="sm" />
          <p className="text-xs text-muted-foreground">
            NCERT-first AI study notebook for Class 11 & 12 · NEET & JEE
          </p>
        </div>
      </footer>
    </div>
  );
}
