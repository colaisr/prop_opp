

$(document).ready(function () {
//fornow();
//      alert("Map loaded");


});




function fornow() {
var data = {
    "format": "json",
    "addressdetails": 1,
    "q": "с. Введенское, д. 43",
    "limit": 1
};
$.ajax({
  method: "GET",
  url: "https://nominatim.openstreetmap.org",
  data: data
})
.done(function( msg ) {
    console.log( msg );
});
}
