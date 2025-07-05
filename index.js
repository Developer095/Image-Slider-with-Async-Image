document.addEventListener("DOMContentLoaded", async () => {
  const img = document.getElementById("imgs");
  const prev = document.getElementById("prev");
  const next = document.getElementById("next");

  try {
    const api = await fetch("https://api.artic.edu/api/v1/artworks");
    if (!api.ok) {
      const err = await api.json();
      throw new Error(err);
    }

    const data = await api.json();

    const images = data.data
      .filter((item) => item.image_id)
      .map(
        (item) =>
          `https://www.artic.edu/iiif/2/${item.image_id}/full/843,/0/default.jpg`
      );

    let index = 0;
    img.src = images[index];


    next.addEventListener("click", () => {
      index = (index + 1) % images.length;
      img.src = images[index];
    });

    prev.addEventListener("click", () => {
      index = (index - 1 + images.length) % images.length;
      img.src = images[index];
    });
  } catch (error) {
    console.error("Failed to fetch images:", error);
  }
});

//   const images = ["/510.jpg", "/cool.jpg", "/king.jpg"];
//   let index = 0;
//   img.src = images[index];
//   next.addEventListener("click", () => {
//     index = (index + 1) % images.length;
//     img.src = images[index];
//   });
//   prev.addEventListener("click", () => {
//     index = (index - 1 + images.length) % images.length;
//     img.src = images[index];
//   });
