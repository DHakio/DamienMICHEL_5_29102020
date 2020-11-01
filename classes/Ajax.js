class Ajax {

    constructor(url) {
        this.url(url);
    }

    url(val) { typeof val == "string" ? this.url = val : console.log(val + " n'est pas un string"); }

    get() {
        return new Promise((resolve, reject) => {
            let req = new XMLHttpRequest();
            req.open("GET", this.url);
            req.onload = () => {
                if(req.status >= 200 && req.status < 300) {
                    resolve(req.response);
                }
                else {
                    reject(req.statusText);
                }
            }
            req.onerror = () => reject(req.statusText);
            req.send(null);
        })
    }

    post(content) {
        return new Promise((resolve, reject) => {
            let req = new XMLHttpRequest();
            req.open("POST", this.url);
            req.setRequestHeader("Content-type", "applicaiton/json");
            if(req.status >= 200 && req.status < 300) {
                resolve(req.response);
            }
            else {
                reject(req.statusText);
            }
            req.send(content);
        })
    }
}