const BUTTONS = document.querySelectorAll("[data-carousel-button]")

BUTTONS.forEach(button => {
  button.addEventListener("click", () => {
    const OFFSET = button.dataset.carouselButton === "next" ? 1 : -1
    const SLIDES = button
      .closest("[data-carousel]")
      .querySelector("[data-slides]")

    const ACTIVESLIDE = SLIDES.querySelector("[data-active]")
    let newIndex = [...SLIDES.children].indexOf(ACTIVESLIDE) + OFFSET
    if (newIndex < 0) newIndex = SLIDES.children.length - 1
    if (newIndex >= SLIDES.children.length) newIndex = 0

    SLIDES.children[newIndex].dataset.active = true
    delete ACTIVESLIDE.dataset.active
  })
})