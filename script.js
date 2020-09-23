var carrito = new Array();

async function fetchData() {
  response = await fetch(
    "https://gist.githubusercontent.com/josejbocanegra/9a28c356416badb8f9173daf36d1460b/raw/5ea84b9d43ff494fcbf5c5186544a18b42812f09/restaurant.json"
  );
  json = await response.json();
  return json;
}

async function products(param) {
  data = await fetchData();

  let productsList = data.filter((cat) => cat.name === param)[0].products;

  let cardContainer = document.getElementById("content");

  clean(cardContainer);

  let hr = document.createElement("hr");
  let name = document.createElement("h1");
  let hr1 = document.createElement("hr");

  name.textContent = param;
  name.className = "tituloMenu";

  cardContainer.appendChild(hr);
  cardContainer.appendChild(name);
  cardContainer.appendChild(hr1);

  let cardGroup = document.createElement("div");
  cardGroup.className =
    "row row-cols-1 row-cols-md-3 row-cols-lg-4 row-cols-xl-5";

  productsList.map((product) => {
    let col = document.createElement("div");
    col.className = "col mb-4";

    let cards = document.createElement("div");
    cards.className = "card h-100";

    let img = document.createElement("img");
    img.src = product.image;
    img.className = "card-img-top";

    let cardBody = document.createElement("div");
    cardBody.className = "card-body";

    let cardTextd = document.createElement("p");
    let cardTextp = document.createElement("h5");
    cardTextd.textContent = product.description;
    cardTextp.textContent = "$" + product.price;
    cardTextd.className = "card-text";
    cardTextp.className = "card-text";

    let cardfooter = document.createElement("div");
    cardfooter.className = "card-footer";

    let button = document.createElement("button");
    button.className = "btn btn-dark";
    button.textContent = "Add to car";
    button.onclick = function () {
      carrito.push(product);
      let car = document.getElementById("numeroItems");
      car.textContent = carrito.length + " items";
    };

    let title = document.createElement("h5");
    title.innerText = product.name;
    title.className = "card-title";

    cardfooter.appendChild(button);
    cardBody.appendChild(img);
    cardBody.appendChild(title);
    cardBody.appendChild(cardTextd);
    cardBody.appendChild(cardTextp);
    cards.appendChild(cardBody);
    cards.appendChild(cardfooter);
    col.appendChild(cards);
    cardGroup.appendChild(col);
    cardContainer.appendChild(cardGroup);
  });
}

async function order() {
  let ordercont = document.getElementById("content");
  clean(ordercont);

  let hr = document.createElement("hr");
  let name = document.createElement("h1");
  let hr1 = document.createElement("hr");

  name.textContent = "Order detail";
  name.className = "tituloMenu";

  ordercont.appendChild(hr);
  ordercont.appendChild(name);
  ordercont.appendChild(hr1);

  let table = document.createElement("table");
  table.className = "table table-striped";

  let thead = document.createElement("thead");
  let tr = document.createElement("tr");
  let th = document.createElement("th");
  th.scope = "col";
  th.textContent = "Item";

  let th2 = document.createElement("th");
  th2.scope = "col";
  th2.textContent = "Qty";

  let th3 = document.createElement("th");
  th3.scope = "col";
  th3.textContent = "Description";

  let th4 = document.createElement("th");
  th4.scope = "col";
  th4.textContent = "Unit Price";

  let th5 = document.createElement("th");
  th5.scope = "col";
  th5.textContent = "Amount";

  tr.appendChild(th);
  tr.appendChild(th2);
  tr.appendChild(th3);
  tr.appendChild(th4);
  tr.appendChild(th5);

  thead.appendChild(tr);

  table.appendChild(thead);

  ordercont.appendChild(table);

  let tbody = document.createElement("tbody");
  table.appendChild(tbody);

  let aux = new Array();

  for (let i = 0; i < carrito.length; i++) {
    let c = 0;
    for (let j = 0; j < aux.length; j++) {
      if (carrito[i].name === aux[j].name) {
        c++;
      }
    }
    if (c == 0) {
      aux.push(carrito[i]);
    }
  }
  let total = 0;
  for (let i = 0; i < aux.length; i++) {
    let num = 0;
    for (let j = 0; j < carrito.length; j++) {
      if (aux[i].name === carrito[j].name) {
        num++;
      }
    }

    let tr = document.createElement("tr");
    let th = document.createElement("th");
    let td = document.createElement("td");
    let td2 = document.createElement("td");
    let td3 = document.createElement("td");
    let td4 = document.createElement("td");

    th.scope = "row";
    th.textContent = i + 1;
    td.textContent = num;
    td2.textContent = aux[i].name;
    td3.textContent = aux[i].price;
    let am = num * parseFloat(aux[i].price);
    total += am;
    td4.textContent = am;

    tr.appendChild(th);
    tr.appendChild(td);
    tr.appendChild(td2);
    tr.appendChild(td3);
    tr.appendChild(td4);
    tbody.appendChild(tr);
  }

  let row = document.createElement("div");
  let col = document.createElement("div");
  col.className = "col-sm-12";
  let flex = document.createElement("div");
  flex.className = "d-flex bd-highlight";
  let der = document.createElement("div");
  der.className = "p-2 w-100 bd-highlight";
  let t = document.createElement("h5");
  t.textContent = "Total $" + total;
  let iz = document.createElement("div");
  iz.className = "p-2 flex-shrink-1 bd-highlight car";

  let b1 = document.createElement("button");
  b1.textContent = "Cancel";
  b1.className = "btn btn-danger";
  b1.dataset.target = "#Modal";
  b1.dataset.toggle = "modal";

  let b2 = document.createElement("button");
  b2.textContent = "Confirm order";
  b2.className = "btn btn-light";
  b2.onclick = function () {
    console.log("Order detail:")
    carrito.forEach((p) => {
      console.log(p);
    });
    vaciar();
  };

  der.appendChild(t);
  flex.appendChild(der);
  iz.appendChild(b1);
  iz.appendChild(b2);
  flex.appendChild(iz);
  col.appendChild(flex);
  row.appendChild(col);
  ordercont.appendChild(row);
}

function clean(cardContainer) {
  let last;
  while ((last = cardContainer.lastChild)) cardContainer.removeChild(last);
}

function vaciar() {
  let last;
  while ((last = carrito.length > 0)) carrito.pop();
  clean(document.getElementById("content"));
  let car = document.getElementById("numeroItems");
  car.textContent = "";
}
