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

        proximo.addEventListener("click", function () {

            carrossel.scrollBy({
                left: tamanhoSlide(),
                behavior: "smooth"
            });

        });

        anterior.addEventListener("click", function () {

            carrossel.scrollBy({
                left: -tamanhoSlide(),
                behavior: "smooth"
            });

        });

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