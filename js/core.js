

var deminHex;

function newGame(pOptions = {}) {
    deminHex = new DeminHex(pOptions);
    DeminHex.initGridLayout();
}


function initGridLayout(params) {
    const container = document.querySelector('.container');
    const hexagonPattern = [3, 2, 3, 4];

    for (let i = 0; i < hexagonPattern.length; i++) {
        const row = document.createElement('div');
        row.classList.add('row');
        for (let j = 0; j < hexagonPattern[i]; j++) {
            const hexagon = document.createElement('div');
            hexagon.classList.add('hexagon');
            hexagon.attributes.id = `${i} ${j}`;;
            console.log(hexagon.attributes.id);
            const eSpan = document.createElement('p');
            eSpan.classList.add('text');
            eSpan.innerHTML = "swdddddds";

            hexagon.appendChild(eSpan);
            row.appendChild(hexagon);
        }
        container.appendChild(row);
    }
}







