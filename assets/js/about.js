const entries = [...document.querySelectorAll(".education-entry")];
const dots = [...document.querySelectorAll("[data-entry-link]")];

const activeIndex = document.querySelector("#activeEducationIndex");
const activeYears = document.querySelector("#activeEducationYears");
const activeTitle = document.querySelector("#activeEducationTitle");
const activeInstitution = document.querySelector("#activeEducationInstitution");
const activeLevel = document.querySelector("#activeEducationLevel");

function activateEntry(entry) {
  entries.forEach((item) => item.classList.toggle("is-active", item === entry));

  dots.forEach((dot) => {
    dot.classList.toggle("is-active", dot.dataset.entryLink === entry.id);
  });

  activeIndex.textContent = entry.dataset.index;
  activeYears.textContent = entry.dataset.years;
  activeTitle.textContent = entry.dataset.title;
  activeInstitution.textContent = entry.dataset.institution;
  activeLevel.textContent = entry.dataset.level;
}

dots.forEach((dot) => {
  dot.addEventListener("click", () => {
    const entry = document.getElementById(dot.dataset.entryLink);

    if (entry) {
      entry.scrollIntoView({
        behavior: "smooth",
        block: "center",
      });
      activateEntry(entry);
    }
  });
});

const observer = new IntersectionObserver(
  (observedEntries) => {
    const visible = observedEntries
      .filter((item) => item.isIntersecting)
      .sort((a, b) => b.intersectionRatio - a.intersectionRatio);

    if (visible.length > 0) {
      activateEntry(visible[0].target);
    }
  },
  {
    rootMargin: "-28% 0px -42% 0px",
    threshold: [0.15, 0.35, 0.6],
  }
);

entries.forEach((entry) => observer.observe(entry));
