const Routes = {
    home: "/home",
    overview: '/',
    settings: '/settings',
    websiteEditor: (websiteId:string)=>`/website-editor/${websiteId}`,
    preview: '/preview',
    site: '/site'
}

export default Routes