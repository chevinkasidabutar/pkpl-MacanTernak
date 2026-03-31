const customizationSection = document.getElementById("customization-section");
const bgColorPicker = document.getElementById("bg-color-picker");
const fontSelect = document.getElementById("font-select");

bgColorPicker.addEventListener("input", (e) => {
  document.documentElement.style.setProperty("--bg-color", e.target.value);
});

fontSelect.addEventListener("change", (e) => {
  document.body.style.fontFamily = e.target.value;
});
