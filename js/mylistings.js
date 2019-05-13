var token = localStorage.getItem('token');
if (token) {
  token = token.replace(/^"(.*)"$/, '$1'); // Remove quotes from token start/end.
}

function openCard(elem){
    const petFullCard = $(elem).parent().next();
    const petProfileContainer = $(elem).parent().parent();
    $(petProfileContainer).css({'width': '100%'});
    $(petFullCard).css({'display': 'block'});
}

function closeCard(elem){
  $('.close-full-card').on('click', () => {
    $('.pet-profile-container').css({'width': '420px'});
    $('.pet-full-card').css({'display': 'none'});
  })
}

function loadMyPets() {
  $.ajax({
    url: 'https://pawsitivity-web-api.herokuapp.com/users',
    // url: 'https://tuapp.herokuapp.com/todos',
    headers: {
        'Content-Type':'application/json',
        'Authorization': 'Bearer ' + token
    },
    method: 'GET',
    dataType: 'json',
    success: function(data){
      const pets=data.petsForAdoption
      for( let i = 0; i < pets.length; i++) {
        // aqui va su código para agregar los elementos de la lista
        console.log(pets[i])
        loadCard(pets[i].name, pets[i].animalType, pets[i].breed, pets[i].age, pets[i].specialCare, pets[i].sterilization, "Monterrey", pets[i].ownerEmail, pets[i]._id)
      }
    },
    error: function(error_msg) {
      alert((error_msg['responseText']));
    }
  });
}


function updatePet(id ,fields) {

  json_to_send = JSON.stringify(fields);
  console.log(json_to_send)
  $.ajax({
      url: 'https://pawsitivity-web-api.herokuapp.com/pets/' + id,
      // url: 'https://tuapp.herokuapp.com/todos',
      headers: {
          'Content-Type':'application/json',
          'Authorization': 'Bearer ' + token
      },
      method: 'PATCH',
      dataType: 'json',
      data: json_to_send,
      success: function(data){
        console.log("UPDATE!!")
        location.reload()
      },
      error: function(error_msg) {
        alert((error_msg['responseText']));
      }
    });
}

function editPet(id){
  const inputFields = $(`#${id} input`)
  inputFields.prop('disabled', false);

}

function savePet(id){
  const inputs = $(`#${id} input`)
  const fields = {}
  inputs.each(function(index, input) {
    fields[$(input).attr("name")] = $(input).val()
  })

    updatePet(id, fields)
    const inputFields = $(`#${id} input`)
    inputFields.prop('disabled', true);
}

function deletePet(id){
  $.ajax({
      url: 'https://pawsitivity-web-api.herokuapp.com/pets/' + id,
      // url: 'https://tuapp.herokuapp.com/todos',
      headers: {
          'Content-Type':'application/json',
          'Authorization': 'Bearer ' + token
      },
      method: 'DELETE',
      success: function(){
        console.log("Delete!")
        location.reload()
      },
      error: function(error_msg) {
        alert((error_msg['responseText']));
      }
    });


}

function loadCard(petName, petType, petBreed, petAge, petSpecialCare, petSterilized, petLocation, petEmail, petID){

  let new_html=""

  new_html += `
  <div class="pet-profile-container" id="${petID}">
        <div class="card text-center">
          <h4>${petName}</h4>
          <img src="https://pawsitivity-web-api.herokuapp.com/pets/${petID}/pic" alt="https://via.placeholder.com/300x200">
          <p>${petType}, ${petBreed}</p>
          <button class="show-full-card button" onclick="openCard(this)" style="background:#dae9f2;">Ver detalle</button>
        </div>
        <div class="pet-full-card" style="background: #dae9f2; color:#171717;">
          <div class="container">
            <div class="six columns">
              <p>Name:</p><input disabled type="text" name="name"  class="pet-editor"  value="${petName}">
              <div>
              <img src="https://pawsitivity-web-api.herokuapp.com/pets/${petID}/pic" alt="https://via.placeholder.com/300x200">
              </div>
            </div>
            <div class="six columns">
              <p>Breed:</p> <input disabled type="text" class="pet-editor" name="breed" value="${petBreed}">
              <p>Age:</p> <input disabled type="text" class="pet-editor" name="age" value="${petAge}">
              <span>
                <button id="edit-button" class="button" onclick="editPet('${petID}')">Edit</button>
                <button id="save-button" class="button" onclick="savePet('${petID}')">Save</button>
                <button id="delete-button" class="button x-color" onclick="deletePet('${petID}')">Delete</button>
              </span>
            </div>
            <div class="close-full-card"><button class="button x-color" onclick="closeCard(this)">X</button></div>
          </div>
        </div>
  </div>
  `
  $("#card-container").append(new_html);

}

loadMyPets()
