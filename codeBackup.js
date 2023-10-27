//Initalise Elements
let inputSalaryElement = document.getElementById("inputSalaryHTML");
let nationalInsuranceElement = document.getElementById("nationalInsuranceHTML");
let incomeTaxElement = document.getElementById("incomeTaxHTML");
let inputPension = document.getElementById("inputPensionHTML");
let takeHomePay = document.getElementById("takeHomePayHTML");
var accordions = document.querySelectorAll("button.accordion");

//Intialise values
let nationalInsurance = 0;
let incomeTax = 0;
let costOfLiving = 0;

//Clear what has been put
document.getElementById("clearButtonHTML").addEventListener("click", clear);
function clear() {
  inputSalaryElement.value = "";
  takeHomePay.textContent = "_________";
  nationalInsuranceElement.textContent = "National Insurance:";
  incomeTaxElement.textContent = "Income Tax:";
}

// Pension Contribution
//if //pension is not empty
const toggleCheckbox = document.querySelector(".toggle-checkbox");
toggleCheckbox.addEventListener("change", function () {
  if (toggleCheckbox.checked) {
    console.log("On");
  } else {
    console.log("Off");
  }
});

//else if pennsion is empty
//let inputSalary = parseFloat(inputSalaryElement.value);

//Calculates the output of given salary
function calculate() {
  let inputSalary = parseFloat(inputSalaryElement.value);
  if (!isNaN(inputSalary)) {
    // National insurance
    nationalInsuranceCalculate(inputSalary);
    inputSalary -= nationalInsurance;
    // Income Tax
    incomeTaxCalculate(inputSalary);
    inputSalary -= incomeTax;
    //Conversion
    monthSalary = inputSalary;
    weekSalary = inputSalary;
    annualSalary = inputSalary;
    // Final Display
    const formattedSalary = inputSalary.toLocaleString("en-UK", {
      style: "currency",
      currency: "GBP",
      minimumFractionDigits: 0,
    });
    takeHomePay.textContent = formattedSalary;

    //Error Handling for invalid input
  } else {
    takeHomePay.textContent = "Invalid Input";
    setTimeout(function () {
      takeHomePay.textContent = "_________";
    }, 1300);
  }
}

//Calculetes National Insurance Number
function nationalInsuranceCalculate(inputSalary) {
  //0% National Insurance below 9880
  if (inputSalary <= 9880) {
    nationalInsurance = 0;
    nationalInsuranceElement.textContent = "National Insurance: Not Applicable";
    //12% between 9880 and 50270
  } else if (inputSalary <= 50270) {
    nationalInsurance = inputSalary - 9880;
    nationalInsurance = nationalInsurance * 0.12;
    nationalInsurance = nationalInsurance.toFixed(0);
    nationalInsuranceElement.textContent =
      "National Insurance: £" + nationalInsurance + " Annually";
    //2% over 50270
  } else {
    nationalInsurance = 50270 - 9880;
    nationalInsurance = nationalInsurance * 0.12 + (inputSalary - 50270) * 0.02;
    nationalInsurance = nationalInsurance.toFixed(0);
    nationalInsuranceElement.textContent =
      "National Insurance: £" + nationalInsurance + " Annually";
  }
}

//Calculates Income Tax
function incomeTaxCalculate(inputSalary) {
  //0% below 12570
  if (inputSalary <= 12570) {
    incomeTax = 0;
    incomeTaxElement.textContent = "Income Tax: Not Applicable";
    //20% between 12571 and 50270
  } else if (inputSalary <= 50270) {
    incomeTax = inputSalary - 12570;
    incomeTax = incomeTax * 0.2;
    incomeTax = incomeTax.toFixed(0);
    incomeTaxElement.textContent = "Income Tax: £" + incomeTax + " Annually";
    //40% between 50271 and 125140
  } else if (inputSalary <= 125140) {
    incomeTax = 50270 - 12570;
    incomeTax = incomeTax * 0.4 + (inputSalary - 50270) * 0.2;
    incomeTax = incomeTax.toFixed(0);
    incomeTaxElement.textContent = "Income Tax: £" + incomeTax + " Annually";
    // 45% over 125140
  } else {
    incomeTax =
      (50270 - 12570) * 0.2 +
      (125140 - 50270) * 0.4 +
      (inputSalary - 125140) * 0.45;
    incomeTax = incomeTax.toFixed(0);
    incomeTaxElement.textContent = "Income Tax: £" + incomeTax + " Annually";
  }
}

//Calculates Student Plan 1

//Converts all values into weeks
function convertWeek() {
  //Convert Take Home Pay
  weekSalaryValue = weekSalary / 52;
  weekSalaryValue = Math.floor(weekSalaryValue);
  const formattedSalary = weekSalaryValue.toLocaleString("en-UK", {
    style: "currency",
    currency: "GBP",
    minimumFractionDigits: 0,
  });
  takeHomePay.textContent = formattedSalary;
  //Convert National Insurance Number
  nationalInsuranceValue = nationalInsurance / 52;
  nationalInsuranceValue = nationalInsuranceValue.toFixed(0);
  nationalInsuranceElement.textContent =
    "National Insurance: £" + nationalInsuranceValue + " Weekly";
  //Convert Income Tax
  incomeTaxValue = incomeTax / 52;
  incomeTaxValue = incomeTaxValue.toFixed(0);
  incomeTaxElement.textContent = "Income Tax: £" + incomeTaxValue + " Weekly";
}

//Converts all values into months
function convertMonth() {
  //Convert Take Home Pay
  monthSalaryValue = monthSalary / 12;
  monthSalaryValue = Math.floor(monthSalaryValue);
  const formattedSalary = monthSalaryValue.toLocaleString("en-UK", {
    style: "currency",
    currency: "GBP",
    minimumFractionDigits: 0,
  });
  takeHomePay.textContent = formattedSalary;
  //Convert National Insurance Number
  nationalInsuranceValue = nationalInsurance / 12;
  nationalInsuranceValue = nationalInsuranceValue.toFixed(0);
  nationalInsuranceElement.textContent =
    "National Insurance: £" + nationalInsuranceValue + "  Monthly";
  //Convert Income Tax
  incomeTaxValue = incomeTax / 12;
  incomeTaxValue = incomeTaxValue.toFixed(0);
  incomeTaxElement.textContent = "Income Tax: £" + incomeTaxValue + " Monthly";
}

function convertAnnually() {
  const formattedSalary = annualSalary.toLocaleString("en-UK", {
    style: "currency",
    currency: "GBP",
    minimumFractionDigits: 0,
  });
  takeHomePay.textContent = formattedSalary;
  //Convert National Insurance Number
  nationalInsuranceElement.textContent =
    "National Insurance: £" + nationalInsurance + " Annually";
  //Convert Income Tax
  incomeTaxElement.textContent = "Income Tax: £" + incomeTax + " Annually";
}

//MAKE SURE TO CHANGE THE NAME TO SOMETHING SPECIFIC, ETC toggleButtonTime
//Toggles between weekly, monthly, or yearly
function toggleButton(button) {
  let activeButton = document.querySelector(".timeButton.active");
  // Deactivate the currently active button
  activeButton.classList.remove("active");
  // Activate the clicked button
  button.classList.add("active");
  activeButton = button;

  const toggledButtonText = button.textContent;
  if (toggledButtonText === "Weekly") {
    convertWeek();
    console.log("Weekly is toggled.");
  } else if (toggledButtonText === "Monthly") {
    convertMonth();
    console.log("Monthly is toggled.");
  } else {
    console.log("Annually is toggled.");
    convertAnnually();
  }
}

//Resets the annual button when clicked
function clickAnnualButton() {
  const activeButton = document.querySelector(".timeButton.active");
  if (activeButton) {
    activeButton.click();
  }
}

//handles dropdown
for (var i = 0; i < accordions.length; i++) {
  accordions[i].onclick = function () {
    this.classList.toggle("active");
    this.nextElementSibling.classList.toggle("show");
  };
}

//Piechart
new Chart(document.getElementById("pie-chart"), {
  type: "pie",
  data: {
    labels: [
      "Income Tax",
      "National Insurance",
      "Take Home Pay",
      "Cost of Living",
    ],
    datasets: [
      {
        backgroundColor: ["#B1B2FF", "#AAC4FF", "#D2DAFF", "#EEF1FF"],
        data: [50, 50, 50, 50],
      },
    ],
  },
  options: {
    title: {
      display: true,
      text: "Pie Chart",
    },
    responsive: true,
    plugins: {
      legend: {
        display: false,
      },
    },
  },
});

//ToDo
//15. when you hover on plan 1 and plan 2, it gives details
//16. when you click calculate again but month is toggled, is goes to annually
//17. allow pension contribution to put a decimal in
// upload on linkedin (show video demonstartion)

//check if conversion works for week month year!!!!!!!
