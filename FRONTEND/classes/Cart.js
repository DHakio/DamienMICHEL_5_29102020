class Cart {
    constructor(array) {
        this.array(array);
    }
    array(val) {Array.isArray(val) ? this.array = val : console.log(val + " n'est pas un array")} // Make sure an array is given

    add(product) { // Add a product to cart
        this.array.push(product);
    }
    delete(index) { // Delete one product from cart
        this.array.splice(index, 1);
    }

    price() { // Returns cart total price
        return new Promise((resolve, reject) => {
            let tm = new TeddyManager();
            let total = 0;
            this.array.forEach((id, index) => {
                tm.getOne(id).then(product => {
                    total += product.price;
                    if(index == (this.array.length - 1)) { // Resolve total at last entry
                        resolve(total);
                    }
                })
                .catch(error => console.error(error))
            })
        })
    }
    count() { // Returns number of articles in cart
        return this.array.length;
    }

    get() { // Return the cart in form of Array
        return this.array;
    }
    empty() { // Empty the cart
        this.array = [];
    }
}

class CartManager {

    STORAGE = "cart"; // Set localstorage name

    constructor() {
        if(typeof window.localStorage == "undefined" || window.localStorage.getItem(this.STORAGE) == null) { // Set cart's localstorage only if doesn't already exists
            window.localStorage.setItem(this.STORAGE, []);
        }
    }

    get() {
        let string = window.localStorage.getItem(this.STORAGE);
        let array = []
        if(string !== "") {
            let object = JSON.parse(string); // String to JSON
            object.forEach(o => {
                array.push(o);
            })
        }
        return new Cart(array);
    }

    save(array) {
        let string = JSON.stringify(array);
        window.localStorage.setItem(this.STORAGE, string);
        document.location.reload(true);
    }
}


cm = new CartManager();
cart = cm.get();
Array.prototype.forEach.call(document.getElementsByClassName("cart"), element => {
    element.append(` (${cart.count()} ${cart.count() > 1 ? "articles" : "article"})`);
});
