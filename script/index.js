import { ALBUMOK} from "./adatok.js";

$(function(){
  kartyakLegeneralasa()
})

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

    $(".modalbox-header button").click(function () {
      $("body").removeClass("overlayed");
      $(".overlay").removeClass("showed");
    });
  });
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
      <h4>Tracklist</h4>
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
  </div>`;
}
