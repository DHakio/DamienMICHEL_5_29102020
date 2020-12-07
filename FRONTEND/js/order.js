let params = (new URL(document.location)).searchParams;

if(!params.has('id') || !params.has('total') || params.get('id') == "" || params.get('total') == "") {
    window.location.replace("index.html"); // Redirect if no id or total param is found
}

document.getElementById('orderId').innerHTML = params.get('id');
document.getElementById('totalPrice').innerHTML = params.get('total') / 100;