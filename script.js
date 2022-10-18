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
//const ctx = canvas.getContext('2d');
//audioSource = track analyser = analyser

analyser.fftSize=32;
const bufferLength = analyser.frequencyBinCount;
const dataArray = new Uint8Array(bufferLength);
  
//Animoi visualisaattori
const context = canvas.getContext("2d");
context.globalAlpha = 0.5;

const cursor = {
  x: innerWidth / 2,
  y: innerHeight / 2,
};

let particlesArray = [];

generateParticles(160);
setSize();
anim();

addEventListener("resize", () => setSize());

function generateParticles(amount) {
  for (let i = 0; i < amount; i++) {
    particlesArray[i] = new Particle(
      innerWidth / 2,
      innerHeight / 2,
      6,
      generateColor(),
      0.02
    );
  }
}

function generateColor() {
  let hexSet = "0123456789ABCDEF";
  let finalHexString = "#";
  for (let i = 0; i < 6; i++) {
    finalHexString += hexSet[Math.ceil(Math.random() * 15)];
  }
  return finalHexString;
}

function setSize() {
  canvas.height = innerHeight;
  canvas.width = innerWidth;
}

function Particle(x, y, particleTrailWidth, strokeColor, rotateSpeed) {
  this.x = x;
  this.y = y;
  this.particleTrailWidth = particleTrailWidth;
  this.strokeColor = strokeColor;
  this.theta = Math.random() * Math.PI * 2;
  this.rotateSpeed = rotateSpeed;  

  

//Tätä muuttujaa manipuloimalla säädetään grafiikan säde

  this.t = Math.random() * 800  ;

  
  this.rotate = () => {
    const ls = {
      x: this.x,
      y: this.y,
    };
    this.theta += this.rotateSpeed;
    this.x = cursor.x + Math.cos(this.theta) * this.t;
    this.y = cursor.y + Math.sin(this.theta) * this.t;
    context.beginPath();
    context.lineWidth = this.particleTrailWidth;
    context.strokeStyle = this.strokeColor;
    context.moveTo(ls.x, ls.y);
    context.lineTo(this.x, this.y);
    context.stroke();
  };
}

function anim() {
  requestAnimationFrame(anim);

  context.fillStyle = "rgba(0,0,0,0.05)";
  context.fillRect(0, 0, canvas.width, canvas.height);

  particlesArray.forEach((particle) => particle.rotate());
  analyser.getByteFrequencyData(dataArray);

}
// function animate(){
   
//     ctx.clearRect(0,0,canvas.width, canvas.height);
//     drawVisualizer(dataArray);
//     requestAnimationFrame(animate);
// }
// animate()

//piirrä visualisaattori

//todo Saisiko visualisaattorin numeroarvot printattua?




//Audion yhdistäminen
track.connect(analyser)
analyser.connect(gainNode)
gainNode.connect(audioContext.destination);

console.log(audioContext);

function Start(){
    document.getElementById("playbutton").innerHTML ="play/pause"
}


//dataArrayn printtaus
function clicker(){
    document.getElementById("teksti1").innerHTML= dataArray; 
}



setInterval(()=>{

    document.getElementById("teksti1").innerHTML= dataArray.slice(0,20); 
    document.getElementById("teksti2").innerHTML= dataArray.slice(20,40);
    document.getElementById("teksti3").innerHTML= dataArray.slice(40,60); 
    document.getElementById("teksti4").innerHTML= dataArray.slice(60,80);
    document.getElementById("teksti5").innerHTML= dataArray.slice(80,100); 
    document.getElementById("teksti6").innerHTML= dataArray.slice(100,120);
},100)