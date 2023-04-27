import { adatBeolvas } from "./fetch.js";

let lista = []
let vegpont = "http://localhost:3000/partnereink";

$(function () {
  adatBeolvas(vegpont, listaInicializalasa);
  hamburgerMenuGombBeallitasa()
})

function listaInicializalasa(data) {
  lista = data;
  partnereinkLegeneralasa(lista);
}

function hamburgerMenuGombBeallitasa(){
  let hamburger = $("nav#main-nav .hamburger-menu-wrapper");
  let hambuger_inside = $("nav#main-nav .hamburger-menu");
  let aside = $("aside");
  hamburger.click(function () {
    hambuger_inside.toggleClass("rotate");
    aside.toggleClass("show");
  });
}

function partnereinkLegeneralasa(partner_lista) {
  let aside = $("aside");
  aside.append("<h3>Partnereink:</h3>");
  for (let i = 0; i < partner_lista.length; i++) {
    aside.append(partnerLetrehozasaObjektumbok(partner_lista[i]));
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