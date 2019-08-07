let microphone, fft
const bins = 32
let lineWidth = 20

function setup() {
    frameRate(144)
    createCanvas(window.innerWidth, window.innerHeight)
    noFill()

    microphone = new p5.AudioIn()
    microphone.start()

    fft = new p5.FFT(0.9, bins)
    fft.setInput(microphone)
}

function draw() {
    clear()
    background('rgba(0,0,0,0)')

    const spectrum = fft.analyze()

    noStroke()
    fill(0)

    beginShape()

    for (index = 0; index < spectrum.length; index++) {
        const x = width / spectrum.length * index
        const y = map(spectrum[index], 0, 255, height, 0)

        vertex(x, height)
        vertex(x, y)
        vertex(x + lineWidth, y)
        vertex(x + lineWidth, height)
    }

    endShape()
}

// function draw() {
//     clear()
//     background(0, 0, 0, 0)

//     const spectrum = fft.analyze()
//     const rectY = height / 2

//     noStroke()
//     smooth()
//     fill(0)

//     for (index = 0; index < spectrum.length - 1; index++) {
//         const amplitude = spectrum[index]

//         const rectX = width / spectrum.length * (index + 1)
//         const rectHeight = map(amplitude, 0, 255, 0, height)

//         rect(
//             rectX,
//             rectY,
//             rectWidth,
//             rectHeight < rectWidth ? rectWidth : rectHeight,
//             rectRadius
//         )
//     }
// }

// function draw() {
//     clear()

//     const spectrum = fft.analyze().filter(band => band !== 0)
//     const yCenter = height / 2

//     noStroke()
//     fill(0)

//     beginShape()

//     for (index = 0; index < spectrum.length; index++) {
//         const amplitude = spectrum[index]

//         const x = width / spectrum.length * index
//         const y = map(amplitude, 0, 255, yCenter, 0)

//         curveVertex(x, y)
//     }

//     curveVertex(width, yCenter)

//     for (index = spectrum.length; index > -1; index--) {
//         const amplitude = spectrum[index]

//         const x = width / spectrum.length * index
//         const y = map(amplitude, 0, 255, yCenter, height)

//         curveVertex(x, y)
//     }

//     endShape()
// }