import { v4 as uuidv4 } from "https://jspm.dev/uuid";

import { initialTodos, validationConfig } from "../utils/constants.js";
import Todo from "../components/Todo.js";
import FormValidator from "../components/FormValidator.js";
import Section from "../components/Section.js";
import PopupWithForm from "../components/PopupWithForm.js";
import TodoCounter from "../components/TodoCounter.js";

const addTodoButton = document.querySelector(".button_action_add");
const addTodoPopupEl = document.querySelector("#add-todo-popup");
const addTodoForm = addTodoPopupEl.querySelector(".popup__form");

const todoCounter = new TodoCounter(initialTodos, ".counter__text");

const addTodoPopup = new PopupWithForm({
  popupSelector: "#add-todo-popup",
  handleFormSubmit: (evt, inputValues) => {
    const name = inputValues.name;
    const date = inputValues.date;
    const id = uuidv4();
    const values = { name, date, id };
    renderTodo(values);
    todoCounter.updateTotal(true);
    newTodoValidator.resetValidation();
    addTodoPopup.close();
  },
});
addTodoPopup.setEventListeners();

function handleCheck(increment) {
  todoCounter.updateCompleted(increment);
}

function handleDelete(isCompleted) {
  todoCounter.updateTotal(false);
  if (isCompleted) todoCounter.updateCompleted(false);
}

const TODO_TEMPLATE_SELECTOR = "#todo-template";

const generateTodo = (data) => {
  const todo = new Todo(
    data,
    TODO_TEMPLATE_SELECTOR,
    handleCheck,
    handleDelete,
  );
  const todoElement = todo.getView();
  return todoElement;
};

const section = new Section({
  items: initialTodos,
  renderer: (item) => {
    const todo = generateTodo(item);
    section.addItem(todo);
  },
  containerSelector: ".todos__list",
});

section.renderItems();

const renderTodo = (values) => {
  const todo = generateTodo(values);
  section.addItem(todo);
};

addTodoButton.addEventListener("click", () => {
  addTodoPopup.open();
});

const newTodoValidator = new FormValidator(validationConfig, addTodoForm);
newTodoValidator.enableValidation();
