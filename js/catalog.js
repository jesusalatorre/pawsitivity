var token = localStorage.getItem('token');
if (token) {
  token = token.replace(/^"(.*)"$/, '$1'); // Remove quotes from token start/end.
}

//Funcion que se encarga de mostrar el "perfil" del animal
$(document).ready(function () {
  $('.show-full-card').on('click', function () {
    const petFullCard = $(this).parent().next();
    const petProfileContainer = $(this).parent().parent();
    $(petProfileContainer).css({'width': '100%'});
    $(petFullCard).css({'display': 'block'});
  })

  $('.close-full-card').on('click', () => {
    $('.pet-profile-container').css({'width': '420px'});
    $('.pet-full-card').css({'display': 'none'});
  })
});


function updateTodo(id, completed) {
  console.log(completed)
  json_to_send = {
    "completed" : completed
  };
  json_to_send = JSON.stringify(json_to_send);
  $.ajax({
      url: 'https://examenwebjesus.herokuapp.com/todos' + id,
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
      },
      error: function(error_msg) {
        alert((error_msg['responseText']));
      }
    });
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
        console.log(data[i].description)
        // algo asi:
        // addTodo(data[i]._id, data[i].description, data[i].completed)
        addTodo(data[i]._id, data[i].description, data[i].completed)
      }
    },
    error: function(error_msg) {
      alert((error_msg['responseText']));
    }
  });
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
