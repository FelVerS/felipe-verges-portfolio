import { initialiseNavigation } from "./navigation.js";
import { initialiseRevealAnimations } from "./reveal.js";

function setCurrentYear() {
  const year = document.querySelector("[data-current-year]");

  if (year) {
    year.textContent = String(new Date().getFullYear());
  }
}

initialiseNavigation();
initialiseRevealAnimations();
setCurrentYear();
