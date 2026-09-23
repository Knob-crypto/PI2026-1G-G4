document.addEventListener("DOMContentLoaded", function () {

    const menuBtn = document.getElementById("menu-btn");
    const menu = document.querySelector("#header nav");

    if (menuBtn && menu) {

        menuBtn.addEventListener("click", function () {

            menu.classList.toggle("aberto");

        });

    }


    const carrossel = document.getElementById("carrossel");
    const anterior = document.getElementById("anterior");
    const proximo = document.getElementById("proximo");

    if (carrossel && anterior && proximo) {

        function tamanhoSlide() {

            const slide = carrossel.querySelector(".card-carrossel");

            if (!slide) {
                return 240;
            }

            return slide.offsetWidth + 18;

        }

        function moverCarrossel(direcao) {
            const limite = carrossel.scrollWidth - carrossel.clientWidth;

            if (direcao > 0 && carrossel.scrollLeft >= limite - 5) {
                carrossel.scrollTo({ left: 0, behavior: "smooth" });
                return;
            }

            if (direcao < 0 && carrossel.scrollLeft <= 5) {
                carrossel.scrollTo({ left: limite, behavior: "smooth" });
                return;
            }

            carrossel.scrollBy({
                left: direcao * tamanhoSlide(),
                behavior: "smooth"
            });
        }

        proximo.addEventListener("click", function () {
            moverCarrossel(1);
        });

        anterior.addEventListener("click", function () {
            moverCarrossel(-1);
        });

        let intervaloAuto = setInterval(function () {
            moverCarrossel(1);
        }, 2200);

        carrossel.addEventListener("mouseenter", function () {
            clearInterval(intervaloAuto);
        });

        carrossel.addEventListener("mouseleave", function () {
            intervaloAuto = setInterval(function () {
                moverCarrossel(1);
            }, 2200);
        });

    }

    const exploradorTempo = document.getElementById("explorador-tempo");

    if (exploradorTempo) {

        const periodos = [
            ["1838 · PRIMEIROS ESTUDOS", "A profundidade nasce em duas imagens", "A estereoscopia usava uma imagem diferente para cada olho e criou a primeira sensação convincente de profundidade em uma imagem fixa.", "visão estereoscópica", "linha_tempo-1.webp"],
            ["1960 · SENSORAMA", "O cinema passa a envolver os sentidos", "O Sensorama combinava imagens, sons, vibração e aromas para simular um passeio de motocicleta e aproximar o espectador da cena.", "simulação multissensorial", "linha_tempo2.jpg"],
            ["1990 · LABORATÓRIOS DE VR", "O usuário começa a controlar o ambiente", "Capacetes, luvas e sensores permitiram que universidades testassem movimentos e interações dentro de espaços digitais tridimensionais.", "rastreamento e interação", "linha_tempo3.jpeg"],
            ["2010 · ACESSO À MÃO", "O smartphone coloca a VR no bolso", "Telas de alta resolução e celulares mais potentes reduziram o custo dos visores e levaram experiências virtuais a um público maior.", "visores móveis", "linha_tempo4.jpg"],
            ["2020 · MUNDO HÍBRIDO", "O digital passa a conviver com o real", "A realidade aumentada e a realidade mista começaram a integrar objetos virtuais a aulas, reuniões, aplicativos e tarefas do cotidiano.", "experiências híbridas", "linha_tempo5.jpg"],
            ["FUTURO · PRÓXIMOS HORIZONTES", "A experiência se adapta a cada pessoa", "Novos sistemas poderão interpretar voz, gestos e contexto para criar ambientes imersivos mais naturais, acessíveis e responsivos.", "IA e presença contextual", "linha_tempo6.jpg"]
        ];

        const painel = exploradorTempo.querySelector(".painel-tempo");
        const botoes = exploradorTempo.querySelectorAll(".marcador-tempo");
        let periodoAtual = 0;

        function mostrarPeriodo(numero) {
            periodoAtual = numero;
            const periodo = periodos[numero];

            painel.classList.remove("trocando");
            setTimeout(function () {
                painel.classList.add("trocando");
            }, 10);

            painel.querySelector("img").src = "../imagens/" + periodo[4];
            painel.querySelector("img").alt = "Imagem sobre " + periodo[1].toLowerCase();
            painel.querySelector(".painel-tempo-periodo").textContent = periodo[0];
            painel.querySelector("h3").textContent = periodo[1];
            painel.querySelector(".painel-tempo-conteudo > p").textContent = periodo[2];
            painel.querySelector(".painel-tempo-detalhe").innerHTML = "<strong>Foco:</strong> " + periodo[3];
            painel.querySelector(".futuro-possibilidades").hidden = numero !== 5;
            painel.querySelector(".painel-tempo-contador").textContent = (numero + 1) + " / 06";
            document.getElementById("progresso-tempo-preenchido").style.width = (numero * 20) + "%";
            document.getElementById("progresso-tempo-texto").textContent = (numero + 1) + " de 6";
            document.getElementById("anterior-tempo").disabled = numero === 0;
            document.getElementById("proximo-tempo").disabled = numero === 5;

            botoes.forEach(function (botao, i) {
                botao.classList.toggle("ativo", i === numero);
                botao.setAttribute("aria-selected", i === numero);
            });
        }

        botoes.forEach(function (botao, numero) {
            botao.addEventListener("click", function () {
                mostrarPeriodo(numero);
            });
        });

        document.getElementById("anterior-tempo").addEventListener("click", function () {
            mostrarPeriodo(periodoAtual - 1);
        });

        document.getElementById("proximo-tempo").addEventListener("click", function () {
            mostrarPeriodo(periodoAtual + 1);
        });

        mostrarPeriodo(0);
    }


    const botaoTopo = document.getElementById("topo");

    if (botaoTopo) {

        window.addEventListener("scroll", function () {

            if (window.scrollY > 500) {

                botaoTopo.classList.add("visivel");

            } else {

                botaoTopo.classList.remove("visivel");

            }

        });

        botaoTopo.addEventListener("click", function () {

            window.scrollTo({
                top: 0,
                behavior: "smooth"
            });

        });

    }

});