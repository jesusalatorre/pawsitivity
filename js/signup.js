$('#signup_button').on('click', function(){
var email = document.querySelector('#email').value
var name = document.querySelector('#name').value
var age = document.querySelector('#age').value
var location = document.querySelector('#location').value
var password = document.querySelector('#password').value

var json_to_send = {
    "password" : password,
    "email": email,
    "name": name,
    "age": age,
    "location":location
  };

  json_to_send = JSON.stringify(json_to_send);

  $.ajax({
    url: 'https://pawsitivity-web-api.herokuapp.com/users',
    // url: 'https://tuapp.herokuapp.com/users',
    headers: {
        'Content-Type':'application/json'
    },
    method: 'POST',
    dataType: 'json',
    data: json_to_send,
    success: function(data){
      alert("Account created!");
      console.log('success: '+ data);
      window.location = './signup.html'
    },
    error: function(error_msg) {
      alert((error_msg['responseText']));
    }
  });

});
