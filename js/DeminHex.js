class DeminHex {

    constructor(height, width) {
        this.height = height;
        this.width = width;
        this.aCells = [];
        this.aCellsPatern = [];
        this.aPatern=[3, 2, 3, 4];
    }

    setup(){
        this.initCells();
        this.initGridLayout();
    }

     initCells(params) {
        const aPattern = this.aPatern;
        this.aCellsPatern = [];
        for (let i = 0; i < aPattern.length; i++) {
            this.aCellsPatern.push([]);
            for (let j = 0; j < aPattern[i]; j++) {
                let cell= new Cell(i,j);
                this.aCells.push(cell);
                this.aCellsPatern[i].push(cell);
            }
        }
    }


    initGridLayout(params) {
        const container = document.querySelector('.container');
        const hexagonPattern = this.aPatern;

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
                eSpan.innerHTML = hexagon.attributes.id;

                hexagon.appendChild(eSpan);
                row.appendChild(hexagon);
            }
            container.appendChild(row);
        }
    }
    initGridArray(params) {
    }
}