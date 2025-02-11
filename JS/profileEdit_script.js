const nameElem = document.getElementById("full-name");
const ageElem = document.getElementById("age");
const bloodElem = document.getElementById("blood-group");
const rollElem = document.getElementById("college-reg-number");
const ongoingMedElem = document.getElementById("medications");

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

const updateBtn = document.querySelector(".update-btn");

let studentId = localStorage.getItem("id");

async function getStudentData(studentId) {
  const response = await fetch(`http://localhost:3000/users/${studentId}`);

  const data = await response.json();

  console.log(data);

  nameElem.value = data.fullName;
  ageElem.value = data.age;
  bloodElem.value = data.bloodGroup;
  rollElem.value = data.rollNumber;
  ongoingMedElem.value = data.currMeds;
}

getStudentData(studentId);

updateBtn.addEventListener("click", (e) => {
  e.preventDefault();

  //Making an instance at the time of submit button
  let newStudent = new student(
    nameElem.value,
    ageElem.value,
    bloodElem.value,
    rollElem.value,
    ongoingMedElem.value
  );

  async function updateUser() {
    try {
      const response = await fetch(`http://localhost:3000/users/${studentId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newStudent),
      });

      const data = await response.json();
      console.log("User Updated:", data);
    } catch (error) {
      console.log(error);
    }
  }

  updateUser();
});
