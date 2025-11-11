document.addEventListener("DOMContentLoaded", cargarUsuarios);

async function cargarUsuarios() {
    try {
        const response = await fetch("http://localhost:20094/api/empleos");

        if (!response.ok) {
            console.error("Error en la petición GET /usuarios");
            return;
        }

        const usuarios = await response.json();
        const tbody = document.getElementById("tbodyUsuarios");
        tbody.innerHTML = "";

        usuarios.forEach(usuario => {
            const fila = document.createElement("tr");

            // Determinar si está activo o no
            let estadoClase = usuario.estado === "activo" ? "activo" : "inactivo";

            fila.innerHTML = `
                <td>${usuario.nombre}</td>
                <td>${usuario.email}</td>
                <td>${usuario.rol}</td>
                <td><span class="estado ${estadoClase}">${usuario.estado}</span></td>
                <td>
                    <button class="delete-btn" data-id="${usuario.id}">Eliminar</button>
                </td>
            `;
            fila.querySelector(".delete-btn").addEventListener("click", async () => {
                eliminar(usuario.id, fila);
            });
            tbody.appendChild(fila);
        });

    } catch (error) {
        console.error("Error cargando usuarios:", error);
    }
}

async function eliminar(id, fila) {
    if (!confirm("¿Estás seguro de que deseas eliminar este usuario?")) {
        return;
    }

    try {
        const response = await fetch(`http://localhost:20094/api/usuarios/${id}`, {
            method: "DELETE"
        });

        const result = await response.json();

        if (response.ok && result.success) {
            fila.remove();
        } else {
            alert("❌ Error al eliminar usuario");
        }

    } catch (error) {
        alert("⚠️ Error de conexión con el servidor");
    }
}
