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
          "logo": {
            "url": `${process.env.NEXT_PUBLIC_BASE_URL}/images/logo.svg`,
            "objectFit": "cover"
          },
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
    tags: ['cta'],
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
    tags: ['hero'],
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
    tags: ['reviews'],
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
    tags: ['faq'],
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
          "paragraph": "<p style=\"text-align: center\">Answers to some of the frequentl asked questions by our customers</p>"
        },
        "accordion": {},
        "container": {}
      }
    ]
  },
  {
    id: '6',
    name: "Footer",
    tags: ['footer'],
    configInput: dynamic(() => import('@/components/builder-components/footer1').then(mod => mod.Editor)),
    component: dynamic(() => import('@/components/builder-components/footer1').then(mod => mod.Component)),
    examples: [
      {
        "content": {
          "logo": {
            "url": `${process.env.NEXT_PUBLIC_BASE_URL}/images/logo.svg`,
          },
          "title": "<p>SiteCraft</p>",
          "groups": [
            {
              "links": [
                {
                  "href": "#",
                  "label": "Home"
                },
                {
                  "href": "#",
                  "label": "About"
                },
                {
                  "href": "#",
                  "label": "Contact Us"
                }
              ],
              "title": "Links"
            },
            {
              "links": [
                {
                  "href": "mailto:contact@example.com",
                  "label": "contact@example.com"
                },
                {
                  "href": "tel:+91 92342345",
                  "label": "+91 92342345"
                }
              ],
              "title": "Contact Us"
            }
          ],
          "socials": {
            "color": "#ffffff",
            "github": "https://github.com/sanjaybora04",
            "youtube": "https://www.youtube.com/@sanjaybora04",
            "linkedin": "https://www.linkedin.com/in/sanjaybora04/"
          },
          "copyright": "<p><span style=\"color: #bdbdbd\">Copyright@SiteCraft | All Rights Reserved</span></p>",
          "paragraph": "<p>This is SiteCraft</p>"
        },
        "container": {
          "color": "#ffffff",
          "backgroundColor": "#000000"
        }
      }
    ]
  },
  {
    id: '7',
    name: "Form",
    tags: ['other'],
    configInput: dynamic(() => import('@/components/builder-components/form1').then(mod => mod.Editor)),
    component: dynamic(() => import('@/components/builder-components/form1').then(mod => mod.Component)),
    examples: [
      {
        "content": {
          "title": "<p style=\"text-align: center\">Contact Us</p>",
          "fields": [
            {
              "name": "name",
              "type": "text",
              "label": "<p>Name</p>",
              "placeholder": "Enter your name"
            },
            {
              "name": "phone",
              "type": "number",
              "label": "<p>Phone</p>",
              "placeholder": "Enter your Phone Number"
            },
            {
              "name": "message",
              "type": "textarea",
              "label": "<p>Message</p>",
              "placeholder": "Enter your message"
            }
          ],
          "submitButton": {
            "color": "#ef5252",
            "label": "<p><span style=\"color: rgb(255, 255, 255)\">Submit</span></p>",
            "action": {
              "href": "https://wa.me/919548983448?text=name%3D{{name}}%0Aphone%3D{{phone}}%0Amessage%3D{{message}}",
              "type": "link"
            }
          }
        },
        "container": {
          "id": "contact"
        }
      }
    ]
  },
  {
    id: '8',
    name: "Icons",
    tags: ['other'],
    configInput: dynamic(() => import('@/components/builder-components/icons1').then(mod => mod.Editor)),
    component: dynamic(() => import('@/components/builder-components/icons1').then(mod => mod.Component)),
    examples: [
      {
        "content": {
          "cards": [
            {
              "icon": {
                "url": `${process.env.NEXT_PUBLIC_BASE_URL}/images/logo.svg`
              },
              "title": "Feature title",
              "paragraph": "Short description"
            },
            {
              "icon": {
                "url": `${process.env.NEXT_PUBLIC_BASE_URL}/images/logo.svg`
              },
              "title": "Feature title",
              "paragraph": "Short description"
            },
            {
              "icon": {
                "url": `${process.env.NEXT_PUBLIC_BASE_URL}/images/logo.svg`
              },
              "title": "Feature title",
              "paragraph": "Short description"
            }
          ],
          "title": "<p>Features</p>",
          "paragraph": "<p>Features we offer</p>"
        }
      }
    ]
  },
  {
    id: '9',
    name: "Gallery",
    tags: ['other'],
    configInput: dynamic(() => import('@/components/builder-components/gallery1').then(mod => mod.Editor)),
    component: dynamic(() => import('@/components/builder-components/gallery1').then(mod => mod.Component)),
    examples: [
      {
        "content": {
          "items": [
            {
              "url": `${process.env.NEXT_PUBLIC_BASE_URL}/images/test.svg`,
              "type": "image",
            },
            {
              "url": `${process.env.NEXT_PUBLIC_BASE_URL}/images/test.svg`,
              "type": "image"
            },
            {
              "url": `${process.env.NEXT_PUBLIC_BASE_URL}/images/test.svg`,
              "type": "image"
            },
            {
              "url": `${process.env.NEXT_PUBLIC_BASE_URL}/images/test.svg`,
              "type": "image"
            },
            {
              "url": `${process.env.NEXT_PUBLIC_BASE_URL}/images/test.svg`,
              "type": "image"
            },
            {
              "url": `${process.env.NEXT_PUBLIC_BASE_URL}/images/test.svg`,
              "type": "image"
            },
            {
              "url": `${process.env.NEXT_PUBLIC_BASE_URL}/images/test.svg`,
              "type": "image"
            }
          ],
          "title": "<p style=\"text-align: center\">Gallery</p>"
        }
      }
    ]
  },
  {
    id: '10',
    name: "Carousel Cards",
    tags: ['cta'],
    configInput: dynamic(() => import('@/components/builder-components/carouselCards').then(mod => mod.Editor)),
    component: dynamic(() => import('@/components/builder-components/carouselCards').then(mod => mod.Component)),
    examples: [
      {
        "layout": {
          "carousel": {
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
    id: '11',
    name: "Timeline",
    tags: ['other'],
    configInput: dynamic(() => import('@/components/builder-components/timeline').then(mod => mod.Editor)),
    component: dynamic(() => import('@/components/builder-components/timeline').then(mod => mod.Component)),
    examples: [
      {
        "content": {
          "items": [
            {
              "media": {
                "url": `${process.env.NEXT_PUBLIC_BASE_URL}/images/test.svg`,
                "type": "image",
                "objectFit": "contain"
              },
              "title": "<p>Full Stack Developer - 1 year</p>",
              "paragraph": "<ul style=\"list-style-type: disc; padding-left: 1.25rem; margin-bottom: 0.5rem;\"><li style=\"margin-bottom: 0.25rem;\"><p>Worked on abcd efgh ijkl</p></li><li style=\"margin-bottom: 0.25rem;\"><p>Worked on mnop qrst uvwx</p></li><li style=\"margin-bottom: 0.25rem;\"><p>Worked on yz</p></li></ul>",
              "description": "Step description"
            },
            {
              "title": "<p>Full Stack Developer - 1 year</p>",
              "paragraph": "<ul style=\"list-style-type: disc; padding-left: 1.25rem; margin-bottom: 0.5rem;\"><li style=\"margin-bottom: 0.25rem;\"><p>Worked on abcd efgh ijkl</p></li><li style=\"margin-bottom: 0.25rem;\"><p>Worked on mnop qrst uvwx</p></li><li style=\"margin-bottom: 0.25rem;\"><p>Worked on yz</p></li></ul>",
              "description": "Step description"
            },
            {
              "title": "<p style=\"text-align: left\">Full Stack Developer - 1 year</p>",
              "paragraph": "<ul style=\"list-style-type: disc; padding-left: 1.25rem; margin-bottom: 0.5rem;\"><li style=\"margin-bottom: 0.25rem;\"><p style=\"text-align: left\">Worked on abcd efgh ijkl</p></li><li style=\"margin-bottom: 0.25rem;\"><p style=\"text-align: left\">Worked on mnop qrst uvwx</p></li><li style=\"margin-bottom: 0.25rem;\"><p style=\"text-align: left\">Worked on yz</p></li></ul>",
              "description": "Step description"
            },
            {
              "media": {
                "url": `${process.env.NEXT_PUBLIC_BASE_URL}/images/test.svg`,
                "type": "image",
                "objectFit": "contain"
              },
              "title": "<p>Full Stack Developer - 1 year</p>",
              "paragraph": "<ul style=\"list-style-type: disc; padding-left: 1.25rem; margin-bottom: 0.5rem;\"><li style=\"margin-bottom: 0.25rem;\"><p style=\"text-align: left\">Worked on abcd efgh ijkl</p></li><li style=\"margin-bottom: 0.25rem;\"><p style=\"text-align: left\">Worked on mnop qrst uvwx</p></li><li style=\"margin-bottom: 0.25rem;\"><p style=\"text-align: left\">Worked on yz</p></li></ul>",
              "description": "Step description"
            }
          ],
          "title": "<p style=\"text-align: center\"> Experience</p>",
          "paragraph": "<p style=\"text-align: center\">This is my experience</p>"
        },
        "timeline": {
          "color": "#000000"
        },
        "container": {}
      }
    ]
  },
  {
    id: '12',
    name: "BlockQuote",
    tags: ['other'],
    configInput: dynamic(() => import('@/components/builder-components/blockquote').then(mod => mod.Editor)),
    component: dynamic(() => import('@/components/builder-components/blockquote').then(mod => mod.Component)),
    examples: [
      {
        "content": {
          "title": "<p>Personal Details</p>",
          "button": {
            "color": "#5c5fff",
            "label": "<p><span style=\"color: #ffffff\">About Me</span></p>"
          },
          "paragraph": "<p><span style=\"color: #292929\">I am a passionate Full Stack Web Developer with extensive experience in designing, developing, and maintaining robust web applications. My expertise lies in leveraging technologies such as React, Next.js, Node.js, and Express.js to create responsive and dynamic interfaces that enhance user engagement and satisfaction. Throughout my career, I have successfully implemented RESTful APIs for smooth client-server communication and utilized MongoDB, SQL, and Sequelize for efficient database management.</span><br><br></p><p><span style=\"color: #292929\">I have a strong background in cloud services, particularly AWS, ensuring scalability and uptime for applications. Collaborating closely with cross-functional teams, including UI/UX designers, I strive to deliver user-friendly interfaces that optimize user experiences. My dedication to continuous learning drives me to explore and integrate new technologies, enhancing development workflows and staying ahead in the ever-evolving tech landscape. Passionate about crafting seamless digital experiences, I am committed to delivering innovative solutions that meet project goals and exceed expectations.</span></p>"
        },
        "blockquote": {
          "color": "#5c5fff",
          "backgroundColor": "#f5f5f5"
        }
      }
    ]
  },

]

export default builderComponents