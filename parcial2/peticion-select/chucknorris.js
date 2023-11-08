fetch("https://api.chucknorris.io/jokes/categories")
    .then(response => response.json())
    .then( (dato) =>{
        dato.forEach(element => {
            console.log(element);
            let opc = document.createElement("option");
            opc.value = element;
            opc.innerText = element;
            document.getElementById("categoria").appendChild(opc);
        });
    })
const select = document.querySelector('#categoria')
const chisteContainer = document.querySelector('#chiste')
const fetchButton = document.querySelector('#peticion')
const input=document.querySelector('#busqueda')
fetchButton.addEventListener('click', async() => {
    const selectedValue = input.value
    console.log(selectedValue)
    const request = await fetch(`https://api.chucknorris.io/jokes/random?category=${selectedValue}`)
    const result = await request.json()
    console.log(result, request.status)
    if(request.status == 200){
        chisteContainer.innerHTML = `
            <h2>${result.value}</h2> 
        `
    }else{
        chisteContainer.innerHTML='<h2>NO EXISTE ESA CATEGORIA</h2>'
    }

})

select.addEventListener("change",async()=>{
    const selectedValue = select.value
    console.log(selectedValue)
    const request = await fetch(`https://api.chucknorris.io/jokes/random?category=${selectedValue}`)
    const result = await request.json()
    console.log(result)
    chisteContainer.innerHTML = `
        <h2>${result.value}</h2>
    `
})
