let microphone, fft
const rectWidth = 4
const rectRadius = 2

function setup() {
    createCanvas(window.innerWidth, window.innerHeight)
    noFill()
    rectMode(CENTER)
    colorMode(RGB, 255, 255, 255, 1)

    microphone = new p5.AudioIn()
    microphone.start()

    fft = new p5.FFT(0.6, 32)
    fft.setInput(microphone)
}

function draw() {
    clear()
    background(0, 0, 0, 0)

    const spectrum = fft.analyze()
    const rectY = height / 2

    noStroke()
    smooth()
    fill(0)

    for (index = 0; index < spectrum.length - 1; index++) {
        const amplitude = spectrum[index]

        const rectX = width / spectrum.length * (index + 1)
        const rectHeight = map(amplitude, 0, 255, 0, height)

        rect(
            rectX,
            rectY,
            rectWidth,
            rectHeight < rectWidth ? rectWidth : rectHeight,
            rectRadius
        )
    }
}