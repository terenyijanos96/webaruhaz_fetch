import { ALBUMOK, FELHASZNALOK, PARTNEREIK } from "./adatok.js";

$(function () {
  let hamburger = $("nav#main-nav .hamburger-menu-wrapper");
  let hambuger_inside = $("nav#main-nav .hamburger-menu");
  let aside = $("aside");
  hamburger.click(function () {
    hambuger_inside.toggleClass("rotate");
    aside.toggleClass("show");
  });

  kartyakLegeneralasa();
  partnereinkLegeneralasa();
  tablazatLegeneralasa();
  $("#admin-article form").submit(function (e) {
    e.preventDefault();
    ujAlbumFelvitele();
  });

  function kartyakLegeneralasa() {
    let kartyak = $(".cards");
    for (let i = 0; i < ALBUMOK.length; i++) {
      kartyak.append(kartyaLetrehozasaObjektumbol(ALBUMOK[i]));
    }
    $(".cards button").click(function (e) {
      let overlay = $(".overlay");
      $("body").toggleClass("overlayed");
      overlay.toggleClass("showed");
      overlay.html(modalboxLetrehozasa(e));

      $(".modalbox-header button").click(function() {
        $("body").removeClass("overlayed");
        $(".overlay").removeClass("showed");
      });
    });


  }

  function findParentElements(target, goalElementClassName) {
    do {
      target = target.parentNode;
    } while (!target.classList.contains(goalElementClassName));

    return target;
  }

  function modalboxLetrehozasa(e) {
    let target_id = findParentElements(e.target, "card").id;
    let i = 0;

    while (target_id != ALBUMOK[i].id) {
      i++;
    }
    let lista_txt = "";
    for (let item of ALBUMOK[i].dalok) {
      lista_txt += `<li>${item}</li>`;
    }

    return `<div class="modalbox">
  <div class="modalbox-header">
    <h3>${ALBUMOK[i].eloado} - ${ALBUMOK[i].album}</h3>
    <button aria-label="Kilépés"></button>
  </div>

<div class="modalbox-body">
    <div class="modalbox-image-contrainer">
      <img
        src="${ALBUMOK[i].boritokep}"
        alt=""
      />
    </div>
    <div class="modalbox-album-content">
      <h4>Album információk</h4>
      <table>
        <tbody>
          <tr>
            <th>Előadó:</th>
            <td>${ALBUMOK[i].eloado}</td>
          </tr>
          <tr>
            <th>Album:</th>
            <td>${ALBUMOK[i].album}</td>
          </tr>
          <tr>
            <th>Műfaj:</th>
            <td>${ALBUMOK[i].mufaj}</td>
          </tr>
          <tr>
            <th>Megjelenés:</th>
            <td>${ALBUMOK[i].megjelenes}</td>
          </tr>
        </tbody>
      </table>
      <h4>Számok listája</h4>
      <ol>
        ${lista_txt}
      </ol>
    </div>     
    </div>
    <div class="modalbox-footer">
    <div class="modalbox-footer-stock">
    Készlet: ${ALBUMOK[i].keszlet} db
    </div>
    
    </div>
  </div>`
  }



  function kartyaLetrehozasaObjektumbol(obj) {
    return `
          <div class="card" id="${obj.id}">
            <img
              src="${obj.boritokep}"
              alt="${obj.eloado}: ${obj.album} borítóképe"
              draggable="false"
              width="300"
              height="300"
            />
            <h3 class="card-header">${obj.eloado} - ${obj.album}</h3>
            <table>
              <tr>
                <th>Előadó:</th>
                <td>${obj.eloado}</td>
              </tr>
              <tr>
                <th>Album:</th>
                <td>${obj.album}</td>
              </tr>
              <tr>
                <th>Műfaj:</th>
                <td>${obj.mufaj}</td>
              </tr>
              <tr>
                <th>Megjelenés:</th>
                <td>${obj.megjelenes}</td>
              </tr>
              <tr>
                <td colspan="2">
                  <button>Több információ</button>
                </td>
              </tr>
            </table>
            <div class="card-footer">
              <div class="price">Ár: ${obj.ar} Ft</div>
              <form class="cart">
                <input
                  type="number"
                  min="1"
                  value="${obj.keszlet <= 0 ? 0 : 1}"
                  max="${obj.keszlet}"
                  id="count"
                  aria-label="darabszám kiválasztása"
                  ${obj.keszlet <= 0 ? 'disabled = "true"' : ""}
                />
                <input 
                  type="submit" 
                  aria-label="kosárba rakás"
                  ${obj.keszlet <= 0 ? 'disabled = "true"' : ""} 
                  ${obj.keszlet <= 0 ? 'value="Elfogyott"' : 'value="Kosárba"'} 
                />
              </form>
            </div>
          </div>
          `;
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

  function tablazatLegeneralasa() {
    let tablazat = $("#admin-article tbody");
    for (let i = 0; i < ALBUMOK.length; i++) {
      tablazat.append(adminTablazatLetrehozasaObjektumbol(ALBUMOK[i]));
    }
  }
  function adminTablazatLetrehozasaObjektumbol(obj) {
    return `
      <tr>
        <td class="tablecell-id">${obj.id}</td>
        <td class="tablecell-img"><img src="${obj.boritokep}" alt="${obj.eloado}: ${obj.album}"></td>
        <td class="tablecell-artist">${obj.eloado}</td>
        <td class="tablecell-album">${obj.album}</td>
        <td class="tablecell-genre">${obj.mufaj}</td>
        <td class="tablecell-released">${obj.megjelenes}</td>
        <td class="tablecell-price">${obj.ar} Ft</td>
        <td class="tablecell-stock">${obj.keszlet} db</td>
      </tr>
    `;
  }
  function ujAlbumFelvitele() {
    let inputok = $("#admin-article input:not(input[type='submit'])");
    let obj = {};
    for (let i = 0; i < inputok.length; i++) {
      for (const key in ALBUMOK[0]) {
        if (inputok[i].name === key) {
          let ertek = inputok[i].value;
          if (inputok[i].type === "number") {
            ertek = parseInt(ertek);
          }
          console.log(inputok[i]);
          obj[key] = ertek;
        }
        obj.id =
          "A" + (parseInt(ALBUMOK[ALBUMOK.length - 1].id.substring(1)) + 1);
      }
    }
    ALBUMOK.push(obj);
    tablazatLegeneralasa();
  }
});
