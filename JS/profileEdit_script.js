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

      if (response.ok) {
        alert("Student details updated successfully!");
      }
    } catch (error) {
      console.log(error);
    }
  }

  updateUser();
});

document.getElementById("getBack").addEventListener("click", (e) => {
  e.preventDefault();
  window.location.href = "/html/studentDetails.html";
});

document.getElementById("delData").addEventListener("click", (e) => {
  e.preventDefault();
  openModal();
});

document.getElementById("confirmDel").addEventListener("click", (e) => {
  e.preventDefault();
  confirmDelete();
});

document.getElementById("rejectDel").addEventListener("click", (e) => {
  closeModal();
});

function openModal() {
  document.getElementById("custom-modal").style.display = "block";
}

function closeModal() {
  document.getElementById("custom-modal").style.display = "none";
}

function confirmDelete() {
  if (!rollElem.value) {
    alert("No student data found to be deleted!");
    closeModal();
    return;
  }
  async function deleteUser(studentId) {
    try {
      let response = await fetch(`http://localhost:3000/users/${studentId}`, {
        method: "DELETE",
      });

      if (response.ok) {
        window.location.href = "loginPage.html";
        alert("Student data deleted successfully!");
      } else {
        console.error("Failed to delete user");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  }

  deleteUser(studentId);

  closeModal();
}
