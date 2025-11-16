'use client'

import { EditorContent, useEditor } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import Underline from '@tiptap/extension-underline'
import Link from '@tiptap/extension-link'
import TextStyle from '@tiptap/extension-text-style'
import Highlight from '@tiptap/extension-highlight'
import Color from '@tiptap/extension-color'
import TextAlign from '@tiptap/extension-text-align'

import {
  Bold, Italic, Underline as UnderlineIcon,
  Link as LinkIcon, X,
  AlignLeft, AlignCenter, AlignRight,
  Type, List, ListOrdered, PaintBucket
} from 'lucide-react'

import { Button } from "@/components/ui/button"
import { Label } from '../../label'
import { CustomBulletList } from './custombulletlist'
import { CustomOrderedList } from './customorderedlist'
import { CustomListItem } from './customlistitem'
import { useDebouncedCallback } from 'use-debounce'
import { useEffect, useState } from 'react'
import ColorPicker from '../color-picker'

import {
  Popover,
  PopoverTrigger,
  PopoverContent
} from "@/components/ui/popover"
import { Input } from "@/components/ui/input"

export default function RichTextEditor({
  label,
  value,
  onChange,
  placeholder,
  showHeading = false,
  showList = false,
  showBackgroundColor = false,
  showLink = false,
  showAlignment = false,
}: {
  label?: string
  value?: string
  onChange: (html: string) => void
  placeholder?: string
  showHeading?: boolean
  showList?: boolean
  showBackgroundColor?: boolean
  showLink?: boolean
  showAlignment?: boolean
}) {
  const debouncedOnChange = useDebouncedCallback((html: string) => {
    onChange(html)
  }, Number(process.env.NEXT_PUBLIC_DEBOUNCE_DELAY) || 300)

  const [linkUrl, setLinkUrl] = useState('')
  const [isPopoverOpen, setIsPopoverOpen] = useState(false)

  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        bulletList: false,
        orderedList: false,
        listItem: false,
      }),
      Underline,
      TextStyle,
      Color,
      ...(showList ? [CustomBulletList, CustomOrderedList, CustomListItem] : []),
      ...(showHeading || showAlignment ? [TextAlign.configure({ types: ['heading', 'paragraph'] })] : []),
      ...(showLink ? [Link.configure({ openOnClick: false })] : []),
      ...(showBackgroundColor ? [Highlight.configure({ multicolor: true })] : []),
    ],
    content: value,
    editorProps: {
      attributes: {
        class: 'min-h-10 border p-3 rounded-md focus:outline-none',
      },
    },
    onUpdate: ({ editor }) => {
      debouncedOnChange(editor.getHTML())
    },
  })

  useEffect(() => {
    if (!editor) return
    const currentContent = editor.getHTML()
    if (value !== currentContent) {
      editor.commands.setContent(value || '', false)
    }
  }, [value, editor])

  useEffect(() => {
    if (!editor) return
    const currentLink = editor.getAttributes('link')?.href || ''
    setLinkUrl(currentLink)
  }, [editor?.state?.selection?.from])

  if (!editor) return null

  return (
    <div className="space-y-2">
      {label && <Label>{label}</Label>}

      {/* Toolbar */}
      <div className="flex flex-wrap gap-1 items-center">
        <Button
          variant={editor.isActive('bold') ? 'default' : 'outline'}
          size="icon"
          onClick={() => editor.chain().focus().toggleBold().run()}
          className='w-5 h-5'
          title='Bold'
        ><Bold /></Button>

        <Button
          variant={editor.isActive('italic') ? 'default' : 'outline'}
          size="icon"
          onClick={() => editor.chain().focus().toggleItalic().run()}
          className='w-5 h-5'
          title='Italic'
        ><Italic /></Button>

        <Button
          variant={editor.isActive('underline') ? 'default' : 'outline'}
          size="icon"
          onClick={() => editor.chain().focus().toggleUnderline().run()}
          className='w-5 h-5'
          title='Underline'
        ><UnderlineIcon /></Button>

        {showHeading && (
          <Button
            variant='outline'
            size="icon"
            onClick={() => {
              if (editor.isActive('heading', { level: 1 })) {
                editor.chain().focus().toggleHeading({ level: 2 }).run()
              } else if (editor.isActive('heading', { level: 2 })) {
                editor.chain().focus().toggleHeading({ level: 3 }).run()
              } else if (editor.isActive('heading', { level: 3 })) {
                if (showList) {
                  editor.chain().focus().toggleBulletList().run()
                } else {
                  editor.chain().focus().setParagraph().run()
                }
              } else if (showList && editor.isActive('bulletList')) {
                editor.chain().focus().toggleOrderedList().run()
              } else if (showList && editor.isActive('orderedList')) {
                editor.chain().focus().setParagraph().run()
              } else {
                editor.chain().focus().toggleHeading({ level: 1 }).run()
              }
            }}
            className='w-5 h-5 text-xs'
            title='Block Type'
          >
            {editor.isActive('heading', { level: 1 }) ? "H1" :
              editor.isActive('heading', { level: 2 }) ? "H2" :
                editor.isActive('heading', { level: 3 }) ? "H3" :
                  (showList && editor.isActive('bulletList')) ? <List /> :
                    (showList && editor.isActive('orderedList')) ? <ListOrdered /> : 'P'}
          </Button>
        )}

        {showAlignment && (
          <Button
            variant='outline'
            size="icon"
            onClick={() => {
              const type = editor.isActive('heading') ? 'heading' : 'paragraph'
              const align = editor.getAttributes(type)?.textAlign
              const next = align === 'center' ? 'right' : align === 'right' ? 'left' : 'center'
              editor.chain().focus().setTextAlign(next).run()
            }}
            className='w-5 h-5'
            title='Alignment'
          >
            {(() => {
              const type = editor.isActive('heading') ? 'heading' : 'paragraph'
              const align = editor.getAttributes(type)?.textAlign
              if (align === 'center') return <AlignCenter />
              if (align === 'right') return <AlignRight />
              return <AlignLeft />
            })()}
          </Button>
        )}

        {showLink && (
          <Popover open={isPopoverOpen} onOpenChange={setIsPopoverOpen}>
            <PopoverTrigger asChild>
              <Button
                variant={editor.isActive('link') ? 'default' : 'outline'}
                size="icon"
                onClick={(e) => {
                  e.preventDefault()
                  const current = editor.getAttributes('link')?.href || ''
                  setLinkUrl(current)
                  setIsPopoverOpen(!isPopoverOpen)
                }}
                className='w-5 h-5'
                title='Link'
              >
                <LinkIcon />
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-72 space-y-2">
              <Input
                placeholder="https://example.com"
                value={linkUrl}
                onChange={(e) => setLinkUrl(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    editor.chain().focus().setLink({ href: linkUrl }).run()
                    setIsPopoverOpen(false)
                  }
                }}
              />
              <div className="flex justify-end gap-2">
                {editor.isActive('link') && (
                  <Button
                    variant="ghost"
                    onClick={() => {
                      editor.chain().focus().unsetLink().run()
                      setIsPopoverOpen(false)
                    }}
                  >
                    Remove
                  </Button>
                )}
                <Button
                  onClick={() => {
                    if (linkUrl) {
                      editor.chain().focus().setLink({ href: linkUrl }).run()
                      setIsPopoverOpen(false)
                    }
                  }}
                >
                  Apply
                </Button>
              </div>
            </PopoverContent>
          </Popover>
        )}

        <ColorPicker
          icon={<Type />}
          color={editor.getAttributes('textStyle')?.color}
          onChange={(v) => {
            if (v) {
              editor.chain().focus().setColor(v).run()
            } else {
              editor.chain().focus().unsetColor().run()
            }
          }}
        />

        {showBackgroundColor && (
          <ColorPicker
            icon={<PaintBucket />}
            color={editor.getAttributes('highlight')?.color}
            onChange={(v) => {
              if (v) {
                editor.chain().focus().setHighlight({ color: v }).run()
              } else {
                editor.chain().focus().unsetHighlight().run()
              }
            }}
          />
        )}
      </div>

      {/* Editor Content */}
      <EditorContent editor={editor} className="bg-background" />
    </div>
  )
}
