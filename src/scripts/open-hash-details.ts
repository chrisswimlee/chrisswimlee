const openHash = () => {
  const id = decodeURIComponent(location.hash.replace(/^#/, ''));
  if (!id) return;
  const el = document.getElementById(id);
  if (!el) return;

  let node: HTMLElement | null = el;
  while (node) {
    if (node instanceof HTMLDetailsElement) node.open = true;
    node = node.parentElement;
  }

  el.scrollIntoView({ block: 'start' });
};

openHash();
addEventListener('hashchange', openHash);
