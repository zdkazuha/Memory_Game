function startGame() {
    let images = [
        "./img/Food_C203-128.png",
        "./img/Food_C205-128.png",
        "./img/Food_C217-128.png",
        "./img/Food_C225-128.png",
        "./img/Food_C235-128.png",
        "./img/Food_C238-128.png",
        "./img/Food_C240-128.png",
        "./img/Food_C245-128.png",
    ];

    let allImages = [...images, ...images];

    for (let i = allImages.length - 1; i > 0; i--) {
        let j = Math.floor(Math.random() * (i + 1));
        [allImages[i], allImages[j]] = [allImages[j], allImages[i]];
    }

    const $cards = $(".cards");
    $cards.empty();

    allImages.forEach(src => {

        let card = {
            img: src,
        }

        let source = $("#cardTemplate").html();
        let template = Handlebars.compile(source);
        let html = template(card);

        $cards.append(html);
    });
};

export { startGame };