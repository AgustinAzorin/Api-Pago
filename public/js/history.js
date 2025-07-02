document.addEventListener("DOMContentLoaded", async () => {
  const token = localStorage.getItem("token");
  if (!token) {
    window.location.href = "/views/login.html";
    return;
  }

  try {
    const response = await fetch("/api/transfers/history/1", {
      headers: { Authorization: `Bearer ${token}` },
    });

    if (!response.ok) {
      throw new Error("No se pudo cargar el historial.");
    }

    const data = await response.json();
    const itemsPerPage = 5;
    let currentPage = 1;

    const renderPage = (page) => {
      const tabla = document.getElementById("tablaHistorial");
      tabla.innerHTML = "";

      const start = (page - 1) * itemsPerPage;
      const end = start + itemsPerPage;
      const pageData = data.slice(start, end);

      pageData.forEach((transfer) => {
        const row = document.createElement("tr");
        row.innerHTML = `
          <td>${new Date(transfer.created_at).toLocaleString()}</td>
          <td>${transfer.to_account_id}</td>
          <td>$${transfer.amount}</td>
          <td><a href="/views/comprobante.html?id=${transfer.id}">Ver</a></td>
        `;
        tabla.appendChild(row);
      });
    };

    renderPage(currentPage);

    // render botones
    const totalPages = Math.ceil(data.length / itemsPerPage);
    const contenedor = document.createElement("div");
    contenedor.style.textAlign = "center";

    for (let i = 1; i <= totalPages; i++) {
      const boton = document.createElement("button");
      boton.textContent = i;
      boton.style.margin = "0 5px";
      boton.addEventListener("click", () => {
        currentPage = i;
        renderPage(currentPage);
      });
      contenedor.appendChild(boton);
    }
    document.body.appendChild(contenedor);

  } catch (error) {
    Swal.fire({
      icon: "error",
      title: "Error",
      text: error.message
    });
  }
});
