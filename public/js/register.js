document.getElementById("registerForm").addEventListener("submit", async (e) => {
  e.preventDefault();

  const username = document.getElementById("username").value.trim();
  const email = document.getElementById("email").value.trim();
  const password = document.getElementById("password").value;
  const confirmPassword = document.getElementById("confirmPassword").value;

  // validaciones
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (!username || username.length < 3) {
    Swal.fire({
      icon: "error",
      title: "Usuario inválido",
      text: "El usuario debe tener al menos 3 caracteres."
    });
    return;
  }

  if (!emailRegex.test(email)) {
    Swal.fire({
      icon: "error",
      title: "Email inválido",
      text: "Ingrese un email válido."
    });
    return;
  }

  if (password.length < 6) {
    Swal.fire({
      icon: "error",
      title: "Contraseña inválida",
      text: "Debe tener al menos 6 caracteres."
    });
    return;
  }

  if (password !== confirmPassword) {
    Swal.fire({
      icon: "error",
      title: "Contraseñas no coinciden",
      text: "Verifique las contraseñas."
    });
    return;
  }

  try {
    const response = await fetch("/api/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, email, password }),
    });
    console.log("hashedPassword:", hashedPassword);

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || "Error en el registro.");
    }

    Swal.fire({
      icon: "success",
      title: "Registro exitoso",
      text: "Ahora puede iniciar sesión",
      showConfirmButton: true,
    }).then(() => {
      window.location.href = "/views/login.html";
    });
    console.log("hashedPassword:", hashedPassword);

  } catch (error) {
    Swal.fire({
      icon: "error",
      title: "Error",
      text: error.message
    });
  }
});

document.getElementById("volver").addEventListener("click", () => {
  window.location.href = "/views/login.html";
});
