// make glow stronger

// make the glows randomly timed for each bulb

const lightPositions = [
  [10, 5],
  [20, 6],
  [30, 4],
  [40, 5],
  [50, 6],
];

const container = document.querySelector(".light-overlay");

lightPositions.forEach(([x, y]) => {
  const bulb = document.createElement("span");
  bulb.classList.add("bulb");

  const colors = ["red", "yellow", "green", "blue", "pink"];
  bulb.classList.add(colors[1]);

  bulb.style.position = "absolute";
  bulb.style.left = `${x}%`;
  bulb.style.top = `${y}%`;

  container.appendChild(bulb);
});
