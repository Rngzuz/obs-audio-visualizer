(() => {
    const paths = document.getElementsByTagName('path')
    const visualizer = document.getElementById('visualizer')
    const mask = visualizer.getElementById('mask')
    const heading = document.getElementsByTagName('h1')[0]

    let path

    const soundAllowed = stream => {
        window.persistAudioStream = stream
        heading.innerHTML = "Thanks"
        heading.setAttribute('style', 'opacity: 0')

        const audioContent = new AudioContext()
        const audioStream = audioContent.createMediaStreamSource(stream)
        const analyser = audioContent.createAnalyser()

        audioStream.connect(analyser)
        analyser.fftSize = 1024

        const frequencyArray = new Uint8Array(analyser.frequencyBinCount)
        visualizer.setAttribute('viewBox', '0 0 255 255')

        for (let i = 0; i < 255; i++) {
            path = document.createElementNS('http://www.w3.org/2000/svg', 'path')
            path.setAttribute('stroke-dasharray', '4,1')
            mask.appendChild(path)
        }

        const draw = () => {
            requestAnimationFrame(draw)
            analyser.getByteFrequencyData(frequencyArray)

            let adjustedLength

            for (let i = 0; i < 255; i++) {
                adjustedLength = Math.floor(frequencyArray[i]) - (Math.floor(frequencyArray[i]) % 5)
                paths[i].setAttribute('d', 'M ' + (i) + ',255 l 0,-' + adjustedLength)
            }

        }

        draw()
    }

    const soundNotAllowed = _error => {
        heading.innerHTML = 'You must allow your microphone.'
    }

    navigator.getUserMedia(
        { audio: true },
        soundAllowed,
        soundNotAllowed
    )
})()