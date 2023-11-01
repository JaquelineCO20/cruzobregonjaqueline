//  Define una función llamada getRandomData que toma los datos completos y selecciona un conjunto de datos aleatorio.
// function getRandomData(data) {
//     return {
//         id: data.id,
//         first_name: data.first_name,
//         last_name: data.last_name,
//         username: data.username,
//         email: data.email,
//         profile_picture: data.avatar
//     };
// }
function buildUserTemplate(user) {
    return `
    <div class='user'>
        <header class='header'> 
            <p>${user.first_name}</p>
            <p>${user.last_name}</p>
        </header>
        <img src='${user.avatar}' >
        <div class='user_info'> 
            <p>${user.id}</p>
            <p>${user.username}</p>
        </div>
        <p class='email'>${user.email}</p>
    </div>
    `
}
// PETICION XMLTHTTPREQUETS

document.getElementById("btn").addEventListener("click", function () {
    let solicitud = new XMLHttpRequest();
    solicitud.responseType = 'json';
    solicitud.onload = function () {
        const data = solicitud.response;
        document.getElementById("resultado").innerHTML += buildUserTemplate(data)
    }
    solicitud.open("GET", "https://random-data-api.com/api/v2/users", true);
    solicitud.send();
});

//peticion fetch
document.getElementById("btn2").addEventListener("click", () => {
    fetch("https://random-data-api.com/api/v2/users")
        .then(response => response.json())
        .then(data => {
            document.getElementById("resultado").innerHTML +=buildUserTemplate(data)
        })
        .catch(error => {
            console.error("Error en la solicitud Fetch:", error);
        });
});

//peticion async
document.getElementById("btnAsync").addEventListener("click", async () => {
    try {
        let objRespuesta = await fetch("https://random-data-api.com/api/v2/users");
        let data = await objRespuesta.json();
        document.getElementById("resultado").innerHTML +=buildUserTemplate(data)
    } catch (error) {
        console.error("Error en la solicitud Async:", error);
    }
});

 
//peticion axios
document.getElementById("btnAxios").addEventListener("click", async() => {
    const result=await axios.get('https://random-data-api.com/api/v2/users')
    document.getElementById("resultado").innerHTML +=buildUserTemplate(result.data)
});

//peticion jq
document.getElementById("btnJq").addEventListener("click", () => {
    $.getJSON("https://random-data-api.com/api/v2/users", function (resultData) {
        const result = document.querySelector('#resultado')
        result.innerHTML += buildUserTemplate(resultData)
    })
        .fail(function (error) {
            console.error("Error en la solicitud Jq:", error);
        });
});