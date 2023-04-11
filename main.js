
import { ALBUMOK, FELHASZNALOK } from "./adatok.js";

$(function(){
    
    kartyakLegeneralasa()

    function kartyakLegeneralasa() {
        let kartyak = $(".cards")
        for (let i = 0; i < ALBUMOK.length; i++) {
            kartyak.append(kartyaLetrehozasaObjektumbol(ALBUMOK[i]))
        }
    }

    function kartyaLetrehozasaObjektumbol(obj) {
        return (
          `
          <div class="card">
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
                  min="0"
                  value="0"
                  max="${obj.keszlet}"
                  id="count"
                  aria-label="darabszám kiválasztása"
                  ${obj.keszlet <= 0 ? 'disabled = "true"' : ""}
                />
                <input type="submit" value="Kosárba" aria-label="kosárba rakás" />
              </form>
            </div>
          </div>
          `
        )        
    }
})

