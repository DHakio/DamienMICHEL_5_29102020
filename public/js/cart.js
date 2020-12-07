var list = document.getElementById("teddies");

cart.get().forEach((object, index) => {
    let tm = new TeddyManager();
    tm.getOne(object)
        .then(teddy => {
            if(teddy.check()) {
                var line = document.createElement("li");
                line.setAttribute("class", "list-group-item list-group-item-action d-flex");
            
                line.innerHTML = `
                                    <img class="mr-3" src="${teddy.imageUrl}" alt="${teddy.name}" width="70" height="50">
                                    <div>
                                        <div class="d-flex">
                                            <h5 class="mb-1 mr-2">${teddy.name}</h5>
                                            <small class="text-muted">${teddy.price/100}€</small>
                                        </div>
                                        <p class="mb-1">${teddy.description}</p>
                                    </div>
                                    <div class="btn d-flex ml-auto align-items-center">
                                        <i class="far fa-times-circle text-danger pointer" onclick="deleteThisFromCart(this)" data-index=${index}></i>
                                    </div>
                                `;
                list.appendChild(line); 
            }
        })
    
});

cart.price().then(price => {
    document.getElementById("total_price").innerText = price/100 + "€";
})

let deleteThisFromCart = (object) => {
    cart.delete(object.dataset.index);
    cm.save(cart.get());
    document.location.reload(true);
} 

let form = document.getElementById("clientInfos");
form.addEventListener("submit", function(event) {
    event.preventDefault();
    let validation = new Validation();
    let errors = [];
    let contact = {};
    for(input of form.getElementsByTagName("input")) {
        if(validation.input(input.name, input.value)) {
            contact[input.name] = input.value;
            
        }
        else {
            errors.push(`${input.name} n'est pas valide`);
        }
    }

    let products = cart.get();

    if(errors.length == 0 && products.length != 0) {
        let ajax = new Ajax("http://localhost:3000/api/teddies/order");
        let json = {
            contact,
            products
        };
        ajax.post(json)
            .then(data => {
                json = JSON.parse(data);
                let orderId = json.orderId;
                let cm = new CartManager();
                cart.price().then(price => {
                    cart.empty();
                    cm.save(cart.get());
                    window.location.replace("/order.html?id=" + orderId + "&total=" + price);
                }); 
            })
            .catch(error => console.error("L'envoi a échoué : " + error));
    }
    else {
        let message = "";
        if(products.length == 0) {
            message = "Le panier est vide !"
        }
        else {
            errors.forEach(error => {
                message += error + "<br>";
            })
        }
        document.getElementById('errors').innerHTML = message;
    }
})
