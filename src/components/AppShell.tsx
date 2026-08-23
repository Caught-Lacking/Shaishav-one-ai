import { useCallback, useEffect, useMemo, useState, type ReactNode } from "react";
import {
  NavLink,
  useLocation,
  useNavigate,
  useSearchParams,
} from "react-router";
import {
  ArrowLeftRight,
  BookOpen,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  Flag,
  LayoutDashboard,
  Menu,
  MessagesSquare,
  X,
} from "lucide-react";
import { useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { BrandMark } from "@/components/Brand";
import { getIcon } from "@/components/tool-icons";
import { useAuth } from "@/hooks/use-auth";
import { useClassLevel } from "@/hooks/use-class-level";
import { cn } from "@/lib/utils";
import {
  getStream,
  getStreamSubjects,
  streams,
  type StreamId,
} from "@/lib/curriculum";
import { TOOL_DEFS, toolsBySection, type ToolDef } from "@/lib/tools";
import { toast } from "sonner";

const SIDEBAR_KEY = "shaishav.sidebar";

export function AppShell({
  stream,
  children,
}: {
  stream: StreamId;
  children: ReactNode;
}) {
  const { user } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [searchParams] = useSearchParams();
  const setStream = useMutation(api.users.setStream);
  const { classLevel, setClassLevel } = useClassLevel();

  const [collapsed, setCollapsed] = useState<boolean>(() => {
    try {
      return localStorage.getItem(SIDEBAR_KEY) === "collapsed";
    } catch {
      return false;
    }
  });
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    try {
      localStorage.setItem(SIDEBAR_KEY, collapsed ? "collapsed" : "open");
    } catch {
      // ignore
    }
  }, [collapsed]);

  useEffect(() => {
    setMobileOpen(false);
  }, [location.pathname, location.search]);

  const streamDef = getStream(stream);
  const subjectDefs = getStreamSubjects(stream);
  const name = user?.name ?? user?.email?.split("@")[0] ?? "Student";
  const currentSubjectId = searchParams.get("subject");

  const pageTitle = useMemo(() => {
    if (location.pathname === "/dashboard") return "Dashboard";
    if (location.pathname === "/study") return "AI Tutor";
    if (location.pathname.startsWith("/tool/")) {
      const id = location.pathname.split("/")[2];
      const def = TOOL_DEFS.find((t) => t.id === id);
      return def?.label ?? "Tools";
    }
    return "One AI";
  }, [location.pathname]);

  const handleSwitchStream = async (id: StreamId) => {
    if (id === stream) return;
    await setStream({ stream: id });
    toast.success(`Switched to ${streams[id].name} prep`);
    navigate("/dashboard");
  };

  const toolLinkClass = (active: boolean, collapsedSide: boolean) =>
    cn(
      "group flex items-center gap-2.5 rounded-lg text-[13px] font-medium transition-colors",
      collapsedSide ? "justify-center px-2 py-2.5" : "px-2.5 py-2",
      active
        ? "bg-violet-100/80 text-violet-800"
        : "text-muted-foreground hover:bg-accent hover:text-foreground",
    );

  const sectionLabel = (label: string, collapsedSide: boolean) =>
    collapsedSide ? (
      <span className="mx-auto block h-px w-6 bg-border" />
    ) : (
      <p className="px-2 text-[10px] font-bold uppercase tracking-[0.18em] text-muted-foreground/80">
        {label}
      </p>
    );

  const renderToolItem = (t: ToolDef, collapsedSide: boolean) => {
    const Icon = getIcon(t.icon);
    const active = location.pathname === `/tool/${t.id}`;
    return (
      <NavLink
        key={t.id}
        to={`/tool/${t.id}`}
        title={collapsedSide ? t.label : undefined}
        className={toolLinkClass(active, collapsedSide)}
      >
        <Icon
          className={cn(
            "size-[17px] shrink-0",
            active ? "text-violet-700" : "text-muted-foreground group-hover:text-foreground",
          )}
        />
        {!collapsedSide && <span className="truncate">{t.label}</span>}
      </NavLink>
    );
  };

  const sidebar = (
    <div
      className={cn(
        "flex h-full flex-col bg-card/80 backdrop-blur transition-[width] duration-200",
        collapsed ? "w-[68px]" : "w-[248px]",
      )}
    >
      {/* profile header */}
      <div
        className={cn(
          "flex items-center gap-2.5 border-b border-border/70 px-3 py-4",
          collapsed && "justify-center px-2",
        )}
      >
        <BrandMark size="sm" />
        {!collapsed && (
          <div className="min-w-0">
            <p className="truncate text-[13.5px] font-bold leading-tight">
              One AI
            </p>
            <p className="truncate text-[11px] text-muted-foreground">
              {streamDef.name} · Class {classLevel}
            </p>
          </div>
        )}
      </div>

      <div className="min-h-0 flex-1 overflow-y-auto px-2.5 py-3">
        {/* HOME */}
        <div className={cn("space-y-1", collapsed && "flex flex-col items-center gap-1")}>
          {sectionLabel("Home", collapsed)}
          <NavLink
            to="/dashboard"
            title={collapsed ? "Dashboard" : undefined}
            className={toolLinkClass(location.pathname === "/dashboard", collapsed)}
          >
            <LayoutDashboard className={cn("size-[17px] shrink-0", location.pathname === "/dashboard" ? "text-violet-700" : "text-muted-foreground")} />
            {!collapsed && <span>Dashboard</span>}
          </NavLink>
          <NavLink
            to="/study"
            title={collapsed ? "AI Tutor" : undefined}
            className={toolLinkClass(location.pathname === "/study", collapsed)}
          >
            <MessagesSquare className={cn("size-[17px] shrink-0", location.pathname === "/study" ? "text-violet-700" : "text-muted-foreground")} />
            {!collapsed && <span>AI Tutor</span>}
          </NavLink>
        </div>

        {/* SUBJECTS */}
        <div className={cn("mt-5 space-y-1", collapsed && "flex flex-col items-center gap-1")}>
          {sectionLabel("Subjects", collapsed)}
          {subjectDefs.map((s) => {
            const Icon = getIcon(s.id);
            const active =
              location.pathname === "/study" &&
              (currentSubjectId === s.id ||
                (!currentSubjectId && s.id === subjectDefs[0].id));
            return (
              <NavLink
                key={s.id}
                to={`/study?subject=${s.id}`}
                title={collapsed ? s.name : undefined}
                className={toolLinkClass(active, collapsed)}
              >
                <Icon
                  className={cn(
                    "size-[17px] shrink-0",
                    active ? s.palette.text : "text-muted-foreground",
                  )}
                />
                {!collapsed && <span className="truncate">{s.name}</span>}
              </NavLink>
            );
          })}
        </div>

        {/* STUDY TOOLS */}
        <div className={cn("mt-5 space-y-1", collapsed && "flex flex-col items-center gap-1")}>
          {sectionLabel("Study Tools", collapsed)}
          {toolsBySection("study-tools").map((t) => renderToolItem(t, collapsed))}
        </div>

        {/* AI TOOLS */}
        <div className={cn("mt-5 space-y-1", collapsed && "flex flex-col items-center gap-1")}>
          {sectionLabel("AI Tools", collapsed)}
          {toolsBySection("ai-tools").map((t) => renderToolItem(t, collapsed))}
        </div>

        {/* PRODUCTIVITY */}
        <div className={cn("mt-5 space-y-1", collapsed && "flex flex-col items-center gap-1")}>
          {sectionLabel("Productivity", collapsed)}
          {toolsBySection("productivity").map((t) => renderToolItem(t, collapsed))}
        </div>
      </div>

      {/* bottom: track switch + collapse */}
      <div className="space-y-2 border-t border-border/70 p-2.5">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <button
              type="button"
              className={cn(
                "flex w-full cursor-pointer items-center gap-2 rounded-lg bg-violet-100/70 px-2.5 py-2 text-left text-[12.5px] font-semibold text-violet-800 transition-colors hover:bg-violet-100",
                collapsed && "justify-center px-2",
              )}
              title={collapsed ? `${streamDef.name} Track · Switch` : undefined}
            >
              <ArrowLeftRight className="size-4 shrink-0" />
              {!collapsed && (
                <span className="flex-1 truncate">
                  {streamDef.name} Track · Switch
                </span>
              )}
              {!collapsed && <ChevronDown className="size-3.5 opacity-60" />}
            </button>
          </DropdownMenuTrigger>
          <DropdownMenuContent side="top" align="start" className="w-52">
            <DropdownMenuLabel className="text-xs">Switch your stream</DropdownMenuLabel>
            <DropdownMenuSeparator />
            {(["neet", "jee"] as StreamId[]).map((id) => (
              <DropdownMenuItem
                key={id}
                onClick={() => handleSwitchStream(id)}
                className={cn("cursor-pointer", id === stream && "bg-accent font-medium")}
              >
                <span
                  className={cn(
                    "size-2 rounded-full",
                    id === "neet" ? "bg-teal-500" : "bg-indigo-500",
                  )}
                />
                <span className="font-semibold">{streams[id].name}</span>
                <span className="ml-auto text-[11px] text-muted-foreground">
                  {streams[id].tagline}
                </span>
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>

        <button
          type="button"
          onClick={() => setCollapsed((v) => !v)}
          className={cn(
            "flex w-full cursor-pointer items-center gap-2 rounded-lg px-2.5 py-1.5 text-[12px] font-medium text-muted-foreground transition-colors hover:bg-accent hover:text-foreground",
            collapsed && "justify-center px-2",
          )}
        >
          {collapsed ? (
            <ChevronRight className="size-4" />
          ) : (
            <>
              <ChevronLeft className="size-4" />
              <span>Collapse</span>
            </>
          )}
        </button>
      </div>
    </div>
  );

  return (
    <div className="flex min-h-screen">
      {/* desktop sidebar */}
      <aside className="sticky top-0 hidden h-dvh shrink-0 border-r border-border/70 lg:block">
        {sidebar}
      </aside>

      {/* mobile sidebar */}
      {mobileOpen && (
        <div className="fixed inset-0 z-[80] lg:hidden">
          <button
            type="button"
            aria-label="Close menu"
            className="absolute inset-0 cursor-pointer bg-black/30 backdrop-blur-sm"
            onClick={() => setMobileOpen(false)}
          />
          <div className="relative h-full w-[272px] shadow-2xl">
            <button
              type="button"
              onClick={() => setMobileOpen(false)}
              className="absolute right-2 top-3 z-10 flex size-8 cursor-pointer items-center justify-center rounded-full bg-muted text-muted-foreground"
              aria-label="Close"
            >
              <X className="size-4" />
            </button>
            {sidebar}
          </div>
        </div>
      )}

      {/* main column */}
      <div className="flex min-w-0 flex-1 flex-col">
        {/* top bar */}
        <header className="sticky top-0 z-40 border-b border-border/70 bg-background/85 backdrop-blur">
          <div className="flex h-16 items-center gap-3 px-4 sm:px-6">
            <button
              type="button"
              onClick={() => setMobileOpen(true)}
              className="flex size-9 cursor-pointer items-center justify-center rounded-lg border border-border text-muted-foreground lg:hidden"
              aria-label="Open menu"
            >
              <Menu className="size-4" />
            </button>

            <div className="min-w-0">
              <p className="truncate text-[15px] font-bold leading-tight">
                {pageTitle}
              </p>
              <p className="hidden truncate text-[11px] text-muted-foreground sm:block">
                {streamDef.name} · Class {classLevel} · {streamDef.tagline} prep
              </p>
            </div>

            <div className="ml-auto flex items-center gap-2">
              {/* class switcher */}
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <button
                    type="button"
                    className="flex cursor-pointer items-center gap-1.5 rounded-full border border-border bg-card px-3 py-1.5 text-xs font-semibold transition-colors hover:bg-accent"
                  >
                    <Flag className="size-3.5 text-muted-foreground" />
                    Class {classLevel}
                    <ChevronDown className="size-3 opacity-60" />
                  </button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-40">
                  {([11, 12] as const).map((l) => (
                    <DropdownMenuItem
                      key={l}
                      onClick={() => {
                        setClassLevel(l);
                        toast.success(`Showing Class ${l} content`);
                      }}
                      className={cn("cursor-pointer", classLevel === l && "bg-accent font-medium")}
                    >
                      Class {l}
                    </DropdownMenuItem>
                  ))}
                </DropdownMenuContent>
              </DropdownMenu>

              {/* user menu */}
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <button
                    type="button"
                    className="flex cursor-pointer items-center gap-2 rounded-full border border-border bg-card py-1 pl-1 pr-2.5 transition-colors hover:bg-accent"
                  >
                    <Avatar className="size-7">
                      <AvatarFallback className="bg-gradient-to-br from-violet-500 to-indigo-500 text-[11px] font-bold text-white">
                        {name.slice(0, 2).toUpperCase()}
                      </AvatarFallback>
                    </Avatar>
                    <span className="hidden max-w-28 truncate text-xs font-medium sm:block">
                      {name}
                    </span>
                    <ChevronDown className="size-3.5 text-muted-foreground" />
                  </button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-56">
                  <DropdownMenuLabel className="truncate text-xs">
                    {user?.name ?? "Guest student"}
                  </DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem
                    onClick={() => navigate("/study")}
                    className="cursor-pointer"
                  >
                    <BookOpen className="mr-2 size-4" />
                    AI Tutor
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
        </header>

        <main className="flex-1">{children}</main>
      </div>
    </div>
  );
}
