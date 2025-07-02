document.getElementById("btnGenerar").addEventListener("click", async () => {
  const fromDate = document.getElementById("fromDate").value;
  const toDate = document.getElementById("toDate").value;

  if (fromDate && toDate && fromDate > toDate) {
    document.getElementById("resultado").textContent = "La fecha 'Desde' no puede ser mayor que la fecha 'Hasta'.";
    return;
  }

  const token = localStorage.getItem("token");
  if (!token) {
    window.location.href = "/views/login.html";
    return;
  }

  try {
    const params = new URLSearchParams();
    params.append("account_id", "1");
    if (fromDate) params.append("from_date", fromDate);
    if (toDate) params.append("to_date", toDate);

    const response = await fetch(`/api/reports?${params.toString()}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      throw new Error("Error al generar el reporte.");
    }

    const data = await response.json();
    const resultado = document.getElementById("resultado");
    resultado.innerHTML = "<h3>Movimientos:</h3>";

    if (data.length === 0) {
      resultado.innerHTML += "<p>No se encontraron movimientos en este período.</p>";
      return;
    }

    data.forEach((transfer) => {
      resultado.innerHTML += `
        <p>
          Fecha: ${new Date(transfer.created_at).toLocaleString()} |
          Destino: ${transfer.to_account_id} |
          Monto: $${transfer.amount}
        </p>`;
    });
  } catch (error) {
    document.getElementById("resultado").textContent = error.message;
  }
});
