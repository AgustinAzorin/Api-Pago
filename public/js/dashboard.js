document.addEventListener("DOMContentLoaded", async () => {
  const token = localStorage.getItem("token");
  if (!token) {
    window.location.href = "/views/login.html";
    return;
  }

  try {
    // por ahora hardcodeamos el id de cuenta en 1
    const response = await fetch("/api/accounts/1", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      throw new Error("Error al cargar el saldo.");
    }

    const account = await response.json();
    document.getElementById("saldo").textContent = `Saldo: $${account.balance}`;
  } catch (error) {
    document.getElementById("saldo").textContent = error.message;
  }
});

// navegaciones
document.getElementById("btnTransfer").addEventListener("click", () => {
  window.location.href = "/views/transfer.html";
});

document.getElementById("btnHistorial").addEventListener("click", () => {
  window.location.href = "/views/history.html";
});

document.getElementById("btnReportes").addEventListener("click", () => {
  window.location.href = "/views/report.html";
});

document.getElementById("cerrarSesion").addEventListener("click", () => {
  Swal.fire({
    title: "¿Seguro que desea cerrar sesión?",
    icon: "warning",
    showCancelButton: true,
    confirmButtonText: "Sí, cerrar",
    cancelButtonText: "Cancelar"
  }).then((result) => {
    if (result.isConfirmed) {
      localStorage.removeItem("token");
      window.location.href = "/views/login.html";
    }
  });
});

