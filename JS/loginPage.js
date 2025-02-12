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

//To login or to not login
loginBtn.addEventListener("click", (e) => {
  e.preventDefault();

  //Checks if the input field is empty
  if (!regNumber.value.trim()) {
    return;
  }

  //result is the promise reference- it receives a response from the server side
  const result = checkStudentData(regNumber.value);

  result.then((isStudentRegistered) => {
    if (!isStudentRegistered) {
      alert("Kindly register the student!");
    } else {
      //if registered then takes the token (reg-number) and saves in the local storage
      localStorage.setItem("token", regNumber.value);
      window.location.href = "studentDetails.html";
    }
  });
});
