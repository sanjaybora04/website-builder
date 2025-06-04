'use client'
import { websiteEditorAtom } from '@/lib/atoms'
import parse, { domToReact, Element as DOMNode } from 'html-react-parser'
import { useAtom } from 'jotai'
import Link from 'next/link'

export default function RenderHtml(html?: string) {
  const [websiteEditor,setWebsiteEditor] = useAtom(websiteEditorAtom)
  return parse(html||'', {
    replace: (domNode) => {
      if (domNode.type === 'tag' && domNode.name === 'a') {
        const { href } = domNode.attribs || {}

        // Cast children to html-react-parser's DOMNode[]
        return (
          <Link href={href}
          onClick={(e) => {
            const isInternalLink = href.startsWith("/") || (!href.startsWith("http://") && !href.startsWith("https://"));
            if (websiteEditor && isInternalLink) {
              e.preventDefault();
              setWebsiteEditor((prev: any) => ({
                ...prev,
                activePage: href,
                activeComponent: undefined
              }));
            }
          }}
          >
            {domToReact(domNode.children as DOMNode[])}
          </Link>
        )
      }
    },
  })
}
