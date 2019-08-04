const canvas = document.querySelector("canvas");
const context2d = canvas.getContext("2d");

let leftChannel = null;
let rightChannel = null;

let isRecording = false;

const getUserMedia = navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia || navigator.msGetUserMedia;

function success(e) {
    const AudioContext = window.AudioContext || window.webkitAudioContext;
    const context = new AudioContext();
    const sampleRate = context.sampleRate;
    const volume = context.createGain();
    const audioInput = context.createMediaStreamSource(e);
    audioInput.connect(volume);
    const bufferSize = 2048;
    const recorder = context.createScriptProcessor(bufferSize, 2, 2);
    recorder.onaudioprocess = function (e) {
        if (!isRecording) return;
        const left = e.inputBuffer.getChannelData(0);
        const right = e.inputBuffer.getChannelData(1);
        //console.log("recording");
        leftChannel = new Float32Array(left);
        rightChannel = new Float32Array(right);
        /*console.log ('recording');
        const left = e.inputBuffer.getChannelData (0);
        const right = e.inputBuffer.getChannelData (1);
        // we clone the samples
        leftchannel.push(new Float32Array (left));
        rightchannel.push(new Float32Array (right));
        recordingLength += bufferSize;*/
    }
    volume.connect(recorder);
    recorder.connect(context.destination);
}

function error(e) {
    console.log(e);
}

function frame() {
    context2d.clearRect(0, 0, canvas.width, canvas.height);
    context2d.shadowColor = "#ddd";
    context2d.shadowBlur = 2;
    if (leftChannel) {
        const r0 = 200;
        const r1 = 50;
        const cx = canvas.width >> 1;
        const cy = canvas.height >> 1;
        const step = 8;
        for (let index = 0; index < leftChannel.length; index += step) {
            const p = index / leftChannel.length;
            const a = Math.PI * 2 * p;
            const v = leftChannel[index];
            context2d.save();
            context2d.translate(cx, cy);
            context2d.rotate(a);
            context2d.translate(0, r0 + (v * r1));
            context2d.fillStyle = "#ddd";
            context2d.fillRect(0, 0, 2, v * r1);
            context2d.restore();
        }

        for (let index = 0; index < rightChannel.length; index += step) {
            const p = index / rightChannel.length;
            const a = Math.PI * 2 * p;
            const v = rightChannel[index];
            context2d.save();
            context2d.translate(cx, cy);
            context2d.rotate(a);
            context2d.translate(0, r0 + (v * r1));
            context2d.fillStyle = "#ddd";
            context2d.fillRect(0, 0, 2, v * r1);
            context2d.restore();

        }

    }
    request();
}

function request() {
    window.requestAnimationFrame(frame);
}

request();

navigator.webkitGetUserMedia({ audio: true }, success, error);

function resize() {
    canvas.width = canvas.parentElement.clientWidth;
    canvas.height = canvas.parentElement.clientHeight;
}

window.addEventListener("resize", resize);
resize();

canvas.addEventListener("click", () => {
    isRecording = !isRecording;
});
