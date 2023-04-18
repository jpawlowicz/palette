function createColorDiv(color, index) {
    const div = document.createElement('div');
    div.className = 'color-box';
    div.style.backgroundColor = color.toCSS();
    div.style.color = index > 600 ? 'white' : 'black';
    div.textContent = `${index}`;
    return div;
}

function generatePalette(baseColor) {
    const container = document.getElementById('color-grid');
    container.innerHTML = '';

    const color = new Color(baseColor);
    const shades = [100, 200, 300, 400, 500, 600, 700, 800, 900];

    for (const shade of shades) {
        const c = color.darken(1 - shade / 1000);
        container.appendChild(createColorDiv(c, shade));
    }
}

const colorPicker = new iro.ColorPicker("#color-picker", {
    width: 300,
    color: "#f06",
});

colorPicker.on("color:change", function (color) {
    generatePalette(color.hexString);
});

generatePalette(colorPicker.color.hexString);
