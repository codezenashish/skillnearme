"use client";

import React from "react";
import { Wallet, ArrowUpRight, CheckCircle2, Building2 } from "lucide-react";
import { Button } from "@/components/ui";

export function QuickPayoutWidget() {
  return (
    <div id="payouts" className="rounded-2xl border border-border bg-card p-5 shadow-2xs space-y-4 scroll-mt-16">
      {/* Header */}
      <div className="flex items-center justify-between border-b border-border/60 pb-3">
        <div className="flex items-center gap-2">
          <Wallet className="size-5 text-primary" />
          <h3 className="subheading font-bold">
            Payout Account
          </h3>
        </div>
        <span className="flex items-center gap-1 font-bold text-emerald-600 dark:text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded-full small-text">
          <CheckCircle2 className="size-3" />
          Active
        </span>
      </div>

      {/* Account Info */}
      <div className="rounded-xl bg-muted/40 p-3.5 border border-border/60 space-y-2">
        <div className="flex items-center justify-between small-text">
          <span className="text-muted-foreground flex items-center gap-1.5 font-medium">
            <Building2 className="size-3.5 text-primary" />
            HDFC Bank (Primary)
          </span>
          <span className="font-mono font-semibold text-foreground">•••• 8901</span>
        </div>

        <div className="pt-2 border-t border-border/40 flex items-baseline justify-between">
          <div>
            <p className="small-text">Next Scheduled Payout</p>
            <p className="subheading font-extrabold text-foreground">₹42,500</p>
          </div>
          <span className="small-text font-semibold text-primary">24th Oct 2025</span>
        </div>
      </div>

      {/* Button using components/ui */}
      <Button
        variant="outline"
        size="sm"
        className="w-full gap-1.5 small-text font-semibold border-border text-foreground hover:bg-muted"
      >
        <span>View Statements & Tax Invoices</span>
        <ArrowUpRight className="size-3.5 text-muted-foreground" />
      </Button>
    </div>
  );
}
