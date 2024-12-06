// =============== Variables ===============
let billAmount = document.getElementById("splitter-input");
const numberOfPeople = document.getElementById("person-input");
const customInputPercentage = document.getElementById("customized-percent");
const billTipAmount = document.getElementById("tip-amount");
const billTotalAmount = document.getElementById("total-amount");
const resetBtn = document.getElementById("reset");
const buttons = document.querySelectorAll(".splitter__button");
const errorText = document.getElementById("error-text");

// =============== Functions ===============

function handleClick() {
  billTipAmount.textContent = "$0.00";
  billTotalAmount.textContent = "$0.00";
  billAmount.value = "";
  numberOfPeople.value = "";
}

function handleInputChange(e) {
  calculateCustomTip();
}

function calculateCustomTip() {
  if (customInputPercentage.value.endsWith("%")) {
    let customValue = customInputPercentage.value.substring(
      0,
      customInputPercentage.value.length - 1
    );

    const tip = (customValue * billAmount.value) / 100 / numberOfPeople.value;

    billTipAmount.textContent =
      "$" +
      ((customValue * billAmount.value) / 100 / numberOfPeople.value).toFixed(
        2
      );

    billTotalAmount.textContent =
      "$" + (billAmount.value / numberOfPeople.value + tip).toFixed(2);
  } else {
    const tip =
      (customInputPercentage.value * billAmount.value) /
      100 /
      numberOfPeople.value;

    billTipAmount.textContent = "$" + tip.toFixed(2);

    billTotalAmount.textContent =
      "$" + (billAmount.value / numberOfPeople.value + tip).toFixed(2);
  }
}

function handleButtonChange(e) {
  let tipAmount = Number(
    e.target.innerText.substring(0, e.target.innerText.length - 1)
  );
  const tip = (tipAmount * billAmount.value) / 100 / numberOfPeople.value;

  if (numberOfPeople.value == "0") {
    errorText.innerText = "Can't be zero";
    billTipAmount.textContent = "$0.00";
  } else if (numberOfPeople.value <= "0") {
    errorText.innerText = "Can't be negative";
    billTipAmount.textContent = "$0.00";
  } else {
    errorText.innerText = "";
    billTipAmount.textContent =
      "$" +
      ((tipAmount * billAmount.value) / 100 / numberOfPeople.value).toFixed(2);

    billTotalAmount.textContent =
      "$" + (billAmount.value / numberOfPeople.value + tip).toFixed(2);
  }
}

// =============== Event Listener ===============

buttons.forEach((button) => {
  button.addEventListener("click", handleButtonChange);
});

customInputPercentage.addEventListener("keyup", handleInputChange);

resetBtn.addEventListener("click", handleClick);
