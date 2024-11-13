// Getting all the html elements
const form = document.getElementById("form");
const textInput = document.getElementById("textInput");
const dateInput = document.getElementById("dateInput");
const textarea = document.getElementById("textarea");
const msg = document.getElementById("msg");
const tasks = document.getElementById("tasks");
const add = document.getElementById("add");

//form validation

const formValidation = () => {
  if (
    textInput.value === "" ||
    dateInput.value === "" ||
    textarea.value === ""
  ) {
    msg.innerHTML = "Input Field cannot Be Empty😔";
  } else {
    getData();
    add.setAttribute("data-bs-dismiss", "modal");
    add.click();
    (() => {
      add.setAttribute("data-bs-dismiss", "");
    })();
  }
};

//submit logic

form.addEventListener("submit", (e) => {
  e.preventDefault();
  formValidation();
});

//getting details from the form and storing it in data in arrey of object
let data = [];

const getData = () => {
  data.push({
    text: textInput.value,
    date: dateInput.value,
    task: textarea.value,
  });
  //to save the data to local storage
  localStorage.setItem("data", JSON.stringify(data));
  //   console.log("get", data);
  createTask();
};

//create function used to get the data and display in the my task

const createTask = () => {
  tasks.innerHTML = "";
  data.map((ele, y) => {
    return (tasks.innerHTML += `
            <div id="${y}">
            <span class="fw-bolder">${ele.text}</span>
            <span class="fw-bolder">${ele.date}</span>
            <p class="fw-bolder">${ele.task}</p>
            <span class="options">
            <i onclick="editTask(this)" data-bs-toggle="modal" data-bs-target="#form" class="fa-solid fa-pen" style="color: #ffd43b;"></i>
            <i onclick="deleteTask(this); createTask()" class="fa-solid fa-trash fa-beat-fade"></i>
            </span>
            </div>
            `);
  });
  resetForm();
};

//resertform aftrer diasplaying

const resetForm = () => {
  textInput.value = "";
  dateInput.value = "";
  textarea.value = "";
};

(() => {
  data = JSON.parse(localStorage.getItem("data")) || [];
  createTask();
})();

//edit function for created TODO's

const editTask = (e) => {
  let result = e.parentElement.parentElement;
  textInput.value = result.children[0].innerHTML;
  dateInput.value = result.children[1].innerHTML;
  textarea.value = result.children[2].innerHTML;

  //to remove the oldtask after edited
  delete e;
};

//delete function for created TODO's

const deleteTask = (e) => {
  e.parentElement.parentElement.remove();
  data.splice(e.parentElement.parentElement.id, 1);
  localStorage.setItem("data", JSON.stringify(data));
  console.log(data);
};
