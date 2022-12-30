$(document).ready(function () {
    $('#search-users').keyup(function () {
        var searchText = $(this).val();
        if (searchText.length > 0) {
            $('tbody td:icontains(' + searchText + ')').addClass('positive');
            $('td.positive').not(':icontains(' + searchText + ')').removeClass('positive');
            $('tbody td').not(':icontains(' + searchText + ')').closest('tr').addClass('hidden').hide();
            $('tr.hidden:icontains(' + searchText + ')').removeClass('hidden').show();
        } else {
            $('td.positive').removeClass('positive');
            $('tr.hidden').removeClass('hidden').show();
        }
    });

    $('#select-role').dropdown({
        onChange: function (value, text, $selectedItem) {
            $('td.user.role:contains(' + value + ')').closest('tr').removeClass('hidden').show();
            $('td.user.role').not(':contains(' + value + ')').closest('tr').addClass('hidden').hide();
        }
    });
    // Get the modal
    var editModal = document.getElementById("editModal");
    var loadingModal = document.getElementById("loadingModal");
    // Get the <span> element that closes the modal
    var span = document.getElementsByClassName("close")[0];
    var editedId;
    var editedAddress;
    // When the user clicks on <span> (x), close the modal
    span.onclick = function() {
          editModal.style.display = "none";
          document.getElementById("newAddress").value='';
          if (document.getElementById('modal_map').innerHTML!=''){
            modal_map.destroy();
          }

    }

    // When the user clicks anywhere outside of the modal, close it
    window.onclick = function(event) {
      if (event.target == editModal) {
        editModal.style.display = "none";
        document.getElementById("newAddress").value='';
        if (document.getElementById('modal_map').innerHTML!=''){
        modal_map.destroy();
    }
      }
    }
});

function show_loading() {
loadingModal.style.display = "block";
}


function show_modal(id) {
  editModal.style.display = "block";
  editedId=id;
  edited_flat=flats_json[id-1]

  document.getElementById('editID').innerHTML = editedId;
  document.getElementById('id').value = editedId;
  document.getElementById('Address').value = edited_flat.address;
  document.getElementById('priceN').value = edited_flat.priceN;
  document.getElementById('plus').value = edited_flat.plus;
  document.getElementById('priceK').value = edited_flat.price_k;
  document.getElementById('market').value = edited_flat.market;
  document.getElementById('profit').value = edited_flat.profit;
  document.getElementById('profitpercent').value = edited_flat.percent;
  document.getElementById('comment').value = edited_flat.comment;

  document.getElementById('lng').value = edited_flat.lng;
  document.getElementById('lat').value = edited_flat.lat;

  update_modal_map(edited_flat.lat,edited_flat.lng)
}

function geocodeAddress() {
    var lng
    var lat
    const address = document.getElementById("newAddress").value;
    if (!address || address.length < 3) {
    console.log("The address string is too short. Enter at least three symbols");
    return;
    }

    $.ajax({
      method: "GET",
      url: "/admin/getposition/"+encodeURIComponent(address),
    }).done(function( msg ) {
        lat=msg.split(' ')[0];
        lng=msg.split(' ')[1];
        document.getElementById('lng').value = lng;
        document.getElementById('lat').value = lat;
        update_modal_map(lat,lng)
    });
}
function update_modal_map(lat,lng){
    if (document.getElementById('modal_map').innerHTML!=''){
        modal_map.destroy();
    }

    modal_map = new ymaps.Map("modal_map", {
    center: [lat, lng],
    zoom: 17
    });
    myPlacemark = new ymaps.Placemark([lat,lng]);
    modal_map.geoObjects.add(myPlacemark);
    





}





