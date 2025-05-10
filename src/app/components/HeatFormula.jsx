"use client";

import Link from "next/link";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export default function HeatFormula() {
  return (
    <section className="w-full mx-auto max-w-4xl mt-16" id="heat-formula">
      <h2 className="text-4xl font-bold text-foreground mb-6 text-center">
        How We Measure Heat
      </h2>

      <Card className="relative overflow-hidden border border-border/60 shadow-sm ">
        {/* Background tint */}

        <span className="absolute inset-0 -z-10 bg-gradient-to-br from-orange-50 via-white to-transparent" />

        <CardHeader>
          <CardTitle className="text-base font-semibold text-center text-orange-500">
            Heat Index
          </CardTitle>
          <p className="text-sm text-muted-foreground max-w-2xl mx-auto">
            The Heat Index is a custom scoring formula that blends points, true
            shooting percentage, and plus-minus to identify whether a player is
            on fire 🔥, in a slump ❄️, or somewhere in between.
          </p>
        </CardHeader>

        <CardContent className="mt-2">
          <p className="text-sm text-muted-foreground max-w-2xl mx-auto mb-6 text-center">
            You can personalize how much each stat matters — giving you full
            control over what "hot" or "cold" means to you.
          </p>

          <div className="flex justify-center">
            <Link href="/heat-index">
              <Button className="bg-orange-600 hover:bg-orange-700 text-white text-sm">
                Learn More About the Formula
              </Button>
            </Link>
          </div>
        </CardContent>
      </Card>
    </section>
  );
}
