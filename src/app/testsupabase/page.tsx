'use client'

import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabaseClient'

export default function TestPage() {
  const [status, setStatus] = useState('Checking...')

  useEffect(() => {
    const check = async () => {
      const { error } = await supabase.from('user_prefs').select('*').limit(1)

      if (error) {
        setStatus('❌ Error: ' + error.message)
      } else {
        setStatus('✅ Connected to Supabase! Table exists.')
      }
    }

    check()
  }, [])

  return <div>{status}</div>
}
