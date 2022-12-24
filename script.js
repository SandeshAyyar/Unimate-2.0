const button=document.querySelector("button");
const texts = document.querySelector(".b");

const searchForm = document.querySelector("#search-form");
const searchFormInput = searchForm.querySelector("input"); // <=> document.querySelector("#search-form input");

const speechRecognition=window.SpeechRecognition || window.webkitSpeechRecognition;
const recognition=new speechRecognition();

recognition.interimResults=false;
// recognition.continuous=true;
recognition.lang="en-US";

function change(){
    recognition.lang="hi-IN";
}

let p = document.createElement("p");

const speech=new SpeechSynthesisUtterance();
speech.lang="en-US";

function hindi(){
    speech.lang="hi-IN";
}

recognition.onstart = function (){
    console.log("speech recognition started");
};

// console.log(recognition);

recognition.onresult = function(event){
    console.log(event);
    const spokenwords=event.results[0][0].transcript;
    console.log(spokenwords);

    texts.appendChild(p);
    p.innerText = spokenwords;

    computerspeech(spokenwords);
};
function can(speech,words){
    if(words.includes("what can you do for me")||words.includes("Uni mate"))
    {
        speech.text="welcome to unimate, dear.... i can do anything";
    }else
    if(words.includes("what is your name")){
        speech.text="my name is unimate,what's your name";
    }else
    if(words.includes("how are you")){
        speech.text="i am fine how are you";
        // conti();
    }else
    if(words.includes("change language")){
        speech.text="language changed";
        change();
        hindi();
    }
    else{
        speech.text=words;
        searchFormInput.value=words;
    }
}
function computerspeech(words){
    // const speech=new SpeechSynthesisUtterance();
    //  speech.lang="en-US";
    speech.pitch=0.9;
    speech.volume=1;
    speech.rate=1;
    // speech.text="how are you";
    can(speech,words);
    window.speechSynthesis.speak(speech);
    speech.onend=()=>{
        recognition.start();
        document.querySelector(".outer").style.background = "linear-gradient(#14ffe9,#ffeb3b,#ff00e0)";
    };
}

recognition.onend=()=>{
    searchForm.submit();
    document.querySelector(".outer").style.background = "#111";
}

button.addEventListener("click",()=>{
    document.querySelector(".outer").style.background = "linear-gradient(#14ffe9,#ffeb3b,#ff00e0)";
    recognition.start();
});