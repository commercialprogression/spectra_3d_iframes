const cards = document.querySelectorAll(".card");
const pdfPrevButtons = document.querySelectorAll(".pdf-previous");
const pdfNextButtons = document.querySelectorAll(".pdf-next");

let pdfObject = false;
let currentPage = 1;

// Helper function to render a PDF page.
const renderPage = (element, pdfLocation, pageToRender) => {
  const prevButton = element.querySelector(".pdf-previous");
  const nextButton = element.querySelector(".pdf-next");

  PDFJS.getDocument(pdfLocation).then((pdfFile) => {
    pdfObject = pdfFile;

    // Disable previous button if we are on page 1.
    pageToRender === 1 ? prevButton.disabled = true : prevButton.disabled = false;

    // Disable next button if we are on the last page.
    pageToRender >= pdfFile.numPages ? nextButton.disabled = true : nextButton.disabled = false;

    pdfFile.getPage(pageToRender).then((page) => {
      const scale = 1;
      const viewport = page.getViewport(scale);
      const canvas = element.querySelector("canvas");
      const context = canvas.getContext("2d");

      canvas.height = viewport.height;
      canvas.width = viewport.width;

      // Prepare render object.
      const renderContext = {
        canvasContext: context,
        viewport: viewport
      };

      // Render PDF.
      page.render(renderContext);
    }).then(() => {
      const loading = element.querySelector(".rotate");

      // Class manipulation.
      loading.classList.remove("db");
      loading.classList.add("dn");
    }).then(() => {
      const container = element.querySelector(".pdf-container");

      container.classList.remove("o-0");
    });
  });
}

// Click handler for next buttons.
pdfNextButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const cardElement = button.closest(".card-wrapper");
    const pdfEmbed = cardElement.querySelector(".pdf-embed");

    currentPage += 1;

    renderPage(cardElement, pdfEmbed.dataset.pdf, currentPage);
  });
});

// Click handler for previous buttons.
pdfPrevButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const cardElement = button.closest(".card-wrapper");
    const pdfEmbed = cardElement.querySelector(".pdf-embed");

    currentPage -= 1;

    renderPage(cardElement, pdfEmbed.dataset.pdf, currentPage);
  });
});

// Loop through cards.
cards.forEach((card) => {
  card.addEventListener("click", () => {
    const fullCard = card.parentElement.querySelector(".card-full");
    const close = card.parentElement.querySelector(".card-close");
    const pdf = card.parentElement.querySelector(".pdf-embed");

    const fadeIn = new Promise((resolve, reject) => {
      resolve();
    });

    fadeIn.then(() => {
      fullCard.classList.add("z-2");
      fullCard.classList.remove("dn");
    })
    .then(() => {
      setTimeout(() => {
        fullCard.classList.remove("o-0");
      }, 50);
    });

    // Handle PDF rendering.
    pdf ? renderPage(card.parentElement, pdf.dataset.pdf, currentPage) : '';

    // Add click handler to the close button.
    close.addEventListener("click", () => {
      const cardToClose = close.parentElement.parentElement;
      const videos = document.querySelectorAll(".youtube");

      // Destroy the pdf object if it exists.
      if (pdfObject) {
        pdfObject.destroy();
      }

      // Stop video playback if one exists.
      videos.forEach((video) => {
        video.contentWindow.postMessage('{"event":"command","func":"' + "pauseVideo" + '","args":""}', "*");
      });

      // Create promise to ensure fade happen before z-index change.
      const fadeOut = new Promise((resolve, reject) => {
        resolve();
      });

      fadeOut.then(() => cardToClose.classList.add("o-0"))
      .then(() => {
        setTimeout(() => {
          cardToClose.classList.remove("z-2");
          cardToClose.classList.add("dn");
        }, 500);
      });
    });
  });
});

