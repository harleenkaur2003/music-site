console.log("Welcome to Spotify");

//Initialize the variables
let songIndex=0;
let audioElement= new Audio('1.mp3');
let masterPlay=document.getElementById('masterPlay');
let myProgressBar=document.getElementById('myProgressBar');
let gif=document.getElementById('gif');
let masterSongName=document.getElementById('masterSongName');
let songItems=Array.from(document.getElementsByClassName('songItems'));

let songs = [
    {songName: "Let Me Love You", filePath: "1.mp3" , coverPath: "10.jpg"},
    {songName: "Ava Mix - Not Your Barbie Girl", filePath: "2.mp3", coverPath: "2.jpeg"},
    {songName: "Benson Boon - Beautiful Things", filePath: "3.mp3", coverPath: "3.jpg"},
    {songName: "Give Me Some Sunshine", filePath: "4.mp3", coverPath: "4.jpeg"},
    {songName: "Hass Hass", filePath: "5.mp3", coverPath: "5.jpg"},
    {songName: "Lover", filePath: "6.mp3", coverPath: "6.jpg"},
    {songName: "The Safety Dance", filePath: "7.mp3", coverPath: "7.jpg"},
    {songName: "Peaky Blinders - Nick Cave And The Bad Seeds", filePath: "8.mp3", coverPath: "8.jpeg"},
    {songName: "Love On", filePath: "9.mp3", coverPath: "9.jpeg"},   
]
songItems.forEach((element,i)=> {
   
    element.getElementsByTagName("img")[0].src=songs[i].coverPath;
    element.getElementsByClassName("songName")[0].innerText=songs[i].songName;
});
//listen to events


//handle play/pause click
masterPlay.addEventListener('click',()=>{

    if(audioElement.paused || audioElement.currentTime<=0){
        audioElement.play();
        gif.style.opacity=1;
        masterPlay.classList.remove('fa-circle-play');
        masterPlay.classList.add('fa-circle-pause');
        gif.style.opacity=1;
    }
    else{
        audioElement.pause();
        masterPlay.classList.remove('fa-circle-pause');
        masterPlay.classList.add('fa-circle-play');
        gif.style.opacity=0;
    }
});


//listen to events
audioElement.addEventListener('timeupdate',()=>{
    console.log('timeupdate');

    //update seekbar
    progress=parseInt((audioElement.currentTime/audioElement.duration)*100);
    console.log(progress);
    myProgressBar.value=progress;
})
myProgressBar.addEventListener('change',()=>{
    audioElement.currentTime=(myProgressBar.value*audioElement.duration) /100
})
const makeAllPlays = () =>{
    Array.from(document.getElementsByClassName('songItemPlay')).forEach((element)=>{
        element.classList.remove('fa-circle-pause');
        element.classList.add('fa-circle-play');
    })    
}

Array.from(document.getElementsByClassName('songItemPlay')).forEach((element)=>{
    element.addEventListener('click',(e)=>{
        makeAllPlays();
        masterSongName.innerText=songs[songIndex].songName;
        songIndex=parseInt(e.target.id);
        e.target.classList.remove('fa-circle-play');
        e.target.classList.add('fa-circle-pause')
        audioElement.src = songIndex+1 + '.mp3';

        masterSongName.innerText=songs[songIndex].songName;
        audioElement.currentTime = 0;
        audioElement.play();
        gif.style.opacity=1;
        masterPlay.classList.remove('fa-play-circle');
        masterPlay.classList.add('fa-pause-circle');
        
    })
})
document.getElementById('next').addEventListener('click',()=>{
    if(songIndex>=9){
        songIndex=0;
    }
    else{
        songIndex+=1;
    }
    audioElement.src = songIndex+1 + '.mp3';
    audioElement.currentTime = 0;
    audioElement.play();
    masterPlay.classList.remove('fa-play-circle');
    masterPlay.classList.add('fa-pause-circle');
})
document.getElementById('previous').addEventListener('click',()=>{
    if(songIndex<=0){
        songIndex=9;
    }
    else{
        songIndex-=1;
    }
    audioElement.src = songIndex+1 + '.mp3';
    audioElement.currentTime = 0;
    audioElement.play();
    masterPlay.classList.remove('fa-play-circle');
    masterPlay.classList.add('fa-pause-circle');
})