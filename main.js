let nombrehex;
let base;
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
        svg.setAttribute("id", "svg-complete");
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
//Arreglo para guardar los valores del hexagrama
var hexagrama = [];
//Arreglo para visulizar si es que tiene un mutante
var hexagramSmutante = [];

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
        //Guardar el valor en el arreglo del hexagrama
        hexagrama.push(total);

        //Obtenemos la caja
        var verificar = document.getElementById("hexagramas");
        //Verificar si hay caja de hexagramas
        if (verificar == null) {
            //Creacion de la caja en donde poner los hexagramas
            var hexagram = document.createElement("section");
            hexagram.setAttribute("id", "hexagramas");
            hexagram.classList.add("color");
        }
        //La caja ya existe
        else {
            var hexagram = document.getElementById("hexagramas");
        }
        hexagram.style.backgroundColor = "lightslategray";

        //Verificamos el tipo de svg y se guarda en variable
        var contenedor = typeSvg(total);

        hexagram.appendChild(contenedor);
        base = document.getElementById("hexagrama");
        base.appendChild(hexagram);
        ++contador;

        //Si se llego a las 6 tiradas genera el hexagrama
        if (contador == 6) generateHexagram();
    } else {
        alert("No puedes tirar más");
    }
}

function generateRandom() {
    //Aun puede seguir tirando
    if (contador < 6) {
        //Generamos un numero random entre 9 y 6
        var random = Math.floor(Math.random() * (10 - 6)) + 6;
        hexagrama.push(random);
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
        base = document.getElementById("hexagrama");
        base.appendChild(hexagram);
        ++contador;

        //Si se llego a las 6 tiradas genera el hexagrama
        if (contador == 6) generateHexagram();
    } else {
        alert("No puedes tirar más");
    }
}

function deleteLine() {
    //Seleccionamos el contendor padre de las lineas de hexagramas
    var hexagram = document.getElementById("hexagramas");
    //Borramos el ultimo hijo que haya sido ingresado
    hexagram.classList.add("namep");
    let pan = document.getElementById("parrafoname");
    if (pan) pan.classList.add("namepborrar");
    setTimeout(() => {
        hexagram.removeChild(hexagram.lastChild);
        base.removeChild(pan);
    }, 3000);

    if(contador==6)
    {
        var hexagramas2 = document.getElementById("hexagramas2");
        hexagramas2 = "";
    }
    //Reducimos el contador
    --contador;
    hexagrama.pop();
    if (contador == 0) {
        hexagram.remove();
    }
    setTimeout(() => {
        hexagram.classList.remove("namep");
        pan.classList.remove("namepborrar");
    }, 3000);
    let sp1 = document.getElementById("spantool");
    if (sp1) base.removeChild(sp1);
    Borrar();
}

function deleteHexagram() {
    location.reload();
    /*
    //Obtenemos el hexagrama y lo eliminamos
    Borrar();
    var hexagram = document.getElementById("hexagramas");
    hexagrama = [];
    hexagram.classList.add("colorborrar");
    let pan = document.getElementById("parrafoname");
    if (pan) pan.classList.add("namepborrar");
    setTimeout(() => {
        hexagram.remove();
        base.removeChild(pan);
    }, 3000);
    //restablecemos el contador para que siga tirando
    contador = 0;
    setTimeout(() => {
        hexagram.classList.remove("colorborrar");
        pan.classList.remove("namepborrar");
    }, 3000);
    let sp1 = document.getElementById("spantool");
    if (sp1) base.removeChild(sp1);*/
}

//Los numeros de los hexagramas dependendiendo de su numero en binario
var hexagramaSecuencia = [
    1, 44, 13, 33, 10, 6, 25, 12, 9, 57, 37, 53, 61, 59, 21, 20, 14, 50, 30, 56,
    38, 64, 21, 35, 26, 18, 22, 52, 41, 4, 27, 23, 43, 28, 49, 31, 58, 47, 17,
    45, 5, 48, 63, 39, 60, 29, 3, 8, 34, 32, 55, 62, 54, 40, 51, 16, 11, 46, 36,
    15, 19, 7, 24, 2,
];

//Todos los nombres de los hexagramas en orden
var nombreHexagrama = [
    "1.Ch'ien",
    "2.K'un",
    "3.Chun",
    "4.Meng",
    "5.Hsü",
    "6.Sung",
    "7.Shih",
    "8.Pi",
    "9.Hsiao Ch'u",
    "10.Lü",
    "11.T'ai",
    "12.P'i",
    "13.T'ung Jen",
    "14.Ta Yu",
    "15.Ch'ien",
    "16.Yü",
    "17.Sui",
    "18.Ku",
    "19.Lin",
    "20.Kuan",
    "21.Shih Ho",
    "22.Pi",
    "23.Po",
    "24.Fu",
    "25.Wu Wang",
    "26.Ta Ch'u",
    "27.I",
    "28.Ta Kuo",
    "29.K'an",
    "30.Li",
    "31.Hsien",
    "32.Heng",
    "33.Tun",
    "34.Ta Chuang",
    "35.Chin",
    "36.Ming I",
    "37.Chia Jen",
    "38.K'uei",
    "39.Chien",
    "40.Hsieh",
    "41.Sun",
    "42.I",
    "43.Kuai",
    "44.Kou",
    "45.Ts'ui",
    "46.Sheng",
    "47.K'un",
    "48.Ching",
    "49.Ko",
    "50.Ting",
    "51.Chen",
    "52.Ken",
    "53.Chien",
    "54.Kuei Mei",
    "55.Feng",
    "56.Lü",
    "57.Sun",
    "58.Tui",
    "59.Huan",
    "60.Chieh",
    "61.Chung Fu",
    "62.Hsiao Kuo",
    "63.Chi Chi",
    "64.Wei Chi",
];

function generateHexagram() {
    //Caja en donde se van a colocar los svg
    var verificar = document.getElementById("hexagramas2");
    //Verificar si hay caja de hexagramas
    if (verificar == null) {
        //Creacion de la caja en donde poner los hexagramas
        var hexagram = document.createElement("section");
        hexagram.setAttribute("id", "hexagramas2");
    }
    //La caja ya existe
    else {
        var hexagram = document.getElementById("hexagramas3");
    }
    hexagram.style.backgroundColor = "lightslategray";
    //Un arreglo que nos servira para pasar del hexagrama a binario y poder ponerlo
    var auxh = [];
    //Servira para saber si hay almenos un mutante
    var verif = false;
    //Evalua cada linea del hexagrama
    hexagrama.forEach(function (numero, index) {
        //Primero verifica si tiene un mutante
        if (numero == 7 || numero == 9) {
            auxh[index] = 0;
            if (numero == 9 && !verif) verif = true;
        } else {
            auxh[index] = 1;
            if (numero == 6 && !verif) verif = true;
        }
        console.log(auxh[index]);

        //Luego para su vizualizacion
        if (numero == 9) {
            hexagramSmutante[index] = numero - 2;
        } else if (numero == 6) {
            hexagramSmutante[index] = numero + 2;
        } else hexagramSmutante[index] = numero;
        console.log("transform" + hexagramSmutante[index]);
        //Verificamos el tipo de svg y se guarda en variable
        var cont = typeSvg(hexagramSmutante[index]);

        hexagram.appendChild(cont);
        base = document.getElementById("hexagrama");
        base.appendChild(hexagram);
    });

    //Tomando que yang = 0 y yin = 1 sea mutante o no se hace una conversion de binario a decimal
    var tipoHexagrama = 0;

    for (j = 0; j < 6; j++) {
        tipoHexagrama += Math.pow(2, j) * auxh[j];
    }

    //La conversion de binario a decimal
    console.log(tipoHexagrama);

    //El numero de hexagrama de la lista de hexagramas
    //Para usar su numero de hexagrama hexagramaSecuencia[tipoHexagrama] si quieres lo puedes guardar
    console.log("tipo" + hexagramaSecuencia[tipoHexagrama]);
    //EL nombre del hexagrama dependiendo de su tipo
    //Para usar su nombre nombreHexagrama[hexagramaSecuencia[tipoHexagrama]-1] si quieres lo puedes guardar
    nombrehex = nombreHexagrama[hexagramaSecuencia[tipoHexagrama] - 1];
    console.log(nombrehex);

    base = document.getElementById("hexagramas2");
    let pname2 = document.createElement("p");
    pname2.textContent = nombrehex;
    pname2.setAttribute("id", "parrafoname");
    pname2.classList.add("namep");
    base.appendChild(pname2);
    Descrip(base);

    //Si es que tiene un mutante sigue esta parte
    if (verif) {
        //Caja en donde se van a colocar los svg
        var verificar = document.getElementById("hexagramas3");
        //Verificar si hay caja de hexagramas
        if (verificar == null) {
            //Creacion de la caja en donde poner los hexagramas
            var hexagram = document.createElement("section");
            hexagram.setAttribute("id", "hexagramas3");
        }
        //La caja ya existe
        else {
            var hexagram = document.getElementById("hexagramas3");
        }
        hexagram.style.backgroundColor = "lightslategray";
        //Un arreglo que nos servira para guardar la transformacion y no alterar el hexagrama original
        //(Si se modificara el hexagrama original se tendria que volver a hacer todo el hexagrama)
        var hexagramaTransformado = [];

        //Convierte solo los mutantes a normales
        hexagrama.forEach(function (numero, index) {
            if (numero == 9) {
                hexagramaTransformado[index] = numero - 1;
            } else if (numero == 6) {
                hexagramaTransformado[index] = numero + 1;
            } else hexagramaTransformado[index] = numero;

            console.log("transform" + hexagramaTransformado[index]);
            //Verificamos el tipo de svg y se guarda en variable
            var cont = typeSvg(hexagramaTransformado[index]);

            hexagram.appendChild(cont);
            base = document.getElementById("hexagrama");
            base.appendChild(hexagram);
        });

        //Esta parte es la misma que la anterior solo que sabiendo que solo hay 7 y 8
        hexagramaTransformado.forEach(function (numero, index) {
            if (numero == 7) auxh[index] = 0;
            else auxh[index] = 1;
            console.log("valor" + auxh[index]);
        });

        tipoHexagrama = 0;

        for (j = 0; j < 6; j++) {
            tipoHexagrama += Math.pow(2, j) * auxh[j];
        }
        //La conversion de binario a decimal
        console.log(tipoHexagrama);
        //El numero de hexagrama de la lista de hexagramas
        //Para usar su numero de hexagrama hexagramaSecuencia[tipoHexagrama] si quieres lo puedes guardar
        console.log(hexagramaSecuencia[tipoHexagrama]);
        //EL nombre del hexagrama dependiendo de su tipo
        //Para usar su nombre nombreHexagrama[hexagramaSecuencia[tipoHexagrama]-1] si quieres lo puedes guardar
        nombrehex = nombreHexagrama[hexagramaSecuencia[tipoHexagrama] - 1];
        console.log(nombrehex);

        base = document.getElementById("hexagramas3");
        let pname = document.createElement("p");
        pname.textContent = nombrehex;
        pname.setAttribute("id", "parrafoname");
        pname.classList.add("namep");
        base.appendChild(pname);
        Descrip(base);
    }

    base = document.getElementById("hexagramas");
    let pname = document.createElement("p");
    pname.textContent = "Hexagrama Principal";
    pname.setAttribute("id", "parrafoname");
    pname.classList.add("namep");
    base.appendChild(pname);
}

function Descrip(base) {
    let sp = document.createElement("span");
    sp.setAttribute("id", "spantool");
    sp.classList.add("tooltiptext");

    if (nombrehex == nombreHexagrama[0]) {
        sp.textContent = "Cielo. Lo creativo. El principio generador";
        base.appendChild(sp);
        document.getElementById("a1").classList.add("relleno");
    }
    if (nombrehex == nombreHexagrama[1]) {
        sp.textContent = "Tierra. Lo receptivo. El principio pasivo";
        base.appendChild(sp);
        document.getElementById("a2").classList.add("relleno");
    }
    if (nombrehex == nombreHexagrama[2]) {
        sp.textContent =
            "Acumular. El obstáculo inicial.La dificultad del comienzo";
        base.appendChild(sp);
        document.getElementById("a3").classList.add("relleno");
    }
    if (nombrehex == nombreHexagrama[3]) {
        sp.textContent = "Juventud.El joven necio.La inmadurez";
        base.appendChild(sp);
        document.getElementById("a4").classList.add("relleno");
    }
    if (nombrehex == nombreHexagrama[4]) {
        sp.textContent = "Esperar.La espera.La maduración.";
        base.appendChild(sp);
        document.getElementById("a5").classList.add("relleno");
    }
    if (nombrehex == nombreHexagrama[5]) {
        sp.textContent = "Disputar.El conflicto.El pleito";
        base.appendChild(sp);
        document.getElementById("a6").classList.add("relleno");
    }
    if (nombrehex == nombreHexagrama[6]) {
        sp.textContent = "Ejército.La legión.";
        base.appendChild(sp);
        document.getElementById("a7").classList.add("relleno");
    }
    if (nombrehex == nombreHexagrama[7]) {
        sp.textContent = "Solidaridad.La unión";
        base.appendChild(sp);
        document.getElementById("a8").classList.add("relleno");
    }
    if (nombrehex == nombreHexagrama[8]) {
        sp.textContent = "Animalito doméstico.La pequeña fuerza";
        base.appendChild(sp);
        document.getElementById("a9").classList.add("relleno");
    }
    if (nombrehex == nombreHexagrama[9]) {
        sp.textContent = "Caminar.El porte.El paso cauteloso";
        base.appendChild(sp);
        document.getElementById("a10").classList.add("relleno");
    }
    if (nombrehex == nombreHexagrama[10]) {
        sp.textContent = "Prosperidad.La paz.La armonía.";
        base.appendChild(sp);
        document.getElementById("a11").classList.add("relleno");
    }
    if (nombrehex == nombreHexagrama[11]) {
        sp.textContent = "Cierre.El estancamiento.Lo inerte.";
        base.appendChild(sp);
        document.getElementById("a12").classList.add("relleno");
    }
    if (nombrehex == nombreHexagrama[12]) {
        sp.textContent = "Hombres Reunidos. La unión comunitaria";
        base.appendChild(sp);
        document.getElementById("a13").classList.add("relleno");
    }
    if (nombrehex == nombreHexagrama[13]) {
        sp.textContent =
            "Gran dominio. La gran posesión.Lo que se tiene de más.";
        base.appendChild(sp);
        document.getElementById("a14").classList.add("relleno");
    }
    if (nombrehex == nombreHexagrama[14]) {
        sp.textContent = "Condescendencia. La modestia.La humildad";
        base.appendChild(sp);
        document.getElementById("a15").classList.add("relleno");
    }
    if (nombrehex == nombreHexagrama[15]) {
        sp.textContent = "Ocuparse.El entusiasmo.La algarabía.";
        base.appendChild(sp);
        document.getElementById("a16").classList.add("relleno");
    }
    if (nombrehex == nombreHexagrama[16]) {
        sp.textContent = "Conformarse.La continuidad.El seguimiento.";
        base.appendChild(sp);
        document.getElementById("a17").classList.add("relleno");
    }
    if (nombrehex == nombreHexagrama[17]) {
        sp.textContent =
            "Destrucción.La reconstrucción. La labor en lo corrompido.";
        base.appendChild(sp);
        document.getElementById("a18").classList.add("relleno");
    }
    if (nombrehex == nombreHexagrama[18]) {
        sp.textContent = "Acercarse.Lo que va llegando.";
        base.appendChild(sp);
        document.getElementById("a19").classList.add("relleno");
    }
    if (nombrehex == nombreHexagrama[19]) {
        sp.textContent = "Observar.La contemplación.";
        base.appendChild(sp);
        document.getElementById("a20").classList.add("relleno");
    }
    if (nombrehex == nombreHexagrama[20]) {
        sp.textContent = "Quebrar mordiendo.La dentellada.La filosa mordedura";
        base.appendChild(sp);
        document.getElementById("a21").classList.add("relleno");
    }
    if (nombrehex == nombreHexagrama[21]) {
        sp.textContent = "Adornar.La elegancia.La gracia.";
        base.appendChild(sp);
        document.getElementById("a22").classList.add("relleno");
    }
    if (nombrehex == nombreHexagrama[22]) {
        sp.textContent = "Resquebrajar.La desintegración.El derrumbe";
        base.appendChild(sp);
        document.getElementById("a23").classList.add("relleno");
    }
    if (nombrehex == nombreHexagrama[23]) {
        sp.textContent = "Regresar.El retorno.Lo que vuelve.";
        base.appendChild(sp);
        document.getElementById("a24").classList.add("relleno");
    }
    if (nombrehex == nombreHexagrama[24]) {
        sp.textContent = "Sinceridad. La inocencia.La naturalidad.";
        base.appendChild(sp);
        document.getElementById("a25").classList.add("relleno");
    }
    if (nombrehex == nombreHexagrama[25]) {
        sp.textContent =
            "Fuerza educadora.El poder de lo fuerte.La gran acumulación.";
        base.appendChild(sp);
        document.getElementById("a26").classList.add("relleno");
    }
    if (nombrehex == nombreHexagrama[26]) {
        sp.textContent = "Nutrirse.La alimentación.Las fauces.";
        base.appendChild(sp);
        document.getElementById("a27").classList.add("relleno");
    }
    if (nombrehex == nombreHexagrama[27]) {
        sp.textContent = "Excesos.La preponderancia de lo grande.";
        base.appendChild(sp);
        document.getElementById("a28").classList.add("relleno");
    }
    if (nombrehex == nombreHexagrama[28]) {
        sp.textContent = "Peligro.Lo abismal.La caida.";
        base.appendChild(sp);
        document.getElementById("a29").classList.add("relleno");
    }
    if (nombrehex == nombreHexagrama[29]) {
        sp.textContent = "Distinguir.El resplandor.Lo adherente.";
        base.appendChild(sp);
        document.getElementById("a30").classList.add("relleno");
    }
    if (nombrehex == nombreHexagrama[30]) {
        sp.textContent = "Unir.La influencia.La atracción.";
        base.appendChild(sp);
        document.getElementById("a31").classList.add("relleno");
    }
    if (nombrehex == nombreHexagrama[31]) {
        sp.textContent = "Luna Creciente.La duración. La permanencia.";
        base.appendChild(sp);
        document.getElementById("a32").classList.add("relleno");
    }
    if (nombrehex == nombreHexagrama[32]) {
        sp.textContent = "Retirarse.EL repliegue.";
        base.appendChild(sp);
        document.getElementById("a33").classList.add("relleno");
    }
    if (nombrehex == nombreHexagrama[33]) {
        sp.textContent = "Gran fuerza.El gran vigor.";
        base.appendChild(sp);
        document.getElementById("a34").classList.add("relleno");
    }
    if (nombrehex == nombreHexagrama[34]) {
        sp.textContent = "Progresar.El avance.";
        base.appendChild(sp);
        document.getElementById("a35").classList.add("relleno");
    }
    if (nombrehex == nombreHexagrama[35]) {
        sp.textContent = "Luz que se apaga.El oscurecimiento.";
        base.appendChild(sp);
        document.getElementById("a36").classList.add("relleno");
    }
    if (nombrehex == nombreHexagrama[36]) {
        sp.textContent = "Gente de familia. El clan.";
        base.appendChild(sp);
        document.getElementById("a37").classList.add("relleno");
    }
    if (nombrehex == nombreHexagrama[37]) {
        sp.textContent = "Contraste.La oposición.El antagonismo.";
        base.appendChild(sp);
        document.getElementById("a38").classList.add("relleno");
    }
    if (nombrehex == nombreHexagrama[38]) {
        sp.textContent = "Dificultad.El obstáculo. El impedimento.";
        base.appendChild(sp);
        document.getElementById("a39").classList.add("relleno");
    }
    if (nombrehex == nombreHexagrama[39]) {
        sp.textContent = "Explicar.La liberación. El alivio.";
        base.appendChild(sp);
        document.getElementById("a40").classList.add("relleno");
    }
    if (nombrehex == nombreHexagrama[40]) {
        sp.textContent = "Perder.La disminución.";
        base.appendChild(sp);
        document.getElementById("a41").classList.add("relleno");
    }
    if (nombrehex == nombreHexagrama[41]) {
        sp.textContent = "Evolución.El aumento.La ganancia";
        base.appendChild(sp);
        document.getElementById("a42").classList.add("relleno");
    }
    if (nombrehex == nombreHexagrama[42]) {
        sp.textContent = "Decidir.El desbordamiento.La resolución.";
        base.appendChild(sp);
        document.getElementById("a43").classList.add("relleno");
    }
    if (nombrehex == nombreHexagrama[43]) {
        sp.textContent = "Encontrarse.El acoplamiento.";
        base.appendChild(sp);
        document.getElementById("a44").classList.add("relleno");
    }
    if (nombrehex == nombreHexagrama[44]) {
        sp.textContent = "Cosechar.La reunión.La convergencia.";
        base.appendChild(sp);
        document.getElementById("a45").classList.add("relleno");
    }
    if (nombrehex == nombreHexagrama[45]) {
        sp.textContent = "Subir.El ascenso.La escalada.";
        base.appendChild(sp);
        document.getElementById("a46").classList.add("relleno");
    }
    if (nombrehex == nombreHexagrama[46]) {
        sp.textContent = "Angustia.La pesadumbre.El agotamiento.";
        base.appendChild(sp);
        document.getElementById("a47").classList.add("relleno");
    }
    if (nombrehex == nombreHexagrama[47]) {
        sp.textContent = "El pozo de agua.La fuente.";
        base.appendChild(sp);
        document.getElementById("a48").classList.add("relleno");
    }
    if (nombrehex == nombreHexagrama[48]) {
        sp.textContent = "Renovar.La revolución.El cambio";
        base.appendChild(sp);
        document.getElementById("a49").classList.add("relleno");
    }
    if (nombrehex == nombreHexagrama[49]) {
        sp.textContent = "La caldera.Lo alquímico";
        base.appendChild(sp);
        document.getElementById("a50").classList.add("relleno");
    }
    if (nombrehex == nombreHexagrama[50]) {
        sp.textContent = "Trueno.La conmoción.Lo suscitativo.";
        base.appendChild(sp);
        document.getElementById("a51").classList.add("relleno");
    }
    if (nombrehex == nombreHexagrama[51]) {
        sp.textContent = "Cimientos.La quietud.La detención.";
        base.appendChild(sp);
        document.getElementById("a52").classList.add("relleno");
    }
    if (nombrehex == nombreHexagrama[52]) {
        sp.textContent = "Evolución.El progreso gradual.";
        base.appendChild(sp);
        document.getElementById("a53").classList.add("relleno");
    }
    if (nombrehex == nombreHexagrama[53]) {
        sp.textContent = "Desposar a la hija menor.La doncella.";
        base.appendChild(sp);
        document.getElementById("a54").classList.add("relleno");
    }
    if (nombrehex == nombreHexagrama[54]) {
        sp.textContent = "Abundancia.La plenitud.";
        base.appendChild(sp);
        document.getElementById("a55").classList.add("relleno");
    }
    if (nombrehex == nombreHexagrama[55]) {
        sp.textContent = "Viajero.El andariego";
        base.appendChild(sp);
        document.getElementById("a56").classList.add("relleno");
    }
    if (nombrehex == nombreHexagrama[56]) {
        sp.textContent = "Viento.Lo penetrante.Lo suave.";
        base.appendChild(sp);
        document.getElementById("a57").classList.add("relleno");
    }
    if (nombrehex == nombreHexagrama[57]) {
        sp.textContent = "Recogerse. La serenidad. La satisfacción.";
        base.appendChild(sp);
        document.getElementById("a58").classList.add("relleno");
    }
    if (nombrehex == nombreHexagrama[58]) {
        sp.textContent = "Confusión. La dispersión.La disolución";
        base.appendChild(sp);
        document.getElementById("a59").classList.add("relleno");
    }
    if (nombrehex == nombreHexagrama[59]) {
        sp.textContent = "Moderación.La restricción.La limitación";
        base.appendChild(sp);
        document.getElementById("a60").classList.add("relleno");
    }
    if (nombrehex == nombreHexagrama[60]) {
        sp.textContent =
            "Fe Interior.La verdad interior.La sinceridad interna.";
        base.appendChild(sp);
        document.getElementById("a61").classList.add("relleno");
    }
    if (nombrehex == nombreHexagrama[61]) {
        sp.textContent =
            "Pequeñas cosas importantes.La pequeña preponderancia.";
        base.appendChild(sp);
        document.getElementById("a62").classList.add("relleno");
    }
    if (nombrehex == nombreHexagrama[62]) {
        sp.textContent = "Conclusiones.Después de la realización.";
        base.appendChild(sp);
        document.getElementById("a63").classList.add("relleno");
    }
    if (nombrehex == nombreHexagrama[63]) {
        sp.textContent = "Inconcluso.Antes de la realización.";
        base.appendChild(sp);
        document.getElementById("a64").classList.add("relleno");
    }
}

function Borrar() {
    if (nombrehex == nombreHexagrama[0]) {
        document.getElementById("a1").classList.remove("relleno");
    }
    if (nombrehex == nombreHexagrama[1]) {
        document.getElementById("a2").classList.remove("relleno");
    }
    if (nombrehex == nombreHexagrama[2]) {
        document.getElementById("a3").classList.remove("relleno");
    }
    if (nombrehex == nombreHexagrama[3]) {
        document.getElementById("a4").classList.remove("relleno");
    }
    if (nombrehex == nombreHexagrama[4]) {
        document.getElementById("a5").classList.remove("relleno");
    }
    if (nombrehex == nombreHexagrama[5]) {
        document.getElementById("a6").classList.remove("relleno");
    }
    if (nombrehex == nombreHexagrama[6]) {
        document.getElementById("a7").classList.remove("relleno");
    }
    if (nombrehex == nombreHexagrama[7]) {
        document.getElementById("a8").classList.remove("relleno");
    }
    if (nombrehex == nombreHexagrama[8]) {
        document.getElementById("a9").classList.remove("relleno");
    }
    if (nombrehex == nombreHexagrama[9]) {
        document.getElementById("a10").classList.remove("relleno");
    }
    if (nombrehex == nombreHexagrama[10]) {
        document.getElementById("a11").classList.remove("relleno");
    }
    if (nombrehex == nombreHexagrama[11]) {
        document.getElementById("a12").classList.remove("relleno");
    }
    if (nombrehex == nombreHexagrama[12]) {
        document.getElementById("a13").classList.remove("relleno");
    }
    if (nombrehex == nombreHexagrama[13]) {
        document.getElementById("a14").classList.remove("relleno");
    }
    if (nombrehex == nombreHexagrama[14]) {
        document.getElementById("a15").classList.remove("relleno");
    }
    if (nombrehex == nombreHexagrama[15]) {
        document.getElementById("a16").classList.remove("relleno");
    }
    if (nombrehex == nombreHexagrama[16]) {
        document.getElementById("a17").classList.remove("relleno");
    }
    if (nombrehex == nombreHexagrama[17]) {
        document.getElementById("a18").classList.remove("relleno");
    }
    if (nombrehex == nombreHexagrama[18]) {
        document.getElementById("a19").classList.remove("relleno");
    }
    if (nombrehex == nombreHexagrama[19]) {
        document.getElementById("a20").classList.remove("relleno");
    }
    if (nombrehex == nombreHexagrama[20]) {
        document.getElementById("a21").classList.remove("relleno");
    }
    if (nombrehex == nombreHexagrama[21]) {
        document.getElementById("a22").classList.remove("relleno");
    }
    if (nombrehex == nombreHexagrama[22]) {
        document.getElementById("a23").classList.remove("relleno");
    }
    if (nombrehex == nombreHexagrama[23]) {
        document.getElementById("a24").classList.remove("relleno");
    }
    if (nombrehex == nombreHexagrama[24]) {
        document.getElementById("a25").classList.remove("relleno");
    }
    if (nombrehex == nombreHexagrama[25]) {
        document.getElementById("a26").classList.remove("relleno");
    }
    if (nombrehex == nombreHexagrama[26]) {
        document.getElementById("a27").classList.remove("relleno");
    }
    if (nombrehex == nombreHexagrama[27]) {
        document.getElementById("a28").classList.remove("relleno");
    }
    if (nombrehex == nombreHexagrama[28]) {
        document.getElementById("a29").classList.remove("relleno");
    }
    if (nombrehex == nombreHexagrama[29]) {
        document.getElementById("a30").classList.remove("relleno");
    }
    if (nombrehex == nombreHexagrama[30]) {
        document.getElementById("a31").classList.remove("relleno");
    }
    if (nombrehex == nombreHexagrama[31]) {
        document.getElementById("a32").classList.remove("relleno");
    }
    if (nombrehex == nombreHexagrama[32]) {
        document.getElementById("a33").classList.remove("relleno");
    }
    if (nombrehex == nombreHexagrama[33]) {
        document.getElementById("a34").classList.remove("relleno");
    }
    if (nombrehex == nombreHexagrama[34]) {
        document.getElementById("a35").classList.remove("relleno");
    }
    if (nombrehex == nombreHexagrama[35]) {
        document.getElementById("a36").classList.remove("relleno");
    }
    if (nombrehex == nombreHexagrama[36]) {
        document.getElementById("a37").classList.remove("relleno");
    }
    if (nombrehex == nombreHexagrama[37]) {
        document.getElementById("a38").classList.remove("relleno");
    }
    if (nombrehex == nombreHexagrama[38]) {
        document.getElementById("a39").classList.remove("relleno");
    }
    if (nombrehex == nombreHexagrama[39]) {
        document.getElementById("a40").classList.remove("relleno");
    }
    if (nombrehex == nombreHexagrama[40]) {
        document.getElementById("a41").classList.remove("relleno");
    }
    if (nombrehex == nombreHexagrama[41]) {
        document.getElementById("a42").classList.remove("relleno");
    }
    if (nombrehex == nombreHexagrama[42]) {
        document.getElementById("a43").classList.remove("relleno");
    }
    if (nombrehex == nombreHexagrama[43]) {
        document.getElementById("a44").classList.remove("relleno");
    }
    if (nombrehex == nombreHexagrama[44]) {
        document.getElementById("a45").classList.remove("relleno");
    }
    if (nombrehex == nombreHexagrama[45]) {
        document.getElementById("a46").classList.remove("relleno");
    }
    if (nombrehex == nombreHexagrama[46]) {
        document.getElementById("a47").classList.remove("relleno");
    }
    if (nombrehex == nombreHexagrama[47]) {
        document.getElementById("a48").classList.remove("relleno");
    }
    if (nombrehex == nombreHexagrama[48]) {
        document.getElementById("a49").classList.remove("relleno");
    }
    if (nombrehex == nombreHexagrama[49]) {
        document.getElementById("a50").classList.remove("relleno");
    }
    if (nombrehex == nombreHexagrama[50]) {
        document.getElementById("a51").classList.remove("relleno");
    }
    if (nombrehex == nombreHexagrama[51]) {
        document.getElementById("a52").classList.remove("relleno");
    }
    if (nombrehex == nombreHexagrama[52]) {
        document.getElementById("a53").classList.remove("relleno");
    }
    if (nombrehex == nombreHexagrama[53]) {
        document.getElementById("a54").classList.remove("relleno");
    }
    if (nombrehex == nombreHexagrama[54]) {
        document.getElementById("a55").classList.remove("relleno");
    }
    if (nombrehex == nombreHexagrama[55]) {
        document.getElementById("a56").classList.remove("relleno");
    }
    if (nombrehex == nombreHexagrama[56]) {
        document.getElementById("a57").classList.remove("relleno");
    }
    if (nombrehex == nombreHexagrama[57]) {
        document.getElementById("a58").classList.remove("relleno");
    }
    if (nombrehex == nombreHexagrama[58]) {
        document.getElementById("a59").classList.remove("relleno");
    }
    if (nombrehex == nombreHexagrama[59]) {
        document.getElementById("a60").classList.remove("relleno");
    }
    if (nombrehex == nombreHexagrama[60]) {
        document.getElementById("a61").classList.remove("relleno");
    }
    if (nombrehex == nombreHexagrama[61]) {
        document.getElementById("a62").classList.remove("relleno");
    }
    if (nombrehex == nombreHexagrama[62]) {
        document.getElementById("a63").classList.remove("relleno");
    }
    if (nombrehex == nombreHexagrama[63]) {
        document.getElementById("a64").classList.remove("relleno");
    }
}
