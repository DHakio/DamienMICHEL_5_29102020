let list = document.getElementById("teddies");
let tm = new TeddyManager();
tm.getAll()
    .then(teddies => {
        teddies.forEach(teddy => {
            let line = document.createElement("a");
            line.setAttribute("href", "product.html?id=" + teddy._id);
            line.setAttribute("class", "list-group-item list-group-item-action d-flex");

            let colors ="";
            teddy.colors.forEach((color, index) => {
                let spaceBetween;
                (index < teddy.colors.length - 1) ? spaceBetween = " - " : spaceBetween = " ";
                colors += color + spaceBetween;
            })

            line.innerHTML = `
                                <img class="mr-3" src="${teddy.imageUrl}" alt="${teddy.name}" width="150" height="100">
                                <div>
                                    <div class="d-flex">
                                        <h5 class="mb-1 mr-2">${teddy.name}</h5>
                                        <small class="text-muted">${teddy.price/100}€</small>
                                    </div>
                                    <p class="mb-1">${teddy.description}</p>
                                    <small class="text-muted">${colors}</small>
                                </div>
                            `;
            list.appendChild(line);
            });
    })
    .catch(error => console.log(error));