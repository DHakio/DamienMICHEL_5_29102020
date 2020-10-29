cartStorage = getCart();
var list = document.getElementById("teddies");

cartStorage.forEach((object, index) => {
    var line = document.createElement("li");
    line.setAttribute("class", "list-group-item list-group-item-action d-flex");

    line.innerHTML = `
                        <img class="mr-3" src="${object.imageUrl}" alt="${object.name}" width="70" height="50">
                        <div>
                            <div class="d-flex">
                                <h5 class="mb-1 mr-2">${object.name}</h5>
                                <small class="text-muted">${object.price/100}€</small>
                            </div>
                            <p class="mb-1">${object.description}</p>
                        </div>
                        <div class="btn d-flex ml-auto align-items-center">
                            <i class="far fa-times-circle text-danger pointer" onclick="deleteThisFromCart(this)" data-index=${index}></i>
                        </div>
                    `;
    list.appendChild(line); 
});

document.getElementById("total_price").innerText = priceCart() + "€";

let deleteThisFromCart = (object) => {
    delFromCart(object.dataset.index);
    document.location.reload(true);
} 