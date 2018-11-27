// Compiled using marko@4.13.11 - DO NOT EDIT
"use strict";

var marko_template = module.exports = require("marko/src/html").t(__filename),
    marko_componentType = "/nx-web-marko$0.0.1/src/components/dashboard/index.marko",
    components_helpers = require("marko/src/components/helpers"),
    marko_renderer = components_helpers.r,
    marko_defineComponent = components_helpers.c,
    marko_loadTemplate = require("marko/src/runtime/helper-loadTemplate"),
    side_bar_template = marko_loadTemplate(require.resolve("./components/side-bar")),
    marko_helpers = require("marko/src/runtime/html/helpers"),
    marko_loadTag = marko_helpers.t,
    side_bar_tag = marko_loadTag(side_bar_template),
    main_pannel_template = marko_loadTemplate(require.resolve("./components/main-pannel")),
    main_pannel_tag = marko_loadTag(main_pannel_template);

function render(input, out, __component, component, state) {
  var data = input;

  out.w("<div class=\"wrapper \">");

  side_bar_tag({}, out, __component, "1");

  main_pannel_tag({}, out, __component, "2");

  out.w("</div>");
}

marko_template._ = marko_renderer(render, {
    ___implicit: true,
    ___type: marko_componentType
  });

marko_template.Component = marko_defineComponent({}, marko_template._);

marko_template.meta = {
    id: "/nx-web-marko$0.0.1/src/components/dashboard/index.marko",
    tags: [
      "./components/side-bar",
      "./components/main-pannel"
    ]
  };