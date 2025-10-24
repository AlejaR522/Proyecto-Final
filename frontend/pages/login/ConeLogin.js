document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById("loginForm");

    form.addEventListener("submit", async (e) => {
    e.preventDefault(); // evita que recargue la página

    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    try {
        const response = await fetch("http://localhost:20094/api/empleos/login", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ email, password })
        });

        const data = await response.json();

        if (response.ok) {
            alert("✅ Inicio de sesión exitoso");
            console.log("Token recibido:", data.token);

            // Guardamos el token si lo deseas
            localStorage.setItem("token", data.token);

            // Redirigimos a la página principal o dashboard
            window.location.href = "../empleos/Jobhome.html";
        } else {
            alert(`⚠️ ${data.message || "Credenciales incorrectas"}`);
        }
    } catch (error) {
        console.error("Error al conectar con el servidor:", error);
        alert("❌ Error al conectar con el servidor.");
    }
    });
});
