document.addEventListener("DOMContentLoaded", async () => {
  const token = localStorage.getItem("token");
  if (!token) {
    window.location.href = "/views/login.html";
    return;
  }

  // obtenemos el id desde la query
  const params = new URLSearchParams(window.location.search);
  const id = params.get("id");

  if (!id) {
    document.getElementById("detalleComprobante").textContent = "No se especificó transferencia.";
    return;
  }

  try {
    const response = await fetch(`/api/transfers/comprobante/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      throw new Error("Comprobante no encontrado.");
    }

    const comp = await response.json();
    document.getElementById("detalleComprobante").innerHTML = `
      <p><strong>ID Transferencia:</strong> ${comp.transfer_id}</p>
      <p><strong>Fecha:</strong> ${new Date(comp.generated_at).toLocaleString()}</p>
      <p><strong>Comprobante:</strong> <a href="${comp.comprobante_url}" target="_blank">Ver Documento</a></p>
    `;
  } catch (error) {
    document.getElementById("detalleComprobante").textContent = error.message;
  }
});

document.getElementById("volver").addEventListener("click", () => {
  window.location.href = "/views/history.html";
});
