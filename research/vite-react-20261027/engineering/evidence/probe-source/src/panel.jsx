import React, { useState } from 'react';
export function VisualEditor({ initial, commit }) {
  const [draft, setDraft] = useState(JSON.stringify(initial, null, 2));
  const [errors, setErrors] = useState('');
  const [saved, setSaved] = useState(initial);
  function apply() {
    try {
      const next = JSON.parse(draft);
      const issues = window.STAGE_MODEL.validateVisual(next, 'slides.0.visual', 0);
      if (issues.length) throw new Error(issues.map(i => `${i.path}: ${i.message}`).join('\n'));
      setSaved(commit(next)); setErrors('');
    } catch (error) { setErrors(error.message); }
  }
  return <section aria-label="Visual JSON editor">
    <label htmlFor="visual-json">Visual JSON</label>
    <textarea id="visual-json" rows="18" cols="60" value={draft}
      aria-invalid={Boolean(errors)} aria-describedby="visual-errors"
      onChange={event => setDraft(event.target.value)} />
    <p id="visual-errors" role="status">{errors}</p>
    <button onClick={apply}>Apply</button>
    <button onClick={() => { setDraft(JSON.stringify(saved, null, 2)); setErrors(''); }}>Cancel draft</button>
  </section>;
}
