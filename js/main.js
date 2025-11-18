const txtName = document.getElementById("Name");
const txtNumber = document.getElementById("Number");
const btnAgregar = document.getElementById("btnAgregar");
const alertValidacionesTexto = document.getElementById("alertValidacionesTexto");
const alertValidaciones = document.getElementById("alertValidaciones");
const contadorProductos = document.getElementById("contadorProductos");
const productosTotal = document.getElementById("productosTotal");
const precioTotal = document.getElementById("precioTotal");
const tablaListaCompras = document.getElementById("tablaListaCompras");
const cuerpoTabla = tablaListaCompras.getElementsByTagName("tbody").item(0);
const btnClear = document.getElementById("btnClear");

let cont = 0;
let totalProductos = 0;
let costoTotal = 0;
let datos = new Array();

function validarCantidad(cantidad){
    if(cantidad.length == 0){
        return false;
    }
    if(isNaN(cantidad)){
        return false;
    }
    if(Number(cantidad) <= 0){
        return false;
    }
    return true;
};//validar Cantidada

function getPrecio(){
    return Math.round(Math.random()*10000)/100;
};//getPrecio

btnClear.addEventListener("click",function(event){
    event.preventDefault();
    localStorage.removeItem("Datos");
    localStorage.removeItem("Resumen");

    txtName.style.border = "";
    txtNumber.style.border = "";
    alertValidacionesTexto.innerHTML="";
    alertValidaciones.style.display = "none";
    txtName.value = "";
    txtNumber.value ="";
    txtName.focus();

    cont = 0;
    totalProductos = 0;
    costoTotal = 0;

    contadorProductos.innerText = cont;
    productosTotal.innerText = totalProductos;
    precioTotal.innerText = new Intl.NumberFormat("es-MX", 
                    { style: "currency", currency: "MXN" }).format(costoTotal);                    
   
    cuerpoTabla.remove();

});//Boton clear

btnAgregar.addEventListener("click", function(event){
    event.preventDefault();

    let isValid = true;

    txtName.style.border = "";
    txtNumber.style.border = "";
    alertValidacionesTexto.innerHTML="";
    alertValidaciones.style.display = "none";

    if(txtName.value.length < 3){
        txtName.style.border = "solid thin red";
        alertValidacionesTexto.innerHTML = `<strong>El nombre del producto no es correcto</strong> <br>`;
        alertValidaciones.style.display = "block";
        isValid = false;
    } // Name < 3
    if(! validarCantidad(txtNumber.value)){
        txtNumber.style.border = "solid thin red";
        alertValidacionesTexto.innerHTML += `<strong>La cantidad no es correcta</strong>`;
        alertValidaciones.style.display = "block";
        isValid = false;
    }//! ValidarCantidad
    
    if(isValid){
        let precio = getPrecio();
        let row = ` <tr>
                        <td>${cont}</td>
                        <td>${txtName.value}</td>
                        <td>${txtNumber.value}</td>
                        <td>${precio}</td>
                    </tr>`;

        let elemento = {
            "cont":cont,
            "nombre": txtName.value,
            "cantidad": txtNumber.value,
            "precio": precio
        };

        datos.push(elemento);
        localStorage.setItem("Datos",JSON.stringify(datos));

        cont++;
        totalProductos += Number(txtNumber.value);
        costoTotal += precio * Number(txtNumber.value);

        cuerpoTabla.insertAdjacentHTML("beforeend",row);
        contadorProductos.innerText = cont;
        productosTotal.innerText = totalProductos;
        precioTotal.innerText = new Intl.NumberFormat("es-MX", 
                    { style: "currency", currency: "MXN" }).format(costoTotal);

        let resumen = {
            "cont":cont,
            "totalProductos": totalProductos,
            "costoTotal": costoTotal
        };

        localStorage.setItem("Resumen",JSON.stringify(resumen));

        txtName.value = "";
        txtNumber.value ="";
        txtName.focus();

    }//is Valid

});//Botón para agregar al darle click

window.addEventListener("load",function(event){
    event.preventDefault();

    if(this.localStorage.getItem("Datos") != null){
        datos = JSON.parse(this.localStorage.getItem("Datos"));
        datos.forEach((el)=>{
            let row = ` <tr>
                        <td>${el.cont}</td>
                        <td>${el.nombre}</td>
                        <td>${el.cantidad}</td>
                        <td>${el.precio}</td>
                    </tr>`;
            cuerpoTabla.insertAdjacentHTML("beforeend",row);
        });

    }//IF DATOS

    if(this.localStorage.getItem("Resumen") != null){
        let resumen = JSON.parse(this.localStorage.getItem("Resumen"));
        cont = resumen.cont;
        totalProductos = resumen.totalProductos
        costoTotal = resumen.costoTotal;
    }//Si no null
        contadorProductos.innerText = cont;
        productosTotal.innerText = totalProductos;
        precioTotal.innerText = new Intl.NumberFormat("es-MX", 
                    { style: "currency", currency: "MXN" }).format(costoTotal);
});