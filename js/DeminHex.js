class DeminHex {

    constructor(height, width) {
        this.height = height;
        this.width = width;
    }



    static initGridLayout(params) {
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


    initGridArray(params) {


    }

}