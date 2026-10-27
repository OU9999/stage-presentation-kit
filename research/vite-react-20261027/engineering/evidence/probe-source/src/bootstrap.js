import React from 'react';
import { createRoot } from 'react-dom/client';
import { VisualEditor } from './panel.jsx';
let mounted = false;
function tryBoot() {
  if (mounted || document.readyState === 'loading' || !window.PROBE_BRIDGE) return;
  mounted = true;
  window.PROBE_BRIDGE.mountPreview(document.getElementById('legacy-preview'));
  const bridge = window.PROBE_BRIDGE;
  createRoot(document.getElementById('react-editor')).render(
    React.createElement(VisualEditor, { initial: bridge.snapshot(), commit: next => bridge.commit(next) })
  );
}
// Require both parsed DOM and bridge readiness; the event may precede module evaluation.
window.addEventListener('stage-probe:ready', tryBoot, { once: true });
document.addEventListener('DOMContentLoaded', tryBoot, { once: true });
tryBoot();
