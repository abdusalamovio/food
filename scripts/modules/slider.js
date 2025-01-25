function slider({
  prevArrow,
  container,
  nextArrow,
  currentCounter,
  totalCounter,
  wrapper,
  inner,
  slide,
}) {
  const prev = document.querySelector(prevArrow);
  const slides = document.querySelectorAll(container);
  const next = document.querySelector(nextArrow);
  const current = document.querySelector(currentCounter);
  const total = document.querySelector(totalCounter);
  const sliderWrapper = document.querySelector(wrapper);
  const sliderInner = document.querySelector(inner);
  const width = window.getComputedStyle(sliderWrapper).width;
  const slider = document.querySelector(slide);

  let slideIndex = 1;
  let offset = 0;

  if (slides.length < 10) {
    total.textContent = `0${slides.length}`;
    current.textContent = `0${slideIndex}`;
  } else {
    total.textContent = slides.length;
    current.textContent = slideIndex;
  }

  function updatePosition() {
    sliderInner.style.transform = `translateX(-${offset}px)`;
  }
  function updateCurrent() {
    if (slides.length < 10) {
      current.textContent = `0${slideIndex}`;
    } else {
      current.textContent = slideIndex;
    }
  }
  function updateOpacity() {
    dots.forEach((dot) => {
      dot.style.opacity = ".5";
    });
    dots[slideIndex - 1].style.opacity = 1;
  }
  function deleteNotDigist() {
    return +width.replace(/\D/g, "");
  }

  sliderInner.style.width = 100 * slides.length + "%";

  const indicators = document.createElement("ol");
  indicators.classList.add("carousel");
  indicators.style.cssText = `
    position: absolute;
    right: 0;
    bottom: 0;
    left: 0;
    z-index: 15;
    display: flex;
    justify-content: center;
    margin-right: 15%;
    margin-left: 15%;
    list-style: none;
  `;
  slider.append(indicators);

  const dots = [];
  for (let i = 0; i < slides.length; i++) {
    const dot = document.createElement("li");
    dot.setAttribute("data-slide-to", i + 1);
    dot.style.cssText = `
      box-sizing: content-box;
      flex: 0 1 auto;
      width: 30px;
      height: 6px;
      margin-right: 3px;
      margin-left: 3px;
      cursor: pointer;
      background-color: #fff;
      background-clip: padding-box;
      border-top: 10px solid transparent;
      border-bottom: 10px solid transparent;
      opacity: .5;
      transition: opacity .6s ease;
    `;

    if (i === 0) {
      dot.style.opacity = 1;
    }

    indicators.append(dot);
    dots.push(dot);
  }

  prev.addEventListener("click", () => {
    if (offset === 0) {
      offset = deleteNotDigist() * (slides.length - 1);
    } else {
      offset -= deleteNotDigist();
    }

    updatePosition();

    if (slideIndex === 1) {
      slideIndex = slides.length;
    } else {
      slideIndex--;
    }

    updateCurrent();
    updateOpacity();
  });

  next.addEventListener("click", () => {
    if (offset === deleteNotDigist() * (slides.length - 1)) {
      offset = 0;
    } else {
      offset += deleteNotDigist();
    }

    updatePosition();

    if (slideIndex === slides.length) {
      slideIndex = 1;
    } else {
      slideIndex++;
    }

    updateCurrent();
    updateOpacity();
  });

  dots.forEach((dot) => {
    dot.addEventListener("click", (e) => {
      const slideTo = e.target.getAttribute("data-slide-to");
      slideIndex = slideTo;
      offset = deleteNotDigist() * (slideTo - 1);

      updatePosition();
      updateCurrent();
      updateOpacity();
    });
  });
}

export default slider;
