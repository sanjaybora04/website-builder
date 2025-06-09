import { Website } from "./types";

type Template = {
    name:string,
    image?: string,
    website:Website
}

export const templates:Template[] = [
    {
        name: "Blank",
        website:{
            name: "New Website",
            favicon: `${process.env.NEXT_PUBLIC_BASE_URL}/images/logo.png`,
            pages: [
                {
                    path:'/',
                    title:"HomePage",
                    description:"description",
                    image:`${process.env.NEXT_PUBLIC_BASE_URL}/images/test.svg`,
                    components: []
                }
            ]
        }
    },
    {
        name: "Startup",
        website:{
          "name": "Startup Template",
          "favicon": "https://sitecraft.sanjaybora.in/images/logo.png",
          "pages": [
            {
              "path": "/",
              "image": "http://localhost:3000/images/test.svg",
              "title": "HomePage",
              "components": [
                {
                  "id": "1",
                  "name": "Basic Header",
                  "dndId": "54b3a9fa-59e1-43bd-917c-8bcec06c67a7",
                  "index": 0,
                  "config": {
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
                    },
                    "container": {
                      "backgroundColor": "#ffffff"
                    }
                  }
                },
                {
                  "id": "3",
                  "name": "Hero",
                  "dndId": "8250d573-dbbc-4c06-b17c-0194785801fa",
                  "index": 1,
                  "config": {
                    "layout": {
                      "id": "",
                      "backgroundColor": "#f0ebeb"
                    },
                    "content": {
                      "image": {
                        "url": "https://sitecraft.sanjaybora.in/images/test.svg",
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
                },
                {
                  "id": "2",
                  "name": "Cards",
                  "dndId": "a4149ecc-b2d5-4174-abd4-3c83bfd213f6",
                  "index": 2,
                  "config": {
                    "layout": {
                      "card": {
                        "backgroundColor": "#f0ebeb"
                      }
                    },
                    "content": {
                      "cards": [
                        {
                          "image": {
                            "url": "https://sitecraft.sanjaybora.in/images/test.svg",
                            "objectFit": "cover"
                          },
                          "title": "Title",
                          "button": {
                            "size": "default",
                            "label": "<p><u>Clcik Me</u><strong><u> →</u></strong></p>",
                            "variant": "link"
                          }
                        },
                        {
                          "image": {
                            "url": "https://sitecraft.sanjaybora.in/images/test.svg",
                            "objectFit": "cover"
                          },
                          "title": "Title",
                          "button": {
                            "label": "<p><u>Clcik Me</u><strong><u> →</u></strong></p>",
                            "variant": "link"
                          }
                        },
                        {
                          "image": {
                            "url": "https://sitecraft.sanjaybora.in/images/test.svg",
                            "objectFit": "cover"
                          },
                          "title": "<p>Title</p>",
                          "button": {
                            "size": "lg",
                            "label": "<p><u>Clcik Me</u><strong><u> →</u></strong></p>",
                            "variant": "link"
                          }
                        }
                      ],
                      "title": "<p style=\"text-align: center\">Why Choose Us?</p>",
                      "paragraph": "<p style=\"text-align: center\">Becaust We are the Best</p>"
                    }
                  }
                },
                {
                  "id": "4",
                  "name": "Reviews",
                  "dndId": "3d35c4cf-6d27-434d-95d6-5c531215b846",
                  "index": 3,
                  "config": {
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
                },
                {
                  "id": "5",
                  "name": "FAQ",
                  "dndId": "165b81cf-eb50-4d0b-b2d8-7c29511933ec",
                  "index": 4,
                  "config": {
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
                },
                {
                  "id": "6",
                  "name": "Footer",
                  "dndId": "675d56a6-a9af-4f62-af01-5d9265f46242",
                  "index": 5,
                  "config": {
                    "style": {
                      "backgroundColor": "#f5f5f5"
                    },
                    "content": {
                      "brand": "<p>SiteCraft</p>",
                      "groups": [
                        {
                          "links": [
                            {
                              "href": "/sdf",
                              "label": "Home"
                            },
                            {
                              "href": "/",
                              "label": "Home"
                            }
                          ],
                          "title": "<p>Links</p>"
                        },
                        {
                          "links": [
                            {
                              "href": "/",
                              "label": "Home"
                            },
                            {
                              "href": "/",
                              "label": "Home"
                            }
                          ],
                          "title": "Links"
                        },
                        {
                          "links": [
                            {
                              "href": "/",
                              "label": "Home"
                            },
                            {
                              "href": "/",
                              "label": "Home"
                            }
                          ],
                          "title": "Links"
                        }
                      ],
                      "copyright": "<p>Sitecraft</p>"
                    },
                    "container": {
                      "color": "#ffffff",
                      "backgroundColor": "#000000"
                    }
                  }
                }
              ],
              "description": "description"
            }
          ]
        }
    }
]