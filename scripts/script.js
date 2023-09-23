const unixEpochTimestamp = new Date("1970-01-01T00:00:00Z").getTime();
console.log(unixEpochTimestamp); // Output: 0

document.addEventListener("DOMContentLoaded", function () {
  const formElement = document.querySelector(".time-ago__form");
  const inputElement = document.querySelector(".time-ago__form__input");
  const resultElement = document.querySelector(".time-ago__result");
  const menuBtn = document.querySelector(".time-ago__header__menu-btn");
  const nav = document.querySelector(".time-ago__header__nav");

  function calculateTimeAgo(date) {
    const units = [
      ["century", 1000 * 60 * 60 * 24 * 365 * 100],
      ["decade", 1000 * 60 * 60 * 24 * 365 * 10],
      ["year", 1000 * 60 * 60 * 24 * 365],
      ["month", 1000 * 60 * 60 * 24 * 30],
      ["week", 1000 * 60 * 60 * 24 * 7],
      ["day", 1000 * 60 * 60 * 24],
      ["hour", 1000 * 60 * 60],
      ["minute", 1000 * 60],
      ["second", 1000],
    ];

    let diff = Date.now() - date.getTime();
    if (diff < 0) return "The date is in the future";

    for (let [unit, amountInMs] of units) {
      if (diff >= amountInMs) {
        const time = Math.floor(diff / amountInMs);
        return time === 1 ? `1 ${unit} ago` : `${time} ${unit}s ago`;
      }
    }

    return "Just now";
  }

  formElement.addEventListener("submit", function (e) {
    e.preventDefault();

    const inputValue = inputElement.value;
    if (inputValue.trim() === "") {
      resultElement.textContent = "Please enter a date or timestamp";
      return;
    }

    let date = new Date(inputValue);
    if (isNaN(date.getTime())) {
      const timestamp = parseInt(inputValue);
      if (!isNaN(timestamp) && inputValue.trim().length >= 13) {
        date = new Date(timestamp);
      }
    }
    

    resultElement.textContent = isNaN(date.getTime())
      ? "Invalid date or timestamp"
      : calculateTimeAgo(date);
  });

  // Close the dropdown when clicking outside
  document.addEventListener("click", function (event) {
    if (!event.target.classList.contains("time-ago__header__menu-btn")) {
      nav.style.display = "none";
    }
  });

  menuBtn.addEventListener("click", function (e) {
    e.stopPropagation(); // Prevent the click event from bubbling up
    nav.style.display = nav.style.display === "block" ? "none" : "block";
  });
});
