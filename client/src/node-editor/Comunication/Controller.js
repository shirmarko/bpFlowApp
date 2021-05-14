export function post(route, dataToSend){
    fetch(`http://localhost:8090/${route}`, {
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