$(document).ready(() => {
  $('.show-full-card').on('click', () => {
    const petFullCard = $(this).parent().next();
    const petProfileContainer = petFullCard.parent();
    petProfileContainer.css({'width': '100%'});
    petFullCard.css({'display': 'block'});
  })

  $('.close-full-card').on('click', () => {
    $('.pet-profile-container').css({'width': '420px'});
    $('.pet-full-card').css({'display': 'none'});
  })
});
