// Compiled using marko@4.13.11 - DO NOT EDIT
"use strict";

var marko_template = module.exports = require("marko/src/html").t(__filename),
    marko_componentType = "/nx-web-marko$0.0.1/src/components/cloudmarko/components/main-header/index.marko",
    components_helpers = require("marko/src/components/helpers"),
    marko_renderer = components_helpers.r,
    marko_defineComponent = components_helpers.c,
    marko_loadTemplate = require("marko/src/runtime/helper-loadTemplate"),
    icon_template = marko_loadTemplate(require.resolve("../../../components/icon")),
    marko_helpers = require("marko/src/runtime/html/helpers"),
    marko_loadTag = marko_helpers.t,
    icon_tag = marko_loadTag(icon_template);

function render(input, out, __component, component, state) {
  var data = input;

  out.w("<nav class=\"navbar-expand-lg navbar-light bg-light navbar sticky-top flex-md-nowrap p-0\"><a class=\"navbar-brand mr-0\" href=\"/\"><p class=\"text-center\">Cloud Marko</p></a><div class=\"collapse navbar-collapse\" id=\"navbarSupportedContent\">");

  if (input.page !== undefined) {
    out.w("<div class=\"collapse navbar-collapse justify-content-start\"><ul class=\"navbar-nav\"><li class=\"nav-item\"><a class=\"nav-link\" href=\"/Analysis/FortiView\">Analysis</a></li><li class=\"nav-item\"><a class=\"nav-link\" href=\"/Management/Config\">Management</a></li><li class=\"nav-item\"><a class=\"nav-link\" href=\"/Sandbox/Dashboard\">Sandbox</a></li></ul></div>");
  }

  out.w("<div class=\"collapse navbar-collapse justify-content-end\"><ul class=\"navbar-nav\"><li class=\"nav-item\">");

  icon_tag({
      icon: "launch",
      label: "zqqiang@fortinet.com"
    }, out, __component, "15");

  out.w("</li><li class=\"nav-item\">");

  icon_tag({
      icon: "person"
    }, out, __component, "17");

  out.w("</li><li class=\"nav-item\">");

  icon_tag({
      icon: "help"
    }, out, __component, "19");

  out.w("</li><li class=\"nav-item\">");

  icon_tag({
      icon: "email"
    }, out, __component, "21");

  out.w("</li><li class=\"nav-item\">");

  icon_tag({
      icon: "swap_horiz"
    }, out, __component, "23");

  out.w("</li><li class=\"nav-item\">");

  icon_tag({
      icon: "input"
    }, out, __component, "25");

  out.w("</li></ul></div></div></nav>");
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
    id: "/nx-web-marko$0.0.1/src/components/cloudmarko/components/main-header/index.marko",
    tags: [
      "../../../components/icon"
    ]
  };
