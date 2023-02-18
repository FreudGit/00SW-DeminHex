class DeminHex {

    constructor(height, width) {
        this.height = height;
        this.width = width;
        this.aCells = [];
        this.aCellsPatern = [];
        this.aPatern = [3, 2, 3, 4];
        this.settings_MinesCount = 3;
    }

    setup() {
        this.initCells();
        this.initCells_Mines();
        this.initGridLayout();
    }

    initCells(params) {
        const aPattern = this.aPatern;
        this.aCellsPatern = [];
        for (let i = 0; i < aPattern.length; i++) {
            this.aCellsPatern.push([]);
            for (let j = 0; j < aPattern[i]; j++) {
                let cell = new Cell(i, j);
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
                hexagon.attributes.id = `${i} ${j}`;
                hexagon.addEventListener('click', this.clickOnCell.bind(this));

                console.log(hexagon.attributes.id);
                const eSpan = document.createElement('p');
                eSpan.classList.add('text');
                eSpan.classList.add('not-selectable');

                eSpan.innerHTML = hexagon.attributes.id;
                hexagon.appendChild(eSpan);
                row.appendChild(hexagon);
            }
            container.appendChild(row);
        }
    }
    initGridArray(params) {
    }

    initCells_Mines(params) {
        let iMines = 0;
        while (iMines < this.settings_MinesCount) {
            // FH REmoved as i'll use linear array
            //var iRow = Math.floor(Math.random() * this.options.rows);
            //var iCol = Math.floor(Math.random() * this.options.cols);
            var iRand = Math.floor(Math.random() * this.aCells.length);
            if (this.aCells[iRand].bBomb == false) {
                this.aCells[iRand].bBomb = true;
                iMines++;
            }
            console.log(this.aCells);
        }
    }

    clickOnCell(evt) {
        // target pointe sur les enfants, currenttarget est parfait
        console.log('clickOnCell' + evt.currentTarget.attributes.id);
        let sID = evt.currentTarget.attributes.id;
        let aPoint = sID.split(' ').map(Number);

        let cell = this.aCellsPatern[0];
        console.log(aPoint);
        let cellw = this.aCellsPatern[aPoint[0]][aPoint[1]];
        if (cellw.bBomb == true) {
            evt.currentTarget.style.background = '#ff0000';
            evt.currentTarget.style.fontSize='24px';
            evt.currentTarget.firstElementChild.innerText='💣'
            
        }else{
            evt.currentTarget.style.background = '#eee';
        }
        console.log(cellw);
    };
}
