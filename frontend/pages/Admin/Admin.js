// CARGAR EMPLEOS AL INICIAR
document.addEventListener("DOMContentLoaded", cargarEmpleos);

// ============================
// 1. FUNCIÓN PARA CARGAR EMPLEOS
// ============================
async function cargarEmpleos() {
    try {
        const response = await fetch("http://localhost:20094/api/empleos");

        if (!response.ok) {
            console.error("❌ Error al obtener empleos");
            return;
        }

        const empleos = await response.json();
        const tbody = document.querySelector(".job-table tbody");
        tbody.innerHTML = "";

        empleos.forEach(empleo => {
            const fila = document.createElement("tr");

            // ✅ Guardamos el ID del empleo
            fila.dataset.id = empleo.id;

            fila.innerHTML = `
                <td>${empleo.titulo}</td>
                <td>${empleo.empresa}</td>
                <td>${empleo.descrip}</td>
                <td>${empleo.ubicacion}</td>
                <td>${empleo.publicado}</td>
                <td>${empleo.experiencia}</td>
                <td>
                    <button class="edit-btn">Editar</button>
                    <button class="delete-btn">Eliminar</button>
                </td>
            `;

            tbody.appendChild(fila);
        });

    } catch (error) {
        console.error("⚠️ Error cargando empleos:", error);
    }
}

// ============================
// 2. ABRIR MODAL (NUEVO EMPLEO)
// ============================
const modal = document.getElementById('modal-empleo');
const btnNuevo = document.querySelector('.add-job-btn');

btnNuevo.addEventListener('click', () => {
    limpiarModal();
    modal.style.display = 'flex';
});

// ============================
// 3. CERRAR MODAL
// ============================
document.getElementById('btnCancelar').addEventListener('click', () => {
    modal.style.display = 'none';
});

// ============================
//  4. GUARDAR O ACTUALIZAR EMPLEO
// ============================
document.getElementById('btnAceptar').addEventListener('click', async () => {
    const id = document.getElementById('id_empleo').value;
    const titulo = document.getElementById('titulo').value;
    const empresa = document.getElementById('empresa').value;
    const ubicacion = document.getElementById('ubicacion').value;
    const descripcion = document.getElementById('descrip').value;
    const experiencia = document.getElementById('experiencia').value;

    const data = { titulo, empresa, ubicacion, descripcion, experiencia };

    try {
        let response;

        // ✅ Modo EDITAR
        if (id) {
            response = await fetch(`http://localhost:20094/api/empleos/${id}`, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(data)
            });

        // ✅ Modo AGREGAR
        } else {
            response = await fetch(`http://localhost:20094/api/empleos`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(data)
            });
        }

        const result = await response.json();

        if (result.success) {
            location.reload(); // Recargar para ver cambios
        } else {
            alert("❌ Error al guardar empleo");
        }

    } catch (error) {
        alert("⚠️ Error de conexión con el servidor");
    }
});

// ============================
// 5. LIMPIAR MODAL
// ============================
function limpiarModal() {
    document.getElementById('id_empleo').value = "";
    document.getElementById('titulo').value = "";
    document.getElementById('empresa').value = "";
    document.getElementById('ubicacion').value = "";
    document.getElementById('descrip').value = "";
    document.getElementById('experiencia').value = "";
}

// ============================
//  6. DELEGACIÓN DE EVENTOS (EDITAR / ELIMINAR)
// ============================
document.addEventListener("click", async (e) => {

    // ELIMINAR EMPLEO
    if (e.target.classList.contains("delete-btn")) {
        const fila = e.target.closest("tr");
        const id = fila.dataset.id;

        if (!confirm("¿Seguro que quieres eliminar este empleo?")) return;

        try {
            const response = await fetch(`http://localhost:20094/api/empleos/${id}`, {
                method: "DELETE"
            });

            if (response.ok) {
                fila.remove(); // quitar del panel sin recargar
            } else {
                alert("❌ Error al eliminar empleo");
            }
        } catch (error) {
            alert("⚠️ Error de conexión");
        }

        return;
    }

    // ✅ EDITAR EMPLEO
    if (e.target.classList.contains("edit-btn")) {
        const fila = e.target.closest("tr");
        const columnas = fila.querySelectorAll("td");
        const id = fila.dataset.id;

        document.getElementById("id_empleo").value = id;
        document.getElementById("titulo").value = columnas[0].innerText;
        document.getElementById("empresa").value = columnas[1].innerText;
        document.getElementById("descripcion").value = columnas[2].innerText;
        document.getElementById("ubicacion").value = columnas[3].innerText;
        document.getElementById("experiencia").value = columnas[5].innerText;

        modal.style.display = "flex";
    }
});

document.querySelector(".logout-btn").addEventListener("click", () => {
    if (confirm("¿Deseas cerrar sesión?")) {
        window.location.href = "../login/login.html";
    }
});
