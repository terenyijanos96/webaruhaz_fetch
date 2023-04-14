import { ALBUMOK, FELHASZNALOK, PARTNEREIK } from "./adatok.js";

$(function () {
  hamburgerMenuGombBeallitasa()
  partnereinkLegeneralasa();
})

function hamburgerMenuGombBeallitasa(){
  let hamburger = $("nav#main-nav .hamburger-menu-wrapper");
  let hambuger_inside = $("nav#main-nav .hamburger-menu");
  let aside = $("aside");
  hamburger.click(function () {
    hambuger_inside.toggleClass("rotate");
    aside.toggleClass("show");
  });
}

function partnereinkLegeneralasa() {
  let aside = $("aside");
  aside.append("<h3>Partnereink:</h3>");
  for (let i = 0; i < PARTNEREIK.length; i++) {
    aside.append(partnerLetrehozasaObjektumbok(PARTNEREIK[i]));
  }
}

function partnerLetrehozasaObjektumbok(obj) {
  return `
    <div class="partner">
      <img src="${obj.banner}" alt="${obj.nev}" />
      <a href="${obj.link}" target="_blank">${obj.nev}</a>
    </div>
      `;
}