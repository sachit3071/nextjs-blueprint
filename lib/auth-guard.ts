"use client"

import { useEffect, useState } from "react"
import { createClient } from "@/lib/supabase/client"
import { redirect } from "next/navigation"

export function useAuthGuard() {
  const [authenticated, setAuthenticated] = useState<boolean | null>(null)

  useEffect(() => {
    async function checkAuth() {
      const supabase = createClient()
      const { data: { user } } = await supabase.auth.getUser()
      if (!user) {
        redirect("/login")
      }
      setAuthenticated(true)
    }
    checkAuth()
  }, [])

  return authenticated
}
