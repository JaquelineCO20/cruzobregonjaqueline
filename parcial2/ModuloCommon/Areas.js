function areaRectangulo(largo, ancho){
    return(largo*ancho);
}
function areaTrapecio(baseMayor, baseMenor, altura){
    return (((baseMayor+baseMenor)/2)*altura);
}
//modulo-->archivo que tiene funciones y las exporta
module.exports=areaRectangulo=areaRectangulo;
module.exports=areaTrapecio=areaTrapecio;

// console.log(__dirname);
// //archivo donde esta abierto
// console.log(__filename);
// //representa el archivo que esta corriendo
console.log(module);