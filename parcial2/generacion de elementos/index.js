let encabezado=['Nombre','ApellidoP','ApellidoM'];
let datos=[{
    Nombre:"Jaqueline",
    ApellidoP:"Cruz",
    ApellidoM:"Obregón"
},{
    Nombre:"Alan Israel",
    ApellidoP:"Flores",
    ApellidoM:"Cabrera"
},{ 
    Nombre:"Jaqueline",
    ApellidoP:"Cruz",
    ApellidoM:"Obregón"
}]
let tab=document.createElement("table");
let enc=document.createElement("thead");
let fil=document.createElement("tr");

encabezado.forEach(elemento =>{
    let th=document.createElement("th");
    th.innerText=elemento;
    fil.appendChild(th);
});
enc.appendChild(fil);
tab.appendChild(enc);

document.getElementById("contenedor").appendChild(tab);

tbody=document.createElement("tbody");

datos.forEach(function(elemento){
let fila=document.createElement("tr");

let td1=document.createElement("td");
td1.innerText=elemento.Nombre;
fila.appendChild(td1);

let td2=document.createElement("td");
td2.innerText=elemento.ApellidoP;
fila.appendChild(td2);

let td3=document.createElement("td");
td3.innerText=elemento.ApellidoM;
fila.appendChild(td3);

tbody.appendChild(fila);
})
tab.appendChild(tbody);
