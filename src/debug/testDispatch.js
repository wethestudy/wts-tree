// Insert between script tags
// Local development script
const intervalLocal100 = setInterval(()=>{
    document.addEventListener('memberData', function(event) {
        console.log('Event dispatched!');
        console.log('Event data:', event.detail);
        clearInterval(intervalLocal100)
    });
    let memberJson = {data:{
    "completedArticlesID": [
        "receR3QWJziq79jYm",
        "rec45eAk7qieXpK0Q"
    ]
    }};
    document.dispatchEvent(new CustomEvent('memberData', { detail: memberJson}));
}, 5000)

setTimeout(()=>{
    clearInterval(intervalLocal100)
}, 20000)

// New local development script as of V1.06
const intervalLocal106 = setInterval(()=>{
    document.addEventListener('memberData', function(event) {clearInterval(intervalLocal106)});
    let customFields = {"certificate-name": "John Doe"}
    let memberJSON = {data: {"completedArticlesID": [], "masteredArticlesID": []}};
    let view = {type: "default", parameters: {object: null}};
    let dispatchOptions = {member: memberJSON, customFields: customFields, view: view}
    document.dispatchEvent(new CustomEvent('memberData', { detail: dispatchOptions}));
}, 5000)
setTimeout(()=>{
    clearInterval(intervalLocal106)
}, 20000)

// Webflow script
// const memberstack = window.$memberstackDom;
const intervalWebflow100 = setInterval(()=>{
    document.addEventListener('memberData', function(event) {
        console.log('Event dispatched!');
        console.log('Event data:', event.detail);
        clearInterval(intervalWebflow100)
    });
    try{
        memberstack.getCurrentMember()
        .then(async ({ data: member }) => {
            if (member) {
                let memberJson = await memberstack.getMemberJSON();
                document.dispatchEvent(new CustomEvent('memberData', { detail: memberJson}));
            } else {
                let memberJson = {data:{"completedArticlesID": []}};
                document.dispatchEvent(new CustomEvent('memberData', { detail: memberJson}));
            }
        })
    } catch {
        let memberJson = {data:{"completedArticlesID": []}};
        document.dispatchEvent(new CustomEvent('memberData', { detail: memberJson}));
    }
}, 5000)
setTimeout(()=>{
    clearInterval(intervalWebflow100)
}, 20000)

//V1.06 Dispatch Code
// const memberstack = window.$memberstackDom;
const intervalWebflow106 = setInterval(()=>{
    document.addEventListener('memberData', function(event) {clearInterval(intervalWebflow106)});
    let customFields = {"certificate-name": "John Doe",}
    let memberJSON = {data:{"completedArticlesID": [], "masteredArticlesID": []}};
    let view = {type: "default", parameters: {object: null}};
    let dispatchOptions = {member: memberJSON, customFields: customFields, view: view}
    try {
        memberstack.getCurrentMember()
            .then(async ({ data: member }) => {
                if (member) {
                    customFields = {"certificate-name": member.customFields["certificate-name"]}
                    memberJSON = await memberstack.getMemberJSON();
                    view = {type: "default", parameters: {object: null}};
                    dispatchOptions = {member: memberJSON, customFields: customFields, view: view}   
                }
                if (window.location.origin === "https://wethestudy.webflow.io"){
                    document.dispatchEvent(new CustomEvent('memberData', { detail: dispatchOptions}));
                }
                
            })
        } catch {
            if (window.location.origin === "https://wethestudy.webflow.io"){
                document.dispatchEvent(new CustomEvent('memberData', { detail: dispatchOptions})); 
            }
        }
}, 5000)
setTimeout(()=>{
    clearInterval(intervalWebflow106)
}, 20000)