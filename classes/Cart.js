
class Cart {
    constructor(array) {
        this.array(array);
    }
    array(val) {Array.isArray(val) ? this.array = val : console.log(val + " n'est pas un array")}

    add(product) {
        this.array.push(product);
    }
    delete(index) {
        this.array.splice(index, 1);
    }
    price() {
        let total = 0;
        this.array.forEach(product => {
            total += product.price;
        });
        return total;
    }
    count() {
        return this.array.length;
    }

    get() {
        return this.array;
    }
}


class CartManager {
    constructor() {
        if(typeof window.localStorage == "undefined" || window.localStorage.getItem("cart") == null) { // Set cart's localstorage only if doesnt already exists
            window.localStorage.setItem("cart", []);
        }
    }
    get() {
        let string = window.localStorage.getItem("cart");
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
        window.localStorage.setItem("cart", string);
        document.location.reload(true);
    }
}


cm = new CartManager();
cart = cm.get();
Array.prototype.forEach.call(document.getElementsByClassName("cart"), element => {
    element.append(` (${cart.count()} ${cart.count() > 1 ? "articles" : "article"})`);
});
