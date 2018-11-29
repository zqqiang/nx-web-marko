require("app-module-path").addPath(__dirname);
require("marko/express");
require("marko/node-require");

const argv = require("yargs").argv;
var express = require("express");

// If the process was started using browser-refresh then enable
// hot reloading for certain types of files to short-circuit
// a full process restart. You *should* use browser-refresh
// in development: https://www.npmjs.com/package/browser-refresh
let sR = require("marko/browser-refresh").enable();

var app = express();
var compression = require("compression"); // Provides gzip compression for the HTTP response
var serveStatic = require("serve-static");

var port = process.env.PORT || 8090;

// Enable gzip compression for all HTTP responses
app.use(compression());

// Allow all of the generated files under "static" to be served up by Express
app.use("/static", serveStatic(__dirname + "/static"));

// Map the "/" route to the home page
app.get("/", require("src/routes"));
app.get("/:page", require("src/routes"));

app.listen(port, function(err) {
  if (err) {
    throw err;
  }
  console.log("Navigate to http://%s:%d", "localhost", port);

  // The browser-refresh module uses this event to know that the
  // process is ready to serve traffic after the restart
  if (process.send) {
    process.send("online");
  }

  // todo: seems not working ?
  process.once("SIGTERM", () => {
    watcher.close(() => {
      console.log("[webpack watch]: ended.");
    });
    sR.remove();
    // Note: call this, or it will hang! default behavior removed by intercepting SIGTERM.
    process.exit();
  });
});

function webpackErrorHandler(err, stats) {
  if (err) {
    console.error(err.stack || err);
    if (err.details) {
      console.error(err.details);
    }
    return;
  }

  const info = stats.toJson();

  if (stats.hasErrors()) {
    console.error(info.errors);
  }

  if (stats.hasWarnings()) {
    console.warn(info.warnings);
  }
}

if (argv.d || argv.dev) {
  const webpack = require("webpack");
  const config = require("webpack.config.js");
  const compiler = webpack(config, (err, stats) => {
    webpackErrorHandler(err, stats);
  });

  compiler.watch(
    {
      aggregateTimeout: 300,
      poll: 1000
    },
    (err, stats) => {
      webpackErrorHandler(err, stats);
    }
  );
}
