let microphone, fft

function setup() {
    createCanvas(window.innerWidth, window.innerHeight)
    noFill()
    colorMode(RGB)

    microphone = new p5.AudioIn()
    microphone.start()

    fft = new p5.FFT(0.8, 128)
    fft.setInput(microphone)
}

function draw() {
    const frequencyBands = fft.analyze().filter(band => band !== 0)
    const spectrum = [0, ...frequencyBands, 0]

    clear()
    noStroke()
    fill(0)

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