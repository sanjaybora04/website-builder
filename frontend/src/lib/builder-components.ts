import { BuilderComponent } from "./types";
import dynamic from "next/dynamic";

const builderComponents: BuilderComponent[] = [
    {
        id: 'header-1',
        name: "Basic Header",
        description: "Basic header component",
        category: 'header',
        keywords: [],
        configInput: dynamic(()=>import('@/components/builder-components/header').then(mod=>mod.Editor)),
        component: dynamic(()=>import('@/components/builder-components/header').then(mod=>mod.Component)),
        examples: [
            {
                companyName: "SiteCraft"
            }
        ]
    },
    {
        id: 'test',
        name: "Test Component",
        description: "Test",
        category: 'other',
        keywords: [],
        configInput: dynamic(()=>import('@/components/builder-components/test').then(mod=>mod.Editor)),
        component: dynamic(()=>import('@/components/builder-components/test').then(mod=>mod.Component)),
        examples: [
            {
                title: "Lorem ipsum dolor sit amet consectetur,",
                paragraph: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Ex optio unde consequatur qui esse vitae illo doloremque perspiciatis quae porro impedit, praesentium laborum odio provident molestiae dignissimos labore laudantium! Sapiente!'
            }
        ]
    }
]

export default builderComponents