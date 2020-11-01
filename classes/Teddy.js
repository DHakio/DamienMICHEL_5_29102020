class Teddy {
    constructor(object) {
        this._id(object._id);
        this.name(object.name);
        this.price(object.price);
        this.imageUrl(object.imageUrl);
        this.description(object.description);
        this.colors(object.colors);
    }

    _id(val) {
        let objectID = /^[0-9a-fA-F]{24}$/; // ObjectID is 24 length with alpha numeric caracters
        typeof val == "string" && val.match(objectID) ? this._id = val : console.log(val + " n'est pas un ObjectID");
    }
    name(val) { typeof val == "string" ? this.name = val : console.log(val + " n'est pas un string"); }
    price(val) { typeof val == "number" ? this.price = val : console.log(val + " n'est pas un number"); }
    imageUrl(val) { typeof val == "string" ? this.imageUrl = val : console.log(val + " n'est pas un string"); }
    description(val) { typeof val == "string" ? this.description = val : console.log(val + " n'est pas un string"); }
    colors(val) {Array.isArray(val) ? this.colors = val : console.log(val + " n'est pas un object")}

    check() { // Returns true if everything is defined
        if(Object.keys(this).length == 6) {
            return true
        }
        else {
            return false
        }
    }
}


class TeddyManager {
    API_URL = "http://localhost:3000/api/teddies/";
    getOne(id) {
        return new Promise((resolve, reject) => {
            let req = new Ajax(this.API_URL + id);
            req.get()
            .then(data => {
                let parsed_data = JSON.parse(data);
                let teddy = new Teddy(parsed_data);
                if(teddy.check()) {
                    resolve(teddy);
                }
            })
            .catch(error => reject(error));
        })
        
    }
    getAll() {
        return new Promise((resolve, reject) => {
            let req = new Ajax(this.API_URL);
            req.get(this.API_URL)
            .then(data => {
                let teddies = JSON.parse(data)
                let array = [];
                teddies.forEach(element => {
                    let teddy = new Teddy(element);
                    if(teddy.check()) {
                        array.push(element);
                }
                resolve(array);
                })
            })
            .catch(error => reject(error))
        })
    }
}