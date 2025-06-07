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
            "name": "Startup Website",
            "favicon": "https://sitecraft.sanjaybora.in/images/logo.png",
            "pages": [
              {
                "path": "/",
                "image": "https://sitecraft.sanjaybora.in/images/test.svg",
                "title": "HomePage",
                "components": [
                  {
                    "id": "1",
                    "name": "Basic Header",
                    "dndId": "e45a8c80-1202-465e-94bf-54f9c3ee637f",
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
                            "bgColor": "#f58484",
                            "variant": "default"
                          }
                        ]
                      }
                    }
                  },
                  {
                    "id": "3",
                    "name": "Basic Hero",
                    "dndId": "6537495d-afd6-419b-8993-0a85e0a691ef",
                    "index": 1,
                    "config": {
                      "layout": {
                        "id": "",
                        "backgroundColor": "#f0ebeb"
                      },
                      "content": {
                        "image": {
                          "url": "https://s3.sanjaybora.in/sitecraft/6b027439-4921-424e-aa0c-d70ebe32a05d/63719a3e-6d71-4e37-ae5b-a55b53143f08",
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
                          "bgColor": "#f58484",
                          "variant": "default"
                        },
                        "paragraph": "<p><br>Lorem ipsum dolor sit amet consectetur <span style=\"color: rgb(255, 114, 94)\"><u>adipisicing</u></span> elit. Ex optio unde consequatur qui esse vitae illo doloremque perspiciatis quae porro impedit<br><br></p><ul style=\"list-style-type: disc; padding-left: 1.25rem; margin-bottom: 0.5rem;\"><li style=\"margin-bottom: 0.25rem;\"><p>hello how are you</p></li><li style=\"margin-bottom: 0.25rem;\"><p>hello i am good how are you</p></li></ul>"
                      }
                    }
                  },
                  {
                    "id": "2",
                    "name": "Basic CTA",
                    "dndId": "78aea1a1-ced3-4fd5-ab52-39f2bccb509b",
                    "index": 2,
                    "config": {
                      "title": "Why choose us?",
                      "image1": "http://localhost:3000/images/test.svg",
                      "image2": "http://localhost:3000/images/test.svg",
                      "image3": "http://localhost:3000/images/test.svg",
                      "layout": {
                        "card": {
                          "backgroundColor": "#f0ebeb"
                        }
                      },
                      "content": {
                        "cards": [
                          {
                            "image": {
                              "url": "https://s3.sanjaybora.in/sitecraft/6b027439-4921-424e-aa0c-d70ebe32a05d/63719a3e-6d71-4e37-ae5b-a55b53143f08"
                            },
                            "title": "Title",
                            "button": {
                              "size": "default",
                              "label": "<p><u>Clcik Me</u><strong><u> →</u></strong></p>",
                              "bgColor": "#f58484",
                              "variant": "link"
                            },
                            "description": "description"
                          },
                          {
                            "image": {
                              "url": "https://s3.sanjaybora.in/sitecraft/6b027439-4921-424e-aa0c-d70ebe32a05d/63719a3e-6d71-4e37-ae5b-a55b53143f08"
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
                              "url": "https://s3.sanjaybora.in/sitecraft/6b027439-4921-424e-aa0c-d70ebe32a05d/63719a3e-6d71-4e37-ae5b-a55b53143f08"
                            },
                            "title": "<p>Title</p>",
                            "button": {
                              "size": "lg",
                              "label": "<p><u>Clcik Me</u><strong><u> →</u></strong></p>",
                              "bgColor": "#f58484",
                              "variant": "link"
                            },
                            "description": "description"
                          }
                        ],
                        "title": "<p style=\"text-align: center\">Why Choose Us?</p>",
                        "image1": {
                          "url": "https://s3.sanjaybora.in/sitecraft/6b027439-4921-424e-aa0c-d70ebe32a05d/63719a3e-6d71-4e37-ae5b-a55b53143f08"
                        },
                        "image2": {
                          "url": "https://s3.sanjaybora.in/sitecraft/6b027439-4921-424e-aa0c-d70ebe32a05d/63719a3e-6d71-4e37-ae5b-a55b53143f08"
                        },
                        "image3": {
                          "url": "https://s3.sanjaybora.in/sitecraft/6b027439-4921-424e-aa0c-d70ebe32a05d/63719a3e-6d71-4e37-ae5b-a55b53143f08"
                        },
                        "paragraph": "<p style=\"text-align: center\">Becaust We are the Best</p>"
                      },
                      "paragraph": "Lorem ipsum dolor sit amet consectetur adipisicing elit. Ex optio unde consequatur qui esse vitae illo doloremque perspiciatis quae porro impedit"
                    }
                  }
                ],
                "description": "description"
              }
            ]
          }
    }
]