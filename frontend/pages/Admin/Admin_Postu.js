document.addEventListener("DOMContentLoaded", async () => {
    const tabla = document.querySelector(".postulaciones-table tbody");
    const logoutBtn = document.querySelector(".logout-btn");


    // validar si el usaurio esta logueado
    const usuarioId = localStorage.getItem("usuarioId");
        if (!usuarioId) {
            alert("Debes iniciar sesión primero.");
            window.location.href = "../login/login.html";
        return;
}


    // 🔹 Cerrar sesión
    logoutBtn.addEventListener("click", () => {
        localStorage.clear();
        window.location.href = "../login/login.html";
    });

    // 🔹 Cargar postulaciones
    try {
        const response = await fetch("http://localhost:20094/api/postulaciones");
        const postulaciones = await response.json();

        if (!response.ok || postulaciones.length === 0) {
            tabla.innerHTML = `<tr><td colspan="5">No hay postulaciones registradas</td></tr>`;
            return;
        }

        postulaciones.forEach(p => {
            const fila = document.createElement("tr");

            fila.innerHTML = `
                <td>${p.usuario}</td>
                <td>${p.empleo}</td>
                <td>${new Date(p.fecha).toLocaleDateString()}</td>
                <td>
                    ${p.cv 
                        ? `<a href="http://localhost:20094/${p.cv}" target="_blank">📄 Ver CV</a>` 
                        : `Sin CV`}
                </td>
                <td>
                    <button class="btn-aprobar" data-id="${p.id}">Aprobar</button>
                    <button class="btn-rechazar" data-id="${p.id}">Rechazar</button>
                </td>
            `;

            tabla.appendChild(fila);
        });

    } catch (error) {
        console.error("Error al obtener postulaciones:", error);
        tabla.innerHTML = `<tr><td colspan="5">Error al conectar con el servidor.</td></tr>`;
    }

    // 🔹 Manejar aprobación o rechazo
    document.addEventListener("click", async (e) => {
        if (e.target.classList.contains("btn-aprobar") || e.target.classList.contains("btn-rechazar")) {
            const id = e.target.dataset.id;
            const estado = e.target.classList.contains("btn-aprobar") ? "aprobado" : "rechazado";

            if (!confirm(`¿Seguro que deseas marcar esta postulación como ${estado}?`)) return;

            try {
                const response = await fetch(`http://localhost:20094/api/postulaciones/${id}`, {
                    method: "PUT",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ estado })
                });

                const result = await response.json();

                if (result.success) {
                    e.target.closest("tr").remove();
                    alert(`✅ Postulación ${estado} correctamente`);
                } else {
                    alert("⚠️ Error al actualizar la postulación");
                }

            } catch (error) {
                alert("❌ Error al conectar con el servidor");
            }
        }
    });
});
