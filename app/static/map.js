var filter_state = 'все';

$(document).ready(function () {
    var moscow_map;

    ymaps.ready(function () {
        draw_map(flats);
    });

    var min_price = flats[0].priceN;
    var max_price = 0;

    flats.forEach((flat) => {
        if (flat.priceN >= max_price) {
            max_price = flat.priceN;
        }
        if (flat.priceN <= min_price) {
            min_price = flat.priceN;
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
            adjust_props();

        },
    });


});

function numberWithCommas(x) {
    if (x != null) {
        return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ");
    } else {
        return '';
    }
}

function adjust_props() {
    let price_range = $(".js-range-slider").data("ionRangeSlider");
    filtered_props = [];
    if (filter_state != 'все') {
        flats.forEach((flat) => {
            if (flat.priceN >= price_range.old_from && flat.priceN <= price_range.old_to && flat.prop_type == filter_state) {
                filtered_props.push(flat);
            }
        })
    } else {
        flats.forEach((flat) => {
            if (flat.priceN >= price_range.old_from && flat.priceN <= price_range.old_to) {
                filtered_props.push(flat);
            }
        })
    }
    draw_map(filtered_props);

}

function draw_map(props_list) {

    if (document.getElementById('main_map').innerHTML != '') {
        main_map.destroy();
    }
    main_map = new ymaps.Map("main_map", {
        center: [55.76, 37.64],
        zoom: 8
    });

    market_part = "rr";
    // profit_part={{ properties.profit }};
    // percent_part={{ properties.percent }};


    var HintLayout = ymaps.templateLayoutFactory.createClass("<div class='my-hint'>" +
        "<b>{{ properties.pricek }} " +
        "{% if properties.market != 'Рынок: ' %}" +
        "{{ properties.market}}" +
        "</b><br />" +
        "<b>{{ properties.profit }} {{ properties.percent }}</b><br />" +
        "{% else %}" +
        "</b>" +
        "{% endif %}" +


        "</div>", {
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
        var icon_colour = '#000000'
        if (props_list[i].prop_type == 'кв') {
            icon_colour = '#ff0000';
        } else if (props_list[i].prop_type == 'нежилые') {
            icon_colour = '#00ff00';
        } else if (props_list[i].prop_type == 'земля') {
            icon_colour = '#0000ff';
        } else if (props_list[i].prop_type == 'дом') {
            icon_colour = '#9c6f04';
        }
        profit_adj = Math.round(props_list[i].profit)
        percent_adj = Math.round(props_list[i].percent)
        priceK_adj = Math.round(props_list[i].price_k)

        myPlacemark = new ymaps.Placemark([props_list[i].lat, flats[i].lng], {
            pricek: "ЦенаK: " + numberWithCommas(priceK_adj),
            market: "Рынок: " + numberWithCommas(props_list[i].market),
            profit: "Прибыль: " + numberWithCommas(profit_adj),
            percent: "(" + percent_adj + "%)"
        }, {
            hintLayout: HintLayout,
            preset: "islands#circleDotIcon",
            iconColor: icon_colour
        });

        myPlacemark.events.add(['click'], function (e) {
            window.location.href = '/prop/' + props_list[i].id;
        })

        main_map.geoObjects.add(myPlacemark);
    }


}

function filter_prop_type(btn_value) {
    filter_state = btn_value;
    adjust_props();
}

