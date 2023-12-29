//PARENT CHECK: Check if parent field of post is included in parent's children field
const parentCheck = (database) => {
    console.log('PARENT CHECK')
    let recordCount = 0
    let errorArray = []
    database.forEach((record)=>{
        let postId = record.id
        if(record.fields["Tree: Name"]==='Root'){
            return
        }
        let parentId = record.fields["Tree: Parent Post"][0]
        let parentRecord = database.find((record) => record.id === parentId)

        // For root post (no parentID)
        if(parentRecord === undefined){
            recordCount++
            return
        }

        let childrenArray = parentRecord.fields["Tree: Child Posts"] !== undefined ? parentRecord.fields["Tree: Child Posts"] : undefined
        //If no children
        if(childrenArray === undefined){
            recordCount++
            return
        }

        // Main check
        if(childrenArray.includes(postId)){
            recordCount++
            return
        } else {
            recordCount++
            errorArray.push(record)
        }
    })
    console.log(`Records analyzed: ${recordCount}`)
    if(errorArray.length!==0){
        console.log(`Number of errors: ${errorArray.length}`)
        errorArray.forEach((record)=>{
            console.log(record)
        })
    } else {
        console.log('No problems found')
    }
}

// CHILD CHECK: Check children of parent, then check parent field of each children - must be the same
const childCheck = (database) => {
    console.log('CHILD CHECK')
    let recordCount = 0
    let errorArray = []
    database.forEach((record)=>{
        let postId = record.id
        let postChildren = record.fields["Tree: Child Posts"] !== undefined ? record.fields["Tree: Child Posts"] : undefined
        //If no children
        if(postChildren === undefined){
            recordCount++
            return
        }

        postChildren.forEach((childID)=>{
            let childRecord = database.find((record) => record.id === childID)
            // Main check
            if(childRecord.fields["Tree: Parent Post"][0]===(postId)){
                return
            } else {
                errorArray.push([record, childRecord])
            }
        })
        recordCount++
    })
    console.log(`Records analyzed: ${recordCount}`)
    if(errorArray.length!==0){
        console.log(`Number of errors: ${errorArray.length}`)
        errorArray.forEach((record)=>{
            console.log(record)
        })
    } else {
        console.log('No problems found')
    }
}

// SIBLING CHECK: Check if all siblings are connected
const siblingCheck = (database) => {
    console.log('SIBLING CHECK')
    let recordCount = 0
    let errorArray = []
    database.forEach((record)=>{
        let postId = record.id
        let postSibling = record.fields["Tree: Sibling Posts"] !== undefined ? record.fields["Tree: Sibling Posts"] : undefined
        //If no siblings
        if(postSibling === undefined){
            recordCount++
            return
        }

        postSibling.forEach((siblingID)=>{
            let siblingRecord = database.find((record) => record.id === siblingID)
            // Main check
            if(siblingRecord.fields["Tree: Sibling Posts"] === undefined){
                return
            }
            if(siblingRecord.fields["Tree: Sibling Posts"].includes(postId)){
                return
            } else {
                errorArray.push([record, siblingRecord])
            }
        })
        recordCount++
    })
    console.log(`Records analyzed: ${recordCount}`)
    if(errorArray.length!==0){
        console.log(`Number of errors: ${errorArray.length}`)
        errorArray.forEach((record)=>{
            console.log(record)
        })
    } else {
        console.log('No problems found')
    }
}

// SIBLING PARENT CHECK: Check if parent's childrens and siblings match
const siblingParentCheck = (database) => {
    console.log('SIBLING PARENT CHECK')
    let recordCount = 0
    let errorArray = []
    database.forEach((record)=>{

        // Get Parent's children
        if(record.fields["Tree: Name"]==='Root'){
            return
        }
        let parentId = record.fields["Tree: Parent Post"][0]
        let parentRecord = database.find((record) => record.id === parentId)
        // For root post (no parentID)
        if(parentRecord === undefined){
            recordCount++
            return
        }
        let parentChildrenArray = parentRecord.fields["Tree: Child Posts"] !== undefined ? parentRecord.fields["Tree: Child Posts"] : undefined
        //If no children
        if(parentChildrenArray === undefined){
            return
        }

        let postId = record.id
        let postSibling = record.fields["Tree: Sibling Posts"] !== undefined ? [...record.fields["Tree: Sibling Posts"]] : []
        postSibling.push(postId)

        postSibling.forEach((siblingID)=>{
            let siblingRecord = database.find((record) => record.id === siblingID)
            if(parentChildrenArray.includes(siblingID)){
                return
            } else {
                errorArray.push([record, parentRecord, siblingRecord])
            }
        })
        recordCount++
    })
    console.log(`Records analyzed: ${recordCount}`)
    if(errorArray.length!==0){
        console.log(`Number of errors: ${errorArray.length}`)
        errorArray.forEach((record)=>{
            console.log(record)
        })
    } else {
        console.log('No problems found')
    }
}

// SIBLING ORDER CHECK: Does each post have a unique number and is it sorted?
const siblingOrderCheck = (database) => {
    console.log('SIBLING ORDER CHECK')
    let recordCount = 0
    let errorArray = []
    database.forEach((record)=>{
        recordCount++

        let postSibling = record.fields["Tree: Sibling Posts"] !== undefined ? record.fields["Tree: Sibling Posts"] : undefined
        //If no siblings
        if(postSibling === undefined){
            let postOrder = record.fields["Organization: Sibling Order"]
            if (postOrder !== 1){
                errorArray.push([record, [postOrder]])
            }
            // recordCount++
            return
        }

        let orderArray = [];
        postSibling.forEach((siblingID)=>{
            let siblingRecord = database.find((record) => record.id === siblingID)
            let siblingOrder = siblingRecord.fields["Organization: Sibling Order"]
            orderArray.push(siblingOrder)
        })

        // Main check
        for (let i = 0; i < orderArray.length - 1; i++) {
            if (orderArray[i] < orderArray[i + 1]) {
                return
            } else {
                errorArray.push([record, postSibling, orderArray])
                break;
            }
        }

        // recordCount++
    })
    console.log(`Records analyzed: ${recordCount}`)
    if(errorArray.length!==0){
        console.log(`Number of errors: ${errorArray.length}`)
        errorArray.forEach((record)=>{
            console.log(record)
        })
    } else {
        console.log('No problems found')
    }
}

const treeCheck = (database) => {
    parentCheck(database)
    childCheck(database)
    siblingCheck(database)
    siblingParentCheck(database)
    siblingOrderCheck(database)
}

export default treeCheck