(function () {
  'use strict';
  if (!window.PRESENTATION || !window.STAGE_MODEL || !window.StageVisual) {
    throw new Error('Classic globals must exist before the bridge');
  }
  var current = window.PRESENTATION.slides[0].visual;
  var preview;
  // This bridge is a fixture, not an adapter extracted from app.js.
  window.PROBE_BRIDGE = {
    snapshot: function () { return JSON.parse(JSON.stringify(current)); },
    mountPreview: function (container) { preview = container; draw(); },
    commit: function (next) {
      var issues = window.STAGE_MODEL.validateVisual(next, 'slides.0.visual', 0);
      if (issues.length) throw new Error(issues.map(function (i) { return i.message; }).join('\n'));
      current = JSON.parse(JSON.stringify(next));
      draw();
      return this.snapshot();
    }
  };
  window.dispatchEvent(new Event("stage-probe:ready"));
  function draw() {
    if (!preview) return;
    var rendered = window.StageVisual.render(current);
    preview.replaceChildren(rendered.plot, window.StageVisual.tableNode(rendered.table));
  }
}());
