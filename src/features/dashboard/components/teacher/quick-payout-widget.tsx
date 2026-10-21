"use client";

import React from "react";
import { Wallet, ArrowUpRight, CheckCircle2, Building2 } from "lucide-react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardFooter,
  Button,
} from "@/components/ui";

export function QuickPayoutWidget() {
  return (
    <Card id="payouts" className="scroll-mt-16">
      {/* Header */}
      <CardHeader className="flex flex-row items-center justify-between border-b border-border/60 pb-4">
        <div className="flex items-center gap-2">
          <Wallet className="size-5 text-primary" />
          <CardTitle className="text-base font-semibold">
            Payout Account
          </CardTitle>
        </div>
        <span className="flex items-center gap-1 text-xs font-medium text-emerald-600 dark:text-emerald-400 bg-emerald-500/10 px-2.5 py-0.5 rounded-full">
          <CheckCircle2 className="size-3" />
          Active
        </span>
      </CardHeader>

      {/* Account Info Content */}
      <CardContent className="space-y-3">
        <div className="rounded-xl bg-muted/40 p-4 border border-border/60 space-y-2.5">
          <div className="flex items-center justify-between text-xs">
            <span className="text-muted-foreground flex items-center gap-1.5 font-medium">
              <Building2 className="size-3.5 text-primary" />
              HDFC Bank (Primary)
            </span>
            <span className="font-mono font-medium text-foreground">•••• 8901</span>
          </div>

          <div className="pt-2 border-t border-border/40 flex items-baseline justify-between">
            <div>
              <p className="text-xs text-muted-foreground">Next Scheduled Payout</p>
              <p className="text-2xl font-bold tracking-tight text-foreground mt-0.5">₹42,500</p>
            </div>
            <span className="text-xs font-medium text-primary">24th Oct 2025</span>
          </div>
        </div>
      </CardContent>

      {/* Footer Action */}
      <CardFooter className="pt-0">
        <Button
          variant="outline"
          size="default"
          className="w-full h-10 gap-2 rounded-lg text-xs sm:text-sm font-medium border-border text-foreground hover:bg-muted/60"
        >
          <span>View Statements & Tax Invoices</span>
          <ArrowUpRight className="size-3.5 text-muted-foreground" />
        </Button>
      </CardFooter>
    </Card>
  );
}
