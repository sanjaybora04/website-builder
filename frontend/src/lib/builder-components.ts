import { BuilderComponent } from "./types";
import dynamic from "next/dynamic";

const builderComponents: BuilderComponent[] = [
    {
        id: 'header-1',
        name: "Basic Header",
        description: "Basic header component",
        category: 'header',
        keywords: [],
        configInput: dynamic(() => import('@/components/builder-components/header1').then(mod => mod.Editor)),
        component: dynamic(() => import('@/components/builder-components/header1').then(mod => mod.Component)),
        examples: [
            {
                websiteName: "SiteCraft",
                logo: "",
                links: [
                    {
                        index:1,
                        label:"Home",
                        href:"#"
                    },
                    {
                        index:1,
                        label:"About",
                        href:"#"
                    },
                    {
                        index:1,
                        label:"Contact",
                        href:"#"
                    }
                ]
            }
        ]
    },
    {
        id: 'cta-1',
        name: "Basic CTA",
        description: "Basic Cta component",
        category: 'cta',
        keywords: [],
        configInput: dynamic(() => import('@/components/builder-components/cta1').then(mod => mod.Editor)),
        component: dynamic(() => import('@/components/builder-components/cta1').then(mod => mod.Component)),
        examples: [
            {
                title: "Why choose us?",
                paragraph: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Ex optio unde consequatur qui esse vitae illo doloremque perspiciatis quae porro impedit',
                image1: `${process.env.NEXT_PUBLIC_BASE_URL}/images/test.svg`,
                image2: `${process.env.NEXT_PUBLIC_BASE_URL}/images/test.svg`,
                image3: `${process.env.NEXT_PUBLIC_BASE_URL}/images/test.svg`,
            }
        ]
    },
    {
        id: 'hero-1',
        name: "Basic Hero",
        description: "Basic Hero component",
        category: 'hero',
        keywords: [],
        configInput: dynamic(() => import('@/components/builder-components/hero1').then(mod => mod.Editor)),
        component: dynamic(() => import('@/components/builder-components/hero1').then(mod => mod.Component)),
        examples: [
            {
                title: "Boost Your Startup Business Faster",
                paragraph: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Ex optio unde consequatur qui esse vitae illo doloremque perspiciatis quae porro impedit',
                image: `${process.env.NEXT_PUBLIC_BASE_URL}/images/test.svg`,
                link: {
                    label: 'Get Started',
                    href: '#'
                }
            }
        ]
    },
    {
        id: 'reviews-1',
        name: "Basic Reviews",
        description: "Customer testimonial section",
        category: 'reviews',
        keywords: [],
        configInput: dynamic(() => import('@/components/builder-components/reviews1').then(mod => mod.Editor)),
        component: dynamic(() => import('@/components/builder-components/reviews1').then(mod => mod.Component)),
        examples: [
            {
                title: "What our customers say",
                reviews: [
                    {
                        name: "Jane Doe",
                        role: "CEO at Acme Inc",
                        review: "This tool has been a game changer for our workflow.",
                        avatar: `${process.env.NEXT_PUBLIC_BASE_URL}/images/user1.jpg`
                    },
                    {
                        name: "John Smith",
                        role: "Product Manager",
                        review: "Absolutely love the speed and ease of use.",
                        avatar: `${process.env.NEXT_PUBLIC_BASE_URL}/images/user2.jpg`
                    }
                ]
            }
        ]
    },
    {
        id: 'faq-1',
        name: "Basic FAQ",
        description: "A frequently asked questions section",
        category: 'faq',
        keywords: ['faq', 'questions', 'accordion'],
        configInput: dynamic(() => import('@/components/builder-components/faq1').then(mod => mod.Editor)),
        component: dynamic(() => import('@/components/builder-components/faq1').then(mod => mod.Component)),
        examples: [
            {
                title: "Frequently Asked Questions",
                faqs: [
                    {
                        question: "What is SiteCraft?",
                        answer: "SiteCraft is a simple and powerful website builder."
                    },
                    {
                        question: "Is it free to use?",
                        answer: "Yes, there's a generous free plan available."
                    },
                    {
                        question: "Can I connect my own domain?",
                        answer: "Yes, custom domain support is available in the premium plan."
                    }
                ]
            }
        ]
    },
    {
        id: 'footer-1',
        name: "Basic Footer",
        description: "Minimal footer with title, description, and links",
        category: 'footer',
        keywords: ['footer', 'links', 'bottom'],
        configInput: dynamic(() => import('@/components/builder-components/footer1').then(mod => mod.Editor)),
        component: dynamic(() => import('@/components/builder-components/footer1').then(mod => mod.Component)),
        examples: [
            {
                title: "SiteCraft",
                description: "Crafting modern websites with simplicity and speed.",
                links: [
                    { label: "About", href: "#" },
                    { label: "Contact", href: "#" },
                    { label: "Privacy", href: "#" }
                ]
            }
        ]
    }

]

export default builderComponents