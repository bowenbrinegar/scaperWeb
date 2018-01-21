
module.exports = (app, cheerio, request, db) => {
  app.get('/', (req, res) => {
    // db.Article.remove({}, {multi: true})
    //   .then( result => console.log('success'))
    //   .catch( err => console.log(err));
    // db.Note.remove({}, {multi: true}).then().catch()
    res.render('index')
  });

  app.get('/scrape', (req, res) => {
    const results =  [];
    request("https://medium.com/",
      (error, response, html) => {

      const $ = cheerio.load(html);
      $("h3").each(function (i, element) {
        let title = $(this).text();
        results.push({
          title: title
        });
      });

      res.render('partials/articles/index',
        {layout: false, articles: results})
    });
  });

  app.get('/bookmarked', (req, res) => {
    db.Article.find({})
      .then( (result) => {
        res.render('partials/bookmarked/index',
          {layout: false, articles: result})
      })
      .catch( err => console.log(err))
  });

  app.post('/bookmark', (req, res) => {
    db.Article.create(req.body)
      .then( result => res.send('success'))
      .catch( err => console.log(err))
  });

  app.get('/article-notes/:id', (req, res) => {
    console.log("still there?", req.params.id)
    db.Note.find({article: req.params.id})
      .then( result => {
        res.render('partials/notes/index',
          {layout: false, notes: result})
      })
      .catch( err => res.send(err))
  });

  app.post('/note', (req, res) => {
    const note = req.body;
    console.log('note', note);
    db.Note.create(note)
      .then( note => res.send('success'))
      .catch( err => console.log(err))
  })
};