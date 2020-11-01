var list = document.getElementById("teddies");

cart.get().forEach((object, index) => {
    let teddy = new Teddy(object);
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
});

document.getElementById("total_price").innerText = cart.price()/100 + "€";

let deleteThisFromCart = (object) => {
    cart.delete(object.dataset.index);
    cm.save(cart.get());
    document.location.reload(true);
} 
