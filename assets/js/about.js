
const entries = [...document.querySelectorAll(".education-entry")];
const dots = [...document.querySelectorAll("[data-entry-link]")];

const activeIndex = document.querySelector("#activeEducationIndex");
const activeYears = document.querySelector("#activeEducationYears");
const activeTitle = document.querySelector("#activeEducationTitle");
const activeInstitution = document.querySelector("#activeEducationInstitution");
const activeLevel = document.querySelector("#activeEducationLevel");

let currentEntry = null;
let ticking = false;
let navigationLockUntil = 0;

function activateEntry(entry) {
  if (!entry || entry === currentEntry) return;
  currentEntry = entry;
  entries.forEach(item => item.classList.toggle("is-active", item === entry));
  dots.forEach(dot => dot.classList.toggle("is-active", dot.dataset.entryLink === entry.id));
  activeIndex.textContent = entry.dataset.index;
  activeYears.textContent = entry.dataset.years;
  activeTitle.textContent = entry.dataset.title;
  activeInstitution.textContent = entry.dataset.institution;
  activeLevel.textContent = entry.dataset.level;
}

function selectClosestEntry() {
  ticking = false;
  if (Date.now() < navigationLockUntil || entries.length === 0) return;

  const viewportTarget = window.innerHeight * 0.48;
  let closestEntry = entries[0];
  let closestDistance = Number.POSITIVE_INFINITY;

  entries.forEach(entry => {
    const rect = entry.getBoundingClientRect();
    const entryCenter = rect.top + rect.height / 2;
    const distance = Math.abs(entryCenter - viewportTarget);
    if (distance < closestDistance) {
      closestDistance = distance;
      closestEntry = entry;
    }
  });
  activateEntry(closestEntry);
}

function requestSelection() {
  if (!ticking) {
    ticking = true;
    window.requestAnimationFrame(selectClosestEntry);
  }
}

dots.forEach(dot => {
  dot.addEventListener("click", () => {
    const entry = document.getElementById(dot.dataset.entryLink);
    if (!entry) return;
    navigationLockUntil = Date.now() + 700;
    activateEntry(entry);
    entry.scrollIntoView({ behavior: "smooth", block: "center" });
    window.setTimeout(() => {
      navigationLockUntil = 0;
      requestSelection();
    }, 750);
  });
});

window.addEventListener("scroll", requestSelection, { passive: true });
window.addEventListener("resize", requestSelection);

if (entries.length > 0) {
  activateEntry(entries[0]);
  requestSelection();
}
