import { useDevelopmentURLs } from './devSettings.js'

const developmentURL = "https://wethestudy.webflow.io"
const productionURL = "https://wethestudy.com"
// const netlifyURL = "https://wethestudy-tree.netlify.app"
const url = useDevelopmentURLs ? developmentURL : productionURL
const links = {
    treeLink: `${url}/tree-posts`,
    indexLink: `${url}/tree/list-of-nodes`,
    privacyLink: `${url}/legal/privacy-policy`,
    termsLink: `${url}/legal/terms-and-condition`,
    resourcesLink: `${url}/resource`,
    copyrightYear: `2024`,
    appVersion: `1.0.5`
}
const resourceSlugs = ['how-to-use-the-tree-of-knowledge']
export {links, url, resourceSlugs}