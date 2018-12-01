// Compiled using marko@4.13.11 - DO NOT EDIT
"use strict";

var marko_template = module.exports = require("marko/src/html").t(__filename),
    marko_componentType = "/nx-web-marko$0.0.1/src/components/cloudmarko/components/analysis-header/index.marko",
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

  out.w("<nav class=\"navbar navbar-expand-lg navbar-transparent navbar-absolute fixed-top \"><div class=\"container-fluid\"><div class=\"collapse navbar-collapse justify-content-start\"><ul class=\"navbar-nav\"><li class=\"nav-item\">");

  icon_tag({
      icon: "search",
      href: "/Analysis/FortiView",
      label: "FortiView"
    }, out, __component, "5");

  out.w("</li><li class=\"nav-item\">");

  icon_tag({
      icon: "view_list",
      href: "/Analysis/Logs",
      label: "Logs"
    }, out, __component, "7");

  out.w("</li><li class=\"nav-item\">");

  icon_tag({
      icon: "note",
      href: "/Analysis/Reports",
      label: "Reports"
    }, out, __component, "9");

  out.w("</li><li class=\"nav-item\">");

  icon_tag({
      icon: "warning",
      href: "/Analysis/EventManagement",
      label: "Event Management"
    }, out, __component, "11");

  out.w("</li></ul></div></div></nav>");
}

marko_template._ = marko_renderer(render, {
    ___implicit: true,
    ___type: marko_componentType
  });

marko_template.Component = marko_defineComponent({}, marko_template._);

marko_template.meta = {
    id: "/nx-web-marko$0.0.1/src/components/cloudmarko/components/analysis-header/index.marko",
    tags: [
      "../../../components/icon"
    ]
  };
