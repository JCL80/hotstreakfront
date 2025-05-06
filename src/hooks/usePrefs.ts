// src/hooks/usePrefs.ts
'use client'

import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabaseClient'
import { useUser } from '@/contexts/UserContext'
import { DEFAULT_PREFS, HotStreakPrefs } from '@/types/heatIndex'

interface AppUser { id: string }

export function usePrefs() {
  const user = useUser() as AppUser | null
  const [prefs, setPrefs] = useState<HotStreakPrefs>(DEFAULT_PREFS)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function loadPrefs() {
      // 1) Try localStorage
      const local = localStorage.getItem('hotstreak_prefs')
      if (local) {
        const parsed = JSON.parse(local) as Partial<HotStreakPrefs>
        setPrefs({ ...DEFAULT_PREFS, ...parsed })
      }

      // 2) Then Supabase if logged in
      if (user?.id) {
        const { data } = await supabase
          .from('user_prefs')
          .select('preferences')
          .eq('user_id', user.id)
          .single()
        if (data?.preferences) {
          const loaded = data.preferences as Partial<HotStreakPrefs>
          setPrefs({ ...DEFAULT_PREFS, ...loaded })
          localStorage.setItem(
            'hotstreak_prefs',
            JSON.stringify({ ...DEFAULT_PREFS, ...loaded })
          )
        }
      }

      setLoading(false)
    }
    loadPrefs()
  }, [user])

  const updatePrefs = async (newPrefs: Partial<HotStreakPrefs>) => {
    const merged = { ...prefs, ...newPrefs }
    setPrefs(merged)
    localStorage.setItem('hotstreak_prefs', JSON.stringify(merged))

    if (user?.id) {
      await supabase.from('user_prefs').upsert({
        user_id: user.id,
        preferences: merged,
      })
      await supabase.from('pref_logs').insert({
        user_id: user.id,
        preferences: merged,
      })
    }
  }

  return { prefs, updatePrefs, loading }
}
