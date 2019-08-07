let microphone, fft
const bins = 64

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

    const spectrum = [0, ...fft.analyze().filter(band => band !== 0), 0]
    const yCenter = height / 2

    noStroke()
    fill(0)

    beginShape()

    for (index = 0; index < spectrum.length; index++) {
        const amplitude = spectrum[index]

        const x = width / spectrum.length * index
        const y = map(amplitude, 0, 255, yCenter, 0)

        curveVertex(x, y)
    }

    curveVertex(width, yCenter)

    for (index = spectrum.length; index > -1; index--) {
        const amplitude = spectrum[index]

        const x = width / spectrum.length * index
        const y = map(amplitude, 0, 255, yCenter, height)

        curveVertex(x, y)
    }

    endShape()
}