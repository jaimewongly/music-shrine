// make glow stronger

// make the glows randomly timed for each bulb
const lightPositions = [
  [18, 30.2],
  [30, 40],
  [50, 60],
  // ...more positions
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
