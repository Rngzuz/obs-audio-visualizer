let microphone, fft

let capturing = true

function setup() {
    createCanvas(window.innerWidth, window.innerHeight)
    noFill()

    microphone = new p5.AudioIn()
    microphone.start()

    fft = new p5.FFT(0.9, 64)
    fft.setInput(microphone)
}

function draw() {
    background(80)

    const spectrum = fft.analyze()

    noStroke()
    fill(0)

    beginShape()
    vertex(0, height)

    for (index = 0; index < spectrum.length; index++) {
        const amplitude = spectrum[index]

        const x1 = index * (width / 64)
        const y1 = map(amplitude, 0, 255, height, 0)

        vertex(x1, y1)
    }

    vertex(width, height)
    endShape()

    noStroke()
    fill(255)
    for (index = 0; index < spectrum.length; index++) {
        const amplitude = spectrum[index]

        const x1 = index * (width / 64)
        const y1 = map(amplitude, 0, 255, height, 0)

        circle(x1, y1, 4)
    }
}

document.addEventListener('keyup', function (event) {
    if (event.keyCode === 80 && microphone) {
        if (capturing) {
            console.log('Stopping...')
            microphone.stop()
        } else {
            console.log('Starting...')
            microphone.start()
        }

        capturing = !capturing
    }
})
