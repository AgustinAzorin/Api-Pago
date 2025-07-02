document.getElementById("loginForm").addEventListener("submit", async (e) => {
  e.preventDefault();
  
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;
  console.log(email, password);

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    Swal.fire({
      icon: "error",
      title: "Email inválido",
      text: "Por favor, ingrese un email válido.",
    });
    return;
  }

  if (password.length < 6) {
    Swal.fire({
      icon: "error",
      title: "Contraseña inválida",
      text: "La contraseña debe tener al menos 6 caracteres.",
    });
    return;
  }

  try {
    const response = await fetch("/api/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });

    if (!response.ok) {
      throw new Error("Credenciales incorrectas.");
    }

    const data = await response.json();
    localStorage.setItem("token", data.token);

    Swal.fire({
      icon: "success",
      title: "Bienvenido",
      showConfirmButton: false,
      timer: 1500
    }).then(() => {
      window.location.href = "/views/dashboard.html";
    });
  } catch (error) {
    Swal.fire({
      icon: "error",
      title: "Error de autenticación",
      text: error.message,
    });
  }
});
document.getElementById("crearCuenta").addEventListener("click", () => {
  window.location.href = "/views/register.html";
});
