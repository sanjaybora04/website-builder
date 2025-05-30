import { Website } from "./types";

type Template = {
    name:string,
    website:Website
}

export const templates:Template[] = [
    {
        name: "Blank",
        website:{
            name: "New Website",
            favicon: `${process.env.NEXT_PUBLIC_BASE_URL}/favicon.ico`,
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
    }
]