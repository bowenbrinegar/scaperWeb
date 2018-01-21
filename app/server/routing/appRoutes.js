
module.exports = (app, cheerio, request, db) => {
  app.get('/', (req, res) => {
    res.render('index')
  });

  app.get('/scrape', (req, res) => {
    const results =  [];
    request("https://medium.com/", (error, response, html) => {
      const $ = cheerio.load(html);

      $("h3").each(function (i, element) {
        let title = $(this).text();
        results.push({
          title: title
        });
      });

      res.render('partials/articles/index', {layout: false, articles: results})
    });
  });

  app.get('/bookmarked', (req, res) => {

    // db.Article.remove({title: ''}, {multi: true}).then(() => {
    //   console.log('success')
    // }).catch(err => {
    //   console.log(err)
    // })

    db.Article.find({})
      .then( (result) => {
        console.log('bookmarked res', result)
        res.render('partials/bookmarked/index', {layout: false, articles: result})
      })
      .catch( (err) => {
        console.log(err)
      })
  });

  app.post('/bookmark', (req, res) => {
    console.log("bookmark", req.body)
    db.Article.create(req.body)
      .then( (result) => {
        console.log("bookmarked result", result)
        res.send('success')
      })
      .catch( (err) => {
        console.log(err)
      })
  });

  app.get('/article-notes/:id', (req, res) => {
    db.Article.findOne({_id: req.params.id})
      .populate('note')
      .then( (result) => { res.send(result) } )
      .catch( (err) => { res.send(err) } )
  });

  app.post('/note', (req, res) => {
    const note = req.body
    console.log('note', note)
    db.Note.create(note)
      .then( (note) => {
        db.Article.findByIdAndUpdate(note.id, {note: note._id})
          .then( (note) => { res.json(note) } )
          .catch( (err) => { res.send(err) } )
      })
  })
};