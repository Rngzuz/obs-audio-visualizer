let microphone, fft

function setup() {
    frameRate(144)
    createCanvas(window.innerWidth, window.innerHeight)
    noFill()
    colorMode(RGB)

    microphone = new p5.AudioIn()
    microphone.start()

    fft = new p5.FFT(0.9, 64)
    fft.setInput(microphone)
}

function draw() {
    const spectrum = fft.analyze()

    clear()
    noStroke()
    fill(0)

    beginShape()
    vertex(0, height)
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