// Compiled using marko@4.13.11 - DO NOT EDIT
"use strict";

var marko_template = module.exports = require("marko/src/html").t(__filename),
    marko_componentType = "/nx-web-marko$0.0.1/src/components/components/main-pannel/index.marko",
    components_helpers = require("marko/src/components/helpers"),
    marko_renderer = components_helpers.r,
    marko_defineComponent = components_helpers.c,
    marko_loadTemplate = require("marko/src/runtime/helper-loadTemplate"),
    main_content_template = marko_loadTemplate(require.resolve("../main-content")),
    marko_helpers = require("marko/src/runtime/html/helpers"),
    marko_loadTag = marko_helpers.t,
    main_content_tag = marko_loadTag(main_content_template),
    custom_footer_template = marko_loadTemplate(require.resolve("../custom-footer")),
    custom_footer_tag = marko_loadTag(custom_footer_template);

function render(input, out, __component, component, state) {
  var data = input;

  out.w("<div class=\"main-panel\">");

  main_content_tag({
      page: input.page
    }, out, __component, "1");

  custom_footer_tag({}, out, __component, "2");

  out.w("</div>");
}

marko_template._ = marko_renderer(render, {
    ___implicit: true,
    ___type: marko_componentType
  });

marko_template.Component = marko_defineComponent({}, marko_template._);

marko_template.meta = {
    id: "/nx-web-marko$0.0.1/src/components/components/main-pannel/index.marko",
    tags: [
      "../main-content",
      "../custom-footer"
    ]
  };
