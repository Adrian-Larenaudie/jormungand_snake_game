export const song = {
    eaten_apple: () => {
        const audio = new Audio();
        audio.src = "../../song/eaten_apple_song.mp3";
        audio.play();
    }
} 