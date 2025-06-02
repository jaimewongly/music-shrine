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

async function submitArtist() {
  const artistName = document.getElementById("artist-input").value;
  const tokenRes = await fetch("/api/token");
  const tokenData = await tokenRes.json();
  const { token } = tokenData;
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
  fetchAlbums(artistId, token);
  fetchTracks(artistId, token);
}

async function fetchAlbums(artistId, token) {
  const response = await fetch(
    `https://api.spotify.com/v1/artists/${artistId}/albums?include_groups=album&limit=20`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  const data = await response.json();
  clearInterval(cycleAlbumCovers);
  cycleAlbumCovers(data.items);
}

async function cycleAlbumCovers(albums) {
  let currentIndex = 1;

  updateAlbumCover(albums[0]);

  setInterval(() => {
    updateAlbumCover(albums[currentIndex]);
    currentIndex = (currentIndex + 1) % albums.length;
  }, 3500);
}

function updateAlbumCover(album) {
  const albumCover = album?.images[0]?.url;
  if (albumCover) {
    document.getElementById(
      "album-placeholder"
    ).style.backgroundImage = `url(${albumCover})`;
  } else {
    console.warn("No album covers found");
  }
}

async function fetchTracks(artistId, token) {
  const response = await fetch(
    `https://api.spotify.com/v1/artists/${artistId}/top-tracks?market=US`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  const data = await response.json();
  cycleTracks(data.tracks);
}

async function cycleTracks(tracks) {
  const playableTracks = tracks.filter((track) => track.preview_url);
  playNextTrack(playableTracks);
}

let audio;
let trackIndex = 0;

function playNextTrack(tracks) {
  if (audio) audio.pause();
  const track = tracks[trackIndex];
  audio = new Audio(track.preview_url);
  audio.play();

  trackIndex = (trackIndex + 1) % tracks.length;

  // Set up to play the next one after 30 seconds (or when the preview ends)
  setTimeout(() => playNextTrack(tracks), 30000);
}
