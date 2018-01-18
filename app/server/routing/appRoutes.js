

module.exports = (app, cherrio, request, db) => {
  app.get('/', (req, res) => {
    res.render("index", {})
  })
}