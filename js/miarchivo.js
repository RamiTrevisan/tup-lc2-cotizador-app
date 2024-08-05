// Función para generar dinámicamente el contenido de la tabla
function generarTabla() {
  // Obtiene el contenedor donde se añadirá el contenido de la tabla
  const container = document.getElementById("container-content");
  // Limpia el contenido actual del contenedor
  container.innerHTML = "";

  // Obtiene los favoritos actuales del localStorage, agrupados por fecha
  const favoritosPorFecha = JSON.parse(localStorage.getItem("favoritos")) || {};

  // Recorre el objeto favoritosPorFecha y genera las filas de la tabla
  Object.keys(favoritosPorFecha).forEach((fecha, index) => {
    // Crea un elemento div para la fecha y le añade la clase "fecha-header"
    const fechaHeader = document.createElement("div");
    fechaHeader.classList.add("fecha-header");
    // Establece el texto del elemento div como la fecha
    fechaHeader.textContent = fecha;

    // Añade el elemento fechaHeader al contenedor
    container.appendChild(fechaHeader);

    // Recorre los favoritos de esa fecha
    favoritosPorFecha[fecha].forEach((favorito) => {
      // Crea un elemento div para la fila de la tabla y le añade la clase "element"
      const row = document.createElement("div");
      row.classList.add("element");
      // Establece un atributo data-id para la fila
      row.setAttribute("data-id", `favorito-${favorito.id}`);

      // Crea y añade los elementos div para cada columna de la fila
      const monedaDiv = document.createElement("div");
      monedaDiv.classList.add("moneda");
      monedaDiv.textContent = favorito.moneda;

      const idDiv = document.createElement("div");
      idDiv.classList.add("id");
      idDiv.textContent = favorito.id;

      const compraDiv = document.createElement("div");
      compraDiv.classList.add("compra");
      compraDiv.textContent = `${favorito.compra}`;

      const ventaDiv = document.createElement("div");
      ventaDiv.classList.add("venta");
      ventaDiv.textContent = `${favorito.venta}`;

      const accionDiv = document.createElement("div");
      accionDiv.classList.add("accion");
      const deleteSpan = document.createElement("span");
      deleteSpan.classList.add("material-symbols-outlined");
      deleteSpan.textContent = "delete";

      // Agrega un evento click al botón delete
      deleteSpan.addEventListener("click", () => {
        // Elimina el favorito del localStorage
        eliminarFavorito(fecha, favorito.id);
        // Elimina la fila de la tabla HTML
        container.removeChild(row);
      });

      // Añade el botón delete a la columna de acción
      accionDiv.appendChild(deleteSpan);

      // Añade cada columna a la fila
      row.appendChild(monedaDiv);
      row.appendChild(idDiv);
      row.appendChild(compraDiv);
      row.appendChild(ventaDiv);
      row.appendChild(accionDiv);

      // Añade la fila al contenedor
      container.appendChild(row);
    });
  });
}

// Función para eliminar un favorito del localStorage
function eliminarFavorito(fecha, id) {
  // Obtiene los favoritos actuales del localStorage, agrupados por fecha
  const favoritosPorFecha = JSON.parse(localStorage.getItem("favoritos")) || {};

  // Filtra los favoritos para eliminar el favorito con el ID especificado de la fecha dada
  if (favoritosPorFecha[fecha]) {
    favoritosPorFecha[fecha] = favoritosPorFecha[fecha].filter(
      (favorito) => favorito.id !== id
    );

    // Si la fecha ya no tiene favoritos, la elimina del objeto
    if (favoritosPorFecha[fecha].length === 0) {
      delete favoritosPorFecha[fecha];
    }

    // Guarda los nuevos favoritos en el localStorage
    localStorage.setItem("favoritos", JSON.stringify(favoritosPorFecha));
  }
}

// Función para imprimir la tabla
function printTable() {
  // Abre una nueva ventana para imprimir la tabla
  var printWindow = window.open("", "", "height=600,width=800");

  // Crea el encabezado de la tabla
  var content = `
        <table>
            <thead>
                <tr>
                    <th>FECHA</th>
                    <th>MONEDA</th>
                    <th>COMPRA</th>
                    <th>VENTA</th>
                </tr>
            </thead>
            <tbody>
    `;

  // Agrega las filas de datos dinámicamente
  document.querySelectorAll("#container-content .fecha-header")
    document.forEach((fechaHeader) => {
      const fecha = fechaHeader.textContent;
      content += `<tr><td colspan="5" style="font-weight:bold;">${fecha}</td></tr>`;

      let nextSibling = fechaHeader.nextElementSibling;
      while (nextSibling && !nextSibling.classList.contains("fecha-header")) {
        if (nextSibling.classList.contains("element")) {
          content += "<tr>";
          nextSibling.querySelectorAll("div:not(.accion)").forEach((cell) => {
            content += `<td>${cell.innerHTML}</td>`;
          });
          content += "</tr>";
        }
        nextSibling = nextSibling.nextElementSibling;
      }
    });

  content += `
            </tbody>
        </table>
    `;

  // Inserta el contenido creado en la nueva ventana
  printWindow.document.write("<html><head><title>Cotizacion</title>");
  printWindow.document.write("<style>");
  printWindow.document.write(
    "table { width: 100%; border-collapse: collapse; }"
  );
  printWindow.document.write(
    "th, td { border: 1px solid black; padding: 8px; text-align: left; }"
  );
  printWindow.document.write("</style>");
  printWindow.document.write("</head><body>");
  printWindow.document.write(content);
  printWindow.document.write("</body></html>");

  // Cierra el documento para que se procese el contenido
  printWindow.document.close();

  // Espera a que todo se cargue y luego imprime
  printWindow.onload = function () {
    printWindow.print();
  };
}

// Llama a la función para generar la tabla al cargar la página
window.onload = generarTabla;
