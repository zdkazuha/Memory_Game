let arrName =  [];

function saveTopList(n, p, t ) {
    const topList = JSON.parse(localStorage.getItem("user")) ?? [];
    const user = {
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

    arrName = [];
    
    topList.forEach(item => {
        arrName.push(item.Name);

        let user = {
            number: `№${topList.indexOf(item) + 1}`,
            name: item.Name, 
            points: item.Points,
            time: `${item.Time}s`};

        let source = $("#topListTemplate").html();
        let template = Handlebars.compile(source);
        let html = template(user);

        $topList.append(html);
    });
}

export { saveTopList, loadTopList , arrName};