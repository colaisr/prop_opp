

$(document).ready(function () {
    var moscow_map;

    ymaps.ready(function(){
        draw_map(flats);
    });

    var min_price=flats[0].priceN;
    var max_price=0;

    flats.forEach((flat) => {
     if(flat.priceN>=max_price){
     max_price=flat.priceN;
     }
     if(flat.priceN<=min_price){
     min_price=flat.priceN;
     }

     })
    $(".js-range-slider").ionRangeSlider({
    type: "double",
    min: min_price,
    max: max_price,
    from: min_price,
    to: max_price,
    grid: false,
        onFinish: function (data) {
            // Called then action is done and mouse is released
            adjust_props(data.from,data.to);
            draw_map(filtered_props);
        },
    });




});

function numberWithCommas(x) {
    if (x!=null){
        return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    }
    else{
    return '';
    }
}
function adjust_props(min,max){
    filtered_props=[];
    flats.forEach((flat) => {
         if(flat.priceN>=min && flat.priceN<=max){
         filtered_props.push(flat);
         }
    })


}
function draw_map(props_list){

    if (document.getElementById('main_map').innerHTML!=''){
        main_map.destroy();
    }
        main_map = new ymaps.Map("main_map", {
            center: [55.76, 37.64],
            zoom: 8
        });

        var HintLayout = ymaps.templateLayoutFactory.createClass( "<div class='my-hint'>" +
            "<b>{{ properties.pricek }} {{ properties.market }}</b><br />" +
            "<span>{{ properties.profit }} {{ properties.percent }}%</span><br />" +

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
                                [firstChild.offsetWidth, (firstChild.scrollHeight)]
                            ])
                        );
                    }
                    return result;
                }
        }
    );
        for (let i = 0; i < props_list.length; i++) {

                     myPlacemark = new ymaps.Placemark([props_list[i].lat, flats[i].lng], {
            pricek: "ЦенаK: "+numberWithCommas(props_list[i].price_k),
            market: "Рынок: "+numberWithCommas(props_list[i].market),
            profit: "Прибыль: "+props_list[i].profit,
            percent: props_list[i].percent
        }, {
            hintLayout: HintLayout
        });

        myPlacemark.events.add(['click'],  function (e) {
        window.location.href = '/prop/'+props_list[i].id;
        })

            main_map.geoObjects.add(myPlacemark);
        }


}


