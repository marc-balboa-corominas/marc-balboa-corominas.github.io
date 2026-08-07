const browser = document.querySelector("[data-project-browser]");
if (browser) {
  const tabs = [...browser.querySelectorAll("[data-project-target]")];
  const panels = [...browser.querySelectorAll("[data-project-panel]")];
  tabs.forEach((tab) => {
    tab.addEventListener("click", () => {
      const target = tab.dataset.projectTarget;
      tabs.forEach((item) => {
        const active = item === tab;
        item.classList.toggle("is-active", active);
        item.setAttribute("aria-pressed", String(active));
      });
      panels.forEach((panel) => {
        const active = panel.dataset.projectPanel === target;
        panel.hidden = !active;
        panel.classList.toggle("is-active", active);
      });
    });
  });
}
