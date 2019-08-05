let microphone, fft
const bins = 128

function setup() {
    createCanvas(window.innerWidth, window.innerHeight)
    noFill()
    colorMode(RGB)

    microphone = new p5.AudioIn()
    microphone.start()

    fft = new p5.FFT(0.8, bins)
    fft.setInput(microphone)
}

function drawDecibels() {
    const spectrum = fft.analyze(bins, 'dB')
    const yCenter = height / 2

    noStroke()
    fill('rgba(0,0,0,0.5)')

    beginShape()
    curveVertex(0, yCenter)

    for (index = 1; index < bins; index++) {
        const amplitude = spectrum[index]

        const x = width / spectrum.length * index
        const y = map(amplitude, -140, 0, yCenter, 0)

        curveVertex(x, y)
    }

    for (index = bins - 1; index > 0; index--) {
        const amplitude = spectrum[index]

        const x = width / spectrum.length * index
        const y = map(amplitude, -140, 0, yCenter, height)

        curveVertex(x, y)
    }

    curveVertex(0, yCenter)
    endShape()
}

function drawAmplitude() {
    const spectrum = fft.analyze().filter(band => band !== 0)
    const yCenter = height / 2

    noStroke()
    fill('rgba(0,0,0,0.5)')

    beginShape()
    curveVertex(0, yCenter)

    for (index = 0; index < spectrum.length; index++) {
        const amplitude = spectrum[index]

        const x = width / spectrum.length * index
        const y = map(amplitude, 0, 255, yCenter, 0)

        curveVertex(x, y)
    }

    for (index = spectrum.length; index > -1; index--) {
        const amplitude = spectrum[index]

        const x = width / spectrum.length * index
        const y = map(amplitude, 0, 255, yCenter, height)

        curveVertex(x, y)
    }

    curveVertex(0, yCenter)
    endShape()
}

function drawHalfAmp() {
    const frequencyBands = fft.analyze().filter(band => band !== 0)
    const spectrum = [0, ...frequencyBands, 0]

    noStroke()
    fill('rgba(255,255,255,0.65)')

    beginShape()
    curveVertex(0, height)

    for (index = 0; index < spectrum.length; index++) {
        const amplitude = spectrum[index]

        const x = width / spectrum.length * index
        const y = map(amplitude, 0, 255, height, 0)

        curveVertex(x, y)
    }

    curveVertex(width, height)
    vertex(0, height)
    endShape()
}

function draw() {
    clear()
    drawHalfAmp()
    // drawAmplitude()
    // drawDecibels()
}