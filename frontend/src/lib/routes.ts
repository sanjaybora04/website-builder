const Routes = {
    overview: '/',
    storage: '/storage',
    settings: '/settings',
    plan: '/plan',
    websiteEditor: (websiteId:string)=>`/website-editor/${websiteId}`,
    preview: '/preview',
    site: '/site',
    home: "/home",
    about: '/about',
    pricing: '/pricing',
    feedback: '/feedback',
    support: '/support'
}

export default Routes