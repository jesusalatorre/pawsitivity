$(document).ready(() => {
  $('#show-full-card').on('click', () => {
    $('.pet-profile-container').css({'width': '100%'});
    $('.pet-full-card').css({'display': 'block'});
  })

  $('#close-full-card').on('click', () => {
    $('.pet-profile-container').css({'width': '0%'});
    $('.pet-full-card').css({'display': 'none'});
  })
});
