let lista = [];

$(function(){
  let vegpont = "script/adatok.json";
  adatBeolvas(vegpont, listaInicializalasa, "albumok");
})

function adatBeolvas(vegpont, callbackFv, adatLista) {
  fetch(vegpont, {
    method: "GET",
  })
    .then((response) => response.json())
    .then((data) => {
      callbackFv(data[adatLista]);
    })
    .catch((err) => console.log(err));
}

function listaInicializalasa(data){
  lista = data
  kartyakLegeneralasa()
}

function kartyakLegeneralasa() {
  let kartyak = $(".cards");
  for (let i = 0; i < lista.length; i++) {
    kartyak.append(kartyaLetrehozasaObjektumbol(lista[i]));
  }
  $(".cards button").click(function (e) {
    let overlay = $(".overlay");
    $("body").toggleClass("overlayed");
    overlay.toggleClass("showed");
    overlay.html(modalboxLetrehozasa(lista, e));

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

function modalboxLetrehozasa(lista, e) {
  let target_id = findParentElements(e.target, "card").id;
  let i = 0;

  while (target_id != lista[i].id) {
    i++;
  }
  let lista_txt = "";
  for (let item of lista[i].dalok) {
    lista_txt += `<li>${item}</li>`;
  }

  return `<div class="modalbox">
  <div class="modalbox-header">
    <h3>${lista[i].eloado} - ${lista[i].album}</h3>
    <button aria-label="Kilépés"></button>
  </div>
  
  <div class="modalbox-body">
    <div class="modalbox-image-contrainer">
      <img
        src="${lista[i].boritokep}"
        alt=""
      />
    </div>
    <div class="modalbox-album-content">
      <h4>Album információk</h4>
      <table>
        <tbody>
          <tr>
            <th>Előadó:</th>
            <td>${lista[i].eloado}</td>
          </tr>
          <tr>
            <th>Album:</th>
            <td>${lista[i].album}</td>
          </tr>
          <tr>
            <th>Műfaj:</th>
            <td>${lista[i].mufaj}</td>
          </tr>
          <tr>
            <th>Megjelenés:</th>
            <td>${lista[i].megjelenes}</td>
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
    Készlet: ${lista[i].keszlet} db
    </div>
    </div>
  </div>`;
}
