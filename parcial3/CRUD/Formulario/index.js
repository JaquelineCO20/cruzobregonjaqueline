const Enviar = document.querySelector('#btnEnviar')
Enviar.addEventListener('click', async (event) => {
    event.preventDefault()
    const name = document.querySelector('#name').value
    const aP = document.querySelector('#firstName').value
    const aM = document.querySelector('#lastName').value
    const edad = document.querySelector('#edad').value
    const sexo = document.querySelector('#masculino').checked ? "Masculino" : "Femenino"
    const telefono = document.querySelector('#telefono').value
    const usuario = {
        Nombre: name,
        ApellidoP: aP,
        ApellidoM: aM,
        Edad: edad,
        Genero: sexo,
        Telefono: telefono
    }
    await fetch('http://localhost:3000/api/Pacientes', {
        method: 'post',
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(usuario)
    })
})

const Buscar = document.querySelector('#btnBuscar')
Buscar.addEventListener('click', async (event) => {
    event.preventDefault()
    const busqueda = document.querySelector('#idBuscar').value
    if (!busqueda) {
        alert('No ingrese valores vacios')
        return
    }
    const peticion = await fetch(`http://localhost:3000/api/Pacientes/${busqueda}`)
    const [respuesta] = await peticion.json()
    const datosEncontrados = document.querySelector('#datosEncontrados')
    console.log(respuesta)
    if (!respuesta) {
        datosEncontrados.innerHTML = '<h3>Usuario no encontrado o no existe 🤷‍♀️</h3>'
        return
    }
    datosEncontrados.innerHTML = `
        <p>${respuesta.Nombre}</p>
        <p>${respuesta.ApellidoP}</p>
        <p>${respuesta.ApellidoM}</p>
        <p>${respuesta.Edad}</p>
        <p>${respuesta.Genero}</p>
        <p>${respuesta.Telefono}</p>
    `
})

const Eliminar = document.querySelector('#btnEliminar')
Eliminar.addEventListener('click', async (event) => {
    event.preventDefault()
    const busqueda = document.querySelector('#idBuscar').value
    const peticion = await fetch(`http://localhost:3000/api/Pacientes/${busqueda}`, {
        method: 'delete'
    })
    const respuesta = await peticion.json()
    const datosEncontrados = document.querySelector('#datosEncontrados')
    console.log(respuesta)
    datosEncontrados.innerHTML = '<h3>Usuario eliminado correctamente🧐</h3>'
})
const tableBody = document.querySelector('.tbody')
fetch('http://localhost:3000/api/Pacientes')
    .then(response => response.json())
    .then(arregloPacientes => {
        console.log(arregloPacientes)
        arregloPacientes.forEach(paciente => {
            const btnEditar = document.createElement('button');
            btnEditar.addEventListener('click', () => {
                console.log(paciente);
            });
            btnEditar.textContent = 'Editar';
            const btnEliminar = document.createElement('button');
            btnEliminar.addEventListener('click', () => {
                console.log(paciente.id_paciente );
            });
            btnEliminar.textContent = 'Eliminar';
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${paciente.id_paciente}</td>
                <td>${paciente.Nombre}</td>
                <td>${paciente.ApellidoP}</td>
                <td>${paciente.ApellidoM}</td>
                <td>${paciente.Edad}</td>
                <td>${paciente.Genero}</td>
                <td>${paciente.Telefono}</td>
                <td class='operations'></td>
            `;

            // Agrega el botón al td 'operations'
            row.querySelector('.operations').appendChild(btnEditar)
            row.querySelector('.operations').appendChild(btnEliminar)

            // Agrega la fila a la tabla
            tableBody.appendChild(row);
        })
    })