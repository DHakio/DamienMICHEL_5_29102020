let params = (new URL(document.location)).searchParams;
cart = localStorage;

if(!params.has('id') || params.get('id') == "") {
    window.location.replace("/index.html"); // Redirect if no id param is found
}

ajaxGet("http://localhost:3000/api/teddies/" + params.get('id'))
    .then(res => {
        teddy = JSON.parse(res); // Set Global variable
        var teddyHTML = document.getElementById("teddy");
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
        teddy.colors.forEach(color => {
            let option = document.createElement('option');
            option.innerText = color;
            colorSelect.append(option)
        })
        document.getElementById("addToCart").addEventListener("click", () => {
            addToCart(teddy);
            document.location.reload(true);
        });
    })
    .catch(error => console.log(error));