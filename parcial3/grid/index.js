new gridjs.Grid({
    columns: ["ID","Nombre","Apellido Paterno","Apellido Materno","Edad","Genero","Telefono"],
    server:{
        url:'http://localhost:3000/api/Pacientes',
        then:data=>data.map(paciente=>[paciente.id_paciente,
            paciente.Nombre,paciente.ApellidoP,paciente.ApellidoM,
            paciente.Edad,paciente.Genero,paciente.Telefono])
    }
  }).render(document.getElementById("wrapper"));