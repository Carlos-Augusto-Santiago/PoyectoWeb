//funcion para manejo de svg
function getNode(n, v) {
    n = document.createElementNS("http://www.w3.org/2000/svg", n);
    for (var p in v)
        n.setAttributeNS(
            null,
            p.replace(/[A-Z]/g, function (m, p, o, s) {
                return "-" + m.toLowerCase();
            }),
            v[p]
        );
    return n;
}

//Funcion para crear las dos lineas con algun espacio o variable
function createSvg(letra) {
    //Caja en donde se van a colocar los svg
    var contenedor = document.createElement("div");
    //Creacion de la linea svg
    var svg = getNode("svg");
    contenedor.appendChild(svg);
    var r = getNode("line", {
        x1: 0,
        y1: 0,
        x2: 90,
        y2: 0,
        style: "stroke:rgb(255,255,255)",
        strokeWidth: 2,
    });

    var p = document.createElement("p");
    p.innerHTML = letra;
    contenedor.appendChild(p);
    svg.appendChild(r);

    var svg2 = getNode("svg");
    contenedor.appendChild(svg2);
    var r2 = getNode("line", {
        x1: 0,
        y1: 0,
        x2: 90,
        y2: 0,
        style: "stroke:rgb(255,255,255)",
        strokeWidth: 2,
    });
    svg2.appendChild(r2);

    return contenedor;
}

//Funcion para ver que tipo de svg se tiene que crear
function typeSvg(total) {
    //Checamos que linea corresponde
    if (total == 6) {
        //Llamada a funcion
        var contenedor = createSvg("X");
    } else if (total == 7) {
        //Caja en donde se van a colocar los svg
        var contenedor = document.createElement("div");
        //Creacion de la linea svg
        var svg = getNode("svg");
        svg.setAttributeNS("http://www.w3.org/2000/svg", "id", "svg-complete");
        contenedor.appendChild(svg);
        var r = getNode("line", {
            x1: 0,
            y1: 0,
            x2: 200,
            y2: 0,
            style: "stroke:rgb(255,255,255)",
            strokeWidth: 2,
        });
        svg.appendChild(r);
    } else if (total == 8) {
        //Llamada a funcion
        var contenedor = createSvg("&nbsp&nbsp");
    } else if (total == 9) {
        //Llamada a funcion
        var contenedor = createSvg("O");
    }
    return contenedor;
}

//Variable contador para contar maximo 6 entradas de valores
var contador = 0;
//Obtener los valores al presionar el botton Ingresa valores
function getData() {
    //Aun puede seguir tirando
    if (contador < 6) {
        //Se obtiene el valor de cada uno de los select
        var val1 = parseInt(document.getElementById("option1").value);
        var val2 = parseInt(document.getElementById("option2").value);
        var val3 = parseInt(document.getElementById("option3").value);

        //Sumamos los valores para generar la linea correspondiente
        var total = val1 + val2 + val3;

        //Obtenemos la caja
        var verificar = document.getElementById("hexagramas");
        //Verificar si hay caja de hexagramas
        if (verificar == null) {
            //Creacion de la caja en donde poner los hexagramas
            var hexagram = document.createElement("section");
            hexagram.setAttribute("id", "hexagramas");            
        } 
        //La caja ya existe
        else {
            var hexagram = document.getElementById("hexagramas");            
        }
        hexagram.style.backgroundColor = "lightslategray";

        //Verificamos el tipo de svg y se guarda en variable
        var contenedor = typeSvg(total);

        hexagram.appendChild(contenedor);
        document.body.appendChild(hexagram);
        ++contador;
    } else {
        alert("No puedes tirar más");
    }
}

function generateRandom() {
    //Aun puede seguir tirando
    if (contador < 6) {
        //Generamos un numero random entre 9 y 6
        var random = Math.floor(Math.random() * (10 - 6)) + 6;

        //Obtenemos la caja
        var verificar = document.getElementById("hexagramas");
        //Verificar si hay caja de hexagramas
        if (verificar == null) {
            //Creacion de la caja en donde poner los hexagramas
            var hexagram = document.createElement("section");
            hexagram.setAttribute("id", "hexagramas");            
        } 
        //La caja ya existe
        else {
            var hexagram = document.getElementById("hexagramas");         
        }
        hexagram.style.backgroundColor = "lightslategray";

        //Verificamos el tipo de svg y se guarda en variable
        var contenedor = typeSvg(random);

        hexagram.appendChild(contenedor);
        document.body.appendChild(hexagram);
        ++contador;
    } else {
        alert("No puedes tirar más");
    }
}

function deleteLine() {
    //Seleccionamos el contendor padre de las lineas de hexagramas
    var hexagram = document.getElementById("hexagramas");
    //Borramos el ultimo hijo que haya sido ingresado
    hexagram.removeChild(hexagram.lastChild);
    //Reducimos el contador
    --contador;
    if (contador == 0) {
        hexagram.remove();
    }
}

function deleteHexagram() {
    //Obtenemos el hexagrama y lo eliminamos
    var hexagram = document.getElementById("hexagramas");
    hexagram.remove();
    //restablecemos el contador para que siga tirando
    contador = 0;
}
