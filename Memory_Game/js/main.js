// let p = document.querySelector(".Task1 p");

// function updateTime() {
//     let date = new Date().toLocaleTimeString();
//     p.textContent = date;
// }

// updateTime(); 

// setTimeout(() => {
//     location.reload(); 
// }, 1000);


startGame();

let arr = [];
let wrappers = document.querySelectorAll('.image-wrapper');

let seconds = 0;
let points = 0;

time = setInterval(() => {
    seconds += 1;
    document.querySelector(".time1").textContent = seconds;

    if (seconds >= 60) {
        clearInterval(time);
        setTimeout(() => {
            alert(`Ви програли гру, тому що час закінчився.\nВи набрали ${points} балів`);
            location.reload();
        }, 1000);
    }
}, 1000);


let isBlocked = false;

wrappers.forEach(wrapper => {
    let img = wrapper.querySelector('img');
    let overlay = wrapper.querySelector('.overlay');

    overlay.addEventListener('click', () => {
        if (isBlocked || !img.classList.contains('hidden')) return;

        img.classList.remove('hidden');
        overlay.style.display = 'none';
        arr.push(img);

        if (arr.length === 2) {
            if (arr[0].getAttribute("src") === arr[1].getAttribute("src")) {
                arr = [];
                points += 2;
                document.querySelector(".points1").textContent = points;

                if (points === 16) {
                    clearInterval(time);
                    setTimeout(() => {
                        alert(`Ви пройшли гру за ${seconds} секунд`);
                        location.reload();
                    }, 2000);
                }
            } else {
                isBlocked = true;

                setTimeout(() => {
                    arr[0].classList.add('hidden');
                    arr[0].parentElement.querySelector('.overlay').style.display = 'flex';

                    arr[1].classList.add('hidden');
                    arr[1].parentElement.querySelector('.overlay').style.display = 'flex';

                    arr = [];
                    isBlocked = false;
                }, 1000);
            }
        }
    });
});


function startGame() {
    let images = [
        "Food_C240-128.png",
        "Food_C203-128.png",
        "Food_C205-128.png",
        "Food_C238-128.png",
        "Food_C245-128.png",
        "Food_C225-128.png",
        "Food_C217-128.png",
        "Food_C235-128.png"
    ];

    let allImages = [...images, ...images];

    for (let i = allImages.length - 1; i > 0; i--) {
        let j = Math.floor(Math.random() * (i + 1));
        [allImages[i], allImages[j]] = [allImages[j], allImages[i]];
    }

    let task2 = document.querySelector(".Task2");
    task2.innerHTML = "";

    allImages.forEach(src => {
        let wrapper = document.createElement("div");
        wrapper.classList.add("image-wrapper");

        let img = document.createElement("img");
        img.src = `./img/${src}`;
        img.classList.add("hidden", "aplle");

        let overlay = document.createElement("div");
        overlay.classList.add("overlay");
        overlay.textContent = "Показати";

        wrapper.appendChild(img);
        wrapper.appendChild(overlay);
        task2.appendChild(wrapper);
    });
}
