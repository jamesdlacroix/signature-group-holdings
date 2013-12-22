var util   = require('util')
  , _      = require('lodash');

function helpers (appName) {
  return function (req, res, next) {

    res.locals.pageTitle = function (page, siteTitle) {
      var _siteTitle = siteTitle || appName || '';
      var _page;
      if (typeof page !== 'undefined') {
        if (typeof page === 'string') {
          _page = page;
        } else if (util.isArray(page)) {
          _page = _.compact(page).join(' - ');
        }
        if (_siteTitle !== '') {
          return _page + ' | ' + _siteTitle;
        } else {
          return _page;
        }
      } else {
        return _siteTitle;
      }
    };

    res.locals.isActive = function (path, _klass) {
      var klass = _klass || 'is-active';
      return req.url === path ? klass : '';
    };

    res.locals.isDevelopment = function() {
      return process.env.NODE_ENV === "development";
    };
    res.locals.isTest = function() {
      return process.env.NODE_ENV === "test";
    };
    res.locals.isProduction = function() {
      return process.env.NODE_ENV === "production";
    };

    next();

  };
}

module.exports = helpers;
