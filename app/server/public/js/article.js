$('#scrapedArticles').on('click', (e) => {
  $('#articleContainer').toggle('display')
  $('#bookmarked').toggle('display')
});

$('#bookmarkedArticles').on('click', (e) => {
  $('#articleContainer').toggle('display')
  $('#bookmarked').toggle('display')
  fetchBookmarked()
});

$('#articleContainer').on('click', '#bookmark', function(e) {
  e.stopPropagation();
  let title = $(this).parent('div').children('h1').text()
  let obj = {
    title: title
  };

  $.ajax({
    type: 'POST',
    url: '/bookmark',
    data: obj,
    success: () => {
      console.log('success')
    }
  })
});

const fetchBookmarked = () => {
  $.ajax({
    type: 'GET',
    url: '/bookmarked',
    success: renderBookmarked
  })
}

const renderBookmarked = res => {
  $('#bookmarked').html(res)
}

