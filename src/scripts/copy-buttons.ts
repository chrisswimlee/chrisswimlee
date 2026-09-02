// Delegated clipboard handler for every `button[data-copy]` on the page.
// Imported by any component that renders a copy button; the module graph
// dedupes it, so the listener binds exactly once per page.
document.addEventListener('click', async (event) => {
  const target = event.target instanceof Element ? event.target : null;
  const btn = target?.closest<HTMLButtonElement>('button[data-copy]');
  const value = btn?.dataset.copy;
  if (!btn || !value) return;
  try {
    await navigator.clipboard.writeText(value);
    const prior = btn.textContent;
    btn.textContent = 'Copied';
    setTimeout(() => {
      btn.textContent = prior;
    }, 1400);
  } catch {
    btn.textContent = 'Copy failed';
  }
});
