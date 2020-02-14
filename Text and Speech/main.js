// init speech synth api
const synth = window.speechSynthesis;

// DOM

const textInput = document.querySelector('#text-input');
const textForm = document.querySelector('form');
const speed = document.querySelector('#speed');
const tonality = document.querySelector('#tonality');
const button = document.querySelector('button');
const voiceSelect = document.querySelector('#voice');

//init voices

let voices = [];

const getVoices = () => {
    voices = synth.getVoices();

    // loop voices and choose an option
    voices.forEach(voice => {
    // voices options
    const option = document.createElement('option');
    // set options
    option.textContent = voice.name + "(" + voice.lang +")";
    // set options
    option.setAttribute("data-lang", voices.lang);
    option.setAttribute("data-name", voices.name);
    voiceSelect.appendChild(option);
    });
};

getVoices();
if(synth.onvoiceschanged !== undefined){
    synth.onvoiceschanged = getVoices;
}

// MAKE IT SPEAK!

const speak = () => {
    if (synth.speaking) {
        console.error("kmkmkm");
        return;
    }
    if (textInput.value !== ""){
        const textSpeaking = new speeSynthesisUtterance(textInput.value);
       
        // End of speaking
        textSpeaking.onend = e =>{
        console.log("end speaking");
        }
        textSpeaking.onerror = e =>{
            console.log("something went wrong");
        }
        const selectvoice = voiceSelect.selectOptions[0].getAttribute("data-name");
        
        //loop voices
        voices.forEach( voice =>{
            if(voice.name === selectedVoice){
                textSpeaking.voice=voice
            }
        });
        // Ranges
        textSpeaking.speed = speed.value;
        textSpeaking.tonality = tonality.value;
        // finally
        synth.speak(textSpeaking);
    }
};
 // text form submit
  textForm.addEventListener("submit", e => {
      e.preventDefault();
      speak();
      textInput.blur();
  });
voiceSelect.addEventListener('change', e => speak());