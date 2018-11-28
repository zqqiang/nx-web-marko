// Compiled using marko@4.13.11 - DO NOT EDIT
"use strict";

var marko_template = module.exports = require("marko/src/html").t(__filename),
    marko_componentType = "/nx-web-marko$0.0.1/src/components/dashboard/components/nav-bar/index.marko",
    components_helpers = require("marko/src/components/helpers"),
    marko_renderer = components_helpers.r,
    marko_defineComponent = components_helpers.c,
    marko_loadTemplate = require("marko/src/runtime/helper-loadTemplate"),
    search_template = marko_loadTemplate(require.resolve("../search")),
    marko_helpers = require("marko/src/runtime/html/helpers"),
    marko_loadTag = marko_helpers.t,
    search_tag = marko_loadTag(search_template),
    material_icons_template = marko_loadTemplate(require.resolve("../material-icons")),
    material_icons_tag = marko_loadTag(material_icons_template);

function render(input, out, __component, component, state) {
  var data = input;

  out.w("<nav class=\"navbar navbar-expand-lg navbar-transparent navbar-absolute fixed-top \"><div class=\"container-fluid\"><div class=\"navbar-wrapper\"><a class=\"navbar-brand\" href=\"#dashboard\">Dashboard</a></div><button class=\"navbar-toggler\" type=\"button\" data-toggle=\"collapse\" aria-controls=\"navigation-index\" aria-expanded=\"false\" aria-label=\"Toggle navigation\"><span class=\"sr-only\">Toggle navigation</span><span class=\"navbar-toggler-icon icon-bar\"></span><span class=\"navbar-toggler-icon icon-bar\"></span><span class=\"navbar-toggler-icon icon-bar\"></span></button><div class=\"collapse navbar-collapse justify-content-end\">");

  search_tag({}, out, __component, "10");

  out.w("<ul class=\"navbar-nav\"><li class=\"nav-item\">");

  material_icons_tag({
      icon: "launch",
      label: "zqqiang@fortinet.com"
    }, out, __component, "13");

  out.w("</li><li class=\"nav-item\">");

  material_icons_tag({
      icon: "person"
    }, out, __component, "15");

  out.w("</li><li class=\"nav-item\">");

  material_icons_tag({
      icon: "help"
    }, out, __component, "17");

  out.w("</li><li class=\"nav-item\">");

  material_icons_tag({
      icon: "email"
    }, out, __component, "19");

  out.w("</li><li class=\"nav-item\">");

  material_icons_tag({
      icon: "swap_horiz"
    }, out, __component, "21");

  out.w("</li><li class=\"nav-item\">");

  material_icons_tag({
      icon: "input"
    }, out, __component, "23");

  out.w("</li></ul></div></div></nav>");
}

marko_template._ = marko_renderer(render, {
    ___implicit: true,
    ___type: marko_componentType
  });

marko_template.Component = marko_defineComponent({}, marko_template._);

marko_template.meta = {
    id: "/nx-web-marko$0.0.1/src/components/dashboard/components/nav-bar/index.marko",
    tags: [
      "../search",
      "../material-icons"
    ]
  };
