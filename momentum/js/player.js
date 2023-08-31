import playList from './playList.js';


const nextBtnPlayer = document.querySelector('.play-next-player');
const nextBtn = document.querySelector('.play-next');
const prevBtn = document.querySelector('.play-prev');
const prevBtnPlayer = document.querySelector('.play-prev-player');
const play = document.querySelector('.play');
const playPlayer = document.querySelector('.play-player');
const playListUl = document.querySelector('.play-list');
const progressVolume = document.querySelector('#progress-volume');
const iconVolume = document.querySelector('.player-volume-icon');
const periodStart = document.querySelector('.player-controls-period-start');
const periodEnd = document.querySelector('.player-controls-period-end');
const someInput = document.querySelector('#progress-bar');
const player = document.querySelector('.player-controls-active');
const artist = document.querySelector('.player-controls-active-artist');

const audio = new Audio();
let isPlay = false;
let playNum = 0;
let periodLoad = 0;
let mute = false;
let volumeMax = 10;
localStorage.setItem('volume', 5)

function playAudio() {
  audio.src = playList[playNum].src;
  audio.currentTime = 0;
  audio.play();
  audio.volume = localStorage.getItem('volume') / volumeMax;
  isPlay = true;
  checkMark ();
  changeProgressBar();
  titleProgressBar();
  volumeProgressBar()

}

audio.addEventListener('ended', () => {
  playNext();
})



function changeProgressBar () {
const audioTime = Math.round(audio.currentTime);
const audioLength = Math.round(audio.duration);

periodStart.textContent = `${(Math.floor(audioTime/60)).toString().padStart(2, "0")}:${(audioTime % 60).toString().padStart(2, "0")}`;
if (! isNaN(audioLength) && periodLoad !== audioLength) {
    periodEnd.textContent = `${(Math.floor(audioLength/60)).toString().padStart(2, "0")}:${audioLength % 60}`;
    periodLoad = audioLength;
  }
someInput.value = audioTime;
someInput.max = audioLength;
someInput.addEventListener("input", () => {audio.currentTime = event.target.value;});

   setTimeout(changeProgressBar, 500);
}


function titleProgressBar() {
  player.style.visibility = 'visible';
  player.style.transform = 'translateX(0)';
  artist.textContent = playList[playNum].title;
}


function volumeProgressBar() {
  progressVolume.max = volumeMax;
  progressVolume.value = audio.volume * volumeMax;
  progressVolume.addEventListener("input", () => {
    localStorage.setItem('volume', audio.volume * volumeMax);
    audio.volume = event.target.value / volumeMax;
    if (localStorage.getItem('mute') === 'true') {
        muteVolume()
      }
    });

}

iconVolume.addEventListener('click', () => {muteVolume()})

function muteVolume () {
  if (localStorage.getItem('mute') === 'false') {
    iconVolume.classList.add('player-volume-icon-mute');
    audio.volume =  progressVolume.min;
    progressVolume.value = progressVolume.min;
    localStorage.setItem('mute', true);
  } else if (localStorage.getItem('mute') === 'true') {
    iconVolume.classList.remove('player-volume-icon-mute');
    audio.volume = localStorage.getItem('volume') / volumeMax;
    progressVolume.value = localStorage.getItem('volume');
    localStorage.setItem('mute', false);
  }
}



function pauseAudio() {
  audio.pause();
  isPlay = false;
}


play.addEventListener('click', () => {
        if (isPlay === false) {
            playAudio();
            localStorage.setItem('mute', mute);

        } else {
            pauseAudio();
        }
})


playPlayer.addEventListener('click', () => {
  if (isPlay === false) {
      playAudio();
      localStorage.setItem('mute', mute);

  } else {
      pauseAudio();
  }
})


function toggleBtn() {
    play.classList.toggle('pause');
    playPlayer.classList.toggle('pause');
  }

play.addEventListener('click', toggleBtn);
playPlayer.addEventListener('click', toggleBtn);



function playNext () {
  playNum < playList.length - 1 ? ++playNum : playNum = 0;
  playAudio()
  play.classList.add('pause');
  playPlayer.classList.add('pause');
  if (localStorage.getItem('mute') === 'false') {
    localStorage.setItem('mute', true)
    muteVolume()
  } else {
    localStorage.setItem('mute', false)
    muteVolume()
  }
}
nextBtn.addEventListener('click', playNext);
nextBtnPlayer.addEventListener('click', playNext);



function playPrev () {
  playNum > 0 ? --playNum : playNum = playList.length - 1;
  playAudio();
  play.classList.add('pause');
  playPlayer.classList.add('pause');
  if (localStorage.getItem('mute') === 'false') {
    localStorage.setItem('mute', true)
    muteVolume()
  } else {
    localStorage.setItem('mute', false)
    muteVolume()
  }
}
prevBtn.addEventListener('click', playPrev);
prevBtnPlayer.addEventListener('click', playPrev);

function playListContainer () {
   for (let i = 0; i < playList.length; i++) {
    let li = document.createElement('li');
    li.textContent = playList[i].title
    li.classList.add('play-item');
    playListUl.append(li)
   }
}

playListContainer()




function checkMark () {
  const playListUlAll = document.querySelectorAll('.play-item');
  playListUlAll.forEach((x, i) => {
    i === playNum ? x.classList.add('item-active') : x.classList.remove('item-active');
  })
}




const activeSong = document.querySelector('.play-list');

function songSelection () {
const activeSongAll = document.querySelectorAll('.play-item');

  activeSongAll.forEach((x, i) => {
    if (playList[i].title === event.target.textContent) {
      playNum = i;
    }
  })
  play.classList.add('pause');
  playPlayer .classList.add('pause');
  playAudio()
}

activeSong.addEventListener('click', songSelection)
