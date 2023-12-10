const nombreInput = document.querySelector('#nombre')
const apPInput = document.querySelector('#apP')
const apMInput = document.querySelector('#apM')
const edadInput = document.querySelector('#edad')
const genderMasculinoRadio = document.querySelector('#masculino')
const genderFemeninoRadio = document.querySelector('#femenino')
const telefonoInput = document.querySelector('#telefono')
// En esta parte se estan obteniendo los inputs que declaramos en nuestra estructura HTML
const enviar = document.querySelector('.enviar')
const editar = document.querySelector('.editar')
const eliminar = document.querySelector('.eliminar')
const Limpiar = document.querySelector('.vaciar')
Limpiar.addEventListener('click', (event)=>{
    event.preventDefault()
    vaciarInputs()
})

editar.disabled = true
eliminar.disabled = true



enviar.addEventListener('click', async (event) => {
    event.preventDefault()
    const sexo = genderMasculinoRadio.checked ? "Masculino" : "Femenino"
    const usuario = {
        Nombre: nombreInput.value,
        ApellidoP: apPInput.value,
        ApellidoM: apMInput.value,
        Edad: edadInput.value,
        Genero: sexo,
        Telefono: telefonoInput.value
    }
    console.log(usuario)
    await fetch('http://localhost:3000/api/Pacientes', {
        method: 'post',
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(usuario)
    })
})

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
    enviar.disabled=true
    editar.disabled=false
    eliminar.disabled=false
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

eliminar.addEventListener('click', async (event) => {
    event.preventDefault()
    const busqueda = document.querySelector('.buscarInput').value
    const peticion = await fetch(`http://localhost:3000/api/Pacientes/${busqueda}`, {
        method: 'delete'
    })
    const respuesta = await peticion.json()
    console.log(respuesta)
    if(respuesta.message == "Paciente eliminado"){
        alert("usuario eliminado correctamente☝🏼🤓")
        vaciarInputs()
        return
    }
    alert("Ocurrio un problema intentelo nuevamente.")
})
editar.addEventListener('click', async (event)=>{
    event.preventDefault()
    try{
        const busqueda = document.querySelector('.buscarInput').value
        const sexo = genderMasculinoRadio.checked ? "Masculino" : "Femenino"
        const usuario = {
            Nombre: nombreInput.value,
            ApellidoP: apPInput.value,
            ApellidoM: apMInput.value,
            Edad: edadInput.value,
            Genero: sexo,
            Telefono: telefonoInput.value
        }
        console.log(usuario)
        await fetch(`http://localhost:3000/api/Pacientes/${busqueda}`, {
            method: 'put',
            headers: {  
                "Content-Type": "application/json"
            },
            body: JSON.stringify(usuario)
        })
        alert("usuario eliminado correctamente☝🏼🤓")
        vaciarInputs()
    }catch(err){
        alert(err.message)
    }

})

function vaciarInputs(){
    const busqueda = document.querySelector('.buscarInput')
    nombreInput.value = ""
    apMInput.value = ""
    apPInput.value = ""
    edadInput.value = ""
    telefonoInput.value = ""
    genderMasculinoRadio.checked = true
    editar.disabled = true
    eliminar.disabled = true
    enviar.disabled = false
    busqueda.value = ''
}