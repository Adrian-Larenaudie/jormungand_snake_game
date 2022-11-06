export const song = {
    on_off: 1,
    on_svg: document.querySelector('.song_on'),
    off_svg: document.querySelector('.song_off'),

    init: () => {
        song.handle_off_svg();
        song.handle_on_svg();
    },

    eaten_apple: () => {
        const audio = new Audio();
        audio.src = "../../song/eaten_apple_song.mp3";
        if(song.on_off === 1) {
            audio.play();
        }
    },

    handle_on_svg: () => {
        song.on_svg.addEventListener('click', (event) => {
            song.on_svg.style.display = 'none';
            song.off_svg.style.display = 'block';
            song.on_off = 0;
        })
    },

    handle_off_svg: () => {
        song.off_svg.addEventListener('click', (event) => {
            song.off_svg.style.display = 'none';
            song.on_svg.style.display = 'block';
            song.on_off = 1;
        })
    },

};

/*
*DOCUMENTATION FR
*DESCRIPTION DES PROPRIETES:
*DESCRIPTION DES METHODES:
*/