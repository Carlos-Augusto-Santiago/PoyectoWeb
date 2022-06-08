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
//Arreglo para guardar los valores del hexagrama
var hexagrama = [];

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
        base = document.getElementById('hexagrama');
        base.appendChild(hexagram);
        ++contador;

        //Si se llego a las 6 tiradas genera el hexagrama
        if(contador==6)
            generateHexagram();

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
        base = document.getElementById('hexagrama');
        base.appendChild(hexagram);
        ++contador;

        //Si se llego a las 6 tiradas genera el hexagrama
        if(contador==6)
            generateHexagram();
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
    if(pan) pan.classList.add("namepborrar");
    setTimeout(() => {hexagram.removeChild(hexagram.lastChild);base.removeChild(pan);}, 3000);
    //Reducimos el contador
    --contador;
    hexagrama.pop();
    if (contador == 0) {
        hexagram.remove();
    }
    setTimeout(() => {hexagram.classList.remove('namep');pan.classList.remove("namepborrar");}, 3000);
}

function deleteHexagram() {
    //Obtenemos el hexagrama y lo eliminamos
    var hexagram = document.getElementById("hexagramas");
    hexagrama = [];
    hexagram.classList.add("colorborrar");
    let pan = document.getElementById("parrafoname");
    if(pan) pan.classList.add("namepborrar");
    setTimeout(() => {hexagram.remove();base.removeChild(pan);}, 3000);
    //restablecemos el contador para que siga tirando
    contador = 0;
    setTimeout(() => {hexagram.classList.remove('colorborrar');pan.classList.remove("namepborrar");}, 3000);
}

//Los numeros de los exagramas dependendiendo de su numero en binario
var hexagramaSecuencia =
    [
        1,44,13,33,10,6,25,12,
        9,57,37,53,61,59,21,20,
        14,50,30,56,38,64,21,35,
        26,18,22,52,41,4,27,23,
        43,28,49,31,58,47,17,45,
        5,48,63,39,60,29,3,8,
        34,32,55,62,54,40,51,16,
        11,46,36,15,19,7,24,2
    ];

//Todos los nombres de los exagramas en orden 
var nombreHexagrama = 
    [
        "1.Ch'ien","2.K'un","3.Chun","4.Meng","5.Hsü","6.Sung","7.Shih","8.Pi",
        "9.Hsiao Ch'u","10.Lü","11.T'ai","12.P'i","13.T'ung Jen","14.Ta Yu","15.Ch'ien","16.Yü",
        "17.Sui","18.Ku","19.Lin","20.Kuan","21.Shih Ho","22.Pi","23.Po","24.Fu",
        "25.Wu Wang","26.Ta Ch'u","27.I","28.Ta Kuo","29.K'an","30.Li","31.Hsien","32.Heng",
        "33.Tun","34.Ta Chuang","35.Chin","36.Ming I","37.Chia Jen","38.K'uei","39.Chien","40.Hsieh",
        "41.Sun","42.I","43.Kuai","44.Kou","45.Ts'ui","46.Sheng","47.K'un","48.Ching",
        "49.Ko","50.Ting","51.Chen","52.Ken","53.Chien","54.Kuei Mei","55.Feng","56.Lü",
        "57.Sun","58.Tui","59.Huan","60.Chieh","61.Chung Fu","62.Hsiao Kuo","63.Chi Chi","64.Wei Chi"
    ];

function generateHexagram(){
    //Un arreglo que nos servira para pasar del hexagrama a binario y poder ponerlo 
    var auxh = [];
    //Servira para saber si hay almenos un mutante
    var verif = false;
    //Evalua cada linea del hexagrama 
    hexagrama.forEach( function(numero,index){
        if(numero==7 || numero == 9)
        {
            auxh[index]=0;
            if(numero == 9 && !verif)
                verif = true;
        } 
        else
        {
            auxh[index]=1;
            if(numero == 6 && !verif)
                verif = true;
        }
        console.log(auxh[index]);
    });

    //Tomando que yang = 0 y yin = 1 sea mutante o no se hace una conversion de binario a decimal
    var tipoHexagrama = 0;
    
    for(j = 0; j < 6;j++)
    {
        tipoHexagrama+=Math.pow(2,j)*auxh[j];
    }
    //La conversion de binario a decimal
    console.log(tipoHexagrama);
    //El numero de hexagrama de la lista de hexagramas
    //Para usar su numero de hexagrama hexagramaSecuencia[tipoHexagrama] si quieres lo puedes guardar
    console.log(hexagramaSecuencia[tipoHexagrama]);
    //EL nombre del hexagrama dependiendo de su tipo
    //Para usar su nombre nombreHexagrama[hexagramaSecuencia[tipoHexagrama]-1] si quieres lo puedes guardar
    nombrehex = nombreHexagrama[hexagramaSecuencia[tipoHexagrama]-1];
    console.log(nombrehex);

    //Si es que tiene un mutante sigue esta parte
    if(verif)
    {
        //Un arreglo que nos servira para guardar la transformacion y no alterar el hexagrama original
        //(Si se modificara el hexagrama original se tendria que volver a hacer todo el hexagrama)
        var hexagramaTransformado = [];

        //Convierte solo los mutantes a normales
        hexagrama.forEach( function(numero,index){
            if(numero == 9)
            {
                hexagramaTransformado[index] = numero-1;
            } 
            else if(numero == 6)
            {
                hexagramaTransformado[index] = numero+1;
            }
            else
            hexagramaTransformado[index] = numero;

            console.log(hexagramaTransformado[index]);
        });
        
        //Esta parte es la misma que la anterior solo que sabiendo que solo hay 7 y 8
        hexagramaTransformado.forEach( function(numero,index){
            if(numero==7)
                auxh[index]=0;
            else
                auxh[index]=1;
            console.log(auxh[index]);
        });

        tipoHexagrama = 0;

        for(j = 0; j < 6;j++)
        {
            tipoHexagrama+=Math.pow(2,j)*auxh[j];
        }
         //La conversion de binario a decimal
        console.log(tipoHexagrama);
        //El numero de hexagrama de la lista de hexagramas
        //Para usar su numero de hexagrama hexagramaSecuencia[tipoHexagrama] si quieres lo puedes guardar
        console.log(hexagramaSecuencia[tipoHexagrama]);
        //EL nombre del hexagrama dependiendo de su tipo
        //Para usar su nombre nombreHexagrama[hexagramaSecuencia[tipoHexagrama]-1] si quieres lo puedes guardar
        nombrehex = nombreHexagrama[hexagramaSecuencia[tipoHexagrama]-1];
        console.log(nombrehex);
    }
    let pname = document.createElement("p");
    pname.textContent = nombrehex;
    pname.setAttribute("id","parrafoname");
    pname.style.marginLeft = "130px";
    pname.style.fontSize = "20px";
    pname.style.width = "100px"
    pname.classList.add("namep");
    base.appendChild(pname);
}