// Compiled using marko@4.13.11 - DO NOT EDIT
"use strict";

var marko_template = module.exports = require("marko/src/html").t(__filename),
    marko_componentType = "/nx-web-marko$0.0.1/src/components/dashboard/components/custom-table/index.marko",
    components_helpers = require("marko/src/components/helpers"),
    marko_renderer = components_helpers.r,
    marko_defineComponent = components_helpers.c,
    marko_helpers = require("marko/src/runtime/html/helpers"),
    marko_forEach = marko_helpers.f,
    marko_escapeXml = marko_helpers.x,
    marko_forEachWithStatusVar = require("marko/src/runtime/helper-forEachWithStatusVar");

function render(input, out, __component, component, state) {
  var data = input;

  out.w("<div class=\"card\"><div class=\"card-body\"><div class=\"table-responsive\"><table class=\"table\"><thead class=\" text-primary\"><tr>");

  var for__6 = 0;

  marko_forEach(input.columns, function(col) {
    var keyscope__7 = "[" + ((for__6++) + "]");

    out.w("<th>" +
      marko_escapeXml(col) +
      "</th>");
  });

  out.w("</tr></thead><tbody>");

  var for__10 = 0;

  marko_forEach(input.datas, function(row) {
    var keyscope__11 = "[" + ((for__10++) + "]");

    out.w("<tr>");

    var for__13 = 0;

    marko_forEachWithStatusVar(row, function(cell, loop) {
      var keyscope__14 = "[" + (((for__13++) + keyscope__11) + "]");

      if (input.columns[loop.getIndex()] === "SN") {
        out.w("<td><a href=\"/\">" +
          marko_escapeXml(cell) +
          "</a></td>");
      } else {
        out.w("<td>" +
          marko_escapeXml(cell) +
          "</td>");
      }
    });

    out.w("</tr>");
  });

  out.w("</tbody></table></div></div></div>");
}

marko_template._ = marko_renderer(render, {
    ___implicit: true,
    ___type: marko_componentType
  });

marko_template.Component = marko_defineComponent({}, marko_template._);

marko_template.meta = {
    id: "/nx-web-marko$0.0.1/src/components/dashboard/components/custom-table/index.marko"
  };
