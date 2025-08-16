const carroImg = document.getElementById("carro-img");
const sensor = document.getElementById("sensor");
const distanciaSpan = document.getElementById("distancia");

const ledVerde = document.getElementById("led-verde");
const ledAmarelo = document.getElementById("led-amarelo");
const ledVermelho = document.getElementById("led-vermelho");

document.addEventListener("mousemove", (event) => {

    const rect = carroImg.getBoundingClientRect();
    const sensorX = rect.left + rect.width / 2;
    const sensorY = rect.bottom;

    fetch("/calcular", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
            mouse_x: event.clientX,
            mouse_y: event.clientY,
            sensor_x: sensorX,
            sensor_y: sensorY
        })
    })
        .then(res => res.json())
        .then(data => {
            distanciaSpan.innerText = data.distancia;

            ledVerde.classList.remove("on");
            ledAmarelo.classList.remove("on");
            ledVermelho.classList.remove("on");

            if (data.cor === "verde") {
                ledVerde.classList.add("on");
            } else if (data.cor === "amarelo") {
                ledAmarelo.classList.add("on");
            } else {
                ledVermelho.classList.add("on");
            }
        });
});