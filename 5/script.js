let microphone, fft
const bins = 32
const diameter = 80

const octaveBands = Array.from({ length: 32 }, (_index, value) => value + 1)

function setup() {
    frameRate(144)
    createCanvas(window.innerWidth, window.innerHeight)
    noFill()
    angleMode(DEGREES)

    microphone = new p5.AudioIn()
    microphone.start()

    fft = new p5.FFT(0.8,  bins)
    fft.setInput(microphone)
}

function draw() {
    clear()
    background('rgba(0,0,0,0)')
    const spectrum = fft.analyze()

    stroke(0)
    strokeWeight(8)
    strokeCap(ROUND)

    translate(width / 2, height / 2)

    for (index = 0; index < spectrum.length; index++) {
        const angle = Math.abs(360 / spectrum.length) * index
        const radius = map(spectrum[index], 0, 255, diameter, diameter * 5)
        const x = radius * cos(angle)
        const y = radius * sin(angle)

        line(
            diameter * cos(angle),
            diameter * sin(angle),
            x,
            y
        )
    }

    // noStroke()
    // fill('rgba(0, 0, 0, 0.5)')
    // circle(0, 0, map(fft.getEnergy('bass'), 0, 255, 30, diameter * 2))
    // circle(0, 0, map(fft.getEnergy('mid'), 0, 255, 20, diameter * 2))
    // circle(0, 0, map(fft.getEnergy('treble'), 0, 255, 10, diameter * 2))
}