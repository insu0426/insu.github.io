const moviesContainer = document.getElementById("movies-container");
const searchInput = document.getElementById("search-input");
const searchButton = document.getElementById("search-button");
const homeButton = document.getElementById("home-button");


const fetchMovies = async () => {
    const apiKey = 'ab476e7a8ed692cfd8375bac2162c4ed'; // 여기에 TMDb API 키를 추가하세요
    const apiUrl = `https://api.themoviedb.org/3/movie/top_rated?language=ko-kr&page=1&api_key=${apiKey}`;

    try {
        const response = await fetch(apiUrl);
        const data = await response.json();

        renderMovies(data.results);
    } catch (error) {
        console.error('Error fetching data:', error);
    }
};

const renderMovies = (movies) => {
    moviesContainer.innerHTML = '';

    movies.forEach((movie) => {
        const movieCard = createMovieCard(movie);
        moviesContainer.appendChild(movieCard);
    });
};

const createMovieCard = (movie) => {
    const { title, overview, poster_path, vote_average } = movie;

    const card = document.createElement("div");
    card.className = "movie-card";

    const image = document.createElement("img");
    image.className = "poster-image";
    image.src = `https://image.tmdb.org/t/p/w500${poster_path}`;

    const titleElement = document.createElement("h2");
    titleElement.className = "title";
    titleElement.textContent = title;

    const overviewElement = document.createElement("p");
    overviewElement.className = "overview";
    overviewElement.textContent = overview;

    const voteAverageElement = document.createElement("p");
    voteAverageElement.className = "vote-average";
    voteAverageElement.textContent = `평점: ${vote_average}`;

    card.appendChild(image);
    card.appendChild(titleElement);
    card.appendChild(overviewElement);
    card.appendChild(voteAverageElement);

    return card;
};

//검색버튼
searchButton.addEventListener("click", async () => {
  const searchTerm = searchInput.value.trim(); // 검색어 앞뒤 공백 제거

  if (searchTerm) {
      const apiKey = 'ab476e7a8ed692cfd8375bac2162c4ed'; // TMDb API 키
      const searchApiUrl = `https://api.themoviedb.org/3/search/movie?language=ko-kr&page=1&api_key=${apiKey}&query=${searchTerm}`;

      try {
          const response = await fetch(searchApiUrl);
          const data = await response.json();

          if (data.results.length > 0) {
              renderMovies(data.results);
          } else {
              moviesContainer.innerHTML = `<p>"${searchTerm}"에 대한 검색 결과가 없습니다.</p>`;
          }
      } catch (error) {
          console.error('데이터를 가져오는 중 에러 발생:', error);
      }
  } else {
      alert("검색어를 입력하세요."); // 검색어가 없을 때 경고창 표시
  }
});

//홈버튼
homeButton.addEventListener("click", () => {
  window.location.href = "index.html";
});

fetchMovies();
