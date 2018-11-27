// Compiled using marko@4.13.11 - DO NOT EDIT
"use strict";

var marko_template = module.exports = require("marko/src/html").t(__filename),
    marko_componentType = "/nx-web-marko$0.0.1/src/components/dashboard/components/side-bar/index.marko",
    components_helpers = require("marko/src/components/helpers"),
    marko_renderer = components_helpers.r,
    marko_defineComponent = components_helpers.c;

function render(input, out, __component, component, state) {
  var data = input;

  out.w("<div data-color=\"orange\" data-background-color=\"white\" class=\"sidebar\"><div class=\"logo\"><a href=\"#\" class=\"simple-text logo-mini\">CM</a><a href=\"#\" class=\"simple-text logo-normal\">Cloud Marko</a></div><div class=\"sidebar-wrapper\"><ul class=\"nav\"><li class=\"nav-item active  \"><a class=\"nav-link\" href=\"#\"><i class=\"material-icons\">dashboard</i><p>Dashboard</p></a></li></ul></div></div>");
}

marko_template._ = marko_renderer(render, {
    ___implicit: true,
    ___type: marko_componentType
  });

marko_template.Component = marko_defineComponent({}, marko_template._);

marko_template.meta = {
    id: "/nx-web-marko$0.0.1/src/components/dashboard/components/side-bar/index.marko"
  };
