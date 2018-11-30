// Compiled using marko@4.13.11 - DO NOT EDIT
"use strict";

var marko_template = module.exports = require("marko/src/html").t(__filename),
    marko_componentType = "/nx-web-marko$0.0.1/src/components/components/nav-bar/index.marko",
    components_helpers = require("marko/src/components/helpers"),
    marko_renderer = components_helpers.r,
    marko_defineComponent = components_helpers.c,
    marko_loadTemplate = require("marko/src/runtime/helper-loadTemplate"),
    icon_template = marko_loadTemplate(require.resolve("../icon")),
    marko_helpers = require("marko/src/runtime/html/helpers"),
    marko_loadTag = marko_helpers.t,
    icon_tag = marko_loadTag(icon_template);

function render(input, out, __component, component, state) {
  var data = input;

  out.w("<nav class=\"navbar navbar-expand-lg navbar-transparent navbar-absolute fixed-top \"><div class=\"container-fluid\"><div class=\"navbar-wrapper\">");

  icon_tag({
      class: "navbar-brand",
      icon: "home"
    }, out, __component, "3");

  out.w("</div><button class=\"navbar-toggler\" type=\"button\" data-toggle=\"collapse\" aria-controls=\"navigation-index\" aria-expanded=\"false\" aria-label=\"Toggle navigation\"><span class=\"sr-only\">Toggle navigation</span><span class=\"navbar-toggler-icon icon-bar\"></span><span class=\"navbar-toggler-icon icon-bar\"></span><span class=\"navbar-toggler-icon icon-bar\"></span></button><div class=\"collapse navbar-collapse justify-content-end\"><ul class=\"navbar-nav\"><li class=\"nav-item\">");

  icon_tag({
      icon: "launch",
      label: "zqqiang@fortinet.com"
    }, out, __component, "12");

  out.w("</li><li class=\"nav-item\">");

  icon_tag({
      icon: "person"
    }, out, __component, "14");

  out.w("</li><li class=\"nav-item\">");

  icon_tag({
      icon: "help"
    }, out, __component, "16");

  out.w("</li><li class=\"nav-item\">");

  icon_tag({
      icon: "email"
    }, out, __component, "18");

  out.w("</li><li class=\"nav-item\">");

  icon_tag({
      icon: "swap_horiz"
    }, out, __component, "20");

  out.w("</li><li class=\"nav-item\">");

  icon_tag({
      icon: "input"
    }, out, __component, "22");

  out.w("</li></ul></div></div></nav>");
}

marko_template._ = marko_renderer(render, {
    ___implicit: true,
    ___type: marko_componentType
  });

marko_template.Component = marko_defineComponent({}, marko_template._);

marko_template.meta = {
    id: "/nx-web-marko$0.0.1/src/components/components/nav-bar/index.marko",
    tags: [
      "../icon"
    ]
  };
