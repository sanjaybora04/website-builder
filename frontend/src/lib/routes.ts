const Routes = {
    overview: '/',
    storage: '/storage',
    settings: '/settings',
    formData: '/form-data',
    blog:'/blog',
    blogPost:(slug:string)=>`/blog/${slug}`,
    websiteEditor: (websiteId:string)=>`/website-editor/${websiteId}`,
    preview: '/preview',
    previewComponent:(componentId:string)=>`/preview-component/${componentId}`,
    site: '/site',
    home: "/home",
    about: '/about',
    pricing: '/pricing',
    contact: '/contact',
    support: '/support',
    addWebsite: '/new'
}

export default Routes