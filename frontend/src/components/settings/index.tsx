"use client"

import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import { Switch } from "@/components/ui/switch"
import { useTheme } from "next-themes"

export default function SettingsPage() {
  const { theme, setTheme } = useTheme()

  return (
    <div className="max-w-2xl mx-auto py-12 px-4 space-y-8">
      <div>
        <h2 className="text-2xl font-bold">Profile</h2>
        <p className="text-muted-foreground text-sm">Manage your personal info.</p>
        <div className="mt-4 space-y-4">
          <div>
            <Label htmlFor="name">Name</Label>
            <Input id="name" defaultValue="Sanjay" placeholder="Enter your name" className="mt-2" />
          </div>
          <div>
            <Label htmlFor="email">Email</Label>
            <Input id="email" defaultValue="sanjay@example.com" disabled className="mt-2" />
          </div>
          <Button className="mt-4">Save Changes</Button>
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
