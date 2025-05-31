'use client'

import { EditorContent, useEditor } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import Underline from '@tiptap/extension-underline'
import Link from '@tiptap/extension-link'
import TextStyle from '@tiptap/extension-text-style'
import Color from '@tiptap/extension-color'
import TextAlign from '@tiptap/extension-text-align'
import {
    Bold, Italic, Underline as UnderlineIcon,
    Link as LinkIcon, Unlink,
    AlignLeft,
    AlignCenter,
    AlignRight
} from 'lucide-react'

import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { rgbToHex } from '@/lib/utils'

export default function RichTextEditor({
    value,
    onChange,
    placeholder = 'Start typing...',
}: {
    value: string
    onChange: (html: string) => void
    placeholder?: string
}) {
    const editor = useEditor({
        extensions: [
            StarterKit,
            Underline,
            Link.configure({ openOnClick: false }),
            TextStyle,
            Color,
            TextAlign.configure({
                types: ['heading', 'paragraph'],
            }),
        ],
        content: value,
        editorProps: {
            attributes: {
                class: 'min-h-[120px] border p-3 rounded-md focus:outline-none',
            },
        },
        onUpdate: ({ editor }) => {
            onChange(editor.getHTML())
        },
    })
    if (!editor) return null

    return (
        <div className="space-y-2">
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

                {/* Text Align */}
                <Select
                    value={editor.getAttributes('paragraph')?.textAlign}
                    onValueChange={(value) => { editor.chain().focus().setTextAlign(value).run() }}
                >
                    <SelectTrigger className="w-16 h-5 text-xs" title='Align'>
                        <SelectValue placeholder="Align" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="left"><AlignLeft />Left</SelectItem>
                        <SelectItem value="center"><AlignCenter />Center</SelectItem>
                        <SelectItem value="right"><AlignRight />Right</SelectItem>
                    </SelectContent>
                </Select>


                {/* Link buttons */}
                <Button
                    variant="outline"
                    size="icon"
                    onClick={() => {
                        const url = window.prompt('Enter URL')
                        if (url) editor.chain().focus().setLink({ href: url }).run()
                    }}
                    className='w-5 h-5'
                    title='Link'
                ><LinkIcon /></Button>

                <Button
                    variant="outline"
                    size="icon"
                    onClick={() => editor.chain().focus().unsetLink().run()}
                    className='w-5 h-5'
                    title='Remove Link'
                ><Unlink /></Button>

                {/* Text color */}
                <label className="cursor-pointer w-5 h-5 rounded overflow-hidden">
                    <input
                        type="color"
                        value={rgbToHex(editor.getAttributes('textStyle').color || '#000000')}
                        onChange={(e) => {
                            editor.chain().focus().setColor(e.target.value).run()
                        }}
                        className="w-5 h-5 border-none p-0 cursor-pointer"
                        title='Color'
                    />
                </label>
            </div>


            {/* Editor Content */}
            <EditorContent editor={editor} className="bg-background" />
        </div>
    )
}
