import { ALBUMOK } from "./adatok.js";

$(function() {
  $("#admin-article form").submit(function (e) {
    e.preventDefault();
    ujAlbumFelvitele();
  });
  tablazatLegeneralasa();
});

function tablazatLegeneralasa() {
  let thead = $("#admin-article thead");
  let tbody = $("#admin-article tbody");
  thead.html(tablazatFejlecLetrehozasa())
  for (let i = 0; i < ALBUMOK.length; i++) {
    tbody.append(adminTablazatLetrehozasaObjektumbol(ALBUMOK[i]));
  }
}

function tablazatFejlecLetrehozasa(){
    return `<tr>
              <th class="admin-table-id">
                <div class="admin-table-head-content">
                  <div class="admin-table-head-title">id</div>
                  <div class="sorting-button-group">
                    <button>&#x2C4;</button>
                    <button>&#x2C5;</button>
                  </div>
                </div>
              </th>
              <th class="admin-table-cover">
                <div class="admin-table-head-content">
                  <div class="admin-table-head-title">Kép</div>
                  <div class="sorting-button-group">
                    <button>&#x2C4;</button>
                    <button>&#x2C5;</button>
                  </div>
                </div>
              </th>
              <th class="admin-table-album">
                <div class="admin-table-head-content">
                  <div class="admin-table-head-title">Album</div>
                  <div class="sorting-button-group">
                    <button>&#x2C4;</button>
                    <button>&#x2C5;</button>
                  </div>
                </div>
              </th>
              <th class="admin-table-artist">
                <div class="admin-table-head-content">
                  <div class="admin-table-head-title">Előadó</div>
                  <div class="sorting-button-group">
                    <button>&#x2C4;</button>
                    <button>&#x2C5;</button>
                  </div>
                </div>
              </th>
              <th class="admin-table-genre">
                <div class="admin-table-head-content">
                  <div class="admin-table-head-title">Műfaj</div>
                  <div class="sorting-button-group">
                    <button>&#x2C4;</button>
                    <button>&#x2C5;</button>
                  </div>
                </div>
              </th>
              <th class="admin-table-release">
                <div class="admin-table-head-content">
                  <div class="admin-table-head-title">Megjelenés</div>
                  <div class="sorting-button-group">
                    <button>&#x2C4;</button>
                    <button>&#x2C5;</button>
                  </div>
                </div>
              </th>
              <th class="admin-table-price">
                <div class="admin-table-head-content">
                  <div class="admin-table-head-title">Ár (Ft)</div>
                  <div class="sorting-button-group">
                    <button>&#x2C4;</button>
                    <button>&#x2C5;</button>
                  </div>
                </div>
              </th>
              <th class="admin-table-stock">
                <div class="admin-table-head-content">
                  <div class="admin-table-head-title">Készlet (db)</div>
                  <div class="sorting-button-group">
                    <button>&#x2C4;</button>
                    <button>&#x2C5;</button>
                  </div>
                </div>
              </th>
            </tr>
          `
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

function rendezes(lista, mezo, irany){
    console.log("asd")
    let szorzo = undefined;
    switch (irany) {
      case "asc":
        szorzo = 1;
        break;
      case "desc":
        szorzo = -1;
        break;
      default:
        szorzo = 0;
        break;
    }
    lista.sort((a, b) => {
      if (a[mezo] > b[mezo]) {
        return 1 * szorzo;
      }
  
      return -1 * szorzo;
    });
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
