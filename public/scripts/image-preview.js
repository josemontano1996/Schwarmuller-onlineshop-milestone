const imagePickerElement = document.querySelector(
  "#image-upload-control input"
);
const imagePreviewElement = document.querySelector("#image-upload-control img");

function updateImagePreview() {
  const files = imagePickerElement.files; //this is an array of all the selected images in our case just 1

  if (!files || files.length === 0) {
    imagePickerElement.style.display = "none";
    return;
  }

  const pickedFile = files[0];

  imagePreviewElement.src = URL.createObjectURL(pickedFile);
  imagePreviewElement.style.display = "inline";
}

imagePickerElement.addEventListener("change", updateImagePreview);
