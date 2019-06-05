const getPotential = () => {
    const card = document.querySelector(".card-body.stats");
    const column = card.querySelectorAll(".col-4")[1];
    const potential = column.querySelector("span").innerText;
    return parseInt(potential, 10);
};

const getPosition = () => {
    const meta = document.querySelector(".meta");
    const position = meta.querySelectorAll("span")[0].innerHTML;
    return position;
};

buildDay = day => {
    const fixedDay = day.split(",")[0];
    if (fixedDay.length === 1) {
        return `0${fixedDay}`;
    }
    return fixedDay;
};

const getMetaDetails = () => {
    const monthsMap = {
        Jan: "01",
        Feb: "02",
        Mar: "03",
        Apr: "04",
        May: "05",
        Jun: "06",
        Jul: "07",
        Aug: "08",
        Sep: "09",
        Oct: "10",
        Nov: "11",
        Dec: "12"
    };

    const metaDetails = document.querySelector(".meta").lastChild.wholeText;
    const detailsArray = metaDetails.split(" ");
    const filteredArray = detailsArray.splice(2, 5);
    let [month, day, year, height, weight] = filteredArray;
    month = monthsMap[month.slice(1)];
    day = buildDay(day);
    year = year.slice(0, 4);
    height = parseInt(height.split("cm")[0], 10);
    weight = parseInt(weight.split("kg")[0], 10);

    return { dateOfBirth: `${year}-${month}-${day}`, height, weight };
};

const saveStats = (accumulator, category, categoryStats) => {
    const defaultValue = 50;
    category.forEach((item, index) => {
        accumulator[item] = categoryStats.querySelectorAll("span.label")[index]
            ? parseInt(
                  categoryStats.querySelectorAll("span.label")[index].innerHTML,
                  10
              )
            : defaultValue;
    });
};

chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
    const attacking = [
        "crossing",
        "finishing",
        "headingAcc",
        "shortPassing",
        "volleys"
    ];
    const skill = [
        "dribbling",
        "curve",
        "fkAccuracy",
        "longPassing",
        "ballControl"
    ];
    const movement = [
        "acceleration",
        "sprintSpeed",
        "agility",
        "reactions",
        "balance"
    ];
    const power = ["shotPower", "jumping", "stamina", "strength", "longShots"];
    const mentality = [
        "aggression",
        "interceptions",
        "positioning",
        "vision",
        "penalties",
        "composure"
    ];
    const defending = ["marking", "standingTackle", "slidingTackle"];
    const goalkeeping = [
        "gkDiving",
        "gkHandling",
        "gkKicking",
        "gkPositioning",
        "gkReflexes"
    ];

    const playerDetails = {};
    const potential = getPotential();
    const position = getPosition();
    const height = getMetaDetails().height;
    const weight = getMetaDetails().weight;
    const dateOfBirth = getMetaDetails().dateOfBirth;

    const player = document.querySelector(".player");
    const firstColumn = player.querySelectorAll(".mb-2")[1];
    const secondColumn = player.querySelectorAll(".mb-2")[2];
    const attackingStats = firstColumn
        .querySelectorAll(".column")[0]
        .querySelector("ul");
    const skillStats = firstColumn
        .querySelectorAll(".column")[1]
        .querySelector("ul");
    const movementStats = firstColumn
        .querySelectorAll(".column")[2]
        .querySelector("ul");
    const powerStats = firstColumn
        .querySelectorAll(".column")[3]
        .querySelector("ul");
    const mentalityStats = secondColumn
        .querySelectorAll(".column")[0]
        .querySelector("ul");
    const defendingStats = secondColumn
        .querySelectorAll(".column")[1]
        .querySelector("ul");
    const goalkeepingStats = secondColumn
        .querySelectorAll(".column")[2]
        .querySelector("ul");

    saveStats(playerDetails, attacking, attackingStats);
    saveStats(playerDetails, skill, skillStats);
    saveStats(playerDetails, movement, movementStats);
    saveStats(playerDetails, power, powerStats);
    saveStats(playerDetails, mentality, mentalityStats);
    saveStats(playerDetails, defending, defendingStats);
    saveStats(playerDetails, goalkeeping, goalkeepingStats);
    playerDetails.height = height;
    playerDetails.weight = weight;
    playerDetails.dateOfBirth = dateOfBirth;
    playerDetails.position = position;
    playerDetails.potential = potential;

    console.log(playerDetails);

    sendResponse({ data: playerDetails, success: true });
});
