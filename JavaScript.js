let words = document.querySelectorAll(".word");
words.forEach((word)=>{
    let letter = word.textContent.split("");
    word.textContent="";
    letter.forEach((letter)=>{
        let span = document.createElement("span");
        span.textContent = letter;
        span.className = "letter";
        word.append(span);
    });
});

let currentwordIndex = 0;
let maxwordIndex = words.length -1;
words[currentwordIndex].style.opacity = "1";

let changeText = ()=>{
    let currentword = words[currentwordIndex];
    let nextword = currentwordIndex === maxwordIndex ? words[0] : words[currentwordIndex +1];

    Array.from(currentword.children).forEach((letter,i)=>{
        setTimeout(()=>{
            letter.className = "letter out";
        },i * 80);
    });
    nextword.style.opacity="1";
    Array.from(nextword.children).forEach((letter,i)=>{
        letter.className = "letter behind";
        setTimeout(()=>{
            letter.className = "letter in";
        },340 + i * 80);
    });
    currentwordIndex = currentwordIndex === maxwordIndex ? 0 : currentwordIndex + 1;
};

changeText();
setInterval(changeText,3000)

// circle skill-------------------------------------------//

const circles = document.querySelectorAll('.circle');
circles.forEach(elem=>{
    var dots = elem.getAttribute("data-dots");
    var marked = elem.getAttribute("data-percent");
    var percent = Math.floor(dots * marked / 100);
    var points = "";
    var rotate = 360 /dots;


    for(let i = 0; i < dots; i++){
        points +=`<div class="points" style="--i:${i}; --rot:${rotate}deg;"></div>`;
    }
    elem.innerHTML = points;

    const pointsMarked = elem.querySelectorAll('.points');
    for(let i = 0; i < percent; i++){
        pointsMarked[i].classList.add("marked");
    }
});

//mix it up portfolio section--------------------------------//
var mixer = mixitup('.portfolio-gallery');


//Active menu section--------------------------------//

let menuLi = document.querySelectorAll('header ul li a');
let section = document.querySelectorAll('section');


function activeMenu() {
    let len = section.length;
    while(--len && window.scrollY + 97 < section[len].offsetTop) { }
    menuLi.forEach(sec => sec.classList.remove("active"));
    menuLi[len].classList.add("active");
}

activeMenu();
window.addEventListener("scroll",activeMenu);


//sticky navbar section--------------------------------//
const header = document.querySelector("header");
window.addEventListener("scroll",function(){
    header.classList.toggle("sticky",this.window.scrollY > 50)
})

//toggle icon navbar section--------------------------------//

let menuIcon = document.querySelector("#menu-icon");
let navlist = document.querySelector(".navlist");

menuIcon.onclick = ()=>{
    menuIcon.classList.toggle("bx-x");
    navlist.classList.toggle("open");
}

window.onscroll = ()=>{
    menuIcon.classList.remove("bx-x");
    navlist.classList.remove("open");
}

//parallax--------------------------------//
const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry)=> {
        if(entry.isIntersecting){
            entry.target.classList.add("show-items");
        }else{
            entry.target.classList.remove("show-items");
        }
    });
});

const scrollScale = document.querySelectorAll(".scroll-scale");
scrollScale.forEach((el)=> observer.observe(el));

const scrollBottom = document.querySelectorAll(".scroll-bottom");
scrollBottom.forEach((el)=> observer.observe(el));

const scrollTop = document.querySelectorAll(".scroll-top");
scrollTop.forEach((el)=> observer.observe(el));

//Contact From


  const form = document.getElementById("contactForm");
const statusText = document.getElementById("form-status");
const toast = document.getElementById("toast");

function showToast(message, type) {
    toast.innerHTML = message;
    toast.className = `toast show ${type}`;

    setTimeout(() => {
        toast.className = "toast";
    }, 3000);
}

form.addEventListener("submit", async function (e) {
    e.preventDefault();

    const data = new FormData(form);

    try {
        const response = await fetch(form.action, {
            method: form.method,
            body: data,
            headers: {
                Accept: "application/json"
            }
        });

        if (response.ok) {
            showToast("✅ Message sent successfully!", "success");
            form.reset();
        } else {
            showToast("❌ Oops! Something went wrong.", "error");
        }

    } catch (error) {
        showToast("❌ Network error. Try again.", "error");
    }
});
