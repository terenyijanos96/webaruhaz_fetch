export function adatBeolvas(vegpont, callback) {
    fetch(vegpont)
      .then((response) => response.json())
      .then((data) => {
        callback(data);
      })
      .catch((err) => console.log(err));
  }