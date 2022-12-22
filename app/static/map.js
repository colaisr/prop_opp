

$(document).ready(function () {
//fornow();
    var moscow_map;

    ymaps.ready(function(){

        moscow_map = new ymaps.Map("main_map", {
            center: [55.76, 37.64],
            zoom: 8
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
            for (let i = 0; i < flats.length; i++) {

                         myPlacemark = new ymaps.Placemark([flats[i].lat, flats[i].lng], {
                address: "ЦенаH: "+flats[i].price_n,
                object: "ID: "+flats[i].id
            }, {
                hintLayout: HintLayout
            });

            myPlacemark.events.add(['click'],  function (e) {
window.location.href = '/prop/'+flats[i].id;


})

            moscow_map.geoObjects.add(myPlacemark);

            }

    });


});





