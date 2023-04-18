const colorPicker = new iro.ColorPicker("#color-picker");
const hexInput = document.getElementById("hex-input");
const colorGrid = document.getElementById("color-grid");

function createColorBlock(color) {
  const colorBlock = document.createElement("div");
  colorBlock.className = "w-8 h-8 rounded border-2 border-gray-300";
  colorBlock.style.backgroundColor = color.hexString();
  return colorBlock;
}

function updatePalette() {
  colorGrid.innerHTML = "";
  const baseColor = new Color(hexInput.value);
  for (let i = 0; i < 9; i++) {
    const shade = baseColor.shade(i * 100);
    const colorBlock = createColorBlock(shade);
    colorGrid.appendChild(colorBlock);
  }
}

colorPicker.on("color:change", (color) => {
  hexInput.value = color.hexString;
  updatePalette();
});

hexInput.addEventListener("input", updatePalette);

hexInput.value = colorPicker.color.hexString;
updatePalette();
