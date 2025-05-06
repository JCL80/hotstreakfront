'use client'

import { useState } from 'react'
import { usePrefs } from "@/hooks/usePrefs"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Slider } from "@/components/ui/slider"
import Link from "next/link"
import { STAT_KEYS, STAT_LABELS } from "@/constants/statKeys"
import type { StatKey } from "@/constants/statKeys"
import { DEFAULT_PREFS } from "@/types/heatIndex"

export default function PreferencesPage() {
  const { prefs, updatePrefs, loading } = usePrefs()
  // New state to track the reset action
  const [resetting, setResetting] = useState(false)

  if (loading) return <div className="p-8">Loading preferences...</div>

  const handleReset = async () => {
    setResetting(true)
    // apply the defaults (this writes localStorage & Supabase)
    await updatePrefs(DEFAULT_PREFS)
    setResetting(false)
  }

  return (
    <div className="min-h-screen bg-background text-foreground p-8">
      <div className="max-w-4xl mx-auto">
        <div className="mb-8">
          <Link href="/">
            <Button variant="outline" className="mb-4">
              ← Back to Home
            </Button>
          </Link>
          <h1 className="text-4xl font-bold mb-4 bg-gradient-to-r from-orange-500 to-red-500 bg-clip-text text-transparent">
            Your Preferences ⚙️
          </h1>
          <p className="text-lg text-muted-foreground">
            Customize how Heat Index is calculated based on recent stats
          </p>
        </div>

        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Stat Weights</CardTitle>
            <CardDescription>
              Adjust how much each stat contributes to the Heat Index
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            {STAT_KEYS.map((key: StatKey) => (
              <div key={key}>
                <p className="mb-2 text-sm text-muted-foreground">
                  {STAT_LABELS[key]}:{' '}
                  <span className="text-orange-500 font-medium">
                    {prefs[key].toFixed(1)}
                  </span>
                </p>
                <Slider
                  value={[prefs[key]]}
                  min={0}
                  max={2}
                  step={0.1}
                  onValueChange={([val]) =>
                    updatePrefs({ [key]: parseFloat(val.toFixed(2)) })
                  }
                />
              </div>
            ))}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Game Window</CardTitle>
            <CardDescription>
              Number of recent games used in calculation (3–10)
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <p className="mb-2 text-sm text-muted-foreground">
              Games Window:{' '}
              <span className="text-orange-500 font-medium">
                {prefs.gamesWindow}
              </span>
            </p>
            <Slider
              value={[prefs.gamesWindow]}
              min={3}
              max={10}
              step={1}
              onValueChange={([val]) => updatePrefs({ gamesWindow: val })}
            />
          </CardContent>
        </Card>

        {/* Reset Button */}
        <div className="mt-8 flex justify-center">
          <Button
          className='cursor-pointer'
            variant="destructive"
            onClick={handleReset}
            disabled={resetting}
          >
            {resetting ? 'Resetting…' : 'Reset All to Defaults'}
          </Button>
        </div>
      </div>
    </div>
  )
}
