// Visuals page: category filters + detail viewer. No dependencies.
// Without JavaScript the cards still work: they link straight to the image or PDF.
(function () {
  const cards = Array.from(document.querySelectorAll(".card"));

  /* ---------- Filters ---------- */
  const filterBar = document.querySelector(".filters");
  if (filterBar && filterBar.querySelectorAll("button").length > 2) {
    filterBar.hidden = false;
    filterBar.addEventListener("click", (e) => {
      const btn = e.target.closest("button[data-filter]");
      if (!btn) return;
      const f = btn.dataset.filter;
      filterBar.querySelectorAll("button").forEach((b) =>
        b.setAttribute("aria-pressed", String(b === btn)));
      cards.forEach((c) => { c.hidden = f !== "all" && c.dataset.category !== f; });
    });
  }

  /* ---------- Viewer ---------- */
  const dialog = document.querySelector(".viewer");
  if (!dialog || typeof dialog.showModal !== "function") return;

  const img = dialog.querySelector(".viewer-media img");
  const media = dialog.querySelector(".viewer-media");
  const body = dialog.querySelector(".viewer-body");
  const count = dialog.querySelector(".viewer-count");
  let current = null;

  const visible = () => cards.filter((c) => !c.hidden);

  function show(card) {
    current = card;
    const link = card.querySelector(".card-open");
    img.src = link.dataset.image;
    img.alt = link.dataset.alt || "";
    media.classList.toggle("is-doc", !!card.querySelector(".is-doc"));
    body.replaceChildren(card.querySelector("template").content.cloneNode(true));
    const title = body.querySelector(".detail-title");
    if (title) title.id = "viewer-title";
    body.scrollTop = 0;
    const list = visible();
    count.textContent = (list.indexOf(card) + 1) + " / " + list.length;
    if (!dialog.open) dialog.showModal();
  }

  function step(dir) {
    const list = visible();
    if (!current || list.length < 2) return;
    const i = (list.indexOf(current) + dir + list.length) % list.length;
    show(list[i]);
  }

  cards.forEach((card) => {
    card.querySelector(".card-open").addEventListener("click", (e) => {
      if (e.metaKey || e.ctrlKey || e.shiftKey) return; // let people open in a new tab
      e.preventDefault();
      show(card);
    });
  });

  dialog.querySelector(".viewer-close").addEventListener("click", () => dialog.close());
  dialog.querySelector(".viewer-prev").addEventListener("click", () => step(-1));
  dialog.querySelector(".viewer-next").addEventListener("click", () => step(1));
  dialog.addEventListener("click", (e) => { if (e.target === dialog) dialog.close(); });
  dialog.addEventListener("keydown", (e) => {
    if (e.key === "ArrowLeft") step(-1);
    if (e.key === "ArrowRight") step(1);
  });
  dialog.addEventListener("close", () => {
    if (current) current.querySelector(".card-open").focus();
  });
})();
