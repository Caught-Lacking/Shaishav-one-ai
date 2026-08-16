import type { ReactNode } from "react";
import { NavLink, useNavigate } from "react-router";
import {
  BookOpen,
  ChevronDown,
  FlaskConical,
  LayoutDashboard,
  LogOut,
  Stethoscope,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Brand } from "@/components/Brand";
import { useAuth } from "@/hooks/use-auth";
import { cn } from "@/lib/utils";
import { getStream, streams, type StreamId } from "@/lib/curriculum";
import { useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";
import { toast } from "sonner";

function navLinkClass({ isActive }: { isActive: boolean }) {
  return cn(
    "flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-sm font-medium transition-colors",
    isActive
      ? "bg-teal-600/10 text-teal-700"
      : "text-muted-foreground hover:bg-accent hover:text-foreground",
  );
}

export function AppShell({
  stream,
  children,
}: {
  stream: StreamId;
  children: ReactNode;
}) {
  const { user, signOut } = useAuth();
  const navigate = useNavigate();
  const setStream = useMutation(api.users.setStream);
  const streamDef = getStream(stream);
  const name = user?.name ?? user?.email?.split("@")[0] ?? "Student";

  const handleSignOut = async () => {
    await signOut();
    navigate("/");
  };

  const handleSwitchStream = async (id: StreamId) => {
    if (id === stream) return;
    await setStream({ stream: id });
    toast.success(`Switched to ${streams[id].name} prep`);
    navigate("/dashboard");
  };

  return (
    <div className="flex min-h-screen flex-col">
      <header className="sticky top-0 z-40 border-b border-border/80 bg-background/85 backdrop-blur">
        <div className="mx-auto flex h-16 w-full max-w-7xl items-center justify-between gap-3 px-4 sm:px-6">
          <div className="flex items-center gap-6">
            <button
              type="button"
              onClick={() => navigate("/")}
              className="cursor-pointer"
              aria-label="Go home"
            >
              <Brand markSize="sm" />
            </button>
            <nav className="hidden items-center gap-1 sm:flex">
              <NavLink to="/dashboard" className={navLinkClass}>
                <LayoutDashboard className="size-4" />
                Dashboard
              </NavLink>
              <NavLink to="/study" className={navLinkClass}>
                <BookOpen className="size-4" />
                Study notebook
              </NavLink>
            </nav>
          </div>

          <div className="flex items-center gap-2">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="outline"
                  size="sm"
                  className="gap-1.5 rounded-full border-2 px-3"
                >
                  <span
                    className={cn(
                      "size-2 rounded-full",
                      stream === "neet" ? "bg-teal-500" : "bg-indigo-500",
                    )}
                  />
                  <span className="font-semibold">{streamDef.name}</span>
                  <ChevronDown className="size-3.5 opacity-60" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56">
                <DropdownMenuLabel className="flex items-center gap-2 text-xs">
                  <Stethoscope className="size-3.5 text-teal-600" />
                  Switch your stream
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                {(["neet", "jee"] as StreamId[]).map((id) => (
                  <DropdownMenuItem
                    key={id}
                    onClick={() => handleSwitchStream(id)}
                    className={cn(
                      "cursor-pointer",
                      id === stream && "bg-accent font-medium",
                    )}
                  >
                    <span
                      className={cn(
                        "size-2 rounded-full",
                        id === "neet" ? "bg-teal-500" : "bg-indigo-500",
                      )}
                    />
                    <span className="font-semibold">{streams[id].name}</span>
                    <span className="ml-1 text-xs text-muted-foreground">
                      {streams[id].tagline}
                    </span>
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <button
                  type="button"
                  className="flex cursor-pointer items-center gap-2 rounded-full border border-border bg-card py-1 pl-1 pr-2.5 transition-colors hover:bg-accent"
                >
                  <Avatar className="size-7">
                    <AvatarFallback className="bg-gradient-to-br from-teal-500 to-indigo-500 text-[11px] font-bold text-white">
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
                <DropdownMenuLabel className="flex items-center gap-2">
                  <FlaskConical className="size-4 text-indigo-500" />
                  <span className="truncate">{user?.email ?? "Guest"}</span>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem
                  onClick={() => navigate("/study")}
                  className="cursor-pointer"
                >
                  <BookOpen className="mr-2 size-4" />
                  Study notebook
                </DropdownMenuItem>
                <DropdownMenuItem
                  onClick={handleSignOut}
                  className="cursor-pointer text-destructive focus:text-destructive"
                >
                  <LogOut className="mr-2 size-4" />
                  Sign out
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>

        {/* mobile nav */}
        <nav className="flex items-center gap-1 border-t border-border/60 px-4 py-1.5 sm:hidden">
          <NavLink to="/dashboard" className={navLinkClass}>
            <LayoutDashboard className="size-4" />
            Dashboard
          </NavLink>
          <NavLink to="/study" className={navLinkClass}>
            <BookOpen className="size-4" />
            Study
          </NavLink>
        </nav>
      </header>

      <main className="flex-1">{children}</main>
    </div>
  );
}
