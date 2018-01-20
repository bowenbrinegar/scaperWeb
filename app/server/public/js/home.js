
  $('.slider').on('change', () => {
    let val = $('#scrapeButton input').val();
    val === '100' ? (animate(), scrape()) : null
  });

  const animate = () => {
    $('#homeContainer').hide('slide', {direction: "left"}, 1000, null)
  };

  const scrape = () => {
    $.ajax({
      type: 'GET',
      url: '/scrape',
      success: render
    })
  };

  const render = res => {
    $('#articleContainer').html(res)
  };

