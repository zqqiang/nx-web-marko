// Compiled using marko@4.13.11 - DO NOT EDIT
"use strict";

var marko_template = module.exports = require("marko/src/html").t(__filename),
    marko_componentType = "/nx-web-marko$0.0.1/src/components/components/nav-item/index.marko",
    components_helpers = require("marko/src/components/helpers"),
    marko_renderer = components_helpers.r,
    marko_defineComponent = components_helpers.c;

function render(input, out, __component, component, state) {
  var data = input;

  out.w("<li class=\"nav-item active\"><a class=\"nav-link collapsed\" data-toggle=\"collapse\" href=\"#pagesExamples\" aria-expanded=\"false\"><i class=\"material-icons\">image</i><p>All(0) <b class=\"caret\"></b></p></a><div class=\"collapse\" id=\"pagesExamples\" style=\"\"><ul class=\"nav\"><li class=\"nav-item \"><a class=\"nav-link\" href=\"\"><span class=\"sidebar-mini\">P</span><span class=\"sidebar-normal\">Default(1)</span></a></li></ul></div></li>");
}

marko_template._ = marko_renderer(render, {
    ___implicit: true,
    ___type: marko_componentType
  });

marko_template.Component = marko_defineComponent({}, marko_template._);

marko_template.meta = {
    id: "/nx-web-marko$0.0.1/src/components/components/nav-item/index.marko"
  };
