
document.addEventListener('DOMContentLoaded', function () {
    iniciarCarrossel();
    iniciarRevealAoRolar();
});
function iniciarCarrossel() {
    var raiz = document.getElementById('carrossel');
    var trilho = document.getElementById('carrosselTrilho');
    var dotsContainer = document.getElementById('carrosselDots');
    var status = document.getElementById('carrosselStatus');
    var botaoAnterior = document.querySelector('.carrossel-seta--anterior');
    var botaoProxima = document.querySelector('.carrossel-seta--proxima');

    if (!raiz || !trilho || !dotsContainer) return;

    var slides = Array.prototype.slice.call(trilho.children);
    var dots = Array.prototype.slice.call(dotsContainer.children);
    var total = slides.length;

    if (!total) return;

    var indiceAtual = 0;
    var DURACAO_AUTOPLAY = 5000; // ms
    var temporizador = null;
    var pausado = false;

    raiz.style.setProperty('--duracao-autoplay', (DURACAO_AUTOPLAY / 1000) + 's');

    function irPara(indice, opcoes) {
        opcoes = opcoes || {};
        indiceAtual = (indice + total) % total;

        trilho.style.transform = 'translateX(-' + (indiceAtual * 100) + '%)';

        dots.forEach(function (dot, i) {
            var ativo = i === indiceAtual;
            dot.classList.toggle('ativo', ativo);
            dot.setAttribute('aria-selected', ativo ? 'true' : 'false');

            // reinicia a animação da barra de progresso do dot ativo
            dot.classList.remove('progredindo');
            if (ativo) {
                void dot.offsetWidth; // força reflow para reiniciar a animação
                if (!opcoes.semAutoplay) {
                    dot.classList.add('progredindo');
                }
            }
        });

        if (status) {
            status.textContent = 'Imagem ' + (indiceAtual + 1) + ' de ' + total;
        }
    }

    function proxima() {
        irPara(indiceAtual + 1);
    }

    function anterior() {
        irPara(indiceAtual - 1);
    }

    function reiniciarAutoplay() {
        pararAutoplay();
        if (!pausado) {
            temporizador = setInterval(proxima, DURACAO_AUTOPLAY);
        }
    }

    function pararAutoplay() {
        if (temporizador) {
            clearInterval(temporizador);
            temporizador = null;
        }
    }

    function pausarAutoplay() {
        pausado = true;
        pararAutoplay();
        dots.forEach(function (dot) { dot.classList.remove('progredindo'); });
    }

    function retomarAutoplay() {
        pausado = false;
        irPara(indiceAtual);
        reiniciarAutoplay();
    }
    if (botaoProxima) {
        botaoProxima.addEventListener('click', function () {
            proxima();
            reiniciarAutoplay();
        });
    }

    if (botaoAnterior) {
        botaoAnterior.addEventListener('click', function () {
            anterior();
            reiniciarAutoplay();
        });
    }
    dots.forEach(function (dot, indice) {
        dot.addEventListener('click', function () {
            irPara(indice);
            reiniciarAutoplay();
        });
    });

    // Pausa em hover / foco (acessibilidade + UX)
    raiz.addEventListener('mouseenter', pausarAutoplay);
    raiz.addEventListener('mouseleave', retomarAutoplay);
    raiz.addEventListener('focusin', pausarAutoplay);
    raiz.addEventListener('focusout', retomarAutoplay);
    raiz.addEventListener('keydown', function (evento) {
        if (evento.key === 'ArrowRight') {
            evento.preventDefault();
            proxima();
            reiniciarAutoplay();
        } else if (evento.key === 'ArrowLeft') {
            evento.preventDefault();
            anterior();
            reiniciarAutoplay();
        }
    });
    var arrastando = false;
    var posicaoInicialX = 0;
    var deslocamentoAtual = 0;
    var LIMIAR_SWIPE = 45; // px mínimos para trocar de slide

    function obterPosicaoX(evento) {
        return evento.touches ? evento.touches[0].clientX : evento.clientX;
    }

    function iniciarArraste(evento) {
        arrastando = true;
        posicaoInicialX = obterPosicaoX(evento);
        trilho.style.transition = 'none';
        pausarAutoplay();
    }

    function moverArraste(evento) {
        if (!arrastando) return;
        var deltaX = obterPosicaoX(evento) - posicaoInicialX;
        deslocamentoAtual = deltaX;
        var deslocamentoPercentual = (deltaX / raiz.clientWidth) * 100;
        trilho.style.transform = 'translateX(calc(-' + (indiceAtual * 100) + '% + ' + deslocamentoPercentual + '%))';
    }

    function finalizarArraste() {
        if (!arrastando) return;
        arrastando = false;
        trilho.style.transition = '';

        if (deslocamentoAtual > LIMIAR_SWIPE) {
            anterior();
        } else if (deslocamentoAtual < -LIMIAR_SWIPE) {
            proxima();
        } else {
            irPara(indiceAtual);
        }

        deslocamentoAtual = 0;
        retomarAutoplay();
    }

    trilho.addEventListener('touchstart', iniciarArraste, { passive: true });
    trilho.addEventListener('touchmove', moverArraste, { passive: true });
    trilho.addEventListener('touchend', finalizarArraste);

    trilho.addEventListener('mousedown', function (evento) {
        evento.preventDefault();
        iniciarArraste(evento);
    });
    window.addEventListener('mousemove', moverArraste);
    window.addEventListener('mouseup', finalizarArraste);

    // Recalcula a posição corretamente ao redimensionar a janela
    window.addEventListener('resize', function () {
        trilho.style.transition = 'none';
        irPara(indiceAtual, { semAutoplay: true });
        requestAnimationFrame(function () {
            trilho.style.transition = '';
        });
    });

    // Estado inicial
    irPara(0, { semAutoplay: true });
    reiniciarAutoplay();
    if (dots[0]) {
        void dots[0].offsetWidth;
        dots[0].classList.add('progredindo');
    }
}
function iniciarRevealAoRolar() {
    var elementos = document.querySelectorAll('.reveal');
    if (!elementos.length) return;

    if (!('IntersectionObserver' in window)) {
        elementos.forEach(function (el) { el.classList.add('em-vista'); });
        return;
    }

    var observador = new IntersectionObserver(function (entradas) {
        entradas.forEach(function (entrada) {
            if (entrada.isIntersecting) {
                entrada.target.classList.add('em-vista');
                observador.unobserve(entrada.target);
            }
        });
    }, { threshold: 0.15, rootMargin: '0px 0px -40px 0px' });

    elementos.forEach(function (el) { observador.observe(el); });
}