// Compiled using marko@4.13.11 - DO NOT EDIT
"use strict";

var marko_template = module.exports = require("marko/src/html").t(__filename),
    marko_componentType = "/nx-web-marko$0.0.1/src/components/components/custom-footer/index.marko",
    components_helpers = require("marko/src/components/helpers"),
    marko_renderer = components_helpers.r,
    marko_defineComponent = components_helpers.c;

function render(input, out, __component, component, state) {
  var data = input;

  out.w("<footer class=\"footer\"><div class=\"container-fluid\"><nav class=\"float-left\"><ul><li><a href=\"#\">zqqiang</a></li></ul></nav><div class=\"copyright float-right\">&copy; <script>\n        document.write(new Date().getFullYear())\n    </script>, made with <i class=\"material-icons\">favorite</i> by <a href=\"#\" target=\"_blank\">zqqiang</a> for a better web.</div></div></footer>");
}

marko_template._ = marko_renderer(render, {
    ___implicit: true,
    ___type: marko_componentType
  });

marko_template.Component = marko_defineComponent({}, marko_template._);

marko_template.meta = {
    id: "/nx-web-marko$0.0.1/src/components/components/custom-footer/index.marko"
  };
