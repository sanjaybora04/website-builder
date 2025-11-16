import { Website } from "./types";

export type Template = {
    id:string,
    name:string,
    previewUrl?: string,
    image?: string,
    website:Website
}

export const templates:Template[] = [
    {
        id:'1',
        name: "Blank",
        website:{
            name: "New Website",
            favicon: `${process.env.NEXT_PUBLIC_BASE_URL}/images/logo.png`,
            pages: [
                {
                    path:'/',
                    title:"HomePage",
                    description:"description",
                    components: []
                }
            ]
        }
    },
    {
      id:'2',
      name: "Portfolio",
      image: "https://s3.sanjaybora.in/sitecraft/6b027439-4921-424e-aa0c-d70ebe32a05d/66aac6a5-5583-4ecc-be89-fb56fb3b08ae",
      previewUrl: "https://sanjaybora.sitecraft.in",
      website: {
        "name": "Portfolio",
        "favicon": "https://s3.sanjaybora.in/sitecraft/6b027439-4921-424e-aa0c-d70ebe32a05d/2377c7f2-9583-4f1f-8f8c-671451213023",
        "pages": [
          {
            "path": "/",
            "image": "https://s3.sanjaybora.in/sitecraft/6b027439-4921-424e-aa0c-d70ebe32a05d/66aac6a5-5583-4ecc-be89-fb56fb3b08ae",
            "title": "HomePage",
            "components": [
              {
                "id": "1",
                "name": "Header",
                "dndId": "6446ee86-dd4a-43e4-b659-a9666dadfbb1",
                "index": 0,
                "config": {
                  "layout": {
                    "backgroundColor": "#ffffff"
                  },
                  "content": {
                    "logo": {
                      "url": "https://s3.sanjaybora.in/sitecraft/6b027439-4921-424e-aa0c-d70ebe32a05d/2377c7f2-9583-4f1f-8f8c-671451213023",
                      "type": "image",
                      "objectFit": "contain"
                    },
                    "title": "<p>Sanjay</p>",
                    "buttons": [
                      {
                        "link": "#",
                        "size": "default",
                        "label": "<p>Home</p>",
                        "action": {
                          "href": "/",
                          "type": "link"
                        },
                        "variant": "default"
                      },
                      {
                        "link": "#",
                        "size": "sm",
                        "label": "<p>About Us</p>",
                        "action": {
                          "href": "/about",
                          "type": "link"
                        },
                        "variant": "default"
                      },
                      {
                        "link": "#",
                        "size": "sm",
                        "color": "#5c5fff",
                        "label": "<p><span style=\"color: rgb(255, 255, 255)\">Contact Me</span></p>",
                        "action": {
                          "href": "/contact",
                          "type": "link"
                        },
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
                      "url": "https://s3.sanjaybora.in/sitecraft/6b027439-4921-424e-aa0c-d70ebe32a05d/53678138-9c08-4eb4-b635-78645b64dbe1",
                      "type": "image",
                      "objectFit": "contain"
                    },
                    "title": "<h1>Hi, I am <span style=\"color: rgb(92, 95, 255)\"><strong>Sanjay</strong></span></h1>",
                    "button": {
                      "size": "default",
                      "color": "#5c5fff",
                      "label": "<p><span style=\"color: #ffffff\"><strong>My Projects →</strong></span></p>",
                      "action": {
                        "href": "#projects",
                        "type": "link"
                      },
                      "variant": "default"
                    },
                    "paragraph": "<p><em>“</em><span style=\"color: rgb(107, 114, 128)\"><em>Programming isn't about following every new trend, it's about solving real world problems with right tools.</em></span><em>”</em></p>"
                  },
                  "container": {
                    "backgroundColor": "#f5f5f5"
                  }
                }
              },
              {
                "id": "12",
                "name": "BlockQuote",
                "dndId": "0e09a697-7786-4268-bc84-00b9dfabb238",
                "index": 2,
                "config": {
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
              },
              {
                "id": "8",
                "name": "Icons",
                "dndId": "c7a4175a-89cf-4fb9-824b-8f6960b714b2",
                "index": 3,
                "config": {
                  "content": {
                    "cards": [
                      {
                        "icon": {
                          "url": "https://s3.sanjaybora.in/sitecraft/6b027439-4921-424e-aa0c-d70ebe32a05d/600af0d5-6741-4e32-a03b-b2dfdf1647f8",
                          "type": "image"
                        },
                        "title": "<p>Full Stack Development</p>",
                        "paragraph": "<p><span style=\"color: rgb(107, 114, 128)\">Developing seamless web applications with expertise in React, Next.js, Node.js, and Express.js.</span></p>"
                      },
                      {
                        "icon": {
                          "url": "https://s3.sanjaybora.in/sitecraft/6b027439-4921-424e-aa0c-d70ebe32a05d/5b844e4c-5d42-453d-9780-ba19e181e203",
                          "type": "image"
                        },
                        "title": "<h4><strong>DevOps &amp; Cloud Computing</strong></h4>",
                        "paragraph": "<p><span style=\"color: rgb(107, 114, 128)\">Streamlining deployments with CI/CD pipelines, Docker, Kubernetes, and leveraging AWS and GCP for scalable infrastructure.</span></p>"
                      },
                      {
                        "icon": {
                          "url": "https://s3.sanjaybora.in/sitecraft/6b027439-4921-424e-aa0c-d70ebe32a05d/2774d96d-3c01-45cf-83ce-eb36b659aa2a",
                          "type": "image"
                        },
                        "title": "<p>System Design</p>",
                        "paragraph": "<p style=\"text-align: center\">Designing modular and scalable system architectures to handle growth and high traffic effectively.</p>"
                      }
                    ],
                    "title": "<p>Area Of Expertise</p>",
                    "paragraph": "<p>Things I am good at...</p>"
                  },
                  "container": {
                    "backgroundColor": "#f5f5f5"
                  }
                }
              },
              {
                "id": "2",
                "name": "Cards",
                "dndId": "a5a2309d-fc3d-4f97-bbdb-f20034250537",
                "index": 4,
                "config": {
                  "card": {
                    "backgroundColor": "#f5f5f5"
                  },
                  "content": {
                    "cards": [
                      {
                        "image": {
                          "url": "https://s3.sanjaybora.in/sitecraft/6b027439-4921-424e-aa0c-d70ebe32a05d/83f50f42-520c-4628-b881-01bef7763bef",
                          "type": "image"
                        },
                        "title": "<p style=\"text-align: left\"><strong>Shadfinity</strong></p>",
                        "button": {
                          "size": "default",
                          "label": "<p><u>View↗</u></p>",
                          "action": {
                            "href": "https://shadfinity.sanjaybora.in",
                            "type": "link"
                          },
                          "variant": "link"
                        },
                        "paragraph": "<p style=\"text-align: left\"><a target=\"_blank\" rel=\"noreferrer\" href=\"https://shadfinity.sanjaybora.in/?_gl=1*hzfce7*_ga*MTIwODMwNzMwMC4xNzM2NzgxOTI1*_ga_T0C2T89RB7*czE3NTEwMzAwMDUkbzEyNiRnMCR0MTc1MTAzMDAwOCRqNTckbDAkaDA.\">A shadcn registry for advance shadcn components</a></p>"
                      },
                      {
                        "image": {
                          "url": "https://s3.sanjaybora.in/sitecraft/6b027439-4921-424e-aa0c-d70ebe32a05d/f574bedb-1dfa-4218-b166-b8bada04d70f",
                          "type": "image"
                        },
                        "title": "<p><strong>Free Resume Builder</strong></p>",
                        "button": {
                          "label": "<p><u>View↗</u></p>",
                          "action": {
                            "href": "https://resumebuilder.sanjybora.in",
                            "type": "link"
                          },
                          "variant": "link"
                        },
                        "paragraph": "<p>Enter your information and select from variety of templates to build your resume</p>"
                      },
                      {
                        "image": {
                          "url": "https://s3.sanjaybora.in/sitecraft/6b027439-4921-424e-aa0c-d70ebe32a05d/c8d71861-2c85-41e0-bbfa-c270c62bedea",
                          "type": "image"
                        },
                        "title": "<p><strong>SiteCraft</strong></p>",
                        "button": {
                          "size": "lg",
                          "label": "<p><u>View↗</u></p>",
                          "action": {
                            "href": "https://sitecraft.in",
                            "type": "link"
                          },
                          "variant": "link"
                        },
                        "paragraph": "<p>A Visual Component based drag&amp;drop website builder</p>"
                      }
                    ],
                    "title": "<p style=\"text-align: center\">My Latest Projects</p>",
                    "paragraph": "<p style=\"text-align: center\">Take a look at my recent work.</p>"
                  }
                }
              },
              {
                "id": "2",
                "name": "Cards",
                "dndId": "57e3c73a-a290-4232-8e38-dff18fc460ed",
                "index": 5,
                "config": {
                  "card": {
                    "backgroundColor": "#ffffff"
                  },
                  "content": {
                    "cards": [
                      {
                        "image": {
                          "url": "https://s3.sanjaybora.in/sitecraft/6b027439-4921-424e-aa0c-d70ebe32a05d/98c29ed6-12d9-46fe-a984-e4c4bec27366",
                          "type": "image",
                          "objectFit": "contain"
                        },
                        "title": "<p style=\"text-align: left\"><a target=\"_blank\" rel=\"noopener noreferrer nofollow\" href=\"https://www.youtube.com/@sanjaybora04\"><strong>YouTube</strong></a></p>",
                        "button": {
                          "size": "default",
                          "label": "<p><u>View↗</u></p>",
                          "action": {
                            "href": "https://www.youtube.com/@sanjaybora04",
                            "type": "link"
                          },
                          "variant": "link"
                        },
                        "paragraph": "<p><a target=\"_blank\" rel=\"noopener noreferrer nofollow\" href=\"https://www.youtube.com/@sanjaybora04\">Explore my coding tutorials and tech content on YouTube.</a></p>"
                      },
                      {
                        "image": {
                          "url": "https://s3.sanjaybora.in/sitecraft/6b027439-4921-424e-aa0c-d70ebe32a05d/f805c615-1be2-4271-adbb-375939147df3",
                          "type": "image",
                          "objectFit": "contain"
                        },
                        "title": "<p><a target=\"_blank\" rel=\"noopener noreferrer nofollow\" href=\"https://github.com/sanjaybora04\"><strong>Github</strong></a></p>",
                        "button": {
                          "label": "<p><u>View↗</u></p>",
                          "action": {
                            "href": "https://github.com/sanjaybora04",
                            "type": "link"
                          },
                          "variant": "link"
                        },
                        "paragraph": "<p><a target=\"_blank\" rel=\"noopener noreferrer nofollow\" href=\"https://github.com/sanjaybora04\">My base-of-operations for all things i code</a></p>"
                      },
                      {
                        "image": {
                          "url": "https://s3.sanjaybora.in/sitecraft/6b027439-4921-424e-aa0c-d70ebe32a05d/9d664376-4863-473b-a7d9-2a4f753bd9f4",
                          "type": "image",
                          "objectFit": "contain"
                        },
                        "title": "<p><a target=\"_blank\" rel=\"noopener noreferrer nofollow\" href=\"https://linkedin.com/in/sanjaybora04\"><strong>LinkedIn</strong></a></p>",
                        "button": {
                          "size": "lg",
                          "label": "<p><u>View↗</u></p>",
                          "action": {
                            "href": "https://linkedin.com/in/sanjaybora04",
                            "type": "link"
                          },
                          "variant": "link"
                        },
                        "paragraph": "<p><a target=\"_blank\" rel=\"noopener noreferrer nofollow\" href=\"https://linkedin.com/in/sanjaybora04\">Connect with me on Linkedin for professionsl networking</a></p>"
                      }
                    ],
                    "title": "<p style=\"text-align: center\">Social Platforms</p>",
                    "paragraph": "<p style=\"text-align: center\">Find me on these platforms</p>"
                  },
                  "container": {
                    "backgroundColor": "#f5f5f5"
                  }
                }
              },
              {
                "id": "6",
                "name": "Footer",
                "dndId": "a99c9004-3608-4875-b000-dde4a61ceb18",
                "index": 6,
                "config": {
                  "content": {
                    "logo": {
                      "url": "https://s3.sanjaybora.in/sitecraft/6b027439-4921-424e-aa0c-d70ebe32a05d/2377c7f2-9583-4f1f-8f8c-671451213023",
                      "type": "image"
                    },
                    "title": "<p>Sanjay</p>",
                    "groups": [
                      {
                        "links": [
                          {
                            "href": "/",
                            "label": "Home"
                          },
                          {
                            "href": "/about",
                            "label": "About"
                          },
                          {
                            "href": "/contact",
                            "label": "Contact Me"
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
                        "title": "Contact Me"
                      }
                    ],
                    "socials": {
                      "color": "#ffffff",
                      "github": "https://github.com/sanjaybora04",
                      "youtube": "https://www.youtube.com/@sanjaybora04",
                      "linkedin": "https://www.linkedin.com/in/sanjaybora04/"
                    },
                    "copyright": "<p><span style=\"color: rgb(189, 189, 189)\">Copyright@Sanjay | All Rights Reserved</span></p>",
                    "paragraph": "<p>This is My portfolio</p>"
                  },
                  "container": {
                    "color": "#ffffff",
                    "backgroundColor": "#000000"
                  }
                }
              }
            ],
            "description": "description"
          },
          {
            "path": "/about",
            "image": "",
            "title": "About Me",
            "components": [
              {
                "id": "1",
                "name": "Header",
                "dndId": "971215e8-e496-49e4-9426-9c23d50cc764",
                "index": 0,
                "config": {
                  "layout": {
                    "backgroundColor": "#ffffff"
                  },
                  "content": {
                    "logo": {
                      "url": "https://s3.sanjaybora.in/sitecraft/6b027439-4921-424e-aa0c-d70ebe32a05d/2377c7f2-9583-4f1f-8f8c-671451213023",
                      "type": "image",
                      "objectFit": "contain"
                    },
                    "title": "<p>Sanjay</p>",
                    "buttons": [
                      {
                        "link": "#",
                        "size": "default",
                        "label": "<p>Home</p>",
                        "action": {
                          "href": "/",
                          "type": "link"
                        },
                        "variant": "default"
                      },
                      {
                        "link": "#",
                        "size": "sm",
                        "label": "<p>About Us</p>",
                        "action": {
                          "href": "/about",
                          "type": "link"
                        },
                        "variant": "default"
                      },
                      {
                        "link": "#",
                        "size": "sm",
                        "color": "#5c5fff",
                        "label": "<p><span style=\"color: rgb(255, 255, 255)\">Contact Me</span></p>",
                        "action": {
                          "href": "/contact",
                          "type": "link"
                        },
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
                "id": "2",
                "name": "Cards",
                "dndId": "bf7f99dc-7be3-45e0-8424-ca007f2d78f3",
                "index": 1,
                "config": {
                  "content": {
                    "cards": [],
                    "title": "<p style=\"text-align: center\">Heres Some Info About Me</p>",
                    "paragraph": "<p style=\"text-align: center\"><br>I am an experienced Full Stack Web Developer specializing in React, Next.js, Node.js, and Express.js.<br> Skilled in AWS, MongoDB, and RESTful APIs. Dedicated to creating seamless, user-centric web applications.</p>"
                  },
                  "container": {
                    "color": "#ffffff",
                    "backgroundColor": "#5c5fff"
                  }
                }
              },
              {
                "id": "11",
                "name": "Timeline",
                "dndId": "4ae47170-5f3f-4520-9b67-074021c1f23e",
                "index": 2,
                "config": {
                  "content": {
                    "items": [
                      {
                        "title": "<p><strong>Full Stack Developer</strong></p>",
                        "paragraph": "<p>Webtoils Development</p><p><span style=\"color: #545454\">July 2024</span><br><br></p><ul style=\"list-style-type: disc; padding-left: 1.25rem; margin-bottom: 0.5rem;\"><li style=\"margin-bottom: 0.25rem;\"><p>Led development of content websites like <a target=\"_blank\" rel=\"noopener noreferrer nofollow\" href=\"http://zweibay.de\">zweibay.de</a>, <a target=\"_blank\" rel=\"noopener noreferrer nofollow\" href=\"http://renovlange.de\">renovlange.de</a></p></li><li style=\"margin-bottom: 0.25rem;\"><p>Created an online reservation system for coworking space bookings.</p></li><li style=\"margin-bottom: 0.25rem;\"><p>Set up WhatsApp API for automated chatbot and Google Sheets integration.</p></li><li style=\"margin-bottom: 0.25rem;\"><p>Managed a team of 2 interns building content-based websites.</p></li><li style=\"margin-bottom: 0.25rem;\"><p>Developed interactive user interfaces and backend services for content projects.</p></li></ul>",
                        "description": "Step description"
                      },
                      {
                        "title": "<h4><strong>Freelance Project</strong></h4>",
                        "paragraph": "<p style=\"text-align: justify\">JoinYourTrip</p><p><span style=\"color: rgb(92, 92, 92)\">August 2023</span></p><p><a target=\"_blank\" rel=\"noopener noreferrer nofollow\" href=\"https://joinyourtrip.com\"><span style=\"color: rgb(0, 4, 255)\">View↗</span></a></p><ul style=\"list-style-type: disc; padding-left: 1.25rem; margin-bottom: 0.5rem;\"><li style=\"margin-bottom: 0.25rem;\"><p>Built with Next.js, Express, Sequelize for full-stack development.</p></li><li style=\"margin-bottom: 0.25rem;\"><p>Integrated Razorpay for secure payment processing and booking functionality.</p></li><li style=\"margin-bottom: 0.25rem;\"><p>Developed responsive, user-friendly travel listings with advanced filtering options.</p></li><li style=\"margin-bottom: 0.25rem;\"><p>Admin dashboard for managing listings, bookings, and user data.</p></li><li style=\"margin-bottom: 0.25rem;\"><p>Deployed on Vercel and AWS/Heroku for high availability and scalability.</p></li></ul>",
                        "description": "Step description"
                      },
                      {
                        "title": "<h4><strong>Software Developer(Intern)</strong></h4>",
                        "paragraph": "<p>IOTIOT -Artificial Intelligence</p><p><span style=\"color: #4f4f4f\">November 2022</span></p><p><a target=\"_blank\" rel=\"noopener noreferrer nofollow\" href=\"https://sanjaybora.in/docs/IOTIOTPI0172_SanjayBora.pdf\"><span style=\"color: #0008ff\">Certificate↗</span></a></p><ul style=\"list-style-type: disc; padding-left: 1.25rem; margin-bottom: 0.5rem;\"><li style=\"margin-bottom: 0.25rem;\"><p>Created algorithm utilizing deep learning methods to identify and categorize objects in images.</p></li><li style=\"margin-bottom: 0.25rem;\"><p>Executed computer vision workflows for real-time object detection, tracking and identification.</p></li></ul>",
                        "description": "Step description"
                      }
                    ],
                    "title": "<p style=\"text-align: center\">Experience</p>",
                    "paragraph": "<p style=\"text-align: center\">This is my experience</p>"
                  },
                  "timeline": {
                    "color": "#5c5fff"
                  },
                  "container": {}
                }
              },
              {
                "id": "6",
                "name": "Footer",
                "dndId": "20523216-33ac-44ed-ab91-b886a6006a38",
                "index": 3,
                "config": {
                  "content": {
                    "logo": {
                      "url": "https://s3.sanjaybora.in/sitecraft/6b027439-4921-424e-aa0c-d70ebe32a05d/2377c7f2-9583-4f1f-8f8c-671451213023",
                      "type": "image"
                    },
                    "title": "<p>Sanjay</p>",
                    "groups": [
                      {
                        "links": [
                          {
                            "href": "/",
                            "label": "Home"
                          },
                          {
                            "href": "/about",
                            "label": "About"
                          },
                          {
                            "href": "/contact",
                            "label": "Contact Me"
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
                        "title": "Contact Me"
                      }
                    ],
                    "socials": {
                      "color": "#ffffff",
                      "github": "https://github.com/sanjaybora04",
                      "youtube": "https://www.youtube.com/@sanjaybora04",
                      "linkedin": "https://www.linkedin.com/in/sanjaybora04/"
                    },
                    "copyright": "<p><span style=\"color: rgb(189, 189, 189)\">Copyright@Sanjay | All Rights Reserved</span></p>",
                    "paragraph": "<p>This is My portfolio</p>"
                  },
                  "container": {
                    "color": "#ffffff",
                    "backgroundColor": "#000000"
                  }
                }
              }
            ],
            "description": "About Me page"
          },
          {
            "path": "/contact",
            "image": "",
            "title": "Contact Me",
            "components": [
              {
                "id": "1",
                "name": "Header",
                "dndId": "a27f1cfa-e6c8-4e3d-8a44-e796833ef2d7",
                "index": 0,
                "config": {
                  "layout": {
                    "backgroundColor": "#ffffff"
                  },
                  "content": {
                    "logo": {
                      "url": "https://s3.sanjaybora.in/sitecraft/6b027439-4921-424e-aa0c-d70ebe32a05d/2377c7f2-9583-4f1f-8f8c-671451213023",
                      "type": "image",
                      "objectFit": "contain"
                    },
                    "title": "<p>Sanjay</p>",
                    "buttons": [
                      {
                        "link": "#",
                        "size": "default",
                        "label": "<p>Home</p>",
                        "action": {
                          "href": "/",
                          "type": "link"
                        },
                        "variant": "default"
                      },
                      {
                        "link": "#",
                        "size": "sm",
                        "label": "<p>About Us</p>",
                        "action": {
                          "href": "/about",
                          "type": "link"
                        },
                        "variant": "default"
                      },
                      {
                        "link": "#",
                        "size": "sm",
                        "color": "#5c5fff",
                        "label": "<p><span style=\"color: rgb(255, 255, 255)\">Contact Me</span></p>",
                        "action": {
                          "href": "/contact",
                          "type": "link"
                        },
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
                "id": "7",
                "name": "Form",
                "dndId": "a095f9c9-eca4-4723-a127-4c5411c0cc12",
                "index": 1,
                "config": {
                  "form": {},
                  "content": {
                    "title": "<p style=\"text-align: center\">Contact Me</p>",
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
                      "color": "#5c5fff",
                      "label": "<p><span style=\"color: rgb(255, 255, 255)\">Submit</span></p>",
                      "action": {
                        "href": "https://wa.me/919548983448?text=name%3D{{name}}%0Aphone%3D{{phone}}%0Amessage%3D{{message}}",
                        "type": "form"
                      }
                    }
                  },
                  "container": {
                    "id": "contact"
                  }
                }
              },
              {
                "id": "2",
                "name": "Cards",
                "dndId": "c953ca92-71ec-427c-a539-5d4e6889c2c9",
                "index": 2,
                "config": {
                  "content": {
                    "cards": [],
                    "title": "<p><br><br><br><br><br></p>",
                    "paragraph": "<p></p>"
                  },
                  "container": {}
                }
              },
              {
                "id": "6",
                "name": "Footer",
                "dndId": "e319d4cc-7493-4096-a60f-8a42053c5233",
                "index": 3,
                "config": {
                  "content": {
                    "logo": {
                      "url": "https://s3.sanjaybora.in/sitecraft/6b027439-4921-424e-aa0c-d70ebe32a05d/2377c7f2-9583-4f1f-8f8c-671451213023",
                      "type": "image"
                    },
                    "title": "<p>Sanjay</p>",
                    "groups": [
                      {
                        "links": [
                          {
                            "href": "/",
                            "label": "Home"
                          },
                          {
                            "href": "/about",
                            "label": "About"
                          },
                          {
                            "href": "/contact",
                            "label": "Contact Me"
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
                        "title": "Contact Me"
                      }
                    ],
                    "socials": {
                      "color": "#ffffff",
                      "github": "https://github.com/sanjaybora04",
                      "youtube": "https://www.youtube.com/@sanjaybora04",
                      "linkedin": "https://www.linkedin.com/in/sanjaybora04/"
                    },
                    "copyright": "<p><span style=\"color: rgb(189, 189, 189)\">Copyright@Sanjay | All Rights Reserved</span></p>",
                    "paragraph": "<p>This is My portfolio</p>"
                  },
                  "container": {
                    "color": "#ffffff",
                    "backgroundColor": "#000000"
                  }
                }
              }
            ],
            "description": "Contact me page"
          }
        ]
      }
    }
]