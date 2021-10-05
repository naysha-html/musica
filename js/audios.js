const list_container = document.getElementById("list-container");
const audio = document.getElementById("audio");
const play_btn = document.getElementById("play-btn");
const prev_btn = document.getElementById("prev-btn");
const next_btn = document.getElementById("next-btn");
const title_card = document.getElementById("title-card");
const cover_card_img = document.getElementById("cover-card-img");

const progress = document.getElementById("progress_bar");
let is_playing = false;
let index = 1;

const canciones = [
    {
        id: 1,
        title:"Criyin",
        audio: "audio/2CELLOS - Cryin.mp3",
        cover:"img/criyin.jpg",
        artist:"2CELLOS",
     },
    
     {
        id: 2,
        title:"Pirates Of The Caribbean",
        audio: "audio/2CELLOS - Pirates Of The Caribbean.mp3",
        cover:"img/piratas.jpg",
        artist:"2CELLOS",
     },
     {
        id: 3,
        title:"Wake Me Up (Avicii)",
        audio: "audio/2CELLOS - Wake Me Up (Avicii).mp3",
        cover:"img/wake.jpg",
        artist:"2CELLOS",
     },
     {
        id: 4,
        title:"Living Legend",
        audio: "audio/Club Danger - Living Legend.mp3",
        cover:"img/living.jpg",
        artist:"Club Danger",
     },
     {
        id: 5,
        title:"  Nancy Mulligan",
        audio: "audio/Ed Sheeran - Nancy Mulligan.mp3",
        cover:"img/ed.jpg",
        artist:"Ed Sheeran",
     },
     {
        id: 6,
        title:"  Something Big",
        audio: "audio/Shawn Mendes - Something Big.mp3",
        cover:"img/something.jpg",
        artist:"Shawn Mendes",
     },

 ];
canciones.forEach((e) => {
    list_container.insertAdjacentHTML(
        "beforeend",
        `
            <div class="list-item" id="${e.id}">
                <img class="cover" src="${e.cover}" alt="${e.title}"/>
                <div class="song-data">
                    <div>${e.title}</div>
                    <div>${e.artist}</div>
                </div>
            </div>
        `
    );
});

const play_card = (obj_audio) => {
     cover_card_img.src =obj_audio.cover;
     title_card.innerHTML = obj_audio.title;
};
const play_audio = (id) => {
    const res = canciones.find((e) => e.id == id);
    if (res) {
        audio.src = res.audio;
        audio.play();
        play_card(res);
        animation_active();
        window.addEventListener("load",() =>{
            progress.max = audio.duration;
        });
    }
};
const animation_active = () => {
    if (is_playing) {
        cover_card_img.style.animationPlayState = "running";
    } else { 
        cover_card_img.style.animationPlayState = "paused";
    }
};
list_container.addEventListener("click", (e) => {
    if (e.target.matches(".list_item")) {
        play_audio(e.target.id);
    } 
    else if (e.target.matches(".cover")) {
        play_audio(e.target.parentNode.id);
    }
    else if (e.target.matches(".song-data")) {
        play_audio(e.target.parentNode.id);
    }
    else if (e.target.matches(".song-data div")) {
        play_audio(e.target.parentNode.parentNode.id);
    }
});
play_btn.addEventListener("click", () => {
    if(is_playing) {
        audio.pause();
        is_playing = false;
        play_btn.innerHTML = "PLAY";
    } else {
        is_playing = true;
        play_btn.innerHTML = "l l";
        audio.play();
    }
    animation_active();
});
window.addEventListener("load", () => {
    const progress = document.getElementById("progress_bar");
    progress.max = audio.duration;
    progress.min = 0;
    window.setInterval(() => { 
        progress.value = audio.currentTime;
    }, 1000);
    progress.addEventListener("change", () => { 
        audio.currentTime = progress.value;
    });
});
next_btn.addEventListener("click", () => { 
    if (index < canciones.length) { 
        index ++;
        play_audio(index);
    }    
    
});
prev_btn.addEventListener("click", () => { 
    if (index > 0) { 
        index --;
        play_audio(index);
    }      
});

renderizar_canciones(canciones);
const search_input = document.getElementById("search-input");
search_input.addEventListener ("keyup", () => {
    let filtrado = canciones.filter((e) =>
    e.title
        .toLocaleLowerCase()
        .includes(search_input.value.toString().toLocaleLowerCase())
    );
    renderizar_canciones(filtrado);
});

