const customizationSection = document.getElementById("customization-section");
const bgColorPicker = document.getElementById("bg-color-picker");
const fontSelect = document.getElementById("font-select");

if (customizationSection && !customizationSection.hasAttribute("hidden")) {
  if (bgColorPicker) {
    bgColorPicker.addEventListener("input", (e) => {
      document.documentElement.style.backgroundColor = e.target.value;
    });
  }

  if (fontSelect) {
    fontSelect.addEventListener("change", (e) => {
      const val = e.target.value;
      if (val.startsWith("var(")) {
        // Use CSS variable font family
        const varName = val.slice(4, -1).trim();
        const cssVal = getComputedStyle(document.documentElement).getPropertyValue(varName).trim();
        document.body.style.fontFamily = cssVal || getComputedStyle(document.body).fontFamily;
      } else {
        document.body.style.fontFamily = val;
      }
    });
  }
}
