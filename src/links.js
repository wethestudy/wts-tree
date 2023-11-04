import { isDevelopment } from './devSettings.js'

const developmentURL = "https://wethestudy.webflow.io"
const productionURL = "https://wethestudy.com"
const netlifyURL = "https://wethestudy-tree.netlify.app"
const url = isDevelopment ? developmentURL : productionURL
const links = {
    treeLink: `${url}/tree`,
    indexLink: `${url}/index`,
    privacyLink: `${url}/privacy-policy`,
    termsLink: `${url}/terms-and-condition`,
    resourcesLink: `${url}/resources/`,
    copyrightYear: `2023`,
    appVersion: `1.0.3`
}
export {links, url}