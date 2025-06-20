import { startGame } from './startGame.js';
import { saveTopList, loadTopList, arrName} from './save_load.js';

let userName;

window.onload = function () {
    startGame();
    loadTopList();

    setTimeout(() => {
        while (true) {
            userName = prompt("Введіть ваше ім'я", "");

            if (userName === null || userName.trim() === "") {
                alert("Ім'я не може бути порожнім. Спробуйте ще раз.");
                continue;

            } else if (userName.length > 20 || userName.length < 3) {
                alert("Ім'я не може бути довшим за 20 символів та меньшим за 3. Спробуйте ще раз.");
                continue;

            } else if (arrName.includes(userName)) {
                alert("Ім'я вже існує. Спробуйте ще раз.");
                continue;

            } else { break; }
        }
    }, 500);
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

let seconds = 0;
let points = 0;

let isBlocked = false;

let time = setInterval(() => {

    seconds += 1;
    $(".time").text(seconds);

    if (seconds >= 120000) {
        clearInterval(time);
        setTimeout(() => {
            alert(`Ви програли гру, тому що час закінчився.\nВи набрали ${points} балів`);
            location.reload();
        }, 1000);
    }
}, 1000);

$(".cards").on("click", ".card", function () {

    if (isBlocked || $(this).hasClass("flipped")) {
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