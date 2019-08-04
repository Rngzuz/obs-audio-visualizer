window.onload = function () {
    "use strict";
    const fftBinCount = 9;
    let fftAvgWin = new Array(fftBinCount);
    fftAvgWin.fill(1);
    const paths = document.getElementsByTagName("circle");
    const visualizer = document.getElementById("visualizer");
    const mask = visualizer.getElementById("mask");
    const h = document.getElementsByTagName("h1")[0];

    const soundAllowed = function (stream) {
        window.persistAudioStream = stream;
        const audioContent = new AudioContext();
        const audioStream = audioContent.createMediaStreamSource(stream);
        const analyser = audioContent.createAnalyser();
        audioStream.connect(analyser);
        analyser.fftSize = 1024;

        const frequencyArray = new Uint8Array(analyser.frequencyBinCount);
        visualizer.setAttribute("viewBox", "0 0 100 100");
        const svgns = "http://www.w3.org/2000/svg",
            container = document.getElementById("visualizer");

        // we have `fftBinCount` circles in our particle system
        for (let i = 1; i <= fftBinCount; i++) {
            const circle = document.createElementNS(svgns, "circle");
            const initialRadius = fftBinCount / i;
            circle.setAttributeNS(null, "cx", 50);
            circle.setAttributeNS(null, "cy", 50);
            circle.setAttributeNS(null, "r", initialRadius);
            circle.setAttributeNS(
                null,
                "style",
                "fill: none; stroke: white; stroke-width: 1px;"
            );
            mask.appendChild(circle);
        }

        var doDraw = function () {
            requestAnimationFrame(doDraw);
            analyser.getByteFrequencyData(frequencyArray);
            for (let i = 1; i <= fftBinCount; i++) {
                const rangeStart = parseInt(255 * (i - 1) / fftBinCount);
                const rangeEnd = parseInt(255 * i / fftBinCount);
                let total = 0;
                let max = 0;
                for (let f = rangeStart; f <= rangeEnd; f++) {
                    total += parseFloat(frequencyArray[f]);
                }
                const avg = Math.abs(total / (rangeEnd - rangeStart));
                fftAvgWin[i - 1] = parseFloat(fftAvgWin[i - 1] + avg) / 7.0;
            }

            fftAvgWin.forEach((r, i) => {
                paths[i].setAttribute("r", r);
            })
        };

        doDraw();
    };

    var soundNotAllowed = function (error) {
        h.innerHTML = "You must allow your microphone.";
        console.log(error);
    };

    navigator.getUserMedia({ audio: true }, soundAllowed, soundNotAllowed);
};
