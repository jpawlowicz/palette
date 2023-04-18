const colorPicker = new iro.ColorPicker("#iro-color-picker", {
  width: 250,
  color: "#f00",
});

colorPicker.on("color:change", (color) => {
  document.getElementById("iro-color-value").value = color.hexString;
  const palette = generatePalette(color);
  displayPalette(palette);
});

function generatePalette(baseColor) {
  const shades = [];
  for (let i = 0; i < 9; i++) {
    const luminance = 0.1 * i;
    const shade = baseColor.clone().luminance(luminance).hexString;
    shades.push(shade);
  }
  return shades;
}

function displayPalette(palette) {
  const container = document.getElementById("palette-container");
  container.innerHTML = "";
  for (let i = 0; i < palette.length; i++) {
    const shade = palette[i];
    const card = document.createElement("div");
    card.className =
      "w-32 h-32 bg-white p-2 m-2 rounded shadow flex flex-col justify-between";
    const colorFill = document.createElement("div");
    colorFill.style.backgroundColor = shade;
    colorFill.className = "w-full h-20 rounded";
    const value = document.createElement("div");
    value.className = "text-lg font-bold";
    value.innerText = shade;
    const description = document.createElement("div");
    description.className = "text-sm";
    description.innerText = `Shade ${i + 1}`;
    card.appendChild(colorFill);
    card.appendChild(value);
    card.appendChild(description);
    container.appendChild(card);
  }
}

const initialColor = colorPicker.color;
const initialPalette = generatePalette(initialColor);
displayPalette(initialPalette);

const inputField = document.getElementById("iro-color-value");
inputField.addEventListener("change", (event) => {
  const hexValue = event.target.value;
  if (/^#[0-9A-F]{6}$/i.test(hexValue)) {
    colorPicker.color.hexString = hexValue;
  }
});

const submitButton = document.getElementById("submit-color");
submitButton.addEventListener("click", () => {
  const hexValue = inputField.value;
  if (/^#[0-9A-F]{6}$/i.test(hexValue)) {
    colorPicker.color.hexString = hexValue;
  }
});
