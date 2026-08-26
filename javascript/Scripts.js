document.addEventListener("DOMContentLoaded", () => {
    const carrossel = document.querySelector(".carrosel");

    if (!carrossel) return;

    let velocidade = 1;
    let pausa = false;

    carrossel.addEventListener("mouseenter", () => {
        pausa = true;
    });

    carrossel.addEventListener("mouseleave", () => {
        pausa = false;
    });

    function moverCarrossel() {
        if (!pausa) {
            carrossel.scrollLeft += velocidade;


            if (
                carrossel.scrollLeft + carrossel.clientWidth >=
                carrossel.scrollWidth
            ) {
                carrossel.scrollLeft = 0;
            }
        }

        requestAnimationFrame(moverCarrossel);
    }

    moverCarrossel();
});
