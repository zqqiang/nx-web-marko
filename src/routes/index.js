const template = require("src/index.marko");
module.exports = function(req, res) {
  res.setHeader("Content-Type", "text/html; charset=utf-8");
  res.marko(template, {
    page: req.params.page
  });
};
