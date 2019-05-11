var token = localStorage.getItem('token');
if (token) {
  token = token.replace(/^"(.*)"$/, '$1'); // Remove quotes from token start/end.
}


$('#addpet_button').on('click', function(){
	var name = document.querySelector('#pet_name').value
	var type = document.querySelector('#pet_type').value
	var breed = document.querySelector('#pet_breed').value
  var specialCare = document.getElementById("pet_specialCare").checked
	var age = parseInt(document.getElementById('pet_age').value)
	var sterilized = document.getElementById("pet_sterilization").checked
	var photo = document.querySelector('#pet_photo').value

  if (breed.length == 0){
    breed = "unknown"
  }
	
	var json_to_send = {
    "name": name,
    "animalType" : type,
    "breed" : breed,
    "specialCare" : specialCare,
    "age" : age,
    "sterilization" : sterilized,
    "image_path" : photo
  };

  json_to_send = JSON.stringify(json_to_send);

  console.log(json_to_send)

  $.ajax({
    url: 'https://pawsitivity-web-api.herokuapp.com/pets/',
    // url: 'https://tuapp.herokuapp.com/users/login',
    headers: {
        'Content-Type':'application/json',
        'Authorization': 'Bearer ' + token
    },
    method: 'POST',
    dataType: 'json',
    data: json_to_send,
    success: function(data){
      // guardar token en localstorage o cookie
      alert("Pet registered!")
      console.log('success: '+ data);
      window.location = './catalog.html'
    },
    error: function(error_msg) {
      alert((error_msg["responseText"]));
    }
  });
})

function loadPetTypes() {
	let new_html = ""
	let petTypes = [
		"Dog",
		"Cat"
	]
	new_html+= `
			<option value= "-1" class="hide_option" selected="selected">
				Pet Type
			</option>
		`
	for(let i = 0; i < petTypes.length; i++) {
		new_html+= `
			<option value= "${petTypes[i]}">
				${petTypes[i]}
			</option>
		`
	}
	$("#pet_type").append(new_html);
}

loadPetTypes()
