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
    Brush, Type,
    List, ListOrdered
} from 'lucide-react'

import { Button } from "@/components/ui/button"
import { Label } from '../../label'
import { CustomBulletList } from './custombulletlist'
import { CustomOrderedList } from './customorderedlist'
import { CustomListItem } from './customlistitem'
import { useDebouncedCallback } from 'use-debounce'

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
    value: string
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
    }, 200) // 300ms delay (you can adjust this)
    

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

    if (!editor) return null

    return (
        <div className="space-y-2">
            {label && <Label>{label}</Label>}

            {/* Toolbar */}
            <div className="flex flex-wrap gap-1 items-center">
                {/* Always visible */}
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

                {/* Optional: Block type switcher */}
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


                {/* Optional: Text alignment */}
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

                {/* Optional: Link */}
                {showLink && (
                    <div className='flex'>
                        <Button
                            variant={editor.isActive('link') ? 'default' : 'outline'}
                            size="icon"
                            onClick={() => {
                                const url = window.prompt('Enter URL')
                                if (url) editor.chain().focus().setLink({ href: url }).run()
                            }}
                            className='w-5 h-5'
                            title='Link'
                        ><LinkIcon /></Button>
                        {editor.isActive('link') && (
                            <button
                                className='w-4 h-5 cursor-pointer'
                                title='Remove Link'
                                onClick={() => editor.chain().focus().unsetLink().run()}
                            ><X className='w-full h-full' /></button>
                        )}
                    </div>
                )}

                {/* Always: Text color */}
                <div className='flex'>
                    <label className="cursor-pointer w-5 h-5 rounded relative flex flex-col items-center gap-1">
                        <Type />
                        <div className="w-full h-1" style={{ backgroundColor: editor.getAttributes('textStyle')?.color || '#000' }} />
                        <input
                            type="color"
                            onChange={(e) => editor.chain().focus().setColor(e.target.value).run()}
                            className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                            title="Text Color"
                        />
                    </label>
                    {editor.getAttributes('textStyle')?.color && (
                        <button
                            className='w-4 h-5 cursor-pointer'
                            title='Remove Text Color'
                            onClick={() => editor.chain().focus().unsetColor().run()}
                        ><X className='w-full h-full' /></button>
                    )}
                </div>

                {/* Optional: Highlight (background color) */}
                {showBackgroundColor && (
                    <div className='flex'>
                        <label className="cursor-pointer w-5 h-5 rounded relative flex flex-col items-center gap-1">
                            <Brush />
                            <div className="w-full h-1" style={{ backgroundColor: editor.getAttributes('highlight')?.color || '#fff' }} />
                            <input
                                type="color"
                                onChange={(e) => editor.chain().focus().setHighlight({ color: e.target.value }).run()}
                                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                                title="Background Color"
                            />
                        </label>
                        {editor.getAttributes('highlight')?.color && (
                            <button
                                className='w-4 h-5 cursor-pointer'
                                title='Remove Background Color'
                                onClick={() => editor.chain().focus().unsetHighlight().run()}
                            ><X className='w-full h-full' /></button>
                        )}
                    </div>
                )}
            </div>

            {/* Editor Content */}
            <EditorContent editor={editor} className="bg-background" />
        </div>
    )
}
