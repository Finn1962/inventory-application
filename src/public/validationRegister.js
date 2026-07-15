const form = document.getElementById("form");
const passwordInput = document.getElementById("password");
const confirmPasswordInput = document.getElementById("confirmPassword");

form.addEventListener("submit", (event) => {
  event.preventDefault();

  if (passwordInput.value !== confirmPasswordInput.value) {
    confirmPasswordInput.setCustomValidity("Passwords do not match!");
    confirmPasswordInput.reportValidity();
  } else {
    passwordInput.setCustomValidity("");
    form.submit();
  }
});

confirmPasswordInput.addEventListener("input", () => {
  confirmPasswordInput.setCustomValidity("");
});
