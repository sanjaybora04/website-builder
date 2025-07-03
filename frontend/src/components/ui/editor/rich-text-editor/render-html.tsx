'use client'
import useWebsiteEditor from '@/hooks/use-website-editor'
import parse, { domToReact, Element as DOMNode } from 'html-react-parser'
import Link from 'next/link'
import React from 'react'

export default function RenderHtml({ html }: { html?: string }) {
  const {websiteEditor, setWebsiteEditor} = useWebsiteEditor()

  const handleClick = (e: React.MouseEvent, href: string) => {
    const isInternal = href?.startsWith("/") || (!href?.startsWith("http://") && !href?.startsWith("https://"))
    if (websiteEditor && isInternal) {
      e.preventDefault()
      setWebsiteEditor((prev:any) => ({
        ...prev,
        activePage: href,
        activeComponent: undefined
      }))
    }
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
  }, [html, websiteEditor])

  return <>{replacedHtml}</>
}
