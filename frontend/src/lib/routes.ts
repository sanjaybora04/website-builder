const Routes = {
    home: "/home",
    overview: '/',
    storage: '/storage',
    settings: '/settings',
    plan: '/plan',
    websiteEditor: (websiteId:string)=>`/website-editor/${websiteId}`,
    preview: '/preview',
    site: '/site'
}

export default Routes