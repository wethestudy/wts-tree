function getCartesianCoordinate(x, y){
    let theta = (x * 180 / Math.PI - 90)*Math.PI/180
    return {
        'x': y * Math.cos(theta), 
        'y': y * Math.sin(theta)
    }
  }

export default getCartesianCoordinate