document.getElementById("btnConfirmar").addEventListener("click", async () => {
  const destinatario = document.getElementById("destinatario").value;
  const monto = Number(document.getElementById("monto").value);

  if (!destinatario || destinatario <= 0) {
    Swal.fire({
      icon: "error",
      title: "Destinatario inválido",
      text: "Ingrese un destinatario válido."
    });
    return;
  }

  if (isNaN(monto) || monto <= 0) {
    Swal.fire({
      icon: "error",
      title: "Monto inválido",
      text: "Ingrese un monto mayor a cero."
    });
    return;
  }

  if (monto > 1000000) {
    Swal.fire({
      icon: "error",
      title: "Monto excedido",
      text: "No puede superar $1.000.000."
    });
    return;
  }

  const token = localStorage.getItem("token");
  if (!token) {
    window.location.href = "/views/login.html";
    return;
  }

  try {
    const response = await fetch("/api/transfers", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        from_account_id: 1,
        to_account_id: destinatario,
        amount: monto,
      }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || "Error al transferir.");
    }

    Swal.fire({
      icon: "success",
      title: "Transferencia exitosa",
      text: "El pago fue realizado correctamente",
      showConfirmButton: false,
      timer: 2000
    }).then(() => {
      window.location.href = "/views/dashboard.html";
    });
  } catch (error) {
    Swal.fire({
      icon: "error",
      title: "Error",
      text: error.message,
    });
  }
});
