const tableWrapper = document.querySelector(".responsive-table");
const table = tableWrapper.querySelector("table");
const tableBody = table.querySelector("tbody");
const rows = tableBody.children;

const newTable = document.createElement("table");
const tbody = newTable.createTBody();

const buildUnit = unit => {
    if (unit === "Mill.") {
        return "M";
    }

    return "K";
};

const mapValue = arr => {
    const [value, unit] = arr;
    const newUnit = buildUnit(unit);

    return `${value}${newUnit}`;
};

[...rows].forEach(row => {
    const tds = row.children;
    const name = tds[1].querySelector(".spielprofil_tooltip").innerHTML;
    const team = tds[4].querySelector("img").alt;
    const value = tds[5].children[0].innerText;
    const arrValue = value.split(" ");
    const mappedValue = mapValue(arrValue);

    const newRow = tbody.insertRow();
    const valueContainer = newRow.insertCell();
    const nameContainer = newRow.insertCell();
    const teamContainer = newRow.insertCell();

    valueContainer.innerText = mappedValue;
    nameContainer.innerText = name;
    teamContainer.innerText = team;
});

document.body.appendChild(newTable);
