export const coordinates = {
    getCartesianCoordinate: (x, y) => {
        let theta = (x * 180 / Math.PI - 90)*Math.PI/180
        return {
            'x': y * Math.cos(theta), 
            'y': y * Math.sin(theta)
        }
    },
    getConnectionCoordinates: (originNode, targetNode) => {
        let originCoordinates = coordinates.getCartesianCoordinate(originNode.x, originNode.y)
        let targetCoordinates
        try {
          targetCoordinates = coordinates.getCartesianCoordinate(targetNode.x, targetNode.y)
        } catch {
          return;
        }
        return [originCoordinates, targetCoordinates]
    },
}