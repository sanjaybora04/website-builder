'use client'
import { ChevronRight } from "lucide-react"
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible"
import { ReactNode, useState } from "react"
import { cn } from "@/lib/utils"

type PanelProps = {
  title: string
  defaultOpen?: boolean
  children?: ReactNode
}

export default function Panel({ title, defaultOpen = true, children }: PanelProps) {
  const [open, setOpen] = useState(defaultOpen)

  return (
    <Collapsible open={open} onOpenChange={setOpen}>
      <CollapsibleTrigger className="flex items-center cursor-pointer gap-2 sticky top-0 py-2 mb-2 border-y bg-accent w-full z-30">
        {title}
        <ChevronRight className={cn('w-4 h-4 duration-200', open ? "rotate-90" : "")} />
      </CollapsibleTrigger>
      <CollapsibleContent className="space-y-5 py-3">
        {children}
      </CollapsibleContent>
    </Collapsible>
  )
}
