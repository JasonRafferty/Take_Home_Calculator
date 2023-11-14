//Initalise Elements
let inputSalaryElement = document.getElementById("inputSalaryHTML");
let nationalInsuranceElement = document.getElementById("nationalInsuranceHTML");
let incomeTaxElement = document.getElementById("incomeTaxHTML");
let studentLoanElement = document.getElementById("studentLoanHTML");
let pensionContributionElement = document.getElementById(
  "pensionContributionHTML"
);
let inputPension = document.getElementById("inputPensionHTML");
let takeHomePay = document.getElementById("takeHomePayHTML");
var accordions = document.querySelectorAll("button.accordion");

//Intialise values
let nationalInsurance = 0;
let incomeTax = 0;
let pensionContribution = 0;
let studentLoan = 0;
let annualSalary;
let weekSalary;
let monthSalary;
let studentLoanInput;

//Clear what has been put
document.getElementById("clearButtonHTML").addEventListener("click", clear);
function clear() {
  //input salary
  inputSalaryElement.value = "";
  //national insurance
  nationalInsuranceElement.textContent = "National Insurance:";
  //Income Tax
  incomeTaxElement.textContent = "Income Tax:";
  //take home pay
  takeHomePay.textContent = "_________";
  //student loan payment (untoggle buttons as well)
  studentLoanElement.textContent = "Student Loan:";
  //pension contribution
  inputPension.value = "";
  pensionContributionElement.textContent = "Pension Contribution:";
}

//Check input salary is positive and a value
function checkSalaryInput(input) {
  let value = parseFloat(input.value);
  if (isNaN(value)) {
    input.value = "";
  } else {
    if (value < 0) input.value = 0;
  }
}

//Check input pension % is inbetween 0 and 100
function checkPensionInput(input) {
  let value = parseFloat(input.value);
  if (isNaN(value)) {
    input.value = "";
  } else {
    if (value < 0) input.value = 0;
    if (value > 100) input.value = 100;
  }
}

// Pension Contribution toggle
const toggleCheckbox = document.querySelector(".toggle-checkbox");
const inputPensionHTML = document.querySelector("#inputPensionHTML");

toggleCheckbox.addEventListener("change", function () {
  let inputPensionValue = parseFloat(inputPensionHTML.value) / 100;
  if (toggleCheckbox.checked) {
    // read input

    pensionContribution = Math.round(
      parseFloat(inputSalaryElement.value) * inputPensionValue
    );
    console.log(inputPensionValue);
    console.log("On");
  } else {
    pensionContribution = 0;
    console.log("Off");
  }
  calculate();
});

//When pension input changes, it will update
inputPensionHTML.addEventListener("input", function () {
  checkPensionInput(inputPensionHTML);
  if (toggleCheckbox.checked) {
    pensionContribution = Math.round(
      parseFloat(inputSalaryElement.value) *
        (parseFloat(inputPensionHTML.value) / 100)
    );
  } else {
    pensionContribution = 0;
  }
  calculate();
});

//Calculates the output of given salary
function calculate() {
  let inputSalary = parseFloat(inputSalaryElement.value);
  if (!isNaN(inputSalary)) {
    if (toggleCheckbox.checked) {
      // Pension Contribution
      let inputPensionValue = parseFloat(inputPensionHTML.value) / 100;
      //Given Salary is multiplied by percentage chosen
      pensionContribution = Math.round(inputSalary * inputPensionValue);
    } else {
      pensionContribution = 0;
    }
    pensionContributionElement.textContent =
      "Pension Contribution: £" + pensionContribution;
    inputSalary -= pensionContribution;
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
    //Student Loan
    studentLoan = 0;
    studentLoanInput = inputSalary;
    if (activePlan === "plan1" && studentLoanInput > 22015) {
      studentLoanOneCalculate();
    } else if (activePlan === "plan2" && studentLoanInput > 27295) {
      studentLoanTwoCalculate();
    }
    inputSalary -= studentLoan;
    //Reset Annual button
    resetAnnually();
    // Final Display
    const formattedSalary = inputSalary.toLocaleString("en-UK", {
      style: "currency",
      currency: "GBP",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    });
    takeHomePay.textContent = formattedSalary;
    //Error Handling for invalid input
  } else {
    takeHomePay.textContent = "_________";
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

// Function definition for calculating Student Plan 1
function studentLoanOneCalculate() {
  if (activePlan === "plan1" && studentLoanInput > 22015) {
    studentLoan = Math.round((studentLoanInput - 22015) * 0.09);
    studentLoanElement.textContent = "Student Loan: £" + studentLoan.toFixed(0);
  } else {
    studentLoanElement.textContent = "Student Loan: £0";
  }
}

// Function definition for calculating Student Plan 2
function studentLoanTwoCalculate() {
  if (activePlan === "plan2" && studentLoanInput > 27295) {
    studentLoan = Math.round((studentLoanInput - 27295) * 0.09);
    studentLoanElement.textContent = "Student Loan: £" + studentLoan.toFixed(0);
  } else {
    studentLoanElement.textContent = "Student Loan: £0";
  }
}

//Toggle for student loan payment
const plan1Button = document.querySelector(".plan1"); // Use the correct selector for Plan 1 button
const plan2Button = document.querySelector(".plan2"); // Use the correct selector for Plan 2 button
let activePlan = null;

// Function to toggle student loan plans
function togglePlan(plan) {
  if (activePlan === plan) {
    // Untoggle if the same plan is clicked again
    activePlan = null;
  } else {
    // Set active plan
    activePlan = plan;
  }
  // Update button visuals
  plan1Button.classList.toggle("active", activePlan === "plan1");
  plan2Button.classList.toggle("active", activePlan === "plan2");

  // Recalculate based on the new plan state
  calculate();
}

// Attach event listeners to the plan buttons
plan1Button.addEventListener("click", () => togglePlan("plan1"));
plan2Button.addEventListener("click", () => togglePlan("plan2"));

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

//Toggles between weekly, monthly, or yearly
document.addEventListener("DOMContentLoaded", function () {
  // Get all time buttons
  const timeButtons = document.querySelectorAll(".timeButton");

  // Add click event to each button
  timeButtons.forEach(function (button) {
    button.addEventListener("click", function (e) {
      // Remove active class from all buttons
      timeButtons.forEach((btn) => btn.classList.remove("active"));

      // Add active class to clicked button
      e.currentTarget.classList.add("active");

      // Call the corresponding function
      switch (e.currentTarget.textContent.trim()) {
        case "Weekly":
          convertWeek();
          break;
        case "Monthly":
          convertMonth();
          break;
        case "Annually":
          convertAnnually();
          break;
      }
    });
  });
});

//When a new calculation, resets to anual
function resetAnnually() {
  // Remove active class from all buttons
  const timeButtons = document.querySelectorAll(".timeButton");
  timeButtons.forEach((btn) => btn.classList.remove("active"));

  // Set the Annually button as active
  const annuallyButton = document.querySelector(
    ".timeButton.active, .timeButton:nth-child(3)"
  );
  annuallyButton.classList.add("active");

  // Call the convertAnnually function
  convertAnnually();
}

//handles dropdown
for (var i = 0; i < accordions.length; i++) {
  accordions[i].onclick = function () {
    this.classList.toggle("active");
    this.nextElementSibling.classList.toggle("show");

    // Toggle fade class on the pie chart
    var chartWrapper = document.getElementById("pieChartFade");
    chartWrapper.classList.toggle("fade");
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
      "Student Loan",
    ],
    datasets: [
      {
        backgroundColor: [
          "#B1B2FF",
          "#AAC4FF",
          "#D2DAFF",
          "#EEF1FF",
          "#E3D3F0",
        ],
        data: [50, 50, 50, 50, 50],
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
//16. When untoggling plan 1 and plan 2, it doesn't change more info
//17. student loan, if nothing is toggle, it will be 0 !!
//18. when monthly or weekly is toggled with no input, it shows NaN
//19. When clear is pressed, clear montly and weekly too
//20. add error handling where income tax + nation insurea + take home pay etc = intital salary, if not it displayers erro
//21. Let pension contribution and student loan be divided monthly and weekly
//22. pension contribution doesn't work for weekly and monthly
//23. add mobile phone supprot
