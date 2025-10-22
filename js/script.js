const carrusel = document.getElementById('carrusel');
const fondoTierra = document.querySelector('.fondo-tierra');
const marca = document.querySelector('.marca');
const indicadores = document.querySelectorAll('.dot');


carrusel.addEventListener('scroll', () => {
  const maxScroll = carrusel.scrollWidth - carrusel.clientWidth;
  const porcentaje = carrusel.scrollLeft / maxScroll;
 const slideWidth = carrusel.clientWidth;
  const index = Math.round(carrusel.scrollLeft / slideWidth);

  // mover fondo tierra horizontalmente con parallax y bajarlo 300px
  fondoTierra.style.backgroundPosition = `${porcentaje * 120}% 0px`;

  // mostrar marca solo en la primer sección
  marca.style.opacity = porcentaje < 0.90 ? 1 : 0;

  indicadores.forEach((dot, i) => {
    dot.classList.toggle('active', i === index);
  });
});

const circulos = document.querySelectorAll('.circulo');
const plantita = document.querySelector('.brote');
const explicacion = document.getElementById('explicacionColor');
const tituloColor = document.getElementById('tituloColor');
const textoColor = document.getElementById('textoColor');
const volver = document.getElementById('volver');
const slide2 = document.querySelector('.slide2');

const infoColor = {
  violeta: {
    titulo: "Tejedor",
    texto: "Tu energía conecta lo visible con lo invisible. Tenés una capacidad natural para entrelazar ideas, personas y momentos, creando armonía incluso en el cambio.",
    bg: "#6F42EA"
  },
  rojo: {
    titulo: "Sanador",
    texto: "Llevás dentro una fuerza vital que impulsa y protege. Tu presencia transforma el entorno, y tus acciones inspiran confianza y renovación.",
    bg: "#DF253E"
  },
  celeste: {
    titulo: "Regador",
    texto: "Sos calma en movimiento. Tu intuición te guía para dar justo lo necesario, y sabés cuándo fluir y cuándo detenerte para cuidar lo que importa.",
    bg: "#009ABA"
  },
  blanco: {
    titulo: "Conector",
    texto: "Tu esencia une y da sentido. Encontrás vínculos donde otros ven distancia, y recordás a los demás que todo está interrelacionado.",
    bg: "#FFFFFF",
    color: "#000"
  },
  verde: {
    titulo: "Sembrador",
    texto: "Tenés una mirada paciente y profunda. Sabés que todo crecimiento necesita tiempo, y confiás en los ciclos naturales de la vida.",
    bg: "#95C11F"
  },
  naranja: {
    titulo: "Recolector",
    texto: "Tu naturaleza celebra lo logrado y comparte lo que tiene. Valorás el esfuerzo y sabés reconocer los frutos del camino recorrido.",
    bg: "#FBBF5E"
  },
};

// Posicionar los cicruclos/roles en semicirculo
function posicionarCirculos() {
  const radio = window.innerWidth / 3; // radio del semicirculo
  const centroX = window.innerWidth / 2;
  const centroY = window.innerHeight / 2.5; // altura sobre la plantita
  const n = circulos.length;

  circulos.forEach((c, i) => {
    const angulo = Math.PI * (i / (n - 1)); // 0 a 180 grados
    const x = centroX + radio * Math.cos(angulo) - c.offsetWidth/2;
    const y = centroY - radio * Math.sin(angulo) - c.offsetHeight/2;
    c.style.left = `${x}px`;
    c.style.top = `${y}px`;
  });
}

window.addEventListener('resize', posicionarCirculos);
posicionarCirculos();

// Drag & Drop
circulos.forEach(c => {
  c.addEventListener('mousedown', dragStart);
  c.addEventListener('touchstart', dragStart, {passive: false});
});

function dragStart(e) {
  e.preventDefault();
  const c = e.target;
  c.style.zIndex = 1000;
  c.style.cursor = "grabbing";

  let shiftX, shiftY;

  if(e.type === 'mousedown'){
    shiftX = e.clientX - c.getBoundingClientRect().left;
    shiftY = e.clientY - c.getBoundingClientRect().top;
    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
  } else {
    const touch = e.touches[0];
    shiftX = touch.clientX - c.getBoundingClientRect().left;
    shiftY = touch.clientY - c.getBoundingClientRect().top;
    document.addEventListener('touchmove', onTouchMove, {passive:false});
    document.addEventListener('touchend', onTouchEnd);
  }

  function onMouseMove(e) {
    c.style.left = `${e.clientX - shiftX}px`;
    c.style.top = `${e.clientY - shiftY}px`;
  }

  function onTouchMove(e){
    const touch = e.touches[0];
    c.style.left = `${touch.clientX - shiftX}px`;
    c.style.top = `${touch.clientY - shiftY}px`;
  }

  function onMouseUp(e) { checkDrop(c); finishDrag(); }
  function onTouchEnd(e){ checkDrop(c); finishDrag(); }

  function finishDrag(){
    c.style.cursor = "grab";
    c.style.zIndex = "";
    document.removeEventListener('mousemove', onMouseMove);
    document.removeEventListener('mouseup', onMouseUp);
    document.removeEventListener('touchmove', onTouchMove);
    document.removeEventListener('touchend', onTouchEnd);
  }
}

// Verifica si el círculo toca la planta
function checkDrop(c) {
  const plantaRect = plantita.getBoundingClientRect();
  const cRect = c.getBoundingClientRect();

  const overlap = !(cRect.right < plantaRect.left ||
                    cRect.left > plantaRect.right ||
                    cRect.bottom < plantaRect.top ||
                    cRect.top > plantaRect.bottom);

  if(overlap) {
    // Mostrar sección dinámica
    const color = c.dataset.color;
    tituloColor.textContent = infoColor[color].titulo;
    textoColor.textContent = infoColor[color].texto;
    explicacion.style.backgroundColor = infoColor[color].bg || "#000";
    explicacion.style.color = infoColor[color].color || "#fff";
    explicacion.style.display = "flex";
    slide2.style.display = "none";
  } else {
    // Volver al semicírculo si no cae en la planta
    posicionarCirculos();
  }
}

// Botón volver
volver.addEventListener('click', () => {
  explicacion.style.display = "none";
  slide2.style.display = "flex";
  posicionarCirculos();
  carrusel.scrollTo({
    left: slide2.offsetLeft, //vuelve al segundo slide cuando se va para atras pq 
    behavior: "smooth"       //no se pq se le canta ir al tercer slide cuando volves para atras
  });

});


function verificarOrientacion() {
    const versionCelu = document.getElementById('versionCelu');
    const versionPC = document.getElementById('versionPC');
    
    if (window.innerHeight > window.innerWidth) {
      versionCelu.style.display = 'block';
      versionPC.style.display = 'none';
    } else {
      versionCelu.style.display = 'none';
      versionPC.style.display = 'block';
    }
  }

  verificarOrientacion(); // Ejecuta al cargar
  window.addEventListener('resize', verificarOrientacion);
  window.addEventListener('orientationchange', verificarOrientacion);


// --- SEMICÍRCULO INTERACTIVO PC --- //
function crearSemicirculoPC() {
  const semicirculoPC = document.getElementById("semicirculoPC");
  const plantitaPC = document.getElementById("plantitaPC");
  semicirculoPC.innerHTML = ""; // limpiar si se vuelve a generar

  const colores = [
    { src: "css/imagenes/rojo.png", seccion: "seccionRojo" },
    { src: "css/imagenes/naranja.png", seccion: "seccionNaranja" },
    { src: "css/imagenes/blanco.png", seccion: "seccionBlanco" },
    { src: "css/imagenes/verde.png", seccion: "seccionVerde" },
    { src: "css/imagenes/celeste.png", seccion: "seccionCeleste" },
    { src: "css/imagenes/violeta.png", seccion: "seccionVioleta" }
  ];

  const numCirculos = colores.length;
  const radio = window.innerHeight * 0.25;
  const centroX = window.innerWidth / 2;
  const centroY = window.innerHeight / 1.8; // posición sobre la planta

  colores.forEach((color, i) => {
    const circulo = document.createElement("img");
    circulo.src = color.src;
    circulo.classList.add("circuloPC");
    semicirculoPC.appendChild(circulo);

    const angulo = Math.PI * (i / (numCirculos - 1)); // de izquierda a derecha
    const x = centroX + radio * Math.cos(angulo);
    const y = centroY - radio * Math.sin(angulo);

    // Guardar posición original en dataset
    circulo.dataset.origenX = x - 40;
    circulo.dataset.origenY = y - 40;

    circulo.style.position = "absolute";
    circulo.style.left = `${circulo.dataset.origenX}px`;
    circulo.style.top = `${circulo.dataset.origenY}px`;
    circulo.style.width = `${window.innerHeight * 0.12}px`;
    circulo.style.height = `${window.innerHeight * 0.12}px`;
    circulo.style.zIndex = 6;
    circulo.style.cursor = "grab";

    // --- Drag & Drop ---
    let offsetX, offsetY;
    circulo.addEventListener("mousedown", e => {
      e.preventDefault();
      const rect = circulo.getBoundingClientRect();
      offsetX = e.clientX - rect.left;
      offsetY = e.clientY - rect.top;

      function mover(e) {
        circulo.style.left = `${e.clientX - offsetX}px`;
        circulo.style.top = `${e.clientY - offsetY}px`;
      }

      function soltar() {
        document.removeEventListener("mousemove", mover);
        document.removeEventListener("mouseup", soltar);

        const plantaRect = plantitaPC.getBoundingClientRect();
        const circRect = circulo.getBoundingClientRect();

        const overlap = !(
          circRect.right < plantaRect.left ||
          circRect.left > plantaRect.right ||
          circRect.bottom < plantaRect.top ||
          circRect.top > plantaRect.bottom
        );

        if (overlap) {
          document.getElementById(color.seccion).style.display = "block";
          document.getElementById("fondoPC").style.display = "none";
        } else {
          // volver a la posición original
          circulo.style.left = `${circulo.dataset.origenX}px`;
          circulo.style.top = `${circulo.dataset.origenY}px`;
        }
      }

      document.addEventListener("mousemove", mover);
      document.addEventListener("mouseup", soltar);
    });
  });
}

// Botones de volver para restaurar el menú principal
document.querySelectorAll(".boton-volver2").forEach(boton => {
  boton.addEventListener("click", e => {
    e.preventDefault();

    // Ocultar todas las secciones
    document.querySelectorAll(".seccionOculta").forEach(sec => {
      sec.style.display = "none";
    });

    // Mostrar el menú principal
    document.getElementById("versionPC").style.display = "block";
    document.getElementById("fondoPC").style.display = "block";

    // Restaurar posición original de los círculos
    document.querySelectorAll(".circuloPC").forEach(c => {
      c.style.left = `${c.dataset.origenX}px`;
      c.style.top = `${c.dataset.origenY}px`;
    });
  });
});

// Crear al cargar y al cambiar tamaño
if (window.innerWidth > window.innerHeight) {
  crearSemicirculoPC();
  window.addEventListener("resize", crearSemicirculoPC);
}

// --- BOTONES DE VOLVER --- //
document.querySelectorAll(".boton-volver2").forEach(boton => {
  boton.addEventListener("click", e => {
    e.preventDefault();

    // Ocultar todas las secciones
    document.querySelectorAll(".seccionOculta").forEach(sec => {
      sec.style.display = "none";
    });

    // Volver a mostrar el menú principal
    document.getElementById("versionPC").style.display = "block";
    document.getElementById("fondoPC").style.display = "block";
  });
});
