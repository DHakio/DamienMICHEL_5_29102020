if(typeof window.localStorage == "undefined" || window.localStorage.getItem("cart") == null) { // Set cart's localstorage only if doesnt already exists
    window.localStorage.setItem("cart", "");
}

var getCart = () => { // Returns current cart
    let cart = window.localStorage.getItem("cart"); 
    if(cart !== "") {
        let cart_object = JSON.parse(cart); // String to JSON
        let array = [];
        cart_object.forEach((object) => {
            array.push(object); // Push each object in array
        })
        return array;
    }
    else {
        return [];
    }
}

var saveCart = (array) => {
    let cart = JSON.stringify(array); // Back to string
    window.localStorage.setItem("cart", cart); // Save in local
}

var addToCart = (object) => { // Add object to cart
    let cart = getCart();
    cart.push(object);
    saveCart(cart);
}

var emptyCart = () => { // Clear the cart
    sessionStorage.removeItem("cart");
}

var delFromCart = (index) => { // Delete one element from the cart from array index
    let cart = getCart();
    cart.splice(index, 1);
    saveCart(cart);
}

var priceCart = () => {
    let cart = getCart();
    let total = 0;
    cart.forEach(object => {
        total += object.price;
    })
    return total/100;
}

// Display count in cart
let cart = getCart();
let count = cart.length;
Array.prototype.forEach.call(document.getElementsByClassName("cart"), (element) => {
    element.append(` (${count} articles)`);
});
