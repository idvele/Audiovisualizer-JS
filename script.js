console.log("Det funkkar!");





// for legacy browsers
const AudioContext = window.AudioContext || window.webkitAudioContext;

const audioContext = new AudioContext();

//load media
const file = document.getElementById('fileupload')

file.addEventListener('change', function(){
  const files = this.files;
  const audio1 = document.getElementById('audio1');
  audio1.src = URL.createObjectURL(files[0]);
  audio1.load();
})

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

analyser.fftSize=256;
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

//piirr?? visualisaattori

//todo Saisiko visualisaattorin numeroarvot printattua?


function drawVisualizer(bufferLength, x, barWidth, barHeight, dataArray){
    for (let i=0; i< bufferLength; i++){
        barHeight= dataArray[i]*5;
        ctx.save();
        ctx.translate(canvas.width/2, canvas.height/2);
        ctx.rotate(i+Math.PI*2/bufferLength*4);
       const hue = i*5
        ctx.fillStyle = 'hsl('+ hue+ ',100%,50%'
        ctx.fillRect(canvas.width/2 -x, canvas.height-barHeight -30, barWidth, 2);
        ctx.fillStyle = 'hsl('+ hue+ ',100%,50%';
        ctx.fillRect(canvas.width/2 -x, canvas.height-barHeight, barWidth, barHeight);
        x+= barWidth;
        ctx.restore();
    }
    
}


//Audion yhdist??minen
track.connect(analyser)
analyser.connect(gainNode)
gainNode.connect(audioContext.destination);

console.log(audioContext);

function Start(){
    document.getElementById("playbutton").innerHTML ="play/pause"
}

setInterval(()=>{

    document.getElementById("teksti1").innerHTML= dataArray.slice(0,20); 
    document.getElementById("teksti2").innerHTML= dataArray.slice(20,40);
    document.getElementById("teksti3").innerHTML= dataArray.slice(40,60); 
    document.getElementById("teksti4").innerHTML= dataArray.slice(60,80);
    document.getElementById("teksti5").innerHTML= dataArray.slice(80,100); 
    document.getElementById("teksti6").innerHTML= dataArray.slice(100,120);
},100)