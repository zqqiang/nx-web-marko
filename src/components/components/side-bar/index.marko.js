// Compiled using marko@4.13.11 - DO NOT EDIT
"use strict";

var marko_template = module.exports = require("marko/src/html").t(__filename),
    marko_componentType = "/nx-web-marko$0.0.1/src/components/components/side-bar/index.marko",
    components_helpers = require("marko/src/components/helpers"),
    marko_renderer = components_helpers.r,
    marko_defineComponent = components_helpers.c,
    marko_loadTemplate = require("marko/src/runtime/helper-loadTemplate"),
    select_menu_template = marko_loadTemplate(require.resolve("../select-menu")),
    marko_helpers = require("marko/src/runtime/html/helpers"),
    marko_loadTag = marko_helpers.t,
    select_menu_tag = marko_loadTag(select_menu_template),
    nav_item_template = marko_loadTemplate(require.resolve("../nav-item")),
    nav_item_tag = marko_loadTag(nav_item_template);

function render(input, out, __component, component, state) {
  var data = input;

  out.w("<nav class=\"d-none d-md-block bg-light sidebar\" data-color=\"orange\" data-background-color=\"white\"><div class=\"sidebar-sticky sidebar-wrapper\"><ul class=\"nav flex-column\"><li class=\"nav-item\">");

  select_menu_tag({
      class: "nav-link"
    }, out, __component, "4");

  out.w("</li>");

  if (input.page === undefined) {
    nav_item_tag({}, out, __component, "5");
  }

  out.w("</ul></div></nav>");
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
    id: "/nx-web-marko$0.0.1/src/components/components/side-bar/index.marko",
    tags: [
      "../select-menu",
      "../nav-item"
    ]
  };
