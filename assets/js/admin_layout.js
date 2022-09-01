

const themeButton=document.getElementById("theme-button");
const backgroundArr=["https://wallpaperaccess.com/full/5539046.jpg","http://wallup.net/wp-content/uploads/2015/12/134413-abstract.jpg","https://www.gadgetfluenceteam.com/img/bg.jpeg","https://img.freepik.com/premium-photo/technology-background-abstract-connected-dots-lines-blue-background-communication-technology-network-concept-with-moving-lines-dots-network-connection-structure_34629-1145.jpg","https://sfumisa.com/wp-content/uploads/2020/07/469164.jpg","https://wallpaperaccess.com/full/2454628.png","https://i0.wp.com/pswordpress-production.s3.amazonaws.com/2020/03/dark-blue-glowing-circuit-board-tech-background-vector-19816895_0.jpg?ssl=1"];

const element = document.getElementById("page-body");

themeButton.addEventListener("click",()=>{

    let randomIndex=Math.round(Math.random()*(backgroundArr.length-1));
    console.log(randomIndex);
    element.style.backgroundImage=`url(${backgroundArr[randomIndex]})`;
})
