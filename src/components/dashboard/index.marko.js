// Compiled using marko@4.13.11 - DO NOT EDIT
"use strict";

var marko_template = module.exports = require("marko/src/html").t(__filename),
    marko_componentType = "/nx-web-marko$0.0.1/src/components/dashboard/index.marko",
    components_helpers = require("marko/src/components/helpers"),
    marko_renderer = components_helpers.r,
    marko_defineComponent = components_helpers.c;

function render(input, out, __component, component, state) {
  var data = input;

  out.w("<div class=\"wrapper \"><div class=\"sidebar\" data-color=\"purple\" data-background-color=\"white\"><div class=\"logo\"><a href=\"#\" class=\"simple-text logo-normal\">Cloud Marko</a></div><div class=\"sidebar-wrapper\"><ul class=\"nav\"><li class=\"nav-item active  \"><a class=\"nav-link\" href=\"#\"><i class=\"material-icons\">dashboard</i><p>Dashboard</p></a></li></ul></div></div><div class=\"main-panel\"><nav class=\"navbar navbar-expand-lg navbar-transparent navbar-absolute fixed-top \"><div class=\"container-fluid\"><div class=\"navbar-wrapper\"><a class=\"navbar-brand\" href=\"#pablo\">Dashboard</a></div><button class=\"navbar-toggler\" type=\"button\" data-toggle=\"collapse\" aria-controls=\"navigation-index\" aria-expanded=\"false\" aria-label=\"Toggle navigation\"><span class=\"sr-only\">Toggle navigation</span><span class=\"navbar-toggler-icon icon-bar\"></span><span class=\"navbar-toggler-icon icon-bar\"></span><span class=\"navbar-toggler-icon icon-bar\"></span></button><div class=\"collapse navbar-collapse justify-content-end\"><ul class=\"navbar-nav\"><li class=\"nav-item\"><a class=\"nav-link\" href=\"#pablo\"><i class=\"material-icons\">notifications</i> Notifications</a></li></ul></div></div></nav><div class=\"content\"><div class=\"container-fluid\"></div></div><footer class=\"footer\"><div class=\"container-fluid\"><nav class=\"float-left\"><ul><li><a href=\"#\">Zhaoqing Qiang</a></li></ul></nav><div class=\"copyright float-right\">&copy; <script>\n              document.write(new Date().getFullYear())\n            </script>, made with <i class=\"material-icons\">favorite</i> by <a href=\"#\" target=\"_blank\">Zhaoqing Qiang</a> for a better web.</div></div></footer></div></div>");
}

marko_template._ = marko_renderer(render, {
    ___implicit: true,
    ___type: marko_componentType
  });

marko_template.Component = marko_defineComponent({}, marko_template._);

marko_template.meta = {
    id: "/nx-web-marko$0.0.1/src/components/dashboard/index.marko"
  };
