$('#bookmarkListItem').on('click', function() {
  let id = $(this).attr('data-id')
  $.ajax({
    type: 'GET',
    url: '/article-notes/' + id,
    success: renderNotes
  })
})


const renderNotes = res => {
  console.log(res)
  // $('#notes').html(res)
}