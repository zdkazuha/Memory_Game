let userName;

window.onload = function () {
    startGame();
    loadTopList();

    while (true) {
        userName = prompt("Введіть ваше ім'я", "");

        if (userName === null || userName.trim() === "") {
            alert("Ім'я не може бути порожнім. Спробуйте ще раз.");
            continue;
        } else if (userName.length > 20) {
            alert("Ім'я не може бути довшим за 20 символів. Спробуйте ще раз.");
            continue;
        } else {
            break;
        }
    }
};



window.addEventListener('mousedown', (e) => {
    e.preventDefault();
});

window.addEventListener('dragstart', (e) => {
    e.preventDefault();
});

$(".showTopList").on("click", function () {
    $(".TopList").toggleClass("active");
});

let arr = [];
let arrCombo = [];
let point = 2;
let count = 0;
const $fronts = $(".front *");

let seconds = 0;
let points = 0;

let time = setInterval(() => {
    seconds += 1;
    $(".time").text(seconds);

    if (seconds >= 100) {
        clearInterval(time);
        setTimeout(() => {
            alert(`Ви програли гру, тому що час закінчився.\nВи набрали ${points} балів`);
            location.reload();
        }, 1000);
    }
}, 1000);

let isBlocked = false;

$(".cards").on("click", ".card", function () {

    if (isBlocked ||  $(this).hasClass("flipped")) {
        return;
    }

    $(this).addClass("flipped");
    arr.push($(this));

    if (arr.length === 2) {
        if (arr[0].find("img").attr("src") === arr[1].find("img").attr("src")) {
            arr = [];
            count++;

            arrCombo.push(true);
            
            if (arrCombo.length === 2) {
                point = arrCombo[0] && arrCombo[1] ? point + 2 : 2;
                arrCombo = [];
            }

            points += point;
            $(".points").text(points);

            if (count === 8) {
                clearInterval(time);
                setTimeout(() => {
                    alert(`Ви пройшли гру за ${seconds} секунд.\nВи набрали ${points} балів`);
                    saveTopList(userName, points, seconds);
                    location.reload();
                }, 1000);
            }
        } else {
            isBlocked = true;

            arrCombo.push(false);
            if (arrCombo.length === 2) {
                point = arrCombo[0] && arrCombo[1] ? point + 2 : 2;
                arrCombo = [];
            }

            setTimeout(() => {
                arr[0].removeClass("flipped");
                arr[1].removeClass("flipped");
                arr = [];
                isBlocked = false;
            }, 1000);
        }
    }

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
};

function saveTopList(n, p, t ) {
    const topList = JSON.parse(localStorage.getItem("user")) ?? [];
    user = {
        Name: n,
        Points: p,
        Time: t
    }
    topList.push(user);
    topList.sort((a, b) => {
        if (b.Points !== a.Points) {
            return b.Points - a.Points;  
        }

        const timeA = parseInt(a.Time);  
        const timeB = parseInt(b.Time);

        return timeA - timeB; 
    });

    localStorage.setItem("user", JSON.stringify(topList.slice(0, 10)));
    loadTopList();
}
function loadTopList() {
    const topList = JSON.parse(localStorage.getItem("user")) || [];
    const $topList = $(".tdList ");
    $topList.empty();

    topList.forEach(item => {
        const $tr = $("<tr></tr>");
        const $tdNumber = $("<td></td>").text(`№${topList.indexOf(item) + 1}`);
        const $tdName = $("<td></td>").text(item.Name);
        const $tdPoints = $("<td></td>").text(item.Points);
        const $tdTime = $("<td></td>").text(item.Time);

        $tr.append($tdNumber,$tdName, $tdPoints, $tdTime);

        $topList.append($tr);
    });
}