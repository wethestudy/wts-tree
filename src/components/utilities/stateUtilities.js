export const stateUtilities = {
    resetActiveNode: (activeNode)=>{
        activeNode = {
            activeElement: null,
            activeTag: null
        }
        return activeNode;
    },
    constructConnections: (treeDescendants) => {
        let connectionArray = [];
        treeDescendants.forEach(originNode => {
            if (originNode.data.connections !== undefined) {
            originNode.data.connections.forEach(originLink => {
                let targetNode = treeDescendants.find(node => node.id === originLink);
                if(targetNode !== undefined){
                    connectionArray.push({
                        originNode: originNode,
                        targetNode: targetNode
                    });
                }
            });
            }
        });
        return connectionArray
    },
    resetCamera: (camera) => {
        camera = {k: 1, x: 0, y: 0}
        return camera
    }
}