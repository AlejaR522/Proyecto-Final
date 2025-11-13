// ==========================
// CARGAR EMPLEOS DESDE EL BACKEND
// ==========================

document.addEventListener("DOMContentLoaded", () => {
    cargarEmpleos();
});

// Contenedor donde van las tarjetas
const jobContainer = document.getElementById("jobContainer");

async function cargarEmpleos(filtros = {}) {
    try {
        const response = await fetch("http://localhost:20094/api/empleos");

        if (!response.ok) {
            console.error("❌ Error al obtener empleos");
            return;
        }

        const empleos = await response.json();

        // Aplicar filtros si existen
        const filtrados = empleos.filter(e => {

            const cumpleTitulo = filtros.titulo
                ? e.titulo.toLowerCase().includes(filtros.titulo.toLowerCase())
                : true;

            const cumpleUbicacion = filtros.ubicacion
                ? e.ubicacion.toLowerCase().includes(filtros.ubicacion.toLowerCase())
                : true;

            return cumpleTitulo && cumpleUbicacion;
        });

        mostrarTarjetas(filtrados);

    } catch (error) {
        console.error("⚠️ Error cargando empleos:", error);
    }
}



// ==========================
// MOSTRAR EMPLEOS COMO TARJETAS
// ==========================

function mostrarTarjetas(empleos) {
    jobContainer.innerHTML = ""; // limpiar antes de pintar

    if (empleos.length === 0) {
        jobContainer.innerHTML = "<p>No se encontraron empleos</p>";
        return;
    }

    const usuarioId = localStorage.getItem("usuarioId");

    empleos.forEach(e => {
        const card = document.createElement("div");
        card.classList.add("job-card");

        const aplicarBtn= usuarioId
            ? `<button class="btn-apply" data-id="${e.idEmpleo}">Aplicar</button>`
            : `<a href="../login/login.html" class="btn-apply">Inicia sesión para aplicar</a>`;

        card.innerHTML = `
            <h3>${e.titulo}</h3>
            <p><strong>Empresa:</strong> ${e.empresa}</p>
            <p><strong>Ubicación:</strong> ${e.ubicacion}</p>
            <p><strong>Experiencia:</strong> ${e.experiencia}</p>
            <p class="job-desc">${e.descripcion}</p>
            ${aplicarBtn}
        `;

        jobContainer.appendChild(card);
    });

    // Agregar evento a botones "Aplicar"
    if (usuarioId){
        document.querySelectorAll(".btn-apply").forEach(btn => {
            btn.addEventListener("click", (e) => {
                const idEmpleo = e.target.dataset.id;
                aplicarEmpleo(idEmpleo, usuarioId);
            });
        });
    }
}
// funcion para postularse a un empleo si el usuario ya esta logueado
async function aplicarEmpleo(idEmpleo, usuarioId) {
    try {
        const response = await fetch("http://localhost:20094/api/postulaciones", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                usuarioId: usuarioId,
                empleoId: idEmpleo,
                fecha: new Date().toISOString()
            })
        });

        const data = await response.json();

        if (response.ok) {
            alert("✅ Te has postulado correctamente a este empleo.");
        } else {
            alert("⚠️ No se pudo completar la postulación: " + data.message);
        }
    } catch (error) {
        console.error("Error al postularse:", error);
        alert("Error al conectar con el servidor.");
    }
}
// ==========================
// FILTROS (TÍTULO + UBICACIÓN)
// ==========================

document.getElementById("formFiltro").addEventListener("submit", (e) => {
    e.preventDefault();

    const titulo = document.getElementById("titulo").value;
    const ubicacion = document.getElementById("ubicacion").value;

    cargarEmpleos({ titulo, ubicacion });
});



// ==========================
//  MENÚ DE PERFIL (DESPLEGABLE)
// ==========================

document.addEventListener("DOMContentLoaded", () => {
    const profileToggle = document.getElementById("profileToggle");
    const dropdownMenu = document.getElementById("dropdownMenu");

    if (profileToggle && dropdownMenu) {
        profileToggle.addEventListener("click", (e) => {
            e.stopPropagation(); // evita cerrar inmediatamente
            dropdownMenu.style.display =
                dropdownMenu.style.display === "flex" ? "none" : "flex";
        });

        document.addEventListener("click", (event) => {
            if (!dropdownMenu.contains(event.target) &&
                !profileToggle.contains(event.target)) {
                dropdownMenu.style.display = "none";
            }
        });
    }
});

// Subir CV
const subirCV = document.getElementById("subirCV");
const inputCV = document.getElementById("inputCV");

subirCV.addEventListener("click", (e) => {
    e.preventDefault();
    inputCV.click();
});

inputCV.addEventListener("change", async () => {
    const file = inputCV.files[0];
    if (!file) return;

    if (file.type !== "application/pdf") {
        alert("Solo se permiten archivos PDF.");
    return;
    }

    const formData = new FormData();
    formData.append("cv", file);

    const usuarioId = localStorage.getItem("usuarioId");
    if (!usuarioId) {
        alert("Debes iniciar sesión primero.");
        return;
    }

    formData.append("usuarioId", usuarioId);

    try {
        const response = await fetch("http://localhost:20094/api/usuarios/uploadCV", {
        method: "POST",
        body: formData
    });

    const data = await response.json();

    if (response.ok && data.success) {
        alert("CV subido correctamente.");
        localStorage.setItem("cvUrl", data.cvUrl);
    } else {
        alert("Error al subir el CV.");
    }
    } catch (error) {
        console.error("Error al subir CV:", error);
        alert("Error al conectar con el servidor.");
    }
});


// Cerrar sesión
document.getElementById("cerrarSesion")?.addEventListener("click", () => {
    window.location.href = "../login/login.html";
});
