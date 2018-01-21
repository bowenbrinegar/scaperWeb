
$('#bookmarked').on('click', '#note', function() {
  $('#notes').toggle('display');
  $('#mainContainer').css('filter', 'blur(20px)');
  id = $(this).parent().attr('data-id');
  fetchNotes(null)
})

const fetchNotes = function(res) {
  $.ajax({
    type: 'GET',
    url: '/article-notes/' + id,
    success: renderNotes
  })
};

const renderNotes = res => {
  $('#notes').html(res)
};

$('#notes').on('click', '#submitNote', function() {
  console.log('working')
  let note = {
    article: id,
    body: $('#noteInput').val()
  };
  $('#noteInput').val('')

  $.ajax({
    type: 'POST',
    url: '/note',
    data: note,
    success: fetchNotes
  })
});