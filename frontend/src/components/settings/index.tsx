"use client"

import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import { Switch } from "@/components/ui/switch"
import { useTheme } from "next-themes"
import useAuth from "@/hooks/use-auth"
import Link from "next/link"
import Routes from "@/lib/routes"
import { ArrowUpRight } from "lucide-react"
import { useEffect, useState } from "react"
import { toast } from "sonner"
import api from "@/lib/api"

export default function SettingsPage() {
  const { theme, setTheme } = useTheme()

  const { user, authorize } = useAuth()

  const [name, setName] = useState(user?.name)

  async function handleSaveChanges() {
    const id = toast.loading("Saving changes...")

    const res = await api.user.updateUser({name})

    if(res.status === 200) {
      console.log(res.data)
      authorize(res.data)
      toast.success("Changes saved successfully", { id })
    }else{
      toast.dismiss(id)
    }
  }

  useEffect(()=>{setName(user?.name)},[user])
  return (
    <div className="max-w-2xl mx-auto py-12 px-4 space-y-8">
      <div>
      <h1 className="text-3xl font-bold">Settings</h1>
      <p className="text-muted-foreground text-sm my-2">Manage your account settings and preferences.</p>
      <Separator />
      </div>

      <div>
        <h2 className="text-2xl font-bold">Account Plan</h2>
        <p className="text-muted-foreground text-sm my-2">Current plan: {user?.plan || "FREE"}</p>
        <Button asChild>
          <Link href={Routes.pricing}>
            Upgrade Plan
            <ArrowUpRight/>
          </Link>
        </Button>
      </div>

      <div>
        <h2 className="text-2xl font-bold">Profile</h2>
        <p className="text-muted-foreground text-sm">Manage your personal info.</p>
        <div className="mt-4 space-y-4">
          <div>
            <Label htmlFor="name">Name</Label>
            <Input id="name" value={name} onChange={(e)=>setName(e.target.value)} placeholder="Enter your name" className="mt-2" />
          </div>
          <div>
            <Label htmlFor="email">Email</Label>
            <Input id="email" value={user?.email} disabled className="mt-2" />
          </div>
          <Button className="mt-4" onClick={()=>handleSaveChanges()}>Save Changes</Button>
        </div>
      </div>

      <Separator />

      <div>
        <h2 className="text-2xl font-bold">Preferences</h2>
        <p className="text-muted-foreground text-sm">Customize your experience.</p>
        <div className="mt-4 space-y-4">
          <div className="flex items-center justify-between">
            <Label htmlFor="theme">Dark Mode</Label>
            <Switch
              checked={theme === "dark"}
              onCheckedChange={(checked) => setTheme(checked ? "dark" : "light")}
              id="theme"
            />
          </div>
        </div>
      </div>
    </div>
  )
}
