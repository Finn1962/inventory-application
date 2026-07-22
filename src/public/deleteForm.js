const deleteButtons = document.querySelectorAll("#show_delete_form_button");
const hiddeDeleteFormButtons = document.querySelectorAll(
  "#hide_delete_form_button",
);

deleteButtons.forEach((button) => {
  const index = button.getAttribute("data-index");
  button.addEventListener("click", () => {
    showDeleteForm(index);
  });
});

hiddeDeleteFormButtons.forEach((button) => {
  const index = button.getAttribute("data-index");
  button.addEventListener("click", () => {
    hiddeDeleteForm(index);
  });
});

function showDeleteForm(index) {
  const deleteForm = document.getElementById(`delete_form_${index}`);
  deleteForm.style.display = "block";
}

function hiddeDeleteForm(index) {
  const deleteForm = document.getElementById(`delete_form_${index}`);
  deleteForm.style.display = "none";
}
