var token = localStorage.getItem('token');
if (token) {
  token = token.replace(/^"(.*)"$/, '$1'); // Remove quotes from token start/end.
}


$('#select-cats').on('click', function() {
  $('.Dog-profile').css({'display': 'none'});
  $('.Other-profile').css({'display': 'none'});
  $('.Cat-profile').css({'display': 'block'});
})

$('#select-dogs').on('click', function() {
  $('.Dog-profile').css({'display': 'block'});
  $('.Other-profile').css({'display': 'none'});
  $('.Cat-profile').css({'display': 'none'});
})

$('#select-other').on('click', function() {
  $('.Dog-profile').css({'display': 'none'});
  $('.Other-profile').css({'display': 'block'});
  $('.Cat-profile').css({'display': 'none'});
})

function selectAll(){
  $('.Dog-profile').css({'display': 'block'});
  $('.Other-profile').css({'display': 'block'});
  $('.Cat-profile').css({'display': 'block'});
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



function loadPets() {
  $.ajax({
    url: 'https://pawsitivity-web-api.herokuapp.com/pets',
    // url: 'https://tuapp.herokuapp.com/todos',
    headers: {
        'Content-Type':'application/json',
        'Authorization': 'Bearer ' + token
    },
    method: 'GET',
    dataType: 'json',
    success: function(data){
      console.log(data)

      for( let i = 0; i < data.length; i++) {
        // aqui va su código para agregar los elementos de la lista
        console.log(data[i])
        loadCard(data[i].name, data[i].animalType, data[i].breed, data[i].age, data[i].specialCare, data[i].sterilization, "Monterrey", data[i].ownerEmail)
      }
    },
    error: function(error_msg) {
      alert((error_msg['responseText']));
    }
  });
}

function loadCard(petName, petType, petBreed, petAge, petSpecialCare, petSterilized, petLocation, petEmail, petPicture){
  let new_html=""

  new_html += `
  <div class="pet-profile-container ${petType}-profile" >
        <div class="card text-center">
          <h4>${petName}</h4>
          <img src="${petPicture}" alt="https://via.placeholder.com/300x200">
          <p>${petType}, ${petBreed}</p>
          <button class="show-full-card button" onclick="openCard(this)" style="background:#dae9f2;">Ver detalle</button>
        </div>
        <div class="pet-full-card" style="background: #d06246; color:#171717;">
          <div class="container">
            <div class="six columns">
              <h4>${petName}</h4>
              <img src="${petPicture}" alt="https://via.placeholder.com/300x200">
            </div>
            <div class="six columns">
              <p>Age: ${petAge}</p>
              <p>Requires Special Care: ${petSpecialCare}</p>
              <p>Spayed/Newtered: ${petSterilized}</p>
              <p>Location: ${petLocation}</p>
              <p>Contact: ${petEmail}</p>
            </div>
            <div class="close-full-card"><button class="button x-color" onclick="closeCard(this)">X</button></div>
          </div>
        </div>
  </div>
  `
  $("#card-container").append(new_html);

}

loadPets()

/*
input.addEventListener('keypress', function (event) {
  if (event.charCode === 13) {
    json_to_send = {
      "description" : input.value
    };
    json_to_send = JSON.stringify(json_to_send);
    $.ajax({
      url: 'https://examenwebjesus.herokuapp.com/todos',
      // url: 'https://tuapp.herokuapp.com/todos',
      headers: {
          'Content-Type':'application/json',
          'Authorization': 'Bearer ' + token
      },
      method: 'POST',
      dataType: 'json',
      data: json_to_send,
      success: function(data){
        console.log(data)
        new_list = ''
        $("#unfinished-list").html(new_list)
        loadTodos()
      },
      error: function(error_msg) {
        alert((error_msg['responseText']));
      }
    });
    input.value = '';
  }
})


var newTask = document.getElementById('newitem')
var unfinished = document.getElementById("unfinished-list");
var finished = document.getElementById("finished-list");
var checkCounter=0;

function addTodo(id, todoText, completed) {

var newLi = document.createElement("li");
var newIndex = document.createElement("input");

newIndex.type = "checkbox";
if(completed){
  newIndex.checked = true;
}else{
  newIndex.checked = false;
}
newIndex.name = "todo";

checkCounter++;

newIndex.value = checkCounter;
newIndex.onchange = function(){
  crossoutHandler(this, id);
};

var newSpan = document.createElement("span");
newSpan.id="span"+checkCounter;
var newTnode = document.createTextNode(todoText);
newSpan.appendChild(newTnode);
newLi.appendChild(newIndex);
newLi.appendChild(newSpan);

if(completed){
  finished.appendChild(newLi);
}else{
  unfinished.appendChild(newLi);
}



}

*/
