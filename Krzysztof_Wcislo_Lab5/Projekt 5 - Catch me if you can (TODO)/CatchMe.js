let uluru, map, marker
let ws
let players = {}
let nick = 'Gracz1'
let sendButton = document.querySelector('button');
let msg;
let flag=false;
let guid = parseInt(Date.now() + Math.random() * 1000) // unikatowy identyfikator
let icon = guid % 5 // numer obrazka


function search(e) {
    if(event.key == 'Enter') {
        sendMessage();      
    }
}

function initMap() {
    uluru = { lat: -25.363, lng: 131.044 };
    map = new google.maps.Map(document.getElementById('map'), {
        zoom: 8,
        center: uluru,
        keyboardShortcuts: false
    });
    
    marker = new google.maps.Marker({
        position: uluru,
        map: map,
        animation: google.maps.Animation.DROP,
        icon: iconString(icon)
    });
    getLocalization()
    startWebSocket()
    watchKeys()
}


function watchKeys() {
    window.addEventListener('keydown', moveMarker)
}

function moveMarker(ev) {
    let coords = {
        lat: marker.getPosition().lat(),
        lng: marker.getPosition().lng()
    }

    switch (ev.code) {
        case 'ArrowUp':
            coords.lat += 0.02
            break;
        case 'ArrowDown':
            coords.lat -= 0.02
            break;
        case 'ArrowLeft':
            coords.lng -= 0.02
            break;
        case 'ArrowRight':
            coords.lng += 0.02
            break;
        default:
            break;
    }
    placeMyMarker(coords, 'move')
}

function placeMyMarker(_coords, _action)
{
    marker.setPosition(_coords)
    map.setCenter(_coords)

    let me = {
        id: guid,
        action: _action,
        coords: _coords,
        playericon: icon
    }

    sendMessage(me)
}
function startWebSocket() {
    let url = 'ws://91.121.6.192:8010'
    ws = new WebSocket(url)
    ws.addEventListener('open', onWSOpen)
    ws.addEventListener('message', onWSMessage)
}

function onWSOpen(data) {
    console.log(data)
}

function sendMessage(){
    let text = document.getElementById('text');
    let nickname = document.getElementById('nick').value;
    textToSend=nickname+": "+text.value;
    msg = { typ: 'msg', tekst: textToSend };
    ws.send(JSON.stringify(msg));
    text.value="";
}

function onWSMessage(e) {
    let log = document.getElementById('log');

    msg=(JSON.parse(e.data));
    if(msg.typ=='msg'){
        log.innerHTML+=(msg.tekst)+"<br/>";
    }

    else{
        let data = JSON.parse(e.data)

        if (!players['user' + data.id]) {
            players['user' + data.id] = new google.maps.Marker({
                position: { lat: data.lat, lng: data.lng },
                map: map,
                animation: google.maps.Animation.DROP
            })
        } else {
            players['user' + data.id].setPosition({
                lat: data.lat,
                lng: data.lng
            })
        }
    }
        
    

    
}


function getLocalization() {
    navigator.geolocation.getCurrentPosition(geoOk, geoFail)

}

function geoOk(data) {
    let coords = {
        lat: data.coords.latitude,
        lng: data.coords.longitude
    }
    placeMyMarker(coords, 'new')
}

function geoFail(err) {
    console.log(err)
}

function iconString(number)
{
    return `icon/${number}.png`
}
