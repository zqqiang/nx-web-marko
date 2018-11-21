// Compiled using marko@4.13.10 - DO NOT EDIT
"use strict";

var marko_template = module.exports = require("marko/src/html").t(__filename),
    marko_componentType = "/nx-web-marko$0.0.1/src/pages/home/template.marko",
    components_helpers = require("marko/src/components/helpers"),
    marko_renderer = components_helpers.r,
    marko_defineComponent = components_helpers.c,
    marko_loadTemplate = require("marko/src/runtime/helper-loadTemplate"),
    default_template = marko_loadTemplate(require.resolve("src/layouts/default")),
    hasRenderBodyKey = Symbol.for("hasRenderBody"),
    app_template = marko_loadTemplate(require.resolve("../../components/app")),
    marko_helpers = require("marko/src/runtime/html/helpers"),
    marko_loadTag = marko_helpers.t,
    app_tag = marko_loadTag(app_template),
    include_tag = marko_loadTag(require("marko/src/taglibs/core/include-tag"));

function render(input, out, __component, component, state) {
  var data = input;

  include_tag({
      _target: default_template,
      styles: {
          renderBody: function renderBody(out) {
            out.w("<link href=\"https://fonts.googleapis.com/css?family=Open+Sans:300,400,700\" media=\"all\" rel=\"stylesheet\"><link href=\"/static/style.css\" media=\"all\" rel=\"stylesheet\">");
          }
        },
      scripts: {
          renderBody: function renderBody(out) {
            out.w("<script src=\"/static/bundle.js\"></script>");
          }
        },
      title: {
          renderBody: function renderBody(out) {
            out.w("Cloud Marko UI");
          }
        },
      body: {
          renderBody: function renderBody(out) {
            app_tag({}, out, __component, "8");
          }
        },
      [hasRenderBodyKey]: true
    }, out, __component, "0");
}

marko_template._ = marko_renderer(render, {
    ___implicit: true,
    ___type: marko_componentType
  });

marko_template.Component = marko_defineComponent({}, marko_template._);

marko_template.meta = {
    id: "/nx-web-marko$0.0.1/src/pages/home/template.marko",
    tags: [
      "src/layouts/default",
      "../../components/app",
      "marko/src/taglibs/core/include-tag"
    ]
  };
