// app/_site/[...slug]/page.tsx
import { notFound } from 'next/navigation'
import builderComponents from '@/lib/builder-components'
import { headers } from 'next/headers'
import { Website } from '@/lib/types'
import { Metadata } from 'next'

async function getWebsiteByDomain(host:string):Promise<Website>{
    const res = await fetch(process.env.NEXT_PUBLIC_API_URL+'/website/getbydomain', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            domain: host,
        }),
    })
    const site = await res.json()

    return site
}

export async function generateMetaData({params}:{params:Promise<any>}):Promise<Metadata>{
    const host = (await headers()).get('host')!
    const path = '/' + ((await params)?.slug?.join('/') || '')

    const site = await getWebsiteByDomain(host)

    return ({
        title:site.pages.find(p=>p.path==path)?.title,
        description:site.pages.find(p=>p.path==path)?.description,
        openGraph:{
            type:'website',
            url:host+path,
            images:site.pages.find(p=>p.path==path)?.image
        },
        twitter:{
            card:'summary_large_image',
            images: site.pages.find(p=>p.path==path)?.image
        },
        alternates:{
            canonical:host+path
        },
        // icons: {
        //     shortcut:{
        //         url:site.
        //     }
        // }
    })
}

export default async function Page({ params }: { params: Promise<any> }) {
    const host = (await headers()).get('host')!
    const path = '/' + ((await params)?.slug?.join('/') || '')

    // 1. Get website config by host
    const site = await getWebsiteByDomain(host)
    if (!site) return notFound()

    // 2. Find matching page by path
    const page = site.pages?.find((p:any) => p.path === path)
    if (!page) return notFound()

    // 3. Render dynamic components
    return (
        <main>
            {page.components?.map((c: any, index: any) => {
                const Comp = builderComponents.find(b => b.id == c.id)?.component
                return <Comp key={index} config={c.config} />
            }
            )}
        </main>
    )
}

