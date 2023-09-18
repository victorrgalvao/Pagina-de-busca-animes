















// const htmlString = anime
// .map((anime)=>{
// return `
// <li class="anime">
// <h2>${anime.data[i].title}</h2>
// <img src ="${anime.data[i].images.jpg.image_url}"
// </li>
// `;
// })
// .join('');
// nome.innerHTMl = htmlString;




// NOTE Catalogo Animes 


function getAnimes() {
   const nome = document.getElementById('inNome').value;

   return fetch(`https://api.jikan.moe/v4/anime?q=${nome}&sfw`)
      .then((data) => data.json())
      .catch((err) => console.log(err))




}


async function showAnimes(animeName) {
   const resultadosAnimes = document.getElementById('animes');
   const anime = await getAnimes(animeName)
   console.log(anime);
   resultadosAnimes.innerHTML = anime.data
      .map(anime => {
         return `
           <div class="anime-card">
         
               <img class="anime-img" src="${anime.images.jpg.image_url}">
               
              <div class="anime-card2">
          <p>${anime.title}</p>
          <input type="number" id="classificacao-${anime.mal_id}" placeholder="Classificação (1-5)">
          <button id="btFav-${anime.mal_id}" class="btFav" onclick="favoritarFilme('${anime.mal_id}', '${anime.title}','${anime.images.jpg.image_url}')">Favoritar</button>

         
.
                  </div>
                  </div>
                    `


      }).join("");














};
{/* <a href="${anime.url}" target="_blank" class="pop"> */ }
btn.addEventListener('click', showAnimes)




class filmeFav {
   constructor() {
      this.listaFilme = JSON.parse(localStorage.getItem('favoritos')) || [];
   }

   favoritarFilme(idFilme, nomeFilme, imageUrl, classificacao) {
      const filme = {
         id: idFilme,
         nomeFilme: nomeFilme,
         image: imageUrl,
         classificacao: classificacao // Adicione a classificação ao objeto do filme
      }
      this.listaFilme.push(filme);
      this.atualizarLocalStorage();
   }

   findIndexById(idFilme) {
      return this.listaFilme.findIndex(filme => filme.id == idFilme);

   }

   deleteByIndex(index) {
      this.listaFilme.splice(index, 1);
      this.atualizarLocalStorage();
   }

   atualizarLocalStorage() {
      // Salve a lista de favoritos no localStorage como uma string JSON
      localStorage.setItem('favoritos', JSON.stringify(this.listaFilme));
   }

   mostrarLista() {
      console.log(this.listaFilme);
   }

   removerDosFavs(id) {
    const index =  favoritarFilmeFav.findIndexById(id); // Remova do seu objeto de favoritos
    this.deleteByIndex(index);
      atualizarListaFavoritos(); // Atualize a lista exibida de favoritos
   
   }
}

const favoritarFilmeFav = new filmeFav();
const btMostrar = document.getElementById('btn1');

function favoritarFilme(idFilme, nomeFilme, imageUrl) {
   const btnFav = document.getElementById(`btFav-${idFilme}`);
   const index = favoritarFilmeFav.findIndexById(idFilme);
   const classificacaoInput = document.getElementById(`classificacao-${idFilme}`);
   const classificacao = classificacaoInput.value;

   if (classificacao && !isNaN(classificacao) && classificacao >= 1 && classificacao <= 5) {
      if (index === -1) {
         // Se o filme não está na lista, adicione-o com a classificação
         favoritarFilmeFav.favoritarFilme(idFilme, nomeFilme, imageUrl, classificacao);
         console.log(`Filme '${nomeFilme}' favoritado com classificação de ${classificacao} estrelas.`);
         btnFav.textContent = 'remover';
         btnFav.style.backgroundColor = "rgb(245, 128, 128)";
      } else {
         // Se o filme está na lista, remova-o e depois adicione-o com a nova classificação
         favoritarFilmeFav.deleteByIndex(index);
         favoritarFilmeFav.favoritarFilme(idFilme, nomeFilme, imageUrl, classificacao);
         console.log(`Filme '${nomeFilme}' removido dos favoritos e adicionado novamente com classificação de ${classificacao} estrelas.`);
         btnFav.textContent = 'remover';
         btnFav.style.backgroundColor = "rgb(245, 128, 128)";
      }
      console.log(favoritarFilmeFav.listaFilme);
   } else {
      alert("A classificação deve ser um número entre 1 e 5.");
   }
   // Limpar o campo de classificação após favoritar
   classificacaoInput.value = '';
}
// function deletarFilme(idFilme) {
//    console.log("array antes de deletar");
//    console.log(favoritarFilmeFav.listaFilme)
//    const index = favoritarFilmeFav.findIndexById(idFilme)

//    favoritarFilmeFav.deleteByIndex(index)

//    console.log("array depois de deletar");
//    console.log(favoritarFilmeFav.listaFilme);





// }
function deletarFav(id){
favoritarFilmeFav.removerDosFavs(id);
}

function atualizarListaFavoritos() {
   const resultadosFavoritos = document.getElementById('animes');
   const lista = favoritarFilmeFav.listaFilme;
   resultadosFavoritos.innerHTML = lista
      .map(filme => {
         return `
        <div class="anime-card">
            <img class="anime-img" src="${filme.image}">
            <div class="anime-card2">
                <p>${filme.nomeFilme}</p>
                <p>Classificação: ${filme.classificacao} estrelas</p> <!-- Exibe a classificação -->
             
                <button id="btFav-${filme.id}" class="btFav" onclick="deletarFav('${filme.id}')">Remover</button>
            </div>
        </div>
      `;
      }).join("");
}

// ... Seu código existente ...

// Adicione um ouvinte de eventos ao seu botão "Mostrar Favoritos"
btMostrar.addEventListener("click", function () {
   atualizarListaFavoritos();
})