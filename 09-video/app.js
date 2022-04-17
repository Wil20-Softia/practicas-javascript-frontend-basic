// MDN
// The DOMContentLoaded event fires when the initial HTML document has been completely loaded and parsed, without waiting for stylesheets, images, and subframes to finish loading.
// The load event is fired when the whole page has loaded, including all dependent resources such as stylesheets and images.

const btnSwitch = document.querySelector(".switch-btn");
const videoContainer = document.querySelector(".video-container");

btnSwitch.addEventListener("click",function(){
    if(!this.classList.contains("slide")){
        this.classList.add("slide");
        videoContainer.pause();
    }else{
        this.classList.remove("slide");
        videoContainer.play();
    }
});

const preloader = document.querySelector(".preloader");

window.addEventListener("load", function(){
    preloader.classList.add("hide-preloader");
});