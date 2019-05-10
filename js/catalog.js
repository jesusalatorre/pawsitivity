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
