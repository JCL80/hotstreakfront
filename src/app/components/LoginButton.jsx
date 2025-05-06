'use client'

import { supabase } from '@/lib/supabaseClient'

export const LoginButton = () => {
  const handleLogin = async () => {
    await supabase.auth.signInWithOAuth({
      provider: 'google',
    })
  }

  return <button onClick={handleLogin}>Sign in with Google</button>
}
