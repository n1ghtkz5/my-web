const MY_DISCORD_ID = '1398673050580422776';
const ENABLE_LIVE_DISCORD_SYNC = true;
const MY_BOT_API_URL = 'https://mup9ypzruw.apps.bot-hosting.cloud/api/presence'; 

const TYPING_PHRASES = [
  "n1ghtkz5 on top",
  "abbys.site owner",
  "lost in the digital void...",
  "too far ahead...",
  "coding something fire...",
  "staying lowkey...",
  "no second chances."
];

const BACKGROUNDS = [
  "./assets/Backgrounds/Background1.gif",
  "./assets/Backgrounds/Background2.png",
  "./assets/Backgrounds/Background3.gif",
  "./assets/Backgrounds/Background4.jpg",
  "./assets/Backgrounds/Background5.gif",
  "./assets/Backgrounds/Background6.gif",
  "./assets/Backgrounds/Background7.gif",
  "./assets/Backgrounds/Background8.gif"
];

const PLAYLIST = [
  { title: "AMBNT", src: "./assets/Music/AMBNT.mp3" },
  { title: "Babyxsosa", src: "./assets/Music/Babyxsosa.mp3" },
  { title: "DaBaby", src: "./assets/Music/DaBaby.mp3" },
  { title: "Doll", src: "./assets/Music/Doll .mp3" },
  { title: "LEGACY", src: "./assets/Music/LEGACY.mp3" },
  { title: "Swang", src: "./assets/Music/Swang.mp3" },
  { title: "Syko", src: "./assets/Music/Syko.mp3" },
  { title: "tap", src: "./assets/Music/tap.mp3" }
];

document.addEventListener('DOMContentLoaded', () => {

  const enterScreen = document.getElementById('enter-screen');
  const bioCardWrapper = document.getElementById('bio-card-wrapper');
  const bioCard = document.getElementById('bio-card');
  const customCrosshair = document.getElementById('custom-crosshair');
  const bannerTypingTitle = document.getElementById('banner-typing-title');

  const bgAudio = document.getElementById('bg-audio');
  const btnNextSong = document.getElementById('btn-next-song');
  const btnVolumeToggle = document.getElementById('btn-volume-toggle');
  const volumeSlider = document.getElementById('volume-slider');
  const iconVolume = document.getElementById('icon-volume');
  const iconMuted = document.getElementById('icon-muted');
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
      if (PLAYLIST[lastTrackIndex]) {
        showSongToast(PLAYLIST[lastTrackIndex].title);
      }
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

    document.title = "a";

    function step() {
      if (isDeleting) {
        index--;
      } else {
        index++;
      }

      const currentText = SITE_NAME.substring(0, index);
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

  let toastTimer = null;

  function showSongToast(songTitle) {
    const toastElem = document.getElementById('song-toast');
    const toastTitleElem = document.getElementById('toast-song-title');

    if (toastElem && toastTitleElem) {
      toastTitleElem.textContent = songTitle;
      toastElem.classList.add('show');

      if (toastTimer) clearTimeout(toastTimer);

      toastTimer = setTimeout(() => {
        toastElem.classList.remove('show');
      }, 1800);
    }
  }

  function setRandomTrack(shouldShowToast = false) {
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

      if (shouldShowToast && hasEntered) {
        showSongToast(track.title);
      }
    }
  }

  function setRandomBackground() {
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
        if (audioEqualizer) audioEqualizer.classList.add('playing');
      }).catch(err => {
        console.log('Audio playback error:', err);
        if (audioEqualizer) audioEqualizer.classList.remove('playing');
      });
    }
  }

  function pauseAudio() {
    bgAudio.pause();
    if (audioEqualizer) audioEqualizer.classList.remove('playing');
  }

  if (btnNextSong) {
    btnNextSong.addEventListener('click', (e) => {
      e.stopPropagation();
      setRandomTrack(true);
      playAudio();
    });
  }

  const customVolumeTrack = document.getElementById('custom-volume-track');
  const customVolumeFill = document.getElementById('custom-volume-fill');
  const customVolumeThumb = document.getElementById('custom-volume-thumb');

  let isDraggingVolume = false;

  function updateVolumeUI(percent) {
    if (customVolumeFill) customVolumeFill.style.width = `${percent * 100}%`;
    if (customVolumeThumb) customVolumeThumb.style.left = `${percent * 100}%`;
  }

  function updateVolumeFromEvent(e) {
    if (!customVolumeTrack) return;
    const rect = customVolumeTrack.getBoundingClientRect();
    let offsetX = e.clientX - rect.left;
    let percent = offsetX / rect.width;
    if (percent < 0) percent = 0;
    if (percent > 1) percent = 1;

    bgAudio.volume = percent;
    bgAudio.muted = (percent === 0);
    if (percent > 0) lastVolume = percent;

    updateVolumeUI(percent);

    if (percent === 0) {
      iconVolume.style.display = 'none';
      iconMuted.style.display = 'block';
    } else {
      iconVolume.style.display = 'block';
      iconMuted.style.display = 'none';
    }
  }

  if (customVolumeTrack) {
    customVolumeTrack.addEventListener('mousedown', (e) => {
      e.stopPropagation();
      isDraggingVolume = true;
      updateVolumeFromEvent(e);
    });

    customVolumeTrack.addEventListener('touchstart', (e) => {
      e.stopPropagation();
      isDraggingVolume = true;
      if (e.touches && e.touches[0]) {
        updateVolumeFromEvent(e.touches[0]);
      }
    }, { passive: true });

    window.addEventListener('mousemove', (e) => {
      if (isDraggingVolume) {
        updateVolumeFromEvent(e);
      }
    });

    window.addEventListener('touchmove', (e) => {
      if (isDraggingVolume && e.touches && e.touches[0]) {
        updateVolumeFromEvent(e.touches[0]);
      }
    }, { passive: true });

    window.addEventListener('mouseup', () => {
      isDraggingVolume = false;
    });

    window.addEventListener('touchend', () => {
      isDraggingVolume = false;
    });
  }

  btnVolumeToggle.addEventListener('click', (e) => {
    e.stopPropagation();

    // Toggle volume panel visibility on touch devices
    const volumePanel = document.getElementById('volume-slider-panel');
    if (volumePanel && window.matchMedia('(pointer: coarse)').matches) {
      volumePanel.classList.toggle('active');
    }

    if (bgAudio.muted || bgAudio.volume === 0) {
      bgAudio.muted = false;
      const targetVol = lastVolume > 0 ? lastVolume : 0.5;
      bgAudio.volume = targetVol;
      updateVolumeUI(targetVol);
      iconVolume.style.display = 'block';
      iconMuted.style.display = 'none';
    } else {
      lastVolume = bgAudio.volume;
      bgAudio.muted = true;
      updateVolumeUI(0);
      iconVolume.style.display = 'none';
      iconMuted.style.display = 'block';
    }
  });

  bgAudio.addEventListener('ended', () => {
    setRandomTrack();
    playAudio();
  });

  setRandomBackground();
  setRandomTrack();
  let cachedDiscordState = {
    avatar: './assets/Pfp/pfp.gif',
    username: 'n1ghtkz5',
    globalName: 'n1ghtkz5',
    status: 'offline',
    spotify: null,
    game: null,
    activities: []
  };

  function applyDiscordData(newData) {
    if (!newData) return;

    if (newData.avatar) cachedDiscordState.avatar = newData.avatar;
    if (newData.username) cachedDiscordState.username = newData.username;
    if (newData.globalName) cachedDiscordState.globalName = newData.globalName;
    if (newData.status) cachedDiscordState.status = newData.status;

    if (newData.spotify !== undefined) cachedDiscordState.spotify = newData.spotify;
    if (newData.game !== undefined) cachedDiscordState.game = newData.game;
    if (newData.activities !== undefined) cachedDiscordState.activities = newData.activities;

    const userObj = cachedDiscordState;

    topAvatar.src = './assets/Pfp/pfp.gif';

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

    const rawStatus = (userObj.status || 'offline').toLowerCase();
    const finalStatus = (rawStatus === 'invisible' || rawStatus === 'offline') ? 'offline' : rawStatus;

    statusDot.className = `status-indicator ${finalStatus}`;
    innerStatusText.textContent = finalStatus.toUpperCase();

    if (finalStatus === 'idle') {
      statusDot.innerHTML = '<img src="./assets/Status/idle.png" alt="Idle" class="status-png-img">';
    } else if (finalStatus === 'dnd') {
      statusDot.innerHTML = '<img src="./assets/Status/status_dnd.svg" alt="DnD" class="status-svg-img">';
    } else if (finalStatus === 'online') {
      statusDot.innerHTML = '<img src="./assets/Status/status_online.svg" alt="Online" class="status-svg-img">';
    } else {
      statusDot.innerHTML = '<img src="./assets/Status/status_offline.svg" alt="Offline" class="status-svg-img">';
    }

    const badgesContainer = document.querySelector('.badges-inline-container');
    if (badgesContainer) {
      badgesContainer.innerHTML = `
        <div class="badge-item" title="Discord Nitro"><img src="./assets/Icones/discordnitro.png" alt="Discord Nitro" class="badge-icon"></div>
        <div class="badge-item" title="Quest Completed"><img src="./assets/Icones/questcompleted.png" alt="Quest Completed" class="badge-icon"></div>
        <div class="badge-item" title="Orb"><img src="./assets/Icones/orb.svg" alt="Orb Badge" class="badge-icon"></div>
        <div class="badge-item" title="Gifted Patron"><img src="./assets/Icones/giftedpatron.png" alt="Gifted Patron" class="badge-icon"></div>
      `;
    }

    const iconSpan = document.getElementById('activity-icon-container');

    let gameName = null;
    let gameDetails = '';

    if (userObj.game && userObj.game.name) {
      gameName = userObj.game.name;
      gameDetails = userObj.game.details || userObj.game.state || '';
    } else if (userObj.activities && Array.isArray(userObj.activities) && userObj.activities.length > 0) {
      const act = userObj.activities.find(a => typeof a === 'string' && a.toLowerCase() !== 'spotify' && a !== userObj.customStatus);
      if (act) {
        gameName = act;
      }
    }

    if (gameName) {
      spotifyActivity.style.display = 'flex';
      let gameText = `Playing ${gameName}`;
      if (gameDetails) {
        gameText += ` (${gameDetails})`;
      }
      if (iconSpan) {
        iconSpan.innerHTML = '<span class="activity-emoji-icon">🎮</span>';
      }
      spotifyText.textContent = gameText;
    } else if (userObj.spotify) {
      spotifyActivity.style.display = 'flex';
      if (iconSpan) {
        iconSpan.innerHTML = `
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="#1DB954" class="spotify-mini-icon">
            <path d="M12 0C5.376 0 0 5.376 0 12s5.376 12 12 12 12-5.376 12-12S18.624 0 12 0zm5.521 17.34c-.24.359-.66.48-1.021.24-2.82-1.74-6.36-2.101-10.561-1.141-.418.122-.779-.179-.899-.539-.12-.421.18-.78.54-.9 4.56-1.021 8.52-.6 11.64 1.32.42.18.479.659.301 1.02zm1.48-3.3c-.301.42-.841.6-1.262.3-3.239-1.98-8.159-2.58-11.939-1.38-.479.12-1.02-.12-1.14-.6-.12-.48.12-1.021.6-1.141 C9.6 9.9 15 10.561 18.72 12.84c.361.181.54.78.281 1.2zm.12-3.36C15.24 8.4 8.82 8.16 5.16 9.301c-.6.18-1.2-.18-1.38-.72-.18-.6.18-1.2.72-1.38 4.26-1.26 11.28-1.02 15.72 1.62.54.3.72 1.02.42 1.56-.3.42-1.02.6-1.56.3z"/>
          </svg>`;
      }
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
          let avatarUrl = './assets/Pfp/pfp.gif';
          if (d.discord_user && d.discord_user.avatar) {
            const ext = d.discord_user.avatar.startsWith('a_') ? 'gif' : 'png';
            avatarUrl = `https://cdn.discordapp.com/avatars/${d.discord_user.id}/${d.discord_user.avatar}.${ext}?size=256`;
          }

          let gameActivity = null;
          if (d.activities && Array.isArray(d.activities)) {
            const found = d.activities.find(a => a.name && a.name.toLowerCase() !== 'spotify' && a.type !== 4);
            if (found) {
              gameActivity = {
                name: found.name,
                details: found.details || '',
                state: found.state || ''
              };
            }
          }

          applyDiscordData({
            avatar: avatarUrl,
            username: d.discord_user ? d.discord_user.username : 'n1ghtkz5',
            globalName: d.discord_user ? d.discord_user.global_name : 'n1ghtkz5',
            status: d.discord_status || 'offline',
            spotify: d.spotify ? { song: d.spotify.song, artist: d.spotify.artist } : d.spotify,
            game: gameActivity
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
          const updateObj = {
            avatar: res.user.avatar,
            username: res.user.username,
            globalName: res.user.globalName,
            status: res.user.status
          };
          if (res.user.spotify !== undefined) updateObj.spotify = res.user.spotify;
          if (res.user.game !== undefined) updateObj.game = res.user.game;
          if (res.user.activities !== undefined) updateObj.activities = res.user.activities;
          if (res.user.customStatus !== undefined) updateObj.customStatus = res.user.customStatus;
          applyDiscordData(updateObj);
        }
      })
      .catch(err => {
        console.log('Custom bot API fallback:', err);
      });
  }

  if (ENABLE_LIVE_DISCORD_SYNC) {
    fetchLanyardRest(MY_DISCORD_ID);
    setInterval(() => fetchLanyardRest(MY_DISCORD_ID), 3000);

    if (MY_BOT_API_URL && MY_BOT_API_URL.length > 5) {
      fetchCustomBotApi(MY_BOT_API_URL);
      setInterval(() => fetchCustomBotApi(MY_BOT_API_URL), 5000);
    }
  }

});