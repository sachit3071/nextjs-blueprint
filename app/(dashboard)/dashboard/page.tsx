"use client";

import { useEffect, useState } from "react";
import { createClient } from "@/lib/supabase/client";
import { useAuthGuard } from "@/lib/auth-guard";

export default function ExecutiveDashboardPage() {
  useAuthGuard();
  const [email, setEmail] = useState("");

  useEffect(() => {
    async function getUser() {
      const supabase = createClient();
      const { data: { user } } = await supabase.auth.getUser();
      if (user?.email) setEmail(user.email);
    }
    getUser();
  }, []);

  return <div className="p-6">hello {email}</div>;
}
