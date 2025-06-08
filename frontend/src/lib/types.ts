export type Website = {
    id?: string,
    name: string,
    domain?: string,
    pages: Page[],
    favicon: string,
    googleTag?: string,
}

export type Page = {
    path: string,
    title: string,
    description: string,
    image: string,
    components: Component[]
}

export type Component = {
    index: number,
    dndId: string,
    id: string,
    name: string,
    config: any
}

export type WebsiteEditor = {
    website: Website, // website that is being edited
    leftSidebarOpen: boolean,
    previewSize: 'desktop'|'mobile',
    activePage?: string, // path of current active page
    activeComponent?: string, // index of currently active component
}

export type Tag = 'header'|'hero'|'cta'|'faq'|'reviews'|'footer'|'other'

export type BuilderComponent= {
    id: string,
    name: string,
    tags:Tag[],
    configInput: any,
    component: any,
    examples: any[]
}