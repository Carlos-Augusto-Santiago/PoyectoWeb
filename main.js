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
//Obtener los valores al presionar el botton Ingresa valores
function getData() {
    //Se obtiene el valor de cada uno de los select
    var val1 = parseInt(document.getElementById("option1").value);
    var val2 = parseInt(document.getElementById("option2").value);
    var val3 = parseInt(document.getElementById("option3").value);    

    //Sumamos los valores para generar la linea correspondiente
    var total = val1 + val2 + val3;
    console.log(total);

    //Obtencion de la caja en donde poner los hexagramas
    var hexagram = document.getElementById("hexagramas");
    document.body.appendChild(hexagram);

    
    //Checamos que linea corresponde
    if (total == 6) {
        //Creacion de la linea svg
        var svg = getNode("svg");
        hexagram.appendChild(svg);
        var r = getNode("line", {
            x1: 0,
            y1: 0,
            x2: 100,
            y2: 0,
            style:"stroke:rgb(255,255,255)",
            strokeWidth:2
        });
        var p = document.createElement("p");
        p.innerHTML = "X";
        hexagram.appendChild(p);
        svg.appendChild(r);

        var svg2 = getNode("svg");
        hexagram.appendChild(svg2);
        var r2 = getNode("line", {
            x1: 0,
            y1: 0,
            x2: 100,
            y2: 0,
            style:"stroke:rgb(255,255,255)",
            strokeWidth:2
        });               
        svg2.appendChild(r2);
    } else if (total == 7) {
    } else if (total == 8) {
    } else if (total == 9) {
    }
}

