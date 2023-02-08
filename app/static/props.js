function openWhatsApp() {
    window.open('whatsapp://send?text= '+window.location.href);
    }
function openTelegram() {
    window.open('https://telegram.me/share/url?url='+window.location.href+'&text=Please have a look:');
    }

$(document).ready(function () {
    var moscow_map;

    ymaps.ready(function(){

        moscow_map = new ymaps.Map("main_map", {
            center: [property.lat, property.lng],
            zoom: 17,
            type: 'yandex#map'
        });

        var HintLayout = ymaps.templateLayoutFactory.createClass( "<div class='my-hint'>" +
                "<b>{{ properties.object }}</b><br />" +
                "{{ properties.address }}" +
                "</div>", {
                    /**
                     * Defining the getShape method,
                     * which will return the size of the hint layout.
                     * This is necessary in order for the hint to automatically
                     * move its position when going off the map.
                     */
                    getShape: function () {
                        var el = this.getElement(),
                            result = null;
                        if (el) {
                            var firstChild = el.firstChild;
                            result = new ymaps.shape.Rectangle(
                                new ymaps.geometry.pixel.Rectangle([
                                    [0, 0],
                                    [firstChild.offsetWidth, firstChild.offsetHeight]
                                ])
                            );
                        }
                        return result;
                    }
            }
        );


        myPlacemark = new ymaps.Placemark([property.lat, property.lng], {
                address: "ЦенаК: "+property.price_k,
                object: "ID: "+property.id
            }, {
                hintLayout: HintLayout
            });

            myPlacemark.events.add(['click'],  function (e) {
            window.location.href = '/prop/'+property.id;})

            moscow_map.geoObjects.add(myPlacemark);



    });


});





