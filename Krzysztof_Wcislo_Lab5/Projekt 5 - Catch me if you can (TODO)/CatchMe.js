let socketKey = "asdq43823245isdf"; // filtrowanie wiadomości z websocket po tym kluczu
let uluru, map, marker
let ws;
let players = {}
let nick = '1'
let begForLocation = document.querySelector('.beg-for-location')
let guid = parseInt(Date.now() + Math.random() * 1000) //identyfikator
let icon = guid % 6 // numer obrazka


ws = new WebSocket("ws://77.55.222.58:443")

function initMap()
{
    uluru = { lat: -25.363, lng: 131.044 }
    map = new google.maps.Map(document.getElementById('map'),{
        zoom: 12,
        center: uluru,
        keyboardShortcuts: false
    });
    marker = new google.maps.Marker({
        position: uluru, 
        map: map, 
        icon: iconString(icon)}
    );

}

function getLocalization(){
    navigator.geolocation.getCurrentPosition(geoYes, geoNo)
}

function geoYes(data)
{
    begForLocation.classList.remove('beg-for-location--visible');
    let coords = {
        lat: data.coords.latitude,
        lng: data.coords.longitude
    };
    placeMyMarker(coords, 'new')

}

function geoNo(data)
{
    begForLocation.classList.add('beg-for-location--visible');
}
function goKeys(){
    document.addEventListener('keydown', moveMarker)
}

function moveMarker(e){
    let coords = {
        lat: marker.getPosition().lat(),
        lng: marker.getPosition().lng()
    }

    switch(e.key)
    {
        case 'ArrowUp':
            coords.lat += 0.001
            break;
        case 'ArrowDown':
            coords.lat -= 0.001
            break;
        case 'ArrowLeft':
            coords.lng -= 0.001
            break;
        case 'ArrowRight':
            coords.lng += 0.001
            break;
        default:
            break;
    }
    MyMarker(coords, 'move')
}

function MyMarker(myCoords, myAction){
    marker.setPosition(myCoords)
    map.setConter(myCoords)

    let me = {
        id: guid,
        action: myAction,
        coords: myCoords,
        playericon: icon
    }

    sendMessage(me)
}

function sendMessage(e)
{
    ws.send(socketKey + JSON.stringify(e))
}

function takeMessage(MSG){

    if(MSG.substring(0, socketKey.length) == socketKey)
    {
        MSG - MSG.substring(socketKey.length)
        MSG. JSON.parse(MSG)
        console.log(MSG)
        if(MSG.id != guid){

            if(MSG.action == "new"){
                players[MSG.id] = new google.maps.Marker({
                    position: MSG.coords, 
                    map: map, 
                    icon: iconString(MSG.playericon)
                });
            }
            if (MSG.action == "move"){

                if(players[MSG.id])
                    players[MSG.id].setPosition(MSG.coords);
                else 
                players[MSG.id] = new google.maps.Marker({
                    position: MSG.coords, 
                    map: map, 
                    icon: iconString(MSG.playericon)}
                );
            }
            if(MSG.action == "close"){
                players[MSG.id].setMap(null)
            }
        }
    }
}

getLocalization()

goKeys()


ws.onmessage = function(e){
    let message = e.data
    receiveMessage(message)
}

window.onbeforeunload = function(e){
    sendMessage({
        id: guid,
        action: "close"
    })
}

function iconString(nr)
{
    return `icon/${nr}.png`
}
