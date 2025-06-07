import { BuilderComponent } from "./types";
import dynamic from "next/dynamic";

const builderComponents: BuilderComponent[] = [
    {
        id: '1',
        name: "Basic Header",
        description: "Basic header component",
        tags: ['header'],
        configInput: dynamic(() => import('@/components/builder-components/header1').then(mod => mod.Editor)),
        component: dynamic(() => import('@/components/builder-components/header1').then(mod => mod.Component)),
        examples: [
            {
                "layout": {
                  "backgroundColor": "#ffffff"
                },
                "content": {
                  "title": "<p>SiteCraft</p>",
                  "buttons": [
                    {
                      "link": "#",
                      "size": "default",
                      "label": "<p>Home</p>",
                      "variant": "default"
                    },
                    {
                      "link": "#",
                      "size": "sm",
                      "label": "<p>About Us</p>",
                      "variant": "default"
                    },
                    {
                      "link": "#",
                      "size": "sm",
                      "label": "<p>Contact Us</p>",
                      "variant": "default"
                    }
                  ]
                }
              }
        ]
    },
    {
        id: '2',
        name: "Cards",
        description: "Basic Cta component",
        tags:['cta'],
        configInput: dynamic(() => import('@/components/builder-components/cards1').then(mod => mod.Editor)),
        component: dynamic(() => import('@/components/builder-components/cards1').then(mod => mod.Component)),
        examples: [
            {
                "layout": {
                  "card": {
                    "backgroundColor": "#f0ebeb"
                  }
                },
                "content": {
                  "cards": [
                    {
                      "image": {
                        "url": `${process.env.NEXT_PUBLIC_BASE_URL}/images/test.svg`,
                        "objectFit": "cover"
                      },
                      "title": "Title",
                      "button": {
                        "size": "default",
                        "label": "<p><u>Clcik Me</u><strong><u> →</u></strong></p>",
                        "variant": "link"
                      },
                      "description": "description"
                    },
                    {
                      "image": {
                        "url": `${process.env.NEXT_PUBLIC_BASE_URL}/images/test.svg`,
                        "objectFit": "cover"
                      },
                      "title": "Title",
                      "button": {
                        "label": "<p><u>Clcik Me</u><strong><u> →</u></strong></p>",
                        "variant": "link"
                      },
                      "description": "description"
                    },
                    {
                      "image": {
                        "url": `${process.env.NEXT_PUBLIC_BASE_URL}/images/test.svg`,
                        "objectFit": "cover"
                      },
                      "title": "<p>Title</p>",
                      "button": {
                        "size": "lg",
                        "label": "<p><u>Clcik Me</u><strong><u> →</u></strong></p>",
                        "variant": "link"
                      },
                      "description": "description"
                    }
                  ],
                  "title": "<p style=\"text-align: center\">Why Choose Us?</p>",
                  "paragraph": "<p style=\"text-align: center\">Becaust We are the Best</p>"
                }
              }
        ]
    },
    {
        id: '3',
        name: "Basic Hero",
        description: "Basic Hero component",
        tags:['hero'],
        configInput: dynamic(() => import('@/components/builder-components/hero1').then(mod => mod.Editor)),
        component: dynamic(() => import('@/components/builder-components/hero1').then(mod => mod.Component)),
        examples: [
            {
                "layout": {
                  "id": "",
                  "backgroundColor": "#f0ebeb"
                },
                "content": {
                  "image": {
                    "url": `${process.env.NEXT_PUBLIC_BASE_URL}/images/test.svg`,
                    "objectFit": "cover"
                  },
                  "title": "<h1>Boost Your<span style=\"color: oklch(0.145 0 0)\"> </span><span style=\"color: #ef6b6b\"><u>Startup</u></span><span style=\"color: oklch(0.145 0 0)\"> </span>Business Faster</h1>",
                  "button": {
                    "size": "default",
                    "color": "#ef5252",
                    "label": "<p><span style=\"color: #ffffff\"><strong>Get Started →</strong></span></p>",
                    "action": {
                      "href": "#",
                      "type": "none"
                    },
                    "variant": "default"
                  },
                  "paragraph": "<p><br>Lorem ipsum dolor sit amet consectetur <span style=\"color: rgb(255, 114, 94)\"><u>adipisicing</u></span> elit. Ex optio unde consequatur qui esse vitae illo doloremque perspiciatis quae porro impedit<br><br></p><ul style=\"list-style-type: disc; padding-left: 1.25rem; margin-bottom: 0.5rem;\"><li style=\"margin-bottom: 0.25rem;\"><p>hello how are you</p></li><li style=\"margin-bottom: 0.25rem;\"><p>hello i am good how are you</p></li></ul>"
                }
              }

        ]
    },
    {
        id: '4',
        name: "Basic Reviews",
        description: "Customer testimonial section",
        tags:['reviews'],
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
        id: '5',
        name: "Basic FAQ",
        description: "A frequently asked questions section",
        tags:['faq'],
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
        id: '6',
        name: "Basic Footer",
        description: "Minimal footer with title, description, and links",
        tags:['footer'],
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