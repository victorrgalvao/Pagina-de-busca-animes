















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
           <a href="${anime.url}" target="_blank" class="pop">
               <img class="anime-img" src="${anime.images.jpg.image_url}">
               
              <div class="anime-card2">
          <p>${anime.title}</p>
        
                  </div>
                  </div>
                    `  


      }).join("");














};

btn.addEventListener('click', showAnimes)






