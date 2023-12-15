// Insert between script tags
// Local development script
const intervalLocal = setInterval(()=>{
    document.addEventListener('memberData', function(event) {
        console.log('Event dispatched!');
        console.log('Event data:', event.detail);
        clearInterval(intervalLocal)
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
    clearInterval(intervalLocal)
}, 20000)

// Webflow script
const memberstack = window.$memberstackDom;
const intervalWebflow = setInterval(()=>{
    document.addEventListener('memberData', function(event) {
        console.log('Event dispatched!');
        console.log('Event data:', event.detail);
        clearInterval(intervalWebflow)
    });
    memberstack.getCurrentMember()
    .then(async ({ data: member }) => {
        if (member) {
        let memberJson = await memberstack.getMemberJSON();
        document.dispatchEvent(new CustomEvent('memberData', { detail: memberJson}));
    }
    })
}, 5000)

setTimeout(()=>{
    clearInterval(intervalWebflow)
}, 20000)