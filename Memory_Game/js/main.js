startGame();

window.addEventListener('mousedown', (e) => {
    e.preventDefault();
});

window.addEventListener('dragstart', (e) => {
    e.preventDefault();
});


let arr = [];
const $fronts = $(".front *");

let seconds = 0;
let points = 0;

time = setInterval(() => {
    seconds += 1;
    $(".time").text(seconds);

    if (seconds >= 100000) {
        clearInterval(time);
        setTimeout(() => {
            alert(`Ви програли гру, тому що час закінчився.\nВи набрали ${points} балів`);
            location.reload();
        }, 1000);
    }
}, 1000);

$(".cards").on("click", ".card", function () {
    $(this).toggleClass("flipped");
});

let isBlocked = false;

$fronts.forEach(front => {
    let img = $(`.front > img`);
    let back = $(".back");

    back.addEventListener('click', () => {
        if (isBlocked || !img.classList.contains('flipped'))
            return;

        img.classList.remove('flipped');
        arr.push(img);

        if (arr.length === 2) {
            if (arr[0].getAttribute("src") === arr[1].getAttribute("src")) {
                arr = [];
                points += 2;
                $(".points").text(points);

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
                    arr[0].classList.add('flipped');
                    arr[0].parentElement.querySelector('.flipped').style.display = 'flex';

                    arr[1].classList.add('flipped');
                    arr[1].parentElement.querySelector('.flipped').style.display = 'flex';

                    arr = [];
                    isBlocked = false;
                }, 1000);
            }
        }
    });
});

function startGame() {
    let images = [
        "Food_C203-128.png",
        "Food_C205-128.png",
        "Food_C217-128.png",
        "Food_C225-128.png",
        "Food_C235-128.png",
        "Food_C238-128.png",
        "Food_C240-128.png",
        "Food_C245-128.png",
    ];

    let allImages = [...images, ...images];

    for (let i = allImages.length - 1; i > 0; i--) {
        let j = Math.floor(Math.random() * (i + 1));
        [allImages[i], allImages[j]] = [allImages[j], allImages[i]];
    }

    const $cards = $(".cards");
    $cards.empty();

    allImages.forEach(src => {

        const $card = $("<div class='card'></div>");

        const $inner = $("<div class='inner'></div>");

        const $front = $("<div class='front'></div>");

        const $img = $(`<img src="./img/${src}">`);

        const $back = $("<div class='back'>Показати</div>");

        $front.append($img);
        $inner.append($front);
        $inner.append($back);

        $card.append($inner);

        $cards.append($card);

    });
}