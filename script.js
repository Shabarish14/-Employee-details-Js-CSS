const cards = document.querySelector(".cards");
const lists = document.querySelector(".lists");
const listBody = document.querySelector(".list-body");
const cardsbutton = document.querySelector(".cards-btn");
const listButton = document.querySelector(".list-btn");
const optionbutton = document.querySelector(".option-btn");
const trashIcon = document.querySelector(".trash-icon");
let employeeData = [
  {
    name: "Abhi",
    gender: "female",
    id: "123456",
    skills: ["js", "HTML"],
    project: "Cognizant-Internal",
    hcm: "Alex",
  },
  {
    name: "Anand",
    gender: "male",
    id: "123458",
    skills: ["js", "Bootstrap"],
    project: "Cognizant-Internal",
    hcm: "Alex",
  },
  {
    name: "Meera",
    gender: "female",
    id: "123459",
    skills: ["HTML", "CSS"],
    project: "Cognizant-Internal",
    hcm: "Alex",
  },
  {
    name: "Satheesh",
    gender: "male",
    id: "123350",
    skills: ["js", "HTML", "CSS"],
    project: "Cognizant-Internal",
    hcm: "Alex",
  },
  {
    name: "Indhu",
    gender: "female",
    id: "123451",
    skills: ["React", "Angular"],
    project: "Cognizant-Internal",
    hcm: "Alex",
  },
  {
    name: "Sreelekha",
    gender: "female",
    id: "121212",
    skills: ["Bootstrap", "React", "Angular"],
    project: "Cognizant-Internal",
    hcm: "Alex",
  },
  {
    name: "Raman",
    gender: "male",
    id: "124356",
    skills: ["HTML", "CSS"],
    project: "Cognizant-Internal",
    hcm: "Alex",
  },
  {
    name: "Sharanya",
    gender: "female",
    id: "123454",
    skills: ["Bootstap", "HTML", "CSS"],
    project: "Cognizant-Internal",
    hcm: "Alex",
  },
  {
    name: "Suresh",
    gender: "male",
    id: "123465",
    skills: ["Nodejs", "Angular"],
    project: "Cognizant-Internal",
    hcm: "Alex",
  },
  {
    name: "Emy",
    gender: "female",
    id: "128765",
    skills: ["Mango-DB", "SQL", "Angular"],
    project: "Cognizant-Internal",
    hcm: "Alex",
  },
];
let globalStorage = [];
const generateNewCard = (employee, ind) => `
<div class="card card-col${employee.id}">
<div class="cardBtn-box">
<button onclick="deleteCard.apply(this,arguments)" id="${employee.id}">❌</button>
</div>
<div class="card-image">
  <img src="${employee.gender}-placeholder.jpg" class="image-holder" />
</div>
<div class="col name${employee.id}">Name : ${employee.name}</div>
<div class="col id${employee.id}">ID : ${employee.id}</div>
<div class="col gender${employee.id}">Gender : ${employee.gender}</div>
<div class="col skills${employee.id}">Skills : ${employee.skills}</div>
<div class="col projects${employee.id}">Project : ${employee.project}</div>
<div class="col hcm${employee.id}">HCM : ${employee.hcm}</div>
<div class="options-box">
<button class="btn option-btn" id="${employee.id}" onclick="editCard.apply(this,arguments)">EDIT</button>
</div>
</div>
</div>
`;
const generateNewListItem = (employee, ind) => ` 
<tr class="table-data table-col${employee.id}">
<td class="text-center col-name${employee.id}">${employee.name}</td>
<td class="text-center col-id${employee.id}">${employee.id}</td>
<td class="text-center col-gender${employee.id}">${employee.gender}</td>
<td class="text-center col-skills${employee.id}">${employee.skills}</td>
<td class="text-center col-project${employee.id}">${employee.project}</td>
<td class="text-center col-hcm${employee.id}">${employee.hcm}</td>
<td class="text-center">
<button class="btn listEdit-btn" id="${employee.id}" onclick="editList.apply(this,arguments)">EDIT</button>
</td>
<td class="text-center">
<button class="del-icon" style="cursor:pointer" onclick="deleteListItem.apply(this,arguments)" id="${employee.id}">❌</button>
</td>
</tr>
`;
const loadInitialData = () => {
  const getData = localStorage.getItem("togglelist");
  const { cardData } = JSON.parse(getData);
  cardData.map((cardobject, ind) => {
    cards.insertAdjacentHTML("beforeend", generateNewCard(cardobject, ind));
    listBody.insertAdjacentHTML(
      "beforeend",
      generateNewListItem(cardobject, ind)
    );
  });
};
const dataSet = function () {
  employeeData.forEach((employee, ind) => {
    cards.insertAdjacentHTML("beforeend", generateNewCard(employee, ind));
    listBody.insertAdjacentHTML(
      "beforeend",
      generateNewListItem(employee, ind)
    );
    globalStorage.push(employee);
    localStorage.setItem(
      "togglelist",
      JSON.stringify({ cardData: globalStorage })
    );
  });
};
const deleteCard = (event) => {
  event = window.event;
  const targetId = event.target.id;
  // console.log(targetId, typeof targetId);
  globalStorage = globalStorage.filter((card) => card.id !== targetId);
  // console.log(globalStorage);
  localStorage.setItem(
    "togglelist",
    JSON.stringify({ cardData: globalStorage })
  );
  cards.removeChild(event.target.parentNode.parentNode);
  const LisItem = document.querySelector(`.table-col${targetId}`);
  listBody.removeChild(LisItem);
};
const editCard = (event) => {
  event = window.event;
  let targetId = event.target.id;
  let parentElement = event.target.parentNode.parentNode;
  // console.log(parentElement.childNodes);
  let skills = parentElement.childNodes[11];
  let project = parentElement.childNodes[13];
  let hcm = parentElement.childNodes[15];
  let editBtn = parentElement.childNodes[17].childNodes[1];
  skills.setAttribute("contenteditable", "true");
  project.setAttribute("contenteditable", "true");
  hcm.setAttribute("contenteditable", "true");
  editBtn.setAttribute("onclick", "saveEditChanges.apply(this,arguments)");
  editBtn.innerHTML = "Save Changes";
};
const saveEditChanges = function (event) {
  event = window.event;
  let targetId = event.target.id;
  let parentElement = event.target.parentNode.parentNode;
  let skills = parentElement.childNodes[11];
  let project = parentElement.childNodes[13];
  let hcm = parentElement.childNodes[15];
  let editBtn = parentElement.childNodes[17].childNodes[1];
  const updatedData = {
    skills: skills.innerHTML,
    project: project.innerHTML,
    hcm: hcm.innerHTML,
  };
  globalStorage = globalStorage.map((task) => {
    if (task.id === targetId) {
      return {
        name: task.name,
        gender: task.gender,
        id: task.id,
        skills: updatedData.skills.split(":")[1].trim().split(","),
        project: updatedData.project.split(":")[1].trim(),
        hcm: updatedData.hcm.split(":")[1].trim(),
      };
    }
    return task;
  });
  localStorage.setItem(
    "togglelist",
    JSON.stringify({ cardData: globalStorage })
  );
  skills.setAttribute("contenteditable", "false");
  project.setAttribute("contenteditable", "false");
  hcm.setAttribute("contenteditable", "false");
  editBtn.innerHTML = "EDIT";
  editBtn.removeAttribute("onclick");
  // console.log(updatedData.skills.split(":")[1].trim().split(","));
  document.querySelector(`.col-skills${targetId}`).innerHTML =
    updatedData.skills.split(":")[1].trim().split(",");
  document.querySelector(`.col-project${targetId}`).innerHTML =
    updatedData.project.split(":")[1].trim();
  document.querySelector(`.col-hcm${targetId}`).innerHTML = updatedData.hcm
    .split(":")[1]
    .trim();
};

const displayCardList = function () {
  cards.classList.toggle("hidden");
  const text =
    cardsbutton.textContent === "GRID-SHOW" ? "GRID-HIDE" : "GRID-SHOW";
  cardsbutton.textContent = text;
};
cardsbutton.addEventListener("click", displayCardList);

const displayEmployeeList = function () {
  lists.classList.toggle("hidden");
  const text =
    listButton.textContent === "LIST-SHOW" ? "LIST-HIDE" : "LIST-SHOW";
  listButton.textContent = text;
};
listButton.addEventListener("click", displayEmployeeList);

const deleteListItem = (event) => {
  event = window.event;
  const targetId = event.target.id;
  // console.log(targetId, typeof targetId);
  globalStorage = globalStorage.filter((card) => card.id !== targetId);
  // console.log(globalStorage);
  localStorage.setItem(
    "togglelist",
    JSON.stringify({ cardData: globalStorage })
  );
  listBody.removeChild(event.target.parentNode.parentNode);
  const cardItem = document.querySelector(`.card-col${targetId}`);
  cards.removeChild(cardItem);
};

const editList = (event) => {
  event = window.event;
  let targetId = event.target.id;
  let parentElement = event.target.parentNode.parentNode;
  let skills = parentElement.childNodes[7];
  let project = parentElement.childNodes[9];
  let hcm = parentElement.childNodes[11];
  let editBtn = parentElement.childNodes[13].childNodes[1];
  skills.setAttribute("contenteditable", "true");
  project.setAttribute("contenteditable", "true");
  hcm.setAttribute("contenteditable", "true");
  editBtn.setAttribute("onclick", "saveListChanges.apply(this,arguments)");
  editBtn.innerHTML = "SAVE";
};
const saveListChanges = function (event) {
  event = window.event;
  let targetId = event.target.id;
  let parentElement = event.target.parentNode.parentNode;
  let skills = parentElement.childNodes[7];
  let project = parentElement.childNodes[9];
  let hcm = parentElement.childNodes[11];
  let editBtn = parentElement.childNodes[13].childNodes[1];
  const updatedData = {
    skills: skills.innerHTML,
    project: project.innerHTML,
    hcm: hcm.innerHTML,
  };
  globalStorage = globalStorage.map((task) => {
    if (task.id === targetId) {
      return {
        name: task.name,
        gender: task.gender,
        id: task.id,
        skills: updatedData.skills.split(","),
        project: updatedData.project,
        hcm: updatedData.hcm,
      };
    }
    // console.log(globalStorage);
    return task;
  });
  localStorage.setItem(
    "togglelist",
    JSON.stringify({ cardData: globalStorage })
  );
  skills.setAttribute("contenteditable", "false");
  project.setAttribute("contenteditable", "false");
  hcm.setAttribute("contenteditable", "false");
  editBtn.innerHTML = "EDIT";
  editBtn.removeAttribute("onclick");
  document.querySelector(
    `.skills${targetId}`
  ).innerHTML = `Skills : ${updatedData.skills.split(",")}`;
  document.querySelector(
    `.projects${targetId}`
  ).innerHTML = `Project : ${updatedData.project}`;
  document.querySelector(
    `.hcm${targetId}`
  ).innerHTML = `HCM : ${updatedData.hcm}`;
  // console.log(document.querySelector(`.col-skills${targetId}`).innerHTML);
};
