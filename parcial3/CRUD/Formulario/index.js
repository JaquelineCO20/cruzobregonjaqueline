
import sweetalert2 from 'https://cdn.jsdelivr.net/npm/sweetalert2@11.10.0/+esm'


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
const especifico = document.querySelector('.especifico')
especifico.addEventListener('click', async () => {
    const busqueda = document.querySelector('.buscarInput').value
    if (!busqueda) {
        sweetalert2.fire({
            title: 'Error!',
            text: 'Favor de ingresar un ID valido.',
            icon: 'error',
            confirmButtonText: 'ok'
        })
        return
    }
    const response = await fetch(`http://localhost:3000/api/Pacientes/generar/pdfBy/${busqueda}`)
    if (response.status == 404) {
        sweetalert2.fire({
            title: 'Error!',
            text: 'Paciente no encontrado o no existe.',
            icon: 'error',
            confirmButtonText: 'ok'
        })
        return
    }
    console.log('pruebaaaa')
    const blob = await response.blob()

    const downloadLink = document.createElement('a')
    downloadLink.href = window.URL.createObjectURL(blob)
    downloadLink.download = 'datos-paciente-buscado.pdf'

    document.body.appendChild(downloadLink)
    downloadLink.click()
    document.body.removeChild(downloadLink)
    sweetalert2.fire({
        title: 'Exito!',
        text: 'Pdf generado correctamente☝🏼🤓',
        icon: 'success',
        confirmButtonText: 'ok'
    })
})
Limpiar.addEventListener('click', (event) => {
    event.preventDefault()
    vaciarInputs()
})

editar.disabled = true
eliminar.disabled = true

enviar.addEventListener('click', async (event) => {
    try {
        event.preventDefault()
        const sexo = genderMasculinoRadio.checked ? "Masculino" : "Femenino"
        if (!nombreInput.value, !apMInput.value, !apPInput.value, !edadInput.value, !telefonoInput.value) {
            sweetalert2.fire({
                title: 'Advertencia!',
                text: 'Favor de llenar todos los campos.',
                icon: 'warning',
                confirmButtonText: 'ok'
            })
            return
        }
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
        sweetalert2.fire({
            title: 'Exito!',
            text: 'paciente agregado correctamente☝🏼🤓',
            icon: 'success',
            confirmButtonText: 'ok'
        })
    } catch (err) {
        sweetalert2.fire({
            title: 'Error!',
            text: err.message,
            icon: 'error',
            confirmButtonText: 'ok'
        })
    }

})

const Buscar = document.querySelector('.buscar')
console.log(Buscar)
Buscar.addEventListener('click', async (event) => {
    event.preventDefault()
    const busqueda = document.querySelector('#search').value
    if (!busqueda) {
        sweetalert2.fire({
            title: 'Advertencia!',
            text: 'Favor de ingresar un ID.',
            icon: 'warning',
            confirmButtonText: 'ok'
        })
        return
    }
    const peticion = await fetch(`http://localhost:3000/api/Pacientes/${busqueda}`)
    const [respuesta] = await peticion.json()
    console.log(respuesta)
    if (!respuesta) {
        sweetalert2.fire({
            title: 'Error!',
            text: 'Paciente no encontrado o no existe.',
            icon: 'error',
            confirmButtonText: 'ok'
        })
        return
    }
    enviar.disabled = true
    editar.disabled = false
    eliminar.disabled = false
    nombreInput.value = respuesta.Nombre
    apPInput.value = respuesta.ApellidoP
    apMInput.value = respuesta.ApellidoM
    edadInput.value = respuesta.Edad
    if (respuesta.Genero == 'Masculino') {
        genderMasculinoRadio.checked = true
    } else {
        genderFemeninoRadio.checked = true
    }
    telefonoInput.value = respuesta.Telefono
})

eliminar.addEventListener('click', async (event) => {
    try {
        event.preventDefault()
        const busqueda = document.querySelector('.buscarInput').value
        sweetalert2.fire({
            title: "Deseas guardar los cambios?",
            showDenyButton: true,
            showCancelButton: true,
            confirmButtonText: "Eliminar",
            denyButtonText: `Cancelar`
        }).then(async (result) => {
            if (result.isConfirmed) {
                const peticion = await fetch(`http://localhost:3000/api/Pacientes/${busqueda}`, {
                    method: 'delete'
                })
                const respuesta = await peticion.json()
                console.log(respuesta)
                if (respuesta.message == "Paciente eliminado") {
                    sweetalert2.fire("paciente eliminado correctamente☝🏼🤓!", "", "success");
                    vaciarInputs()
                    return
                }

                throw new Error("Ocurrio un problema al eliminar")
            } else if (result.isDenied) {
                sweetalert2.fire("Edición de datos cancelada", "", "info");
            }
        });
    } catch (err) {
        sweetalert2.fire({
            title: 'Error!',
            text: err.message,
            icon: 'error',
            confirmButtonText: 'ok'
        })
    }

})
editar.addEventListener('click', async (event) => {
    event.preventDefault()
    try {
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
        sweetalert2.fire({
            title: "Deseas guardar los cambios?",
            showDenyButton: true,
            showCancelButton: true,
            confirmButtonText: "Guardar cambios",
            denyButtonText: `Cancelar`
        }).then(async (result) => {
            if (result.isConfirmed) {
                sweetalert2.fire("paciente editado correctamente☝🏼🤓!", "", "success");
                await fetch(`http://localhost:3000/api/Pacientes/${busqueda}`, {
                    method: 'put',
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify(usuario)
                })
                vaciarInputs()

            } else if (result.isDenied) {
                sweetalert2.fire("Edición de datos cancelada", "", "info");
            }
        });
        console.log(usuario)
    } catch (err) {
        sweetalert2.fire({
            title: 'Error!',
            text: err.message,
            icon: 'error',
            confirmButtonText: 'ok'
        })
    }

})

function vaciarInputs() {
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