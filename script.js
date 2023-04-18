const colorPicker = new iro.ColorPicker("#color-picker");
const hexInput = document.getElementById("hex-input");
const confirmHexButton = document.getElementById("confirm-hex");
const colorGrid = document.getElementById("color-grid");

function createColorBlock(color) {
  const colorBlock = document.createElement("div");
  colorBlock.className = "w-8 h-8 rounded border-2 border-gray-300";
  colorBlock.style.backgroundColor = color.toHexString();
  return colorBlock;
}

function updatePalette() {
  colorGrid.innerHTML = "";
  const baseColor = tinycolor(hexInput.value);
  const palette = generateMaterialPalette(baseColor);
  for (const color of palette) {
    const colorBlock = createColorBlock(color);
    colorGrid.appendChild(colorBlock);
  }
}


colorPicker.on("color:change", (color) => {
  hexInput.value = color.hexString;
  updatePalette();
});

confirmHexButton.addEventListener("click", updatePalette);

hexInput.value = colorPicker.color.hexString;
updatePalette();

function generateMaterialPalette(baseColor) {
  const colorLuminance = baseColor.clone().getLuminance();
  const step = (colorLuminance > 0.5) ? -0.1 : 0.1;
  
  const palette = [];
  const index500 = 4;
  for (let i = 0; i < 9; i++) {
    const shade = baseColor.clone().lighten(step * (i - index500) * 10);
    palette.push(shade);
  }
  return palette;
}


    