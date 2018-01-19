  $('.slider').on('change', () => {
    let val = $('#scrapeButton input').val();
    val === '100' ? $('#homeContainer').hide('slide', {direction: "left"}, 1000, null) : null
  })



