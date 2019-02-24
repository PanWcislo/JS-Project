let socketKey = "fj3Dk83A9fGr4Dc2"; // filtrowanie wiadomości z websocket po tym kluczu (nagłówek wiadomości)
let uluru, map, marker
let ws;
let players = {}
let nick = '1'
let begForLocation = document.querySelector('.beg-for-location')
let guid = parseInt(Date.now() + Math.random() * 1000) // unikatowy identyfikator
let icon = guid % 5 // numer obrazka

//ws = new WebSocket("ws://91.121.6.192:8010")
ws = new WebSocket("ws://77.55.222.58:443")

function initMap()
{
    uluru = { lat: -25.363, lng: 131.044 }
    map = new google.maps.Map(document.getElementById('map'),{
        zoom: 12,
        center: uluru,
        keyboardShortcuts: false
    });
    marker = new google.maps.Marker({position: uluru, map: map, icon: iconString(icon)});

}