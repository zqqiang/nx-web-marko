// Compiled using marko@4.13.11 - DO NOT EDIT
"use strict";

var marko_template = module.exports = require("marko/src/html").t(__filename),
    marko_componentType = "/nx-web-marko$0.0.1/src/components/dashboard/components/fos-layout/index.marko",
    components_helpers = require("marko/src/components/helpers"),
    marko_renderer = components_helpers.r,
    marko_defineComponent = components_helpers.c;

function render(input, out, __component, component, state) {
  var data = input;

  out.w("<div class=\"row\"><div class=\"col-md-12\"><div class=\"card \"><div class=\"card-body \"><ul class=\"nav nav-pills nav-pills-warning\" role=\"tablist\"><li class=\"nav-item\"><a class=\"nav-link active show\" data-toggle=\"tab\" href=\"#link1\" role=\"tablist\">Profile</a></li><li class=\"nav-item\"><a class=\"nav-link\" data-toggle=\"tab\" href=\"#link2\" role=\"tablist\">Settings</a></li><li class=\"nav-item\"><a class=\"nav-link\" data-toggle=\"tab\" href=\"#link3\" role=\"tablist\">Options</a></li></ul><div class=\"tab-content tab-space\"><div class=\"tab-pane active show\" id=\"link1\">Collaboratively administrate empowered markets via plug-and-play networks. Dynamically procrastinate B2C users after installed base benefits. <br><br> Dramatically visualize customer directed convergence without revolutionary ROI. Collaboratively administrate empowered markets via plug-and-play networks. Dynamically procrastinate B2C users after installed base benefits. <br><br> This is very nice.</div><div class=\"tab-pane\" id=\"link2\">Efficiently unleash cross-media information without cross-media value. Quickly maximize timely deliverables for real-time schemas. <br><br>Dramatically maintain clicks-and-mortar solutions without functional solutions.</div><div class=\"tab-pane\" id=\"link3\">Completely synergize resource taxing relationships via premier niche markets. Professionally cultivate one-to-one customer service with robust ideas. <br><br>Dynamically innovate resource-leveling customer service for state of the art customer service.</div></div></div></div></div></div>");
}

marko_template._ = marko_renderer(render, {
    ___implicit: true,
    ___type: marko_componentType
  });

marko_template.Component = marko_defineComponent({}, marko_template._);

marko_template.meta = {
    id: "/nx-web-marko$0.0.1/src/components/dashboard/components/fos-layout/index.marko"
  };
