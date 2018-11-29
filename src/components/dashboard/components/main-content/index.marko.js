// Compiled using marko@4.13.11 - DO NOT EDIT
"use strict";

var marko_template = module.exports = require("marko/src/html").t(__filename),
    marko_componentType = "/nx-web-marko$0.0.1/src/components/dashboard/components/main-content/index.marko",
    components_helpers = require("marko/src/components/helpers"),
    marko_renderer = components_helpers.r,
    marko_defineComponent = components_helpers.c,
    marko_loadTemplate = require("marko/src/runtime/helper-loadTemplate"),
    content_header_template = marko_loadTemplate(require.resolve("../content-header")),
    marko_helpers = require("marko/src/runtime/html/helpers"),
    marko_loadTag = marko_helpers.t,
    content_header_tag = marko_loadTag(content_header_template),
    marko_escapeXml = marko_helpers.x,
    custom_table_template = marko_loadTemplate(require.resolve("../custom-table")),
    custom_table_tag = marko_loadTag(custom_table_template);

function render(input, out, __component, component, state) {
  var data = input;

  let columns = [
      "All",
      "SN",
      "Name",
      "Sub Account",
      "Firmware",
      "Status",
      "Active in",
      "Latest Report",
      "Last Log Upload",
  ]

  let datas = [[
    "",
    "FGT60D4615007833",
    "",
    "",
    "v6.0.0-0076",
    "",
    "alpha.forticloud.com",
    "",
    "alpha.forticloud.com"
  ],[
    "",
    "FGT60D4615007834",
    "",
    "",
    "v5.0.0-0076",
    "",
    "alpha.forticloud.com",
    "",
    "alpha.forticloud.com"
  ]]

  out.w("<div class=\"content\"><div class=\"container-fluid\">");

  content_header_tag({}, out, __component, "2");

  if (input.page) {
    out.w("<div class=\"row\"><div class=\"col-md-12\"><h1>" +
      marko_escapeXml(input.page) +
      "</h1></div></div>");
  } else {
    out.w("<div class=\"row\"><div class=\"col-md-12\">");

    custom_table_tag({
        columns: columns,
        datas: datas
      }, out, __component, "8");

    out.w("</div></div>");
  }

  out.w("</div></div>");
}

marko_template._ = marko_renderer(render, {
    ___implicit: true,
    ___type: marko_componentType
  });

marko_template.Component = marko_defineComponent({}, marko_template._);

marko_template.meta = {
    id: "/nx-web-marko$0.0.1/src/components/dashboard/components/main-content/index.marko",
    tags: [
      "../content-header",
      "../custom-table"
    ]
  };
