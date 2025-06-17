function timer(date) {
  function getTimeRemaining() {
    const total = new Date(date) - new Date();
    const days = total > 0 ? Math.floor(total / (1000 * 60 * 60 * 24)) : 0;
    const hours = total > 0 ? Math.floor((total / (1000 * 60 * 60)) % 24) : 0;
    const minutes = total > 0 ? Math.floor((total / 1000 / 60) % 60) : 0;
    const seconds = total > 0 ? Math.floor((total / 1000) % 60) : 0;
    return { days, hours, minutes, seconds, total };
  }

  function getZero(number) {
    if (number >= 0 && number <= 9) return `0${number}`;
    return number;
  }

  function updateClock() {
    const { days, hours, minutes, seconds, total } = getTimeRemaining();

    document.querySelector("#days").textContent = getZero(days);
    document.querySelector("#hours").textContent = getZero(hours);
    document.querySelector("#minutes").textContent = getZero(minutes);
    document.querySelector("#seconds").textContent = getZero(seconds);

    if (total < 1) {
      clearInterval(timeInterval);
    }
  }
  const timeInterval = setInterval(updateClock, 1000);
  updateClock();
}

export default timer;
