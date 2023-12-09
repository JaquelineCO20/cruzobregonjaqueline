const nombreInput = document.querySelector('#nombre')
const apPInput = document.querySelector('#apP')
const apMInput = document.querySelector('#apM')
const edadInput = document.querySelector('#edad')
const genderMasculinoRadio = document.querySelector('#masculino')
const genderFemeninoRadio = document.querySelector('#femenino')
const telefonoInput = document.querySelector('#telefono')
// En esta parte se estan obteniendo los inputs que declaramos en nuestra estructura HTML




// const Enviar = document.querySelector('#btnEnviar')
// Enviar.addEventListener('click', async (event) => {
//     event.preventDefault()
//     const name = document.querySelector('#name').value
//     const aP = document.querySelector('#firstName').value
//     const aM = document.querySelector('#lastName').value
//     const edad = document.querySelector('#edad').value
//     const sexo = document.querySelector('#masculino').checked ? "Masculino" : "Femenino"
//     const telefono = document.querySelector('#telefono').value
//     const usuario = {
//         Nombre: name,
//         ApellidoP: aP,
//         ApellidoM: aM,
//         Edad: edad,
//         Genero: sexo,
//         Telefono: telefono
//     }
//     await fetch('http://localhost:3000/api/Pacientes', {
//         method: 'post',
//         headers: {
//             "Content-Type": "application/json"
//         },
//         body: JSON.stringify(usuario)
//     })
// })

const Buscar = document.querySelector('.buscar')
console.log(Buscar)
Buscar.addEventListener('click', async (event) => {
    event.preventDefault()
    const busqueda = document.querySelector('#search').value
    if (!busqueda) {
        alert('No ingrese valores vacios')
        return
    }
    const peticion = await fetch(`http://localhost:3000/api/Pacientes/${busqueda}`)
    const [respuesta] = await peticion.json()
    console.log(respuesta)
    if (!respuesta) {
        alert('Usuario no encontrado o no existe')
        return
    }
    nombreInput.value = respuesta.Nombre
    apPInput.value = respuesta.ApellidoP
    apMInput.value = respuesta.ApellidoM
    edadInput.value = respuesta.Edad
    if(respuesta.Genero == 'Masculino'){
        genderMasculinoRadio.checked = true
    }else{
        genderFemeninoRadio.checked = true
    }
    telefonoInput.value = respuesta.Telefono
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
