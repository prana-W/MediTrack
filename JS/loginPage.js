const regNumber = document.getElementById("college-reg-number");
const loginBtn = document.querySelector(".loginbtn");

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

loginBtn.addEventListener("click", (e) => {
  e.preventDefault();

  if (!regNumber.value.trim()) {
    return;
  }

  const result = checkStudentData(regNumber.value);

  result.then((isStudentRegistered) => {
    if (!isStudentRegistered) {
      alert("Kindly register the student!");
    } else {
      localStorage.setItem("token", regNumber.value);
      window.location.href = "studentDetails.html";
    }
  });
});
