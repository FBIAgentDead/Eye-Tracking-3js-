window.SpeechRecognition = window.webkitSpeechRecognition || window.SpeechRecognition;
var SpeechGrammarList = SpeechGrammarList || webkitSpeechGrammarList;
const recognition = new window.SpeechRecognition();
var speechRecognitionList = new SpeechGrammarList();
var speechRecognitionList = new SpeechGrammarList();
var powers = ['lightning','fire','ice'];
var grammar = '#JSGF V1.0; grammar powers; public <power> = ' + powers.join(' | ') + ' ;'
speechRecognitionList.addFromString(grammar, 1);

function setup(){
    if ('SpeechRecognition' in window) {
        //Keeps results as lines
        recognition.interimResults = true;
        //How many words it tries to create from the given word
        recognition.maxAlternatives = 10;
        //Keep looking for words
        recognition.continuous = true;
        //certain commands to be checked
        recognition.grammars = speechRecognitionList;
        //starts the recognizing
        recognition.start();
        console.log("Browser supports voice reg!");
    }else {
        console.log("Browser does not support voice reg!");
    }

}

recognition.onresult = (event) => {
    const speechToText = event.results[0][0].transcript;
    console.log(speechToText);
    commandtrigger(speechToText);
}

recognition.onspeechend = function() {
    console.log('Speech has stopped being detected');
}

function commandtrigger(command){
    if(command.toLowerCase() == "fire"){
        cube.rotation.x += 10;
    }
}

setup()