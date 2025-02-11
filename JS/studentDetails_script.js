const nameElem = document.getElementById("full-name-display");
const ageElem = document.getElementById("age-display");
const bloodElem = document.getElementById("blood-group-display");
const rollElem = document.getElementById("college-reg-number-display");
const ongoingMedElem = document.getElementById("medications-display");

const editBtn = document.getElementById("edit-btn");

let rollNumber = localStorage.getItem("token");

async function getStudentData(rollNumber) {
  const response = await fetch(
    `http://localhost:3000/users?rollNumber=${rollNumber}`
  );

  const data = await response.json();
  localStorage.setItem("id", `${data[0].id}`);

  nameElem.innerText = data[0].fullName;
  ageElem.innerText = data[0].age;
  bloodElem.innerText = data[0].bloodGroup;
  rollElem.innerText = data[0].rollNumber;
  ongoingMedElem.innerText = data[0].currMeds;
}

getStudentData(rollNumber);

editBtn.addEventListener("click", (e) => {
  e.preventDefault();

  window.location.href = "profileEdit.html";
});
