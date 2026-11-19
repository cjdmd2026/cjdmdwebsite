const pageCount = 80;

export const magazinePages = Array.from({ length: pageCount }, (_, index) => ({
  src: "images/jikji-pages/page-" + String(index + 1).padStart(3, "0") + ".jpg",
  alt: "직지 페이지 " + (index + 1),
}));
