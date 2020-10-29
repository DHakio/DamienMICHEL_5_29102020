let ajaxGet = (url) => {
    return new Promise((resolve, reject) => {
        var req = new XMLHttpRequest();
        req.open("GET", url);
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

let ajaxPost = (url, content) => {
    return new Promise((resolve, reject) => {
        var req = new XMLHttpRequest();
        req.open("POST", url);
        req.setRequestHeader("Content-type", "applicaiton/json");
        if(req.status >= 200 && req.status < 300) {
            resolve(req.response);
        }
        else {
            reject(req.statusText);
        }
        req.send(JSON.stringify(content));
    })
}