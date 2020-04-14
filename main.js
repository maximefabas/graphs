function setup () {
  createCanvas(windowWidth, windowHeight)
}

function draw () {
  const graphWidth = 10
  const graphHeight = 10
  const graphCenter = [0, 0]

  background(31)

  // Rulers
  const xPixelsPerUnit = width / graphWidth
  const yPixelsPerUnit = height / graphHeight
  const topLeftCornerCoordinates = [graphCenter[0] - graphWidth / 2, graphCenter[1] - graphHeight / 2]
  const vertAxisPosition = -1 * topLeftCornerCoordinates[0] * xPixelsPerUnit
  const horizAxisPosition = -1 * topLeftCornerCoordinates[1] * yPixelsPerUnit
  stroke(255, 255, 255, 40)
  strokeWeight(4)
  line(vertAxisPosition, 0, vertAxisPosition, height)
  line(0, horizAxisPosition, width, horizAxisPosition)

  // FUNCTIONS
  const FUNCTIONS = [
    x => ((-1 / x) + 5 > 0) && x > 0 ? (-1 / x) + 5 : 0,
    x => Math.sin(x + frameCount / 3)
  ]

  // Curves
  stroke(255)
  strokeWeight(3)
  const subPixelIncrement = 4
  for (let xSubPixel = 0 ; xSubPixel < width ; xSubPixel += subPixelIncrement) {
    const pXSubPixel = xSubPixel - subPixelIncrement
    const pX = pXSubPixel / xPixelsPerUnit + topLeftCornerCoordinates[0]
    const x = xSubPixel / xPixelsPerUnit + topLeftCornerCoordinates[0]
    FUNCTIONS.forEach(func => {
      const pY = func(pX)
      const y = func(x)
      const pYSubPixel = ((-1 * pY) - topLeftCornerCoordinates[1]) * yPixelsPerUnit 
      const ySubPixel = ((-1 * y) - topLeftCornerCoordinates[1]) * yPixelsPerUnit
      // ellipse(xSubPixel, ySubPixel, 2, 2)
      line(pXSubPixel, pYSubPixel, xSubPixel, ySubPixel)
    })
  }

  // Cursor
  stroke(255, 255, 255, 30)
  strokeWeight(2)
  line(mouseX, mouseY, mouseX, horizAxisPosition)
  line(mouseX, mouseY, vertAxisPosition, mouseY)
  noStroke()
  fill(255, 255, 255, 30)
  ellipse(mouseX, mouseY, 20, 20)
}
