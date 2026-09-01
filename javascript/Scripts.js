document.addEventListener("DOMContentLoaded", () => {
    const carrossel = document.querySelector(".carrossel");
    if (!carrossel) return;

    
    const prefereMenosMovimento = window.matchMedia(
        "(prefers-reduced-motion: reduce)"
    ).matches;
    if (prefereMenosMovimento) return;

    
    const itensOriginais = Array.from(carrossel.children);
    itensOriginais.forEach((item) => {
        const clone = item.cloneNode(true);
        clone.setAttribute("aria-hidden", "true"); // leitor de tela ignora a cópia
        clone.removeAttribute("id");
        clone.querySelectorAll("[id]").forEach((el) => el.removeAttribute("id"));
        clone.querySelectorAll("a, button").forEach((el) => el.setAttribute("tabindex", "-1"));
        carrossel.appendChild(clone);
    });

    const VELOCIDADE_PX_POR_SEGUNDO = 60; // agora é uma velocidade real, não "px por quadro"
    let pausado = false;
    let tocando = false;
    let dentroDaTela = true;
    let ultimoTempo = null;

    
    carrossel.addEventListener("mouseenter", () => (pausado = true));
    carrossel.addEventListener("mouseleave", () => (pausado = false));
    carrossel.addEventListener("focusin", () => (pausado = true));
    carrossel.addEventListener("focusout", () => (pausado = false));
    carrossel.addEventListener("touchstart", () => { tocando = true; }, { passive: true });
    carrossel.addEventListener("touchend", () => { tocando = false; }, { passive: true });

    
    document.addEventListener("visibilitychange", () => {
        ultimoTempo = null;
    });

    
    const observador = new IntersectionObserver(
        ([entrada]) => { dentroDaTela = entrada.isIntersecting; },
        { threshold: 0 }
    );
    observador.observe(carrossel);

    function mover(tempoAtual) {
        requestAnimationFrame(mover);

        const distanciaDeUmCiclo = carrossel.scrollWidth / 2; // metade = conteúdo original
        const podeAnimar =
            !pausado &&
            !tocando &&
            dentroDaTela &&
            !document.hidden &&
            distanciaDeUmCiclo > carrossel.clientWidth;

        if (!podeAnimar) {
            ultimoTempo = null;
            return;
        }

        if (ultimoTempo === null) ultimoTempo = tempoAtual;

        const deltaSegundos = (tempoAtual - ultimoTempo) / 1000;
        ultimoTempo = tempoAtual;

        carrossel.scrollLeft += VELOCIDADE_PX_POR_SEGUNDO * deltaSegundos;

       
        if (carrossel.scrollLeft >= distanciaDeUmCiclo) {
            carrossel.scrollLeft -= distanciaDeUmCiclo;
        }
    }

    requestAnimationFrame(mover);
});