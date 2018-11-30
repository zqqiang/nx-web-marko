// Compiled using marko@4.13.11 - DO NOT EDIT
"use strict";

var marko_template = module.exports = require("marko/src/html").t(__filename),
    marko_componentType = "/nx-web-marko$0.0.1/src/components/components/side-bar/index.marko",
    components_helpers = require("marko/src/components/helpers"),
    marko_renderer = components_helpers.r,
    marko_defineComponent = components_helpers.c;

function render(input, out, __component, component, state) {
  var data = input;

  out.w("<nav class=\"col-md-2 d-none d-md-block bg-light sidebar\" data-color=\"orange\" data-background-color=\"white\"><div class=\"sidebar-sticky\"><ul class=\"nav flex-column\"><li class=\"nav-item active  \"><a class=\"nav-link\" href=\"#\"><i class=\"material-icons\">dashboard</i><p>Dashboard</p></a></li></ul></div></nav>");
}

marko_template._ = marko_renderer(render, {
    ___implicit: true,
    ___type: marko_componentType
  });

marko_template.Component = marko_defineComponent({}, marko_template._);

marko_template.meta = {
    deps: [
      "./style.scss"
    ],
    id: "/nx-web-marko$0.0.1/src/components/components/side-bar/index.marko"
  };
