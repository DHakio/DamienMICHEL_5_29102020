let params = (new URL(document.location)).searchParams; // Get params from URL

if(!params.has('id') || params.get('id') == "") {
    window.location.replace("/index.html"); // Redirect if no id param is found
}

var teddyHTML = document.getElementById("teddy"); // Select element with id="teddy"
let tm = new TeddyManager();
tm.getOne(params.get('id')) // Get Teddy object from id
    .then(teddy => { // Display teddy
        teddyHTML.innerHTML = `
                                    <img src="${teddy.imageUrl}" class="card-img-top" alt="${teddy.name}">
                                    <div class="card-body">
                                        <div class="d-flex justify-content-between">
                                            <h5 class="card-title">${teddy.name}</h5>
                                            <h5>${teddy.price/100} €</h5>
                                        </div>
                                        
                                        <p class="card-text">${teddy.description}</p>
                                        <label for="colors">Couleur :</label>
                                        <select name="colors" id="colors">
                                        </select>
                                        <div class="text-center">
                                            <button id="addToCart" class="btn btn-primary">Ajouter au panier</button>
                                        </div>
                                    </div>
        `;
        var colorSelect = document.getElementById("colors");
        teddy.colors.forEach(color => { // Display colors in select input
            let option = document.createElement('option');
            option.innerText = color;
            colorSelect.append(option)
        })
        document.getElementById("addToCart").addEventListener("click", () => { // Add teddy's id in the cart when button is clicked
            cart.add(teddy._id);
            cm.save(cart.get());
        });
    })
    .catch(error => {console.log(error); document.location.replace("/index.html");}); // Redirect to index.html if no teddy found with this id
