'use client'

import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Popover, PopoverTrigger, PopoverContent } from '@/components/ui/popover'
import { Input } from '@/components/ui/input'
import { Checkbox } from '@/components/ui/checkbox'
import { Link as LinkIcon } from 'lucide-react'

interface CustomLinkProps {
  editor: any
}

export default function CustomLink({ editor }: CustomLinkProps) {
  const [open, setOpen] = useState(false)
  const [href, setHref] = useState('')
  const [text, setText] = useState('')
  const [title, setTitle] = useState('')
  const [blank, setBlank] = useState(false)

  useEffect(() => {
    if (!open || !editor) return

    const attrs = editor.getAttributes('link')
    const selectedText = editor.state.doc.textBetween(
      editor.state.selection.from,
      editor.state.selection.to,
      ''
    )

    setHref(attrs.href || '')
    setTitle(attrs.title || '')
    setBlank(attrs.target === '_blank')
    setText(selectedText || attrs.text || '')
  }, [open, editor])

  const applyLink = () => {
    editor.chain().focus().extendMarkRange('link').setLink({
      href,
      title: title || undefined,
      target: blank ? '_blank' : undefined,
    }).run()

    const selectedText = editor.state.doc.textBetween(
      editor.state.selection.from,
      editor.state.selection.to,
      ''
    )

    if (!selectedText && text) {
      editor.chain().focus().insertContent(text).run()
    }

    setOpen(false)
  }

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant={editor.isActive('link') ? 'default' : 'outline'}
          size="icon"
          className="w-5 h-5"
          title="Link"
        >
          <LinkIcon className="w-4 h-4" />
        </Button>
      </PopoverTrigger>

      <PopoverContent className="w-64 space-y-3 p-4">
        <div className="space-y-2">
          <Input
            placeholder="Text to display"
            value={text}
            onChange={(e) => setText(e.target.value)}
          />
          <Input
            placeholder="https://example.com"
            value={href}
            onChange={(e) => setHref(e.target.value)}
          />
          <Input
            placeholder="Tooltip (optional)"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <div className="flex items-center space-x-2">
            <Checkbox
              id="open-in-new-tab"
              checked={blank}
              onCheckedChange={(v) => setBlank(Boolean(v))}
            />
            <label htmlFor="open-in-new-tab" className="text-sm leading-none">
              Open in new tab
            </label>
          </div>
        </div>

        <div className="flex justify-end gap-2">
          <Button size="sm" variant="ghost" onClick={() => setOpen(false)}>Cancel</Button>
          <Button size="sm" onClick={applyLink}>Apply</Button>
        </div>
      </PopoverContent>
    </Popover>
  )
}
