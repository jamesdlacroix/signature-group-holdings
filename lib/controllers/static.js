/*
 * GET /
 */

exports.index = function(req, res) {
  res.render('static/index', {});
};

/*
 * GET /:view
 */

exports.page = function(req, res) {
  console.log('req.url');
  console.log(req.url);
  var viewName = req.params[0]
    .split('/')
    .filter(function (item) {
      return item !== '';
    })
    .join('/');
  var view = 'pages/' + viewName;
  res.render(view, function(err, html) {
    if (err) {
      if (err.message.indexOf('Failed to lookup view') !== -1) {
        return res.send(404, 'Page not found!');
      }
      throw err;
    }
    res.send(html);
  });
};
