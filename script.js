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
  const baseLuminance = baseColor.clone().getLuminance();
  const step = 0.1;

  const shadeLuminanceOffsets = {
    100: 0.85,
    200: 0.65,
    300: 0.45,
    400: 0.25,
    500: 0,
    600: -0.15,
    700: -0.3,
    800: -0.45,
    900: -0.6,
  };

  const palette = [];
  for (const shade in shadeLuminanceOffsets) {
    const targetLuminance = baseLuminance + shadeLuminanceOffsets[shade] * step;
    const adjustedColor = tinycolor.fromRatio({ l: targetLuminance, s: baseColor.toHsl().s, h: baseColor.toHsl().h });
    palette.push(adjustedColor);
  }

  return palette;
}



    