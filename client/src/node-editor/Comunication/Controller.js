export function post(route, dataToSend) {
    let address;
    if (process.env.NODE_ENV === 'production') {
        address = `http://132.72.116.73:48401`;
    }
    else {//NODE_ENV === development
        address = `http://localhost:8090`;
    }

    fetch(`${address}/${route}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: dataToSend
    }).then(async (res) => {
        console.log("HTTPStatus: " + res.status);
        if (res.status == 200) {
            console.log("HTTP OK");
        }
        else { //internal error
            alert("There is a problem, try later.");
        }
    });
}