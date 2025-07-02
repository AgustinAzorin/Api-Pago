document.getElementById("validar").addEventListener("click", async () => {
  const cuit = document.getElementById("cuit").value;

  const token = localStorage.getItem("token");
  if (!token) {
    window.location.href = "/views/login.html";
    return;
  }

  try {
    const response = await fetch("/api/soap/validate-cuit", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ cuit }),
    });

    if (!response.ok) {
      throw new Error("Error en la validación.");
    }

    const xml = await response.text();
    document.getElementById("resultado").textContent = xml;
  } catch (error) {
    document.getElementById("resultado").textContent = error.message;
  }
});

document.getElementById("volver").addEventListener("click", () => {
  window.location.href = "/views/dashboard.html";
});
