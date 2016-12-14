// coding by JasonXDDDD

var aname, bname;
var coord711 = [];
var coordFM = [];

// get txt address 
(function(){
    $.get("taipei711.txt", function(data, status) {
        aname = data;
        analysis711();
    })
    
   $.get("taipeiFamilyMart.txt", function(data, status) {
       bname = data;
       analysisFM();
   })

});

(function() {
    $.get("geo711.json", function(data, status) {
        coord711 = data;

        coord711.forEach(function(element, index, array){
            addCircle711(element, 100);
        })
    });

    $.get("geoFM.json", function(data, status) {
        coordFM = data;

        coordFM.forEach(function(element, index, array){
            addCircleFM(element, 100);
        })
    });

})();


function analysis711() {  
    console.log(aname);

    // split adress to array
    var Aarray = aname.split(" ");

    for (loc in Aarray) {
        search711(Aarray[loc], loc);
    }

    setTimeout(function(){console.log(JSON.stringify(coord711));}, Aarray.length*1000+1000);
};

function analysisFM() {  
    console.log(bname);

    // split adress to array
    var Barray = bname.split(" ");

    for (loc in Barray) {
        searchFM(Barray[loc], loc);
    }

    setTimeout(function(){console.log(JSON.stringify(coordFM));}, Barray.length*1000+1000);    
};

//search for address
function search711(address, loc) {
    setTimeout(
        function() {
            $.get("http://maps.googleapis.com/maps/api/geocode/json?address=" + address + "&sensor=false&language=zh-tw", function(data, status) {
//                console.log(status);
                console.log(data.results[0].geometry.location);
                coord711.push(data.results[0].geometry.location);

                // draw cycle on the map
                addCircle711(data.results[0].geometry.location, 100);
                // addMarkerWithTimeout(data.results[0].geometry.location, 100);
            })
        },
        loc * 1000);
        
};

function searchFM(address, loc) {
    setTimeout(
        function() {
            $.get("http://maps.googleapis.com/maps/api/geocode/json?address=" + address + "&sensor=false&language=zh-tw", function(data, status) {
                console.log(data.results[0].geometry.location);
                coordFM.push(data.results[0].geometry.location);
                
                // draw cycle on the map
                addCircleFM(data.results[0].geometry.location, 100);
                // addMarkerWithTimeout(data.results[0].geometry.location, 100);
            })
        },
        loc * 1000);

};


// google map
var neighborhoods = [
    { lat: 25.1812244, lng: 121.4214583 },
    { lat: 25.1374646, lng: 121.4602428 },
    { lat: 25.1748852, lng: 121.4327285 },
    { lat: 25.2371331, lng: 121.4566068 }
];

var markers = [];
var map;

function initMap() {
    map = new google.maps.Map(document.getElementById('map'), {
        zoom: 11,
        center: { lat: 25.0865921, lng: 121.532873 }
    });

    var ctaLayer = new google.maps.KmlLayer({
    url: 'http://s03.tku.edu.tw/~403410623/work/7-11inTaipei/taipei_district.kml',
    map: map
  });
}

function drop() {
    clearMarkers();
    for (var i = 0; i < neighborhoods.length; i++) {
        addMarkerWithTimeout(neighborhoods[i], i * 200);
    }
}

function addMarkerWithTimeout(position, timeout) {
    window.setTimeout(function() {
        markers.push(new google.maps.Marker({
            position: position,
            map: map,
            // icon: "https://eservice.7-11.com.tw/e-tracking/images/head_01.gif",
            animation: google.maps.Animation.DROP
        }));
    }, timeout);
}


function addCircle711(position, timeout) {
    setTimeout(function() {
        var cityCircle = new google.maps.Circle({
            strokeColor: '#FF0000',
            strokeOpacity: 0.8,
            strokeWeight: 2,
            fillColor: '#FF0000',
            fillOpacity: 0.35,
            map: map,
            center: position,
            radius: 100
        });

    }, timeout);
}

function addCircleFM(position, timeout) {
    setTimeout(function() {
        var cityCircle = new google.maps.Circle({
            strokeColor: '#0000FF',
            strokeOpacity: 0.8,
            strokeWeight: 2,
            fillColor: '#0000FF',
            fillOpacity: 0.35,
            map: map,
            center: position,
            radius: 100
        });

    }, timeout);
}



function clearMarkers() {
    for (var i = 0; i < markers.length; i++) {
        markers[i].setMap(null);
    }
    markers = [];
}


// drop();