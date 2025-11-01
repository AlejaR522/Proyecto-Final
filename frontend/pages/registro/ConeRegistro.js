console.log("✅ ConeRegistro.js cargado correctamente");

document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById("registerForm");

    form.addEventListener("submit", async (e) => {
        e.preventDefault();

        const nombre = document.getElementById("nombre").value.trim();
        const email = document.getElementById("email").value.trim();
        const password = document.getElementById("password").value.trim();
        const confirmar = document.getElementById("ConfirmPassword").value.trim(); // 🔹 Cambiado el id

        // 🔽 Validación de contraseñas antes de enviar al servidor
        if (password !== confirmar) {
            alert("⚠️ Las contraseñas no coinciden. Por favor verifica.");
            return; // Se detiene el envío
        }

        const datos = { nombre, email, password, confirmar };
        
        try {
            const response = await fetch("http://localhost:20094/api/empleos/register", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(datos),
            });

            const result = await response.json();

            if (response.ok) {
                alert("✅ Registro exitoso");
                window.location.href = "../login/login.html";
            } else {
                alert("❌ Error: " + result.message);
            }
        } catch (error) {
            console.error("❌ Error al conectar con el servidor:", error);
            alert("❌ No se pudo conectar con el servidor. Inténtalo más tarde.");
        }
    });
});

