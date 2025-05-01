import { BuilderComponent } from "./types";
import dynamic from "next/dynamic";

const builderComponents: BuilderComponent[] = [
    {
        id: 'header-1',
        name: "Basic Header",
        description: "Basic header component",
        category: 'header',
        keywords: [],
        configInput: dynamic(()=>import('@/components/builder-components/header1').then(mod=>mod.Editor)),
        component: dynamic(()=>import('@/components/builder-components/header1').then(mod=>mod.Component)),
        examples: [
            {
                companyName: "SiteCraft"
            }
        ]
    },
    {
        id: 'cta-1',
        name: "Basic CTA",
        description: "Basic Cta component",
        category: 'cta',
        keywords: [],
        configInput: dynamic(()=>import('@/components/builder-components/cta1').then(mod=>mod.Editor)),
        component: dynamic(()=>import('@/components/builder-components/cta1').then(mod=>mod.Component)),
        examples: [
            {
                title: "Why choose us?",
                paragraph: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Ex optio unde consequatur qui esse vitae illo doloremque perspiciatis quae porro impedit',
                image1: '/images/test.svg',
                image2: '/images/test.svg',
                image3: '/images/test.svg',
            }
        ]
    },
    {
        id: 'hero-1',
        name: "Basic Hero",
        description: "Basic Hero component",
        category: 'hero',
        keywords: [],
        configInput: dynamic(()=>import('@/components/builder-components/hero1').then(mod=>mod.Editor)),
        component: dynamic(()=>import('@/components/builder-components/hero1').then(mod=>mod.Component)),
        examples: [
            {
                title: "Boost Your Startup Business Faster",
                paragraph: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Ex optio unde consequatur qui esse vitae illo doloremque perspiciatis quae porro impedit',
                image: '/images/test.svg',
                link: {
                    label:'Get Started',
                    href:'#'
                }
            }
        ]
    }
]

export default builderComponents