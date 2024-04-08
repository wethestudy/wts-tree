// import { useDevelopmentURLs, useLocalURL } from './devSettings.js'
import getURL from './getURL.js'

// const localURL = "http://localhost:3000/"
// const developmentURL = "https://wethestudy.webflow.io"
// const productionURL = "https://wethestudy.com"
// const netlifyURL = "https://wethestudy-tree.netlify.app"
// const url = useLocalURL ? localURL : useDevelopmentURLs ? developmentURL : productionURL

const url = getURL()
const links = {
    treeLink: `${url}/tree-posts`,
    indexLink: `${url}/tree/list-of-nodes`,
    trackLink: `${url}/tree/list-of-tracks`,
    privacyLink: `${url}/legal/privacy-policy`,
    termsLink: `${url}/legal/terms-and-condition`,
    resourcesLink: `${url}/resource`,
    copyrightYear: `2024`,
    appVersion: `1.1.0`,
    contactLink: `${url}/resources/contact`,
}
const resourceSlugs = ['how-to-use-the-tree-of-knowledge', 'tree-anatomy-and-user-interface', 'general-steps-in-using-the-tree', 'all-about-mastery', 'tree-evolution']
const legalSlugs = ['all-about-mastery']
export {links, resourceSlugs, legalSlugs}