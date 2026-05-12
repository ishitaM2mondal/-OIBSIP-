// AUTO SLIDE SECTIONS ONE BY ONE

const sections = document.querySelectorAll("section");

sections.forEach((section, index) => {
  setTimeout(() => {
    section.classList.add("show");
  }, index * 800); // delay between slides
});