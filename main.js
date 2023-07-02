const verCarrito = document.getElementById("verCarrito");
const modalContainer = document.getElementById("modal-container");
const cantidadCarrito = document.getElementById("cantidadCarrito");

let carrito = JSON.parse(localStorage.getItem('carrito')) || [];
//let cantidadProductos = JSON.parse(localStorage.getItem('cantidadProductos')) || [];

verCarrito.addEventListener("click", () => {
    abrirModalCarrito();
});

const abrirModalCarrito = () => {
    modalContainer.innerHTML = "";
    modalContainer.style.display = "flex";
    const modalHeader = document.createElement("div");
    modalHeader.className = "modal-header";
    modalHeader.innerHTML = `<h1>Carrito</h1>`;
    modalContainer.append(modalHeader);

    const modalButton = document.createElement("h1");
    modalButton.innerText = 'x';
    modalButton.className = "modal-header-button";
    modalHeader.append(modalButton);

    modalButton.addEventListener("click", () => {
        modalContainer.style.display = "none";
    });

    carrito.forEach((producto) => {
        let contenidoCarrito = document.createElement("div");
        contenidoCarrito.className = "modal-content";
        contenidoCarrito.innerHTML = `<h3>${producto.nombre}</h3>
        <p>$${producto.precio}</p>
        <p>Cantidad: ${producto.cantidad}</p>
        <p>Total: ${producto.precio*producto.cantidad}</p>
        `;
        modalContainer.append(contenidoCarrito);

        let eliminar = document.createElement("span");
        eliminar.innerHTML = `delete`;
        eliminar.className = "material-symbols-outlined";
        contenidoCarrito.append(eliminar);

        eliminar.addEventListener("click", eliminarProducto);

       });  
    

    const total = carrito.reduce((acc, el) => acc+ el.precio * el.cantidad,0);
    const totalPedido = document.createElement("div");
    totalPedido.className = "total-content";
    totalPedido.innerHTML = `Total $ ${total}</h3>
    `;

    const confirmarCompra = document.createElement("button");
    confirmarCompra.innerText = "Comprar";
    confirmarCompra.style.fontSize = "40px";
    confirmarCompra.style.paddingLeft = "1px"
    modalContainer.append(confirmarCompra);

    confirmarCompra.addEventListener("click", terminarCompra);

    const vaciar = document.createElement("span");
        vaciar.innerHTML = `remove_shopping_cart`;
        vaciar.className = "material-symbols-outlined";
        vaciar.style.fontSize = "40px";
        vaciar.style.marginLeft = "1px"
        vaciar.style.justifyContent = "space-between"

        modalContainer.append(vaciar);

        vaciar.addEventListener("click", vaciarCarrito);

    modalContainer.append(totalPedido);
};

//Metodo para agregar objeto seleccionado al carrito
function agregarAlCarrito(id){
    //Buscar objeto seleccionado por id en lista de productos
    var itemsEncontrados  = productos.filter(function(item){return item.id == id;} );
    var itemEncontrado = itemsEncontrados[0];
    console.log(itemEncontrado.id);
    const repetir = carrito.some((itemRepetido) => itemRepetido.id === itemEncontrado.id );

    //si no esta repetido, lo agregamos al array
    if(!repetir){
        carrito.push({
            id: itemEncontrado.id,
            nombre: itemEncontrado.nombre,
            detalle: itemEncontrado.detalle,
            precio: itemEncontrado.precio,
            cantidad: itemEncontrado.cantidad
        }
        )
        guardarMiCarritoEnLocalStorage();
    }
    else{
        carrito.map((producto) => {
            if(producto.id === itemEncontrado.id){
                producto.cantidad++
            }
        });
    }
    swal({
        title: "Producto agregado al carrito!",
        icon: "success",
        button: "Ok",
      });
    contadorProductosCarrito();
}

const eliminarProducto = () => {
    const idEncontrado = carrito.find((element) => element.id);

    carrito = carrito.filter((carritoId) => {
        return carritoId !== idEncontrado;
    });
    
    guardarMiCarritoEnLocalStorage();
    contadorProductosCarrito();
    abrirModalCarrito();
};

const guardarMiCarritoEnLocalStorage = () => {
    localStorage.setItem('carrito', JSON.stringify(carrito));
    cantidadProductos = JSON.parse(localStorage.getItem('carrito'));
};

const cargarCarritoDeLocalStorage = () => {
    if (localStorage.getItem('carrito') !== null) {
        carrito = JSON.parse(localStorage.getItem('carrito'));
    }
};

const vaciarCarrito = () => {
    carrito = [];
    localStorage.clear();
    guardarMiCarritoEnLocalStorage();
    contadorProductosCarrito();
    abrirModalCarrito();
};

const contadorProductosCarrito = () => {
    cantidadCarrito.style.display = "block";
    let cantidadProductos = JSON.parse(localStorage.getItem('carrito'));

    if(cantidadProductos!== null && cantidadProductos!== undefined){
        cantidadCarrito.innerText = cantidadProductos.length;
    }
    else{
        cantidadCarrito.style.display = "none";
    }
    
    console.log(cantidadProductos.length);
};

const terminarCompra = () => {
    modalContainer.innerHTML = "";
    modalContainer.style.display = "flex";
    const modalHeader = document.createElement("div");
    modalHeader.className = "modal-header";
    modalHeader.innerHTML = `<h1>Confirmar Compra</h1>`;
    modalContainer.append(modalHeader);

    const modalButton = document.createElement("h1");
    modalButton.innerText = 'x';
    modalButton.className = "modal-header-button";
    modalHeader.append(modalButton);

    modalButton.addEventListener("click", () => {
        modalContainer.style.display = "none";
    }); 

    let contenidoFormulario = document.createElement("div");
    contenidoFormulario.className = "modal-content";
    contenidoFormulario.innerHTML = `<form><label>Nombre: &nbsp;  </label><input type="text" id="nombre" name="nombre" ><br><br>
        <label>Apellido: &nbsp;  </label><input type="text" id="apellido" name="apellido" ><br><br>
        <label>Email:   &nbsp;&nbsp; &nbsp; &nbsp; </label><input type="text" id="email" name="email" ><br><br>
        <label>Telefono: &nbsp;  </label><input type="text" id="telefono" name="telefono"><br><br><br><br>
        <button onclick="enviarFormulario()" type="button">Enviar!</button></form>`;

        contenidoFormulario.style.alignItems = "center";
        modalContainer.append(contenidoFormulario);
};

const contador = contadorProductosCarrito();

const enviarFormulario= () => {
    carrito = [];
    localStorage.clear();
    guardarMiCarritoEnLocalStorage();
    contadorProductosCarrito();
    let inputValueNombre = document.getElementById("nombre").value; 
    let inputValueApellido = document.getElementById("apellido").value; 
    let inputValueEmail = document.getElementById("email").value; 
    let inputValueTelefono = document.getElementById("telefono").value;

    modalContainer.style.display = "none";

    modalContainer.innerHTML = "";
    modalContainer.style.display = "flex";
    const modalHeader = document.createElement("div");
    modalHeader.className = "modal-header";
    modalHeader.innerHTML = `<h1>Compra exitosa</h1>`;
    modalContainer.append(modalHeader);

    const modalButton = document.createElement("h1");
    modalButton.innerText = 'x';
    modalButton.className = "modal-header-button";
    modalHeader.append(modalButton);

    modalButton.addEventListener("click", () => {
        modalContainer.style.display = "none";
    }); 

    let contenidoFormulario = document.createElement("div");
    contenidoFormulario.className = "modal-content";
    contenidoFormulario.innerHTML = ` <form><label><b>COMPRA EXITOSA. </b></label><br><br>
        <label><b>El pedido sera entregado a: </b> </label><br><br>
        <label>Nombre: ${inputValueNombre}</label><br><br>
        <label>Apellido: ${inputValueApellido}</label><br><br>
        <label>Email: ${inputValueEmail}</label><br><br>
        <label>Telefono: ${inputValueTelefono}</label><br><br>
        </form>`;

        contenidoFormulario.style.alignItems = "center";
        modalContainer.append(contenidoFormulario);
  }
