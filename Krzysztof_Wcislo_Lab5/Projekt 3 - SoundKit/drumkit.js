document.addEventListener('DOMContentLoaded', appStart)

// lista dostępnych dźwięków
// klucz to charcode wyzwalającego klawisza, wartość to nazwa dźwięku
const sounds = {
    97 : "boom",
    115: "clap",
    100: "hihat",
    102: "kick",
    103: "openhat",
    104: "ride",
    106: "snare",
    107: "tink",
    108: "tom",
}
//deklaracja kanałów
const channel1 = []
const channel2 = []
const channel3 = []
const channel4 = []

let selectedChannel = 'ch1'  // domyślnie ustawiam kanał pierwszy jako wybrany

let recStart  = 0// zmienna przechowująca czas rozpoczęcia nagrywania
let isRecording = false //zmienna przechowująca czy nagrywanie w toku

// funkcja ustawiająca możliwe zdarzenia
function appStart() {
    window.addEventListener('keypress', playBeCode)
    document.querySelector('#play').addEventListener('click', playSound)
    document.querySelector('#rec').addEventListener('click', recMusic)

    document.querySelectorAll('input[name=channel]').forEach(function(radio){
        radio.addEventListener('click', function(e){
            switch(e.target.value)
            {
                case 'channel1':
                    selectedChannel = 'ch1';
                    break;
                case 'channel2':
                    selectedChannel = 'ch2';
                    break;
                case 'channel3':
                    selectedChannel = 'ch3';
                    break;
                case 'channel4':
                    selectedChannel = 'ch4';
                    break;
            }
        })
    })

    document.querySelectorAll('.key').forEach(function(key){
        key.addEventListener('click', function(e){
            playMusic(e.target.value)
        })
    })
}


function playBeCode(e)
{
    if(!sounds[e.charCode]) {
        return
    }
    const soundName = sounds[e.charCode]
    playMusic(soundName)
}

// funkcja odtwarzająca dźwięk przy użyciu znacznika AUDIO w HTML
function playMusic(soundName){
    
                const audioDOM = document.querySelector(`#${soundName}`)
                //odtwórz dzwięk
                audioDOM.currentTime = 0
                audioDOM.play()

    // jeśli nagrywanie trwa to zapisuję dźwięk do kanału
    if(isRecording)
    {
        pushSound({
            name: soundName,
            time: Date.now() - recStart
        });
    }
}
// funkcja dodająca obiekt dźwięku do aktywnego kanału
function pushSound(object)
{
    switch(selectedChannel)
            {
                case 'ch1':
                    channel1.push(object)
                    break;
                case 'ch2':
                    channel2.push(object)
                    break;
                case 'ch3':
                    channel3.push(object)
                    break;
                case 'ch4':
                    channel4.push(object)
                    break;
            }
}

// funkcja zmieniająca stan nagrywania i treść przcisku
// w momencie rozpoczęcia nagrywania uruchamia nagrane dotąd dźwięki
function recMusic(e) {
    //zapamiętaj czas start
    recStart = Date.now()
    //zmien tryb nagrywanie/odtwarzanie
    isRecording = !isRecording
    //zaktualizuj napis na buttonie
    if(isRecording){
        e.target.innerHTML = "Zakończ nagrywanie"
        playSound()
    }
    else
        e.target.innerHTML = "Nagrywaj"

}
// funkcja odtwarzająca wszystkie nagrane dźwięki
function playSound(e) {

    channel1.forEach(function(sound) {
        setTimeout(
            ()=> {
                const audioDOM = document.querySelector(`#${sound.name}`)
                audioDOM.currentTime = 0
                audioDOM.play()
        }, sound.time)
    })
    channel2.forEach(function(sound) {
        setTimeout(
            ()=> {
                const audioDOM = document.querySelector(`#${sound.name}`)
                audioDOM.currentTime = 0
                audioDOM.play()
        }, sound.time)
    })
    channel3.forEach(function(sound) {
        setTimeout(
            ()=> {
                const audioDOM = document.querySelector(`#${sound.name}`)
                audioDOM.currentTime = 0
                audioDOM.play()
        }, sound.time)
    })
    channel4.forEach(function(sound) {
        setTimeout(
            ()=> {
                const audioDOM = document.querySelector(`#${sound.name}`)
                audioDOM.currentTime = 0
                audioDOM.play()
        }, sound.time)
    })
}