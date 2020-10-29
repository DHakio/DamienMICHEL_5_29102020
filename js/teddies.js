ajaxGet("http://localhost:3000/api/teddies/")
    .then(res => {
        var teddies = JSON.parse(res);
        var list = document.getElementById("teddies");
        teddies.forEach(teddy => {
            var line = document.createElement("a");
            line.setAttribute("href", "teddy.html?id=" + teddy._id);
            line.setAttribute("class", "list-group-item list-group-item-action d-flex");

            var colors ="";
            teddy.colors.forEach((color, index) => {
                let spaceBetween;
                (index < teddy.colors.length - 1) ? spaceBetween = " - " : spaceBetween = " ";
                colors += color + spaceBetween;
            })
            console.log(colors);

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
        })
        .catch(error => console.log(error));
    });