const input = document.getElementById("busca");
const divLista = document.getElementById("listaseries");

input.addEventListener("keydown", (event) => {
    if (event.key === "Enter") {
        const textoDigitado = input.value;
        buscarSeriesNaApi(textoDigitado);
    }
});

async function buscarSeriesNaApi(texto) {
    const resposta = await fetch("https://api.tvmaze.com/search/shows?q=" + texto);
    const seriesEncontradas = await resposta.json();
    mostrarNaTela(seriesEncontradas);
}

function mostrarNaTela(lista) {
    divLista.innerHTML = "";

    if (lista.length === 0) {
        divLista.textContent = "Nenhuma série encontrada";
        return;
    }

    lista.forEach(item => {
        const serie = document.createElement("div");
        serie.className = "card p-2 border-danger bg-black text-white d-flex flex-column align-items-center";
        serie.style.width = "12rem";

        const imagemSerie = document.createElement("img");
        imagemSerie.src = item.show.image ? item.show.image.medium : "https://via.placeholder.com/210x295?text=Sem+Imagem";
        imagemSerie.className = "img-fluid mb-2 rounded border border-secondary";
        imagemSerie.style.width = "100%";
        imagemSerie.style.height = "250px";
        imagemSerie.style.objectFit = "cover";

        const nomeSerie = document.createElement("h5");
        nomeSerie.className = "text-center w-100 mb-1";
        nomeSerie.textContent = `${item.show.name}`;

        const generoSerie = document.createElement("p");
        generoSerie.className = "small text-secondary text-center mb-1";
        generoSerie.textContent = `${item.show.genres.join(", ")}`;

        const scoreSerie = document.createElement("p");
        scoreSerie.className = "mt-auto text-danger fw-bold mb-0";
        scoreSerie.textContent = item.show.rating.average ? `Nota: ${item.show.rating.average}` : `Nota: Indisponível`;

        serie.appendChild(imagemSerie);
        serie.appendChild(nomeSerie);
        serie.appendChild(generoSerie);
        serie.appendChild(scoreSerie);
        divLista.appendChild(serie);
    });
}
