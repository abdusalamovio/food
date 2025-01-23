function timer() {
  function timeRemaining() {
    const total = new Date("2025-05-20") - new Date();
    const days = total > 0 ? Math.floor(total / (1000 * 60 * 60 * 24)) : 0;
    const hours = total > 0 ? Math.floor((total / (1000 * 60 * 60)) % 24) : 0;
    const minutes = total > 0 ? Math.floor((total / 1000 / 60) % 60) : 0;
    const seconds = total > 0 ? Math.floor((total / 1000) % 60) : 0;
    return { days, hours, minutes, seconds, total };
  }

  function addZeroPrefix(number) {
    if (number >= 0 && number <= 9) return `0${number}`;
    return number;
  }

  function setClock() {
    const { days, hours, minutes, seconds, total } = timeRemaining();

    document.querySelector("#days").textContent = addZeroPrefix(days);
    document.querySelector("#hours").textContent = addZeroPrefix(hours);
    document.querySelector("#minutes").textContent = addZeroPrefix(minutes);
    document.querySelector("#seconds").textContent = addZeroPrefix(seconds);

    if (total < 1) {
      clearInterval(timeInterval);
    }
  }
  const timeInterval = setInterval(setClock, 1000);
  setClock();
}

export default timer;
