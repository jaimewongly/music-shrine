// make glow stronger

// make the glows randomly timed for each bulb
const lightPositions = [
  [18, 37.25],
  [22, 42.5],
  [23, 48.5],
  [29, 53],
  [19, 58.75],
  [24, 64.5],
  [35.75, 67.5],
  [39.5, 64],
  [53.25, 67.25],
  [65, 63],
  [74, 67.25],
  [83.5, 63.5],
  [85, 60.75],
  [91, 53.5],
  [88, 46],
  [80, 34.5],
  [64, 32.5],
  [60, 35.5],
  [46.75, 31.75],
  [29.5, 33.75],
];

lightPositions.forEach(([top, left]) => {
  const bulb = document.createElement("span");
  bulb.classList.add("bulb");
  bulb.classList.add("yellow");

  // Random animation delay and duration
  //const delay = Math.random() * 3; // delay between 0-3 seconds
  const delay = 0;
  //const duration = 2 + Math.random() * 2; // duration between 1-3 seconds
  const duration = 3;

  bulb.style.top = `${top}%`;
  bulb.style.left = `${left}%`;
  bulb.style.animationDelay = `${delay}s`;
  bulb.style.animationDuration = `${duration}s`;

  document.body.appendChild(bulb);
});
