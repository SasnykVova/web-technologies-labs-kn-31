let characterPage = 0;

const urlGetFirst20Character = `https://rickandmortyapi.com/api/character`;

let isCharacterLoading = false;

document.getElementById("btnAxios").addEventListener("click", async () => {
  const loader = document.getElementById("loader");
  const container = document.getElementById("characters");

  if (characterPage === 0) {
    characterPage++;
  }

  try {
    loader.style.display = "block";
    container.innerHTML = "";

    const response = await axios.get(urlGetFirst20Character);
    const characters = response.data.results;

    const html = characters
      .map(
        (char) => `
      <div class="character-card" style="border:1px solid #ccc; padding:10px; margin:5px;">
        <h3>${char.name}</h3>
        <img src="${char.image}" alt="${char.name}" class="character-card__img">
        <p>Status: ${char.status}</p>
        <p>Species: ${char.species}</p>
      </div>
    `
      )
      .join("");

    loader.style.display = "none";
    container.innerHTML = html;
    setUpdateBtnIsVisisble();
  } catch (error) {
    loader.style.display = "none";
    console.error("Помилка axios:", error);
  }
});
document
  .getElementById("btnUpdateAxios")
  .addEventListener("click", async () => {
    const loader = document.getElementById("loader");
    const container = document.getElementById("characters");
    characterPage++;

    try {
      loader.style.display = "block";
      container.innerHTML = "";

      const url = `https://rickandmortyapi.com/api/character?page=${characterPage}`;
      const response = await axios.get(url);
      const characters = response.data.results;

      const html = characters
        .map(
          (char) => `
      <div class="character-card" style="border:1px solid #ccc; padding:10px; margin:5px;">
        <h3>${char.name}</h3>
        <img src="${char.image}" alt="${char.name}" class="character-card__img">
        <p>Status: ${char.status}</p>
        <p>Species: ${char.species}</p>
      </div>
    `
        )
        .join("");

      loader.style.display = "none";
      container.innerHTML = html;
    } catch (error) {
      loader.style.display = "none";
      console.error("Помилка axios:", error);
    }
  });

let characterId = "";

document.getElementById("characterId").addEventListener("input", (e) => {
  characterId = e.target.value;
  console.log("Значення:", characterId);
});

document
  .getElementById("btnFetchCharById")
  .addEventListener("click", async () => {
    const loader = document.getElementById("getCharByIdLoader");
    const content = document.getElementById("characterContent");

    if (!characterId) {
      content.innerHTML = `<p class="error">Будь ласка, введіть ID персонажа!</p>`;
      return;
    }

    try {
      loader.style.display = "block";
      content.innerHTML = "";

      const response = await fetch(`${urlGetFirst20Character}/${characterId}`);
      if (!response.ok) throw new Error("Не вдалося отримати дані");

      const character = await response.json();

      const html = `
      <div class="character-details">
        <img src="${character.image}" alt="${character.name}" class="character-details__img">
        <div class="character-details__info">
          <h2 class="character-details__name">${character.name}</h2>
          <p><strong>Status:</strong> ${character.status}</p>
          <p><strong>Species:</strong> ${character.species}</p>
          <p><strong>Gender:</strong> ${character.gender}</p>
          <p><strong>Origin:</strong> ${character.origin.name}</p>
          <p><strong>Location:</strong> ${character.location.name}</p>
          <p><strong>Episodes:</strong> ${character.episode.length}</p>
        </div>
      </div>
    `;

      document.getElementById("characterId").value = "";
      characterId = "";

      loader.style.display = "none";
      content.innerHTML = html;
    } catch (error) {
      loader.style.display = "none";
      content.innerHTML = `<p class="error">Помилка при завантаженні персонажа. Перевірте ID (id повинен бути від 1 до 826).</p>`;
      console.error("Помилка:", error);
    }
  });

function setUpdateBtnIsVisisble() {
  if (!characterPage) return;
  const btnUpdateAxios = document.getElementById("btnUpdateAxios");
  btnUpdateAxios.style.display = "block";
}
