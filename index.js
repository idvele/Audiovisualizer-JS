console.log("Det funkkar!");

const button = document.querySelector('button');
button.addEventListener('click',()=>{
    // for legacy browsers
    const AudioContext = window.AudioContext || window.webkitAudioContext;
    
    const audioContext = new AudioContext();
    
    // get the audio element
    const audioElement = document.querySelector('audio');
    
    // pass it into the audio context
    const track = audioContext.createMediaElementSource(audioElement);
    
    
}, false)


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

//Audion yhdistäminen
track.connect(gainNode)
gainNode.connect(audioContext.destination);

function Click(){
    
    console.log("toimii");
    
    document.getElementById("clicker").innerHTML= "Yay!";
    
}