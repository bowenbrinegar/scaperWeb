
module.exports = (app, hbs, cheerio, request, db) => {
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

      res.render('partials/articles/index', {layout: false, data: {obj: results}})
    });
  });
};