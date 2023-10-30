//Initalise Elements
let inputSalaryElement = document.getElementById("inputSalaryHTML");
let nationalInsuranceElement = document.getElementById("nationalInsuranceHTML");
let incomeTaxElement = document.getElementById("incomeTaxHTML");
let inputPension = document.getElementById("inputPensionHTML");
let takeHomePay = document.getElementById("takeHomePayHTML");

//Intialise values
let nationalInsurance = 0;
let incomeTax = 0;
let costOfLiving = 0;
let inputSalary = parseInt(inputSalaryElement.value, 10);

function pensionPayment() {
  const toggleCheckbox = document.querySelector(".toggle-checkbox");
  toggleCheckbox.addEventListener("change", function () {
    if (toggleCheckbox.checked) {
      inputSalary = parseInt(inputSalaryElement.value, 10) * 0.9; // Assuming 10% reduction
      console.log("On");
    } else {
      inputSalary = parseInt(inputSalaryElement.value, 10);
      console.log("Off");
    }
  });
}

// Pension Contribution
function calculate() {
  pensionPayment();
  checkEmpty();
  takeHomePay.textContent = inputSalary;
}

function checkEmpty() {
  //Add to see if it is Empty
}

//handles dropdown
var accordions = document.querySelectorAll("button.accordion");
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
