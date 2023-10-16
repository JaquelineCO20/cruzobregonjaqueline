const x= "url('./Imagenes/x.jpg')";
const o="url('./Imagenes/esfera.jpg')";
let estado="Jugador1";
const modal=document.querySelector("dialog");
const textoModal=modal.querySelector("h1");

document.querySelectorAll(".caja").forEach(caja => {
    caja.addEventListener("click", function (e) {
         if(!caja.classList.contains("seleccionada")){ //verifica si la caja ya se esta seleccionada
            if(estado==="pausa")return; 
            caja.style.backgroundImage = estado === "Jugador1" ? x : o;
            caja.innerHTML = ""; // Elimina cualquier contenido previo
            caja.classList.add("seleccionada");
            const posicion=Ganador();
            if(typeof posicion==="object"){
                gano(posicion);
                return;
            }
            if(posicion==="empate"){
                MostrarModal("OH NO, PARECE QUE HAN EMPATADO");
            }
            estado = estado === "Jugador1" ? "Jugador2" : "Jugador1";
        }
        });
    });

document.getElementById("btn").addEventListener("click", function () {
    let cajas = document.querySelectorAll(".caja");
    cajas.forEach(caja => {
        caja.style.backgroundImage = ""; // Elimina el fondo de imagen
        caja.classList.remove("seleccionada");
        caja.classList.remove("ganador"); // Elimina la clase "ganador" de todas las casillas
        caja.innerHTML = "";
        caja.style.pointerEvents = "auto"; // Permite que las casillas sean seleccionables nuevamente
        });
        estado = "Jugador1"; // Restablece el estado del juego a "Jugador1"
    });

    //verificar si existe un ganador
    function Ganador(){
        const cajas = document.querySelectorAll(".caja");
        const tablero = Array.from(cajas).map(caja => caja.style.backgroundImage);
        console.log(tablero);
    
        // Verificar si todas las casillas están llenas
    if (!tablero.includes("") && !tablero.includes("none")) {
        return "empate";
    }
        // Verificar líneas horizontales
        for (let i = 0; i < 9; i += 3) {
            if (tablero[i] &&
                tablero[i] === tablero[i + 1] &&
                tablero[i] === tablero[i + 2]) {
                return gano([i,i+1,i+2]);
            }
        }
    
        // Verificar líneas verticales
        for (let i = 0; i < 3; i++) {
            if (tablero[i] &&
                tablero[i] === tablero[i + 3] &&
                tablero[i] === tablero[i + 6]) {
                return gano([i,i+3,i+6]);
            }
        }
    
        // Verificar líneas diagonales
        if (tablero[0] &&
            tablero[0] === tablero[4] &&
            tablero[0] === tablero[8]) {
            return gano([0,4,8]);
        }
        if (tablero[2] &&
            tablero[2] === tablero[4] &&
            tablero[2] === tablero[6]) {
            return gano([2,4,6]);
        }

        //empates
        if(tablero.includes(""))return false;
        return "empate";   
    }
    
    function gano(posicionGano){
        console.log("GANASTE!",posicionGano);
        const cajas = document.querySelectorAll(".caja");
        posicionGano.forEach(posicion =>{
            cajas[posicion].classList.toggle("ganador",true);
            cajas[posicion].style.pointerEvents = "none"; // Desactiva la selección en las casillas ganadoras
        })
        MostrarModal("JUEGO GANADO, EL GANADOR HA SIDO: "+estado);
        estado="pausa";
    }

    function MostrarModal(texto){
        textoModal.innerText=texto;
        modal.showModal();
    }
    document.getElementById("btnSi").addEventListener("click", function(){
        Reiniciar();
        modal.close();
    });
    document.getElementById("btnNo").addEventListener("click",function(){
        modal.close();
    });

    function Reiniciar(){
        const cajas = document.querySelectorAll(".caja");
        cajas.forEach(caja => {
        caja.style.backgroundImage = ""; 
        caja.classList.remove("seleccionada");
        caja.classList.remove("ganador"); 
        caja.innerHTML = "";
        caja.style.pointerEvents = "auto"; 
        });
        estado = "Jugador1";
    }