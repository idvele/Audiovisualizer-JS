console.log("Det funkkar!");

// for legacy browsers
const AudioContext = window.AudioContext || window.webkitAudioContext;

const audioContext = new AudioContext();

// get the audio element
const audioElement = document.querySelector('audio');

// pass it into the audio context
const track = audioContext.createMediaElementSource(audioElement);


// Select our play button
const playButton = document.querySelector('button');

playButton.addEventListener('click', () => {
    // Check if context is in suspended state (autoplay policy)
    if (audioContext.state === 'suspended') {
        audioContext.resume();
    }
    
    // Play or pause track depending on state
    if (playButton.dataset.playing === 'false') {
        audioElement.play();
        playButton.dataset.playing = 'true';
    } else if (playButton.dataset.playing === 'true') {
        audioElement.pause();
        playButton.dataset.playing = 'false';
    }
}, false);


//gain node

const gainNode = audioContext.createGain();

const volumeControl = document.querySelector('#volume');

volumeControl.addEventListener('input',() =>{
    gainNode.gain.value = volumeControl.value;
}, false);


//audiovisualizer

//analyser

const analyser = audioContext.createAnalyser();


//canvas element

const canvas = document.getElementById('Visualizer');
// canvas.width=window.innerWidth;
// canvas.height=window.innerHeight;
const ctx = canvas.getContext('2d');
//audioSourve = track analyser = analyser

analyser.fftSize=128;
const bufferLength = analyser.frequencyBinCount;
const dataArray = new Uint8Array(bufferLength);

const barWidth = (canvas.width/2)/bufferLength;
let barHeight;

//Animoi visualisaattori

function animate(){
    x=0;
    ctx.clearRect(0,0,canvas.width, canvas.height);
    analyser. getByteFrequencyData(dataArray);
    drawVisualizer(bufferLength, x, barWidth, barHeight, dataArray);
    requestAnimationFrame(animate);
}
animate()

//piirrä visualisaattori

function drawVisualizer(bufferLength, x, barWidth, barHeight, dataArray){
    for (let i=0; i< bufferLength; i++){
        barHeight= dataArray[i]*2;
        let red = 00;
        let green = 255;
        let blue = 0;
        ctx.fillStyle = 'rgb('+red+','+green+','+blue+')';
        ctx.fillRect(canvas.width/2 -x, canvas.height-barHeight, barWidth, barHeight);
        x+= barWidth;
    }
    for (let i=0; i< bufferLength; i++){
        barHeight= dataArray[i]*2;
        let red = 00;
        let green = 255;
        let blue = 0;
        ctx.fillStyle = 'rgb('+red+','+green+','+blue+')';
        ctx.fillRect(x, canvas.height-barHeight, barWidth, barHeight);
        x+= barWidth;
    }

}

//Audion yhdistäminen
track.connect(analyser)
analyser.connect(gainNode)
gainNode.connect(audioContext.destination);

console.log(audioContext);

function Start(){
    document.getElementById("playbutton").innerHTML ="play/pause"
}

function clicker(){
    console.log(dataArray) 
}