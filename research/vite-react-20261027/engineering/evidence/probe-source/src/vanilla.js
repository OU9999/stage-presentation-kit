let mounted = false;
function tryBoot() {
  if (mounted || document.readyState === 'loading' || !window.PROBE_BRIDGE) return;
  mounted = true;
  window.PROBE_BRIDGE.mountPreview(document.getElementById('legacy-preview'));
  document.getElementById('status').textContent = 'Classic bridge ready';
}
window.addEventListener('stage-probe:ready', tryBoot, { once: true });
document.addEventListener('DOMContentLoaded', tryBoot, { once: true });
tryBoot();
