"use client";

import * as React from "react";
import { useTheme } from "next-themes";
import { MorphIcon } from "morphicons/react";
import { Moon, Sun } from "lucide";

import { Button } from ".";

const emptySubscribe = () => () => {};

export function ModeToggle() {
  const { setTheme, resolvedTheme } = useTheme();
  const mounted = React.useSyncExternalStore(
    emptySubscribe,
    () => true,
    () => false,
  );

  if (!mounted) {
    return (
      <div
        className="size-9 rounded-lg border border-border/70 opacity-40"
        aria-hidden="true"
      />
    );
  }

  const isDark = resolvedTheme === "dark";

  const handleToggle = () => {
    setTheme(isDark ? "light" : "dark");
  };

  return (
    <Button
      variant="outline"
      size="icon"
      onClick={handleToggle}
      aria-label={isDark ? "Switch to light theme" : "Switch to dark theme"}
      className="size-9 rounded-lg border-border/70 text-muted-foreground hover:text-foreground cursor-pointer"
    >
      <MorphIcon icon={isDark ? Sun : Moon} size={17} />
    </Button>
  );
}

export default ModeToggle;
