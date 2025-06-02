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
  const duration = 3;
  bulb.style.top = `${top}%`;
  bulb.style.left = `${left}%`;
  bulb.style.animationDuration = `${duration}s`;
  document.body.appendChild(bulb);
});

function submitArtist() {
  const artist = document.getElementById("artist-input").value;
  fetchAlbums(artist);
}

async function fetchAlbums(artistName) {
  const tokenRes = await fetch("/api/token");
  const tokenData = await tokenRes.json();
  const { token } = tokenData;
  console.log("Token response data:", tokenData);
  console.log("Sending token to Spotify:", token);

  const searchRes = await fetch(
    `https://api.spotify.com/v1/search?q=${encodeURIComponent(
      artistName
    )}&type=artist`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  const searchData = await searchRes.json();
  const artistId = searchData.artists.items[0]?.id;
  if (!artistId) {
    console.error("Artist not found");
    return;
  }

  const albumsRes = await fetch(
    `https://api.spotify.com/v1/artists/${artistId}/albums?include_groups=album&limit=10`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  const albumsData = await albumsRes.json();
  // Stop any existing album cover cycling
  clearInterval(cycleAlbumCovers);

  cycleAlbumCovers(albumsData.items);
  // Uncomment the following lines if you want to set a static album cover as a placeholder
  // const firstAlbumCover = albumsData.items[0]?.images[0]?.url;

  // if (firstAlbumCover) {
  //   document.getElementById(
  //     "album-placeholder"
  //   ).style.backgroundImage = `url(${firstAlbumCover})`;
  //   document.getElementById("album-placeholder").style.backgroundSize = "cover";
  //   document.getElementById("album-placeholder").style.backgroundPosition =
  //     "center";
  // } else {
  //   console.warn("No album covers found");
  // }
}

async function cycleAlbumCovers(albums) {
  let currentIndex = 0;
  setInterval(() => {
    const albumCover = albums[currentIndex].images[0]?.url;
    if (albumCover) {
      document.getElementById(
        "album-placeholder"
      ).style.backgroundImage = `url(${albumCover})`;
      document.getElementById("album-placeholder").style.backgroundSize =
        "cover";
      document.getElementById("album-placeholder").style.backgroundPosition =
        "center";
    }
    currentIndex = (currentIndex + 1) % albums.length;
  }, 5000);
}
