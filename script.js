const MY_DISCORD_ID = '1398673050580422776';
const ENABLE_LIVE_DISCORD_SYNC = true;
const MY_BOT_API_URL = 'https://mup9ypzruw.apps.bot-hosting.cloud/api/presence'; 

const TYPING_PHRASES = [
  "n1ghtkz5 on top",
  "Synap sex",
  "skibidi toilet",
  "coding something fire...",
  "draining..."
];

const BACKGROUNDS = [
  "./assets/background.gif",
  "./assets/bg_anime.gif",
  "./assets/bg_retro.gif",
  "./assets/bg_glitch.gif",
  "./assets/bg_lofi.gif",
  "./assets/bg_static.jpg"
];

const PLAYLIST = [
  { title: "#CERTIFIED (feat. DJ Ess)", src: "./assets/certified.mp3" },
  { title: "APRES-SKI", src: "./assets/apres_ski.mp3" },
  { title: "Clairo - Pretty Girl", src: "./assets/pretty_girl.mp3" },
  { title: "Perník", src: "./assets/pernik.mp3" },
  { title: "Metro Boomin - Trance", src: "./assets/trance.mp3" },
  { title: "MAD", src: "./assets/mad.mp3" }
];

document.addEventListener('DOMContentLoaded', () => {

  const enterScreen = document.getElementById('enter-screen');
  const bioCardWrapper = document.getElementById('bio-card-wrapper');
  const bioCard = document.getElementById('bio-card');
  const customCrosshair = document.getElementById('custom-crosshair');
  const bannerTypingTitle = document.getElementById('banner-typing-title');
  const viewCountNumber = document.getElementById('view-count-number');

  const bgAudio = document.getElementById('bg-audio');
  const btnPlayPause = document.getElementById('btn-play-pause');
  const btnVolumeToggle = document.getElementById('btn-volume-toggle');
  const volumeSlider = document.getElementById('volume-slider');
  const iconVolume = document.getElementById('icon-volume');
  const iconMuted = document.getElementById('icon-muted');
  const iconPlay = document.getElementById('icon-play');
  const iconPause = document.getElementById('icon-pause');
  const audioEqualizer = document.getElementById('audio-equalizer');
  const currentSongTitle = document.getElementById('current-song-title');

  const bgGif = document.getElementById('bg-gif');

  const topAvatar = document.getElementById('top-avatar');
  const innerAvatar = document.getElementById('inner-avatar');
  const profileUsername = document.getElementById('profile-username');
  const innerUsername = document.getElementById('inner-username');
  const hoverUsername = document.getElementById('hover-username');
  const profileStatusText = document.getElementById('profile-status-text');
  const innerStatusText = document.getElementById('inner-status-text');
  const statusDot = document.getElementById('status-dot');
  const spotifyActivity = document.getElementById('spotify-activity');
  const spotifyText = document.getElementById('spotify-text');

  let hasEntered = false;

  async function initUniqueViewCounter() {
    const VISITED_KEY = 'abbys_unique_visitor_v2';
    const LOCAL_VIEWS_KEY = 'abbys_total_unique_views_v2';
    const hasVisited = localStorage.getItem(VISITED_KEY);

    try {
      const countUrl = 'https://api.codetabs.com/v1/counter?key=abbys_site_n1ghtkz5';
      const response = await fetch(countUrl);
      const data = await response.json();
      
      let countVal = null;
      if (typeof data === 'number') {
        countVal = data;
      } else if (data && typeof data.count === 'number') {
        countVal = data.count;
      }

      if (countVal !== null && countVal > 0) {
        viewCountNumber.textContent = Number(countVal).toLocaleString();
        localStorage.setItem(LOCAL_VIEWS_KEY, countVal.toString());
        localStorage.setItem(VISITED_KEY, 'true');
        return;
      }
    } catch (e) {
      console.log('Primary counter API fallback:', e);
    }

    try {
      const response = await fetch('https://api.counterapi.dev/v1/abbys_site_v3/views/up');
      const data = await response.json();
      if (data && typeof data.count === 'number') {
        viewCountNumber.textContent = Number(data.count).toLocaleString();
        localStorage.setItem(LOCAL_VIEWS_KEY, data.count.toString());
        localStorage.setItem(VISITED_KEY, 'true');
        return;
      }
    } catch (e) {}

    let currentViews = parseInt(localStorage.getItem(LOCAL_VIEWS_KEY) || '1', 10);
    if (!hasVisited) {
      currentViews += 1;
      localStorage.setItem(LOCAL_VIEWS_KEY, currentViews.toString());
      localStorage.setItem(VISITED_KEY, 'true');
    }
    viewCountNumber.textContent = currentViews.toLocaleString();
  }

  initUniqueViewCounter();

  window.addEventListener('mousemove', (e) => {
    if (customCrosshair) {
      customCrosshair.style.transform = `translate3d(${e.clientX}px, ${e.clientY}px, 0) translate(-50%, -50%)`;
    }
  }, { passive: true });

  enterScreen.addEventListener('click', () => {
    if (!hasEntered) {
      hasEntered = true;
      enterScreen.classList.add('entered');
      playAudio();
      startBannerTypewriter();
    }
  });

  const MAX_TILT = 14;

  if (bioCardWrapper && bioCard) {
    bioCardWrapper.addEventListener('mousemove', (e) => {
      bioCard.classList.remove('resetting');

      const rect = bioCardWrapper.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      const centerX = rect.width / 2;
      const centerY = rect.height / 2;

      const rotateX = -((y - centerY) / centerY) * MAX_TILT;
      const rotateY = ((x - centerX) / centerX) * MAX_TILT;

      bioCard.style.transform = `perspective(1000px) rotateX(${rotateX.toFixed(2)}deg) rotateY(${rotateY.toFixed(2)}deg) scale3d(1.025, 1.025, 1)`;
    });

    bioCardWrapper.addEventListener('mouseleave', () => {
      bioCard.classList.add('resetting');
      bioCard.style.transform = `perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)`;
    });
  }

  const SITE_NAME = "abbys.site";

  function startBannerTypewriter() {
    let index = 0;
    let isDeleting = false;

    bannerTypingTitle.textContent = "";
    document.title = "a";

    function step() {
      if (isDeleting) {
        index--;
      } else {
        index++;
      }

      const currentText = SITE_NAME.substring(0, index);
      bannerTypingTitle.textContent = currentText;
      document.title = currentText.length > 0 ? currentText : "a";

      let delay = isDeleting ? 85 : 150;

      if (!isDeleting && index === SITE_NAME.length) {
        delay = 2000;
        isDeleting = true;
      } else if (isDeleting && index === 0) {
        delay = 450;
        isDeleting = false;
      }

      setTimeout(step, delay);
    }
    step();
  }

  let phraseIndex = 0;
  let charIndex = 0;
  let isDeletingStatus = false;
  const TYPE_SPEED = 90;
  const DELETE_SPEED = 45;
  const PAUSE_END = 1800;

  function typeWriterStep() {
    const currentPhrase = TYPING_PHRASES[phraseIndex];

    if (isDeletingStatus) {
      charIndex--;
      profileStatusText.textContent = currentPhrase.substring(0, charIndex);
    } else {
      charIndex++;
      profileStatusText.textContent = currentPhrase.substring(0, charIndex);
    }

    let nextDelay = isDeletingStatus ? DELETE_SPEED : TYPE_SPEED;

    if (!isDeletingStatus && charIndex === currentPhrase.length) {
      nextDelay = PAUSE_END;
      isDeletingStatus = true;
    } else if (isDeletingStatus && charIndex === 0) {
      isDeletingStatus = false;
      phraseIndex = (phraseIndex + 1) % TYPING_PHRASES.length;
      nextDelay = 400;
    }

    setTimeout(typeWriterStep, nextDelay);
  }

  setTimeout(typeWriterStep, 600);

  let lastVolume = 0.5;
  const LOCAL_BG_KEY = 'abbys_last_bg_index';
  const LOCAL_TRACK_KEY = 'abbys_last_track_index';

  let lastTrackIndex = localStorage.getItem(LOCAL_TRACK_KEY) !== null 
    ? parseInt(localStorage.getItem(LOCAL_TRACK_KEY), 10) 
    : -1;

  let lastBgIndex = localStorage.getItem(LOCAL_BG_KEY) !== null 
    ? parseInt(localStorage.getItem(LOCAL_BG_KEY), 10) 
    : -1;

  function setRandomTrackAndBackground() {
    if (PLAYLIST.length > 0) {
      let randomTrackIndex;
      do {
        randomTrackIndex = Math.floor(Math.random() * PLAYLIST.length);
      } while (PLAYLIST.length > 1 && randomTrackIndex === lastTrackIndex);

      lastTrackIndex = randomTrackIndex;
      try {
        localStorage.setItem(LOCAL_TRACK_KEY, randomTrackIndex.toString());
      } catch (e) {}

      const track = PLAYLIST[randomTrackIndex];
      bgAudio.src = track.src;
      bgAudio.load();
      currentSongTitle.textContent = track.title;
    }

    if (BACKGROUNDS.length > 0) {
      let randomBgIndex;
      do {
        randomBgIndex = Math.floor(Math.random() * BACKGROUNDS.length);
      } while (BACKGROUNDS.length > 1 && randomBgIndex === lastBgIndex);

      lastBgIndex = randomBgIndex;
      try {
        localStorage.setItem(LOCAL_BG_KEY, randomBgIndex.toString());
      } catch (e) {}

      const randomBgFile = BACKGROUNDS[randomBgIndex];
      if (bgGif) {
        bgGif.onerror = () => {
          console.log('Background load error, falling back to background.gif');
          bgGif.src = './assets/background.gif';
        };
        bgGif.src = randomBgFile;
      }
    }
  }

  function playAudio() {
    if (bgAudio.readyState === 0) {
      bgAudio.load();
    }
    const playPromise = bgAudio.play();
    if (playPromise !== undefined) {
      playPromise.then(() => {
        iconPlay.style.display = 'none';
        iconPause.style.display = 'block';
        audioEqualizer.classList.add('playing');
      }).catch(err => {
        console.log('Audio playback error:', err);
        iconPlay.style.display = 'block';
        iconPause.style.display = 'none';
        audioEqualizer.classList.remove('playing');
      });
    }
  }

  function pauseAudio() {
    bgAudio.pause();
    iconPlay.style.display = 'block';
    iconPause.style.display = 'none';
    audioEqualizer.classList.remove('playing');
  }

  function togglePlayPause() {
    if (bgAudio.paused) {
      playAudio();
    } else {
      pauseAudio();
    }
  }

  btnPlayPause.addEventListener('click', (e) => {
    e.stopPropagation();
    togglePlayPause();
  });

  btnVolumeToggle.addEventListener('click', (e) => {
    e.stopPropagation();
    if (bgAudio.muted || bgAudio.volume === 0) {
      bgAudio.muted = false;
      bgAudio.volume = lastVolume > 0 ? lastVolume : 0.5;
      volumeSlider.value = bgAudio.volume;
      iconVolume.style.display = 'block';
      iconMuted.style.display = 'none';
    } else {
      lastVolume = bgAudio.volume;
      bgAudio.muted = true;
      volumeSlider.value = 0;
      iconVolume.style.display = 'none';
      iconMuted.style.display = 'block';
    }
  });

  volumeSlider.addEventListener('input', (e) => {
    const val = parseFloat(e.target.value);
    bgAudio.volume = val;
    if (val === 0) {
      bgAudio.muted = true;
      iconVolume.style.display = 'none';
      iconMuted.style.display = 'block';
    } else {
      bgAudio.muted = false;
      lastVolume = val;
      iconVolume.style.display = 'block';
      iconMuted.style.display = 'none';
    }
  });

  bgAudio.addEventListener('ended', () => {
    setRandomTrackAndBackground();
    playAudio();
  });

  setRandomTrackAndBackground();

  function applyDiscordData(userObj) {
    if (!userObj) return;

    topAvatar.src = './assets/pfp.gif';

    if (userObj.avatar && userObj.avatar.length > 5) {
      innerAvatar.src = userObj.avatar;
    } else {
      fetchLanyardDirectAvatar();
    }
    
    innerAvatar.onerror = () => {
      fetchLanyardDirectAvatar();
    };

    if (userObj.username) {
      innerUsername.textContent = '𝔗';
      if (hoverUsername) {
        hoverUsername.textContent = `@${userObj.username}`;
      }
    }

    const statusStr = (userObj.status || 'idle').toLowerCase();
    statusDot.className = `status-indicator ${statusStr}`;
    innerStatusText.textContent = statusStr.toUpperCase();

    if (statusStr === 'idle') {
      statusDot.innerHTML = '<img src="./assets/idle.png" alt="Idle" class="status-png-img">';
    } else if (statusStr === 'dnd') {
      statusDot.innerHTML = '<img src="./assets/status_dnd.svg" alt="DnD" class="status-svg-img">';
    } else if (statusStr === 'online') {
      statusDot.innerHTML = '<img src="./assets/status_online.svg" alt="Online" class="status-svg-img">';
    } else {
      statusDot.innerHTML = '<img src="./assets/status_offline.svg" alt="Offline" class="status-svg-img">';
    }

    const badgesContainer = document.querySelector('.badges-inline-container');
    if (badgesContainer) {
      badgesContainer.innerHTML = `
        <div class="badge-item" title="Discord Nitro"><img src="./assets/discordnitro.png" alt="Discord Nitro" class="badge-icon"></div>
        <div class="badge-item" title="Quest Completed"><img src="./assets/questcompleted.png" alt="Quest Completed" class="badge-icon"></div>
        <div class="badge-item" title="Orb"><img src="./assets/orb.svg" alt="Orb Badge" class="badge-icon"></div>
        <div class="badge-item" title="Gifted Patron"><img src="./assets/giftedpatron.png" alt="Gifted Patron" class="badge-icon"></div>
      `;
    }

    if (userObj.spotify) {
      spotifyActivity.style.display = 'flex';
      spotifyText.textContent = `Listening to ${userObj.spotify.song} by ${userObj.spotify.artist}`;
    } else {
      spotifyActivity.style.display = 'none';
    }
  }

  function fetchLanyardDirectAvatar() {
    fetch(`https://api.lanyard.rest/v1/users/${MY_DISCORD_ID}`)
      .then(res => res.json())
      .then(res => {
        if (res.success && res.data && res.data.discord_user && res.data.discord_user.avatar) {
          const u = res.data.discord_user;
          const ext = u.avatar.startsWith('a_') ? 'gif' : 'png';
          innerAvatar.src = `https://cdn.discordapp.com/avatars/${u.id}/${u.avatar}.${ext}?size=256`;
        }
      })
      .catch(e => console.log('Avatar direct fetch:', e));
  }

  function fetchLanyardRest(userId) {
    fetch(`https://api.lanyard.rest/v1/users/${userId}`)
      .then(res => res.json())
      .then(res => {
        if (res.success && res.data) {
          const d = res.data;
          let avatarUrl = './assets/pfp.gif';
          if (d.discord_user && d.discord_user.avatar) {
            const ext = d.discord_user.avatar.startsWith('a_') ? 'gif' : 'png';
            avatarUrl = `https://cdn.discordapp.com/avatars/${d.discord_user.id}/${d.discord_user.avatar}.${ext}?size=256`;
          }
          applyDiscordData({
            avatar: avatarUrl,
            username: d.discord_user ? d.discord_user.username : 'n1ghtkz5',
            globalName: d.discord_user ? d.discord_user.global_name : 'n1ghtkz5',
            status: d.discord_status || 'idle',
            spotify: d.spotify ? { song: d.spotify.song, artist: d.spotify.artist } : null
          });
        }
      })
      .catch(err => console.log('Lanyard fallback active:', err));
  }

  function fetchCustomBotApi(apiUrl) {
    fetch(apiUrl)
      .then(res => res.json())
      .then(res => {
        if (res && res.success && res.user) {
          applyDiscordData(res.user);
        }
      })
      .catch(err => {
        console.log('Custom bot API error, falling back to Lanyard:', err);
        fetchLanyardRest(MY_DISCORD_ID);
      });
  }

  if (ENABLE_LIVE_DISCORD_SYNC) {
    if (MY_BOT_API_URL && MY_BOT_API_URL.length > 5) {
      fetchCustomBotApi(MY_BOT_API_URL);
      setInterval(() => fetchCustomBotApi(MY_BOT_API_URL), 10000);
    } else {
      fetchLanyardRest(MY_DISCORD_ID);
      setInterval(() => fetchLanyardRest(MY_DISCORD_ID), 15000);
    }
  }

});
