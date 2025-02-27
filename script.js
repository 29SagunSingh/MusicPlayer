const music = new Audio('vande.mp3');
music.play();

const songs = [
    {
        id:'1',
        songName:`On My Way <br>
        <div class="subtitle">Alan Walker</div>`,
        poster: "1.jpg"
    },
    {
        id:'2',
        songName:`Alan Walker-Fade <br>
        <div class="subtitle">Alan Walker</div>`,
        poster: "2.jpg"
    },
    {
        id:'3',
        songName:`Lut Gaye <br>
        <div class="subtitle">Jubin Nautiyal</div>`,
        poster: "3.jpg"
    },
    {
        id:'4',
        songName:`Duniya <br>
        <div class="subtitle">Dhvani Bhanushali, Akhil</div>`,
        poster: "4.jpg"
    },
    {
        id:'5',
        songName:`Lover <br>
        <div class="subtitle">Taylor Swift</div>`,
        poster: "5.jpg"
    },
    {
        id:'6',
        songName:`Photograph <br>
        <div class="subtitle">Ed Sheeran</div>`,
        poster: "6.jpg"
    },
    {
        id:'7',
        songName:`Alan Walker-Fade <br>
        <div class="subtitle">Alan Walker</div>`,
        poster: "7.jpg"
    },
    {
        id:'8',
        songName:`Photograph <br>
        <div class="subtitle">Ed Sheeran</div>`,
        poster: "8.jpg"
    },
    {
        id:'9',
        songName:`Lover <br>
        <div class="subtitle">Taylor Swift</div>`,
        poster: "9.jpg"
    },
    {
        id:'10',
        songName:`Shape of you <br>
        <div class="subtitle">Ed Sheeran</div>`,
        poster: "10.jpg"
    },
    {
        id:'11',
        songName:`Kesariya <br>
        <div class="subtitle">Arijit Singh</div>`,
        poster: "11.jpg"
    },
    {
        id:'12',
        songName:`Baarish Lete aana <br>
        <div class="subtitle">Darshan Raval</div>`,
        poster: "12.jpg"
    },
    {
        id:'13',
        songName:`Desi Girl <br>
        <div class="subtitle">Sunidhi Chauhan</div>`,
        poster: "13.jpg"
    },
    {
        id:'14',
        songName:`Enchanted <br>
        <div class="subtitle">Taylor Swift</div>`,
        poster: "14.jpg"
    },
    {
        id:'15',
        songName:`Sorry <br>
        <div class="subtitle">Justin Bieber</div>`,
        poster: "15.jpg"
    }
]

Array.from(document.getElementsByClassName('songitem')).forEach((element,i)=>{
    element.getElementsByTagName('img')[0].src=songs[i].poster;
    element.getElementsByTagName('h5')[0].innerHTML=songs[i].songName;
})

let masterPlay = document.getElementById('masterPlay');
let wave = document.getElementsByClassName('wave')[0];


masterPlay.addEventListener('click',()=>{
    if (music.paused || music.currentTime <=0) {
        music.play();
        masterPlay.classList.remove('bi-play-fill');
        masterPlay.classList.add('bi-pause-fill'); 
        wave.classList.add('active2');
    } else {
        music.pause();
        masterPlay.classList.add('bi-play-fill');
        masterPlay.classList.remove('bi-pause-fill'); 
        wave.classList.remove('active2');
    }
} )

const makeAllPlays = () =>{
    Array.from(document.getElementsByClassName('playListPlay')).forEach((element)=>{
            element.classList.add('bi-play-circle-fill');
            element.classList.remove('bi-pause-circle-fill');
    })
}

const makeAllBackgrounds = () =>{
    Array.from(document.getElementsByClassName('songitem')).forEach((element)=>{
            element.style.background = "rgb(105,105,170,0)";
    })
}

let index=0;
let poster_master_play = document.getElementById('poster_master_play');
let title = document.getElementById('title');

Array.from(document.getElementsByClassName('playListPlay')).forEach((element)=>{
    element.addEventListener('click', (e)=>{
        index = e.target.id;
        makeAllPlays();
        e.target.classList.remove('bi-play-circle-fill');
        e.target.classList.add('bi-pause-circle-fill');
        music.src = `${index}.mp3` ; 
        poster_master_play.src = `${index}.jpg`;
        music.play();
        let song_title = songs.filter((ele)=>{
            return ele.id == index;
        })
        song_title.forEach(ele => {
            let {songName} = ele;
            title.innerHTML = songName;
        })
        masterPlay.classList.remove('bi-play-fill');
        masterPlay.classList.add('bi-pause-fill'); 
        wave.classList.add('active2');
        music.addEventListener('ended',()=>{
            masterPlay.classList.add('bi-play-fill');
            masterPlay.classList.remove('bi-pause-fill'); 
            wave.classList.remove('active2');
        })
        makeAllBackgrounds();
        Array.from(document.getElementsByClassName('songitem'))[`${index-1}`].style.background = "rgb(105,105,170,.1)";
    })
})

let currentStart = document.getElementById('currentStart');
let currentEnd = document.getElementById('currentEnd');
let seek = document.getElementById('seek');
let bar2 = document.getElementById('bar2');
let dot = document.getElementsByClassName('dot')[0];

music.addEventListener('timeupdate',()=>{
    let music_curr = music.currentTime;
    let music_dur = music.duration;

    let min = Math.floor(music_dur/60);
    let sec = Math.floor(music_dur%60);
    if(sec<10){
        sec = `0${sec}`;
    }
    currentEnd.innerText = `${min}:${sec}`;

    let min1 = Math.floor(music_curr/60);
    let sec1 = Math.floor(music_curr%60);
    if(sec1<10){
        sec1 = `0${sec1}`;
    }
    currentStart.innerText = `${min1}:${sec1}`;

    let progressbar = parseInt((music.currentTime/music.duration)*100);
    seek.value = progressbar;
    let seekbar = seek.value;
    bar2.style.width = `${seekbar}%`;
    dot.style.left = `${seekbar}%`;
})

seek.addEventListener('change', ()=>{
    music.currentTime = seek.value * music.duration/100;
})

music.addEventListener('ended',()=>{
    masterPlay.classList.add('bi-play-fill');
    masterPlay.classList.remove('bi-pause-fill'); 
    wave.classList.remove('active2');
})

let vol_icon = document.getElementById('vol_icon');
let vol = document.getElementById('vol');
let vol_dot = document.getElementById('vol_dot');
let vol_bar = document.getElementsByClassName('vol_bar')[0];

vol.addEventListener('change', ()=>{
    if(vol.value == 0){
        vol_icon.classList.remove('bi-volume-down-fill');
        vol_icon.classList.add('bi-volume-mute-fill');
        vol_icon.classList.remove('bi-volume-up-fill');
    }

    if(vol.value > 0){
        vol_icon.classList.add('bi-volume-down-fill');
        vol_icon.classList.remove('bi-volume-mute-fill');
        vol_icon.classList.remove('bi-volume-up-fill');
    }

    if(vol.value > 50){
        vol_icon.classList.remove('bi-volume-down-fill');
        vol_icon.classList.remove('bi-volume-mute-fill');
        vol_icon.classList.add('bi-volume-up-fill');
    }

    let vol_a = vol.value;
    vol_bar.style.width = `${vol_a}%`;
    vol_dot.style.left = `${vol_a}%`;
    music.volume = vol_a/100;
})

let back = document.getElementById('back');
let next = document.getElementById('next');

back.addEventListener('click', ()=>{
    index -=1;
    if(index < 1){
        index = Array.from(document.getElementsByClassName('songitem')).length;
    }

    music.src = `${index}.mp3` ; 
        poster_master_play.src = `${index}.jpg`;
        music.play();
        let song_title = songs.filter((ele)=>{
            return ele.id == index;
        })
        song_title.forEach(ele => {
            let {songName} = ele;
            title.innerHTML = songName;
        })
        makeAllPlays()
        document.getElementsById(`${index}`).classList.remove('bi-play-fill');
        document.getElementsById(`${index}`).classList.add('bi-pause-fill'); 
        makeAllBackgrounds();
        Array.from(document.getElementsByClassName('songitem'))[`${index-1}`].style.background = "rgb(105,105,170,.1)";
})

next.addEventListener('click', ()=>{
    index -=0;
    index +=1;
    if(index > Array.from(document.getElementsByClassName('songitem')).length){
        index = 1;
    }

    music.src = `${index}.mp3` ; 
        poster_master_play.src = `${index}.jpg`;
        music.play();
        let song_title = songs.filter((ele)=>{
            return ele.id == index;
        })
        song_title.forEach(ele => {
            let {songName} = ele;
            title.innerHTML = songName;
        })
        makeAllPlays()
        document.getElementsById(`${index}`).classList.remove('bi-play-fill');
        document.getElementsById(`${index}`).classList.add('bi-pause-fill'); 
        makeAllBackgrounds();
        Array.from(document.getElementsByClassName('songitem'))[`${index-1}`].style.background = "rgb(105,105,170,.1)";
})

