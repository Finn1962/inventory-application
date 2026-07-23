const form = document.getElementById("form");
const fileInput = document.getElementById("images");

const maxSize = 5 * 1024 * 1024;

form.addEventListener("submit", (event) => {
  event.preventDefault();
  const filesArray = [...fileInput.files];
  const toBigFiles = filesArray.filter((file) => file.size > maxSize);

  if (toBigFiles.length > 0) {
    fileInput.setCustomValidity(
      `${toBigFiles[0].name} is to Big! The maximum size is 5 MB.`,
    );
    fileInput.reportValidity();
  } else {
    fileInput.setCustomValidity("");
    form.submit();
  }
});
