let uluru, map, marker
let ws
let players = {}
let nick = 'Gracz1'
let msg;
let flag=false;
let guid = parseInt(Date.now() + Math.random() * 1000) // unikatowy identyfikator
let icon


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
        icon: avatarIcon()
    });
    getLocalization()
    startWebSocket()
    watchKeys()
    document.querySelector(".location").style.display = "flex"
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

}
function startWebSocket() {
    let url = 'ws://77.55.222.58:443'
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
    textToSend=nickname + ": "+ text.value;
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
    document.querySelector(".location").style.display = "none"
    let coords = {
        lat: data.coords.latitude,
        lng: data.coords.longitude
    }
    placeMyMarker(coords, 'new')
}

function geoFail(data) {
    document.querySelector(".location").style.display = "flex"
    document.querySelector(".text_location_fail").style.display = "flex"
}



function avatarIcon(){

    let number

    if(document.getElementById("0").checked) {
        number = 0
        return `icon/${number}.png`
    }
    if(document.getElementById("1").checked) {
        number = 1
        return `icon/${number}.png`
    }
    if(document.getElementById("2").checked) {
        number = 2
        return `icon/${number}.png`
    }
    if(document.getElementById("3").checked) {
        number = 3
        return `icon/${number}.png`
    }
    if(document.getElementById("4").checked) {
        number = 4
        return `icon/${number}.png`
    }
    if(document.getElementById("5").checked) {
        number = 5
        return num`icon/${number}.png`
    }

}
