const nameElem = document.getElementById("full-name");
const ageElem = document.getElementById("age");
const bloodElem = document.getElementById("blood-group");
const rollElem = document.getElementById("college-reg-number");
const ongoingMedElem = document.getElementById("medications");
const subBtn = document.querySelector(".submit-btn");

//Creating a student class
class student {
  constructor(fullName, age, bloodGroup, rollNumber, currMeds) {
    this.fullName = fullName;
    this.age = age;
    this.bloodGroup = bloodGroup;
    this.rollNumber = rollNumber;
    this.currMeds = currMeds;
  }
}

//Checks if the student is already registered
async function checkStudentData(regNum) {
  try {
    const response = await fetch(
      `http://localhost:3000/users?rollNumber=${regNum}`
    );

    const data = await response.json();

    if (Object.keys(data).length) {
      return true;
    } else return false;
  } catch (error) {
    console.log(error);
  }
}

subBtn.addEventListener("click", (e) => {
  e.preventDefault();

  //Making an instance at the time of submit button
  let newStudent = new student(
    nameElem.value,
    ageElem.value,
    bloodElem.value,
    rollElem.value,
    ongoingMedElem.value
  );

  const result = checkStudentData(rollElem.value);

  result.then((isStudentRegistered) => {
    if (!(nameElem.value && ageElem && bloodElem && rollElem)) {
      alert("Kindly fill the form!");
      return;
    } else if (!isStudentRegistered) {
      sendDetails();
      alert("Student is registered successfully!");
    } else {
      alert("Student is already registered... Kindly login!");
      return;
    }
  });

  //Sending the details to the local-server
  async function sendDetails() {
    try {
      await fetch("http://localhost:3000/users", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newStudent),
      });
    } catch (error) {
      console.error(error);
    }
  }
});
