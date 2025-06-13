import { BuilderComponent } from "./types";
import dynamic from "next/dynamic";

const builderComponents: BuilderComponent[] = [
    {
        id: '1',
        name: "Header",
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
        name: "Hero",
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
        name: "Reviews",
        tags:['reviews'],
        configInput: dynamic(() => import('@/components/builder-components/reviews1').then(mod => mod.Editor)),
        component: dynamic(() => import('@/components/builder-components/reviews1').then(mod => mod.Component)),
        examples: [
          {
            "content": {
              "title": "<p>What Our Customers Say?</p>",
              "paragraph": "<p style=\"text-align: center\">Hear the best reviews from our customers</p>",
              "testimonials": [
                {
                  "name": "John Doe",
                  "quote": "This product has changed the way we work!",
                  "position": "CEO, Example Inc."
                },
                {
                  "name": "John Doe",
                  "quote": "This product has changed the way we work!",
                  "position": "CEO, Example Inc."
                },
                {
                  "name": "John Doe",
                  "quote": "This product has changed the way we work!",
                  "position": "CEO, Example Inc."
                },
                {
                  "name": "John Doe",
                  "quote": "This product has changed the way we work!",
                  "position": "CEO, Example Inc."
                }
              ]
            },
            "carousel": {
              "autoplay": true
            },
            "container": {}
          }
        ]
    },
    {
        id: '5',
        name: "FAQ",
        tags:['faq'],
        configInput: dynamic(() => import('@/components/builder-components/faq1').then(mod => mod.Editor)),
        component: dynamic(() => import('@/components/builder-components/faq1').then(mod => mod.Component)),
        examples: [
          {
            "content": {
              "faqs": [
                {
                  "answer": "<p>You can return items within 30 days.</p>",
                  "question": "What is your return policy?"
                },
                {
                  "answer": "You can return items within 30 days.",
                  "question": "What is your return policy?"
                }
              ],
              "title": "<p style=\"text-align: center\">Frequently Asked Questions</p>",
              "description": "<p style=\"text-align: center\">Answers to some of the frequentl asked questions by our customers</p>"
            },
            "accordion": {},
            "container": {}
          }
        ]
    },
    {
        id: '6',
        name: "Footer",
        tags:['footer'],
        configInput: dynamic(() => import('@/components/builder-components/footer1').then(mod => mod.Editor)),
        component: dynamic(() => import('@/components/builder-components/footer1').then(mod => mod.Component)),
        examples: [
            {

            }
        ]
    },
    {
      id: '7',
      name: "Form",
      tags:['other'],
      configInput: dynamic(() => import('@/components/builder-components/form1').then(mod => mod.Editor)),
      component: dynamic(() => import('@/components/builder-components/form1').then(mod => mod.Component)),
      examples: [
          {

          }
      ]
  }

]

export default builderComponents