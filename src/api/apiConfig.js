const apiConfig = {
  baseurl: "https://api.themoviedb.org/3",
  apiKey: "8bd380772ea13e81a545da453952d596",
  originalImage: (imgPath) => `https://image.tmdb.org/t/p/original${imgPath}`,
  w500Image: (imgPath) => `https://image.tmdb.org/t/p/w500/${imgPath}`,
  youtube: (vidlink) =>`https://www.youtube.com/embed/${vidlink}`
};

export default apiConfig;
