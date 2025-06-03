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
                "layout": {
                    "color": "#ffffff",
                    "backgroundColor": "#684a36"
                },
                "content": {
                    "title": "<p>SiteCraft</p>",
                    "buttons": [
                        {
                            "link": "#",
                            "size": "default",
                            "label": "Click Me",
                            "bgColor": "#34251b"
                        }
                    ]
                }
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
                layout: {
                    id: "",
                    color: "#e6dbdb",
                    backgroundColor: "#1a1a1a"
                },
                content: {
                    image: `${process.env.NEXT_PUBLIC_BASE_URL}/images/test.svg`,
                    title: "<h1>Boost Your<span style=\"color: oklch(0.145 0 0)\"> </span><a target=\"_blank\" rel=\"noopener noreferrer nofollow\" href=\"https://test.sanjaybora.in/about#\"><span style=\"color: rgb(255, 114, 94)\"><u>Startup</u></span></a><span style=\"color: oklch(0.145 0 0)\"> </span>Business Faster</h1>",
                    paragraph: "<p><br>Lorem ipsum dolor sit amet consectetur <span style=\"color: rgb(255, 114, 94)\"><u>adipisicing</u></span> elit. Ex optio unde consequatur qui esse vitae illo doloremque perspiciatis quae porro impedit<br><br></p><ul style=\"list-style-type: disc; padding-left: 1.25rem; margin-bottom: 0.5rem;\"><li style=\"margin-bottom: 0.25rem;\"><p>hello how are you</p></li><li style=\"margin-bottom: 0.25rem;\"><p>hello i am good how are you</p></li></ul>",
                    button: {
                        label: "<p>Get Started</p>",
                        bgColor: "#dd260e"
                    },
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