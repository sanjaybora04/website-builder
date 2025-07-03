const Routes = {
    overview: '/',
    storage: '/storage',
    settings: '/settings',
    formData: '/form-data',
    websiteEditor: (websiteId:string)=>`/website-editor/${websiteId}`,
    preview: '/preview',
    previewComponent:(componentId:string)=>`/preview-component/${componentId}`,
    site: '/site',
    home: "/home",
    about: '/about',
    pricing: '/pricing',
    contact: '/contact',
    support: '/support'
}

export default Routes