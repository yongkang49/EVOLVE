const video = document.getElementById('video');
const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d', { willReadFrequently: true });
let previousFrameData = null;
let stream;
//serve per iniziare il monitoraggio dopo il click sul start button
const startButton = document.getElementById('startCapture');
startButton.addEventListener('click', async () => {
    try {
        stream = await navigator.mediaDevices.getDisplayMedia({ video: true });
        video.srcObject = stream;
        document.getElementById('stopCapture').style.display = 'inline';
    } catch (error) {
        console.error("Errore nella cattura dello schermo:", error);
    }
});
const stopButton = document.getElementById('stopCapture');
stopButton.addEventListener('click', () => {
    if (stream) {
        stream.getTracks().forEach(track => track.stop());
    }
    video.pause();
    video.srcObject = null;
    clearInterval(interval);
    previousFrameData = null;
    stopButton.style.display = 'none';
});
//serve per rilevare cambiamenti del monitoraggio
video.addEventListener('play', () => {
    const interval = setInterval(() => {
        if (video.paused || video.ended) {
            clearInterval(interval);
            video.style.display = "none";
            return;
        }
        ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
        const frameData = ctx.getImageData(0, 0, canvas.width, canvas.height).data;
        if (previousFrameData) {
            let diff = 0;
            for (let i = 0; i < frameData.length; i += 4) {
                diff += Math.abs(frameData[i] - previousFrameData[i]) +
                        Math.abs(frameData[i+1] - previousFrameData[i+1]) +
                        Math.abs(frameData[i+2] - previousFrameData[i+2]);
            }
            if (diff > 100000) { //condizione di rilevo cambiamento 
                console.log('Significativo cambiamento rilevato');
                //screenshot del cambiamento e lo scarica nel download
                const context = canvas.getContext('2d');
                canvas.width = video.videoWidth;
                canvas.height = video.videoHeight;
                context.drawImage(video, 0, 0, canvas.width, canvas.height);
                const img = canvas.toDataURL('image/png');
                const link = document.createElement('a');
                link.href = img;
                link.download = 'image.png';
                link.click();
            }
        }
        previousFrameData = frameData;
    }, 5000); // controlla ogni 5s
});