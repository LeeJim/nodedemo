

// index page
exports.index = (req, res) => {
  res.render('index', {
    title: 'modile index'
  })
}

exports.home = (req, res) => {
  res.render('home', {
    title: 'modile index'
  })
}