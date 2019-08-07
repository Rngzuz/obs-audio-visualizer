let microphone, fft
const bins = 64
const diameter = 100

function setup() {
    frameRate(144)
    createCanvas(window.innerWidth, window.innerHeight)
    noFill()

    angleMode(DEGREES)
    rectMode(CENTER)

    microphone = new p5.AudioIn()
    microphone.start()

    fft = new p5.FFT(0.9,  bins)
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

    for (index = 0; index < bins; index++) {
        const angle = Math.abs(360 / bins) * index
        const radius = map(spectrum[index], 0, 255, diameter, diameter * 6)
        const x = radius * cos(angle)
        const y = radius * sin(angle)

        line(
            diameter * cos(angle),
            diameter * sin(angle),
            x,
            y
        )
    }
}