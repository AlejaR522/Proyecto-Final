// ==========================
// ✅ 1. CARGAR EMPLEOS DESDE EL BACKEND
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
// ✅ 2. MOSTRAR EMPLEOS COMO TARJETAS
// ==========================

function mostrarTarjetas(empleos) {
    jobContainer.innerHTML = ""; // limpiar antes de pintar

    if (empleos.length === 0) {
        jobContainer.innerHTML = "<p>No se encontraron empleos</p>";
        return;
    }

    empleos.forEach(e => {
        const card = document.createElement("div");
        card.classList.add("job-card");

        card.innerHTML = `
            <h3>${e.titulo}</h3>
            <p><strong>Empresa:</strong> ${e.empresa}</p>
            <p><strong>Ubicación:</strong> ${e.ubicacion}</p>
            <p><strong>Experiencia:</strong> ${e.experiencia}</p>
            <p class="job-desc">${e.descripcion}</p>
            <a href="../login/login.html" class="btn-apply">Aplicar</a>
        `;

        jobContainer.appendChild(card);
    });
}



// ==========================
// ✅ 3. FILTROS (TÍTULO + UBICACIÓN)
// ==========================

document.getElementById("formFiltro").addEventListener("submit", (e) => {
    e.preventDefault();

    const titulo = document.getElementById("titulo").value;
    const ubicacion = document.getElementById("ubicacion").value;

    cargarEmpleos({ titulo, ubicacion });
});



// ==========================
// ✅ 4. MENÚ DE PERFIL (DESPLEGABLE)
// ==========================

const profileToggle = document.getElementById("profileToggle");
const dropdownMenu = document.getElementById("dropdownMenu");

profileToggle.addEventListener("click", () => {
    dropdownMenu.style.display =
        dropdownMenu.style.display === "flex" ? "none" : "flex";
});

// Cerrar menú al hacer clic afuera
document.addEventListener("click", (event) => {
    if (!dropdownMenu.contains(event.target) &&
        !profileToggle.contains(event.target)) {
        dropdownMenu.style.display = "none";
    }
});

// Subir CV
document.getElementById("subirCV")?.addEventListener("click", () => {
    alert("Aquí configuraremos la subida de CV ✅");
});

// Cerrar sesión
document.getElementById("cerrarSesion")?.addEventListener("click", () => {
    window.location.href = "../login/login.html";
});
