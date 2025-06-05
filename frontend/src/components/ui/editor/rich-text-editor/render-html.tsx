'use client'

import { websiteEditorAtom } from '@/lib/atoms'
import parse, { domToReact, Element as DOMNode } from 'html-react-parser'
// import { useAtom } from 'jotai'
import Link from 'next/link'
import React from 'react'

export default function RenderHtml({ html }: { html?: string }) {
  // const [websiteEditor, setWebsiteEditor] = useAtom(websiteEditorAtom)

  const handleClick = (e: React.MouseEvent, href: string) => {
    // const isInternal = href?.startsWith("/") || (!href?.startsWith("http://") && !href?.startsWith("https://"))
    // if (websiteEditor && isInternal) {
    //   e.preventDefault()
    //   setWebsiteEditor((prev:any) => ({
    //     ...prev,
    //     activePage: href,
    //     activeComponent: undefined
    //   }))
    // }
  }

  const replacedHtml = React.useMemo(() => {
    return parse(html || '', {
      replace: (domNode) => {
        if (
          domNode.type === 'tag' &&
          domNode.name === 'a' &&
          'attribs' in domNode
        ) {
          const { href } = domNode.attribs || {}
          return (
            <Link href={href} onClick={(e) => handleClick(e, href)}>
              {domToReact(domNode.children as DOMNode[])}
            </Link>
          )
        }
      }
    })
  }, [html, 
    // websiteEditor
  ])

  return <>{replacedHtml}</>
}
