const buttons = document.querySelectorAll(".time_filter p");
const currentPeriod = document.querySelectorAll(".card_details_content_hour");
const pastPeriod = document.querySelectorAll(".card_details_content_timeframe");
const cardTitles = document.querySelectorAll(".card_details_header_title");

let data;
window.onload = async function () {
  data = await fetch("./data.json").then((response) => response.json());
  data.forEach(function (item, index) {
    const {
      title,
      timeframes: {
        daily: { current, previous },
      },
    } = item;
    currentPeriod[index].innerText = `${current}hrs`;
    pastPeriod[index].innerText = `Last Day - ${previous}hrs`;
    cardTitles[index].innerText = title;
  });
};

function updateTime(type) {
  data.forEach(function (item, index) {
    const { timeframes } = item;
    currentPeriod[index].innerText = `${
      timeframes[`${type.toLowerCase()}`].current
    }hrs`;
    pastPeriod[index].innerText = `Last Day - ${
      timeframes[`${type.toLowerCase()}`].previous
    }hrs`;
  });
}

buttons.forEach((button) => {
  button.addEventListener("click", () => {
    buttons.forEach((button) => {
      button.classList.remove("period_selected");
    });
    button.classList.add("period_selected");
    updateTime(button.innerText);
  });
});
