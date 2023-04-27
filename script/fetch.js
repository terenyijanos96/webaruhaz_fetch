export function adatBeolvas(vegpont, callback) {
  fetch(vegpont)
    .then((response) => response.json())
    .then((data) => {
      callback(data);
    })
    .catch((err) => console.log(err));
}

export function adatFeltolt(vegpont, adat) {
  fetch(vegpont, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(adat),
  })
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
    })
    .catch((error) => console.log(error));
}

export function adatTorol(vegpont, id) {
  vegpont = `${vegpont} / ${id}`;
  console.log(vegpont);
  fetch(vegpont, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
    })
    .catch((error) => console.log(error));
}
