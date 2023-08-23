class DeminHex {
  constructor(height, width) {
    this.height = height;
    this.width = width;
    this.aCells = [];
    this.aCellsPatern = [];
    this.aPatern = [3, 4, 3, 4];
    this.settings_MinesCount = 3;
    this.tProgress = 0;
    this.tNbMines = 0;
    this.iAlertDelay = 500;
    this.btnNewGame = 0;
    this.LOGS = false;
  }

  setup() {
    this.initGlobals();
    this.reset();
    this.showMinesNumber();
    this.initCells();
    this.initCells_Mines();
    this.initCells_Flags();
    this.initGridLayout();
    this.showRemainings();
  }

  reset() {
    this.aCells = [];
    this.aCellsPatern = [];
    const aPatternRamdom = Math.floor(Math.random() * 5) + 3;
    this.aPatern = [
      aPatternRamdom,
      aPatternRamdom + 1,
      aPatternRamdom,
      aPatternRamdom + 1,
    ];

    //this.aPatern = [3, 4, 3, 4];
    this.settings_MinesCount = aPatternRamdom;
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
    const container = document.querySelector(".container");
    container.innerHTML = "";
    const hexagonPattern = this.aPatern;

    for (let i = 0; i < hexagonPattern.length; i++) {
      const row = document.createElement("div");
      row.classList.add("row");
      for (let j = 0; j < hexagonPattern[i]; j++) {
        const hexagon = document.createElement("div");
        hexagon.classList.add("hexagon");
        hexagon.id = `${i}_${j}`;
        hexagon.addEventListener("click", this.clickOnCell.bind(this));
        hexagon.addEventListener(
          "contextmenu",
          this.rightclickOnCell.bind(this)
        );
        const eSpan = document.createElement("p");
        eSpan.classList.add("text");
        eSpan.classList.add("not-selectable");
        hexagon.appendChild(eSpan);
        row.appendChild(hexagon);
      }
      container.appendChild(row);
    }
  }

  initGlobals(params) {
    this.tProgress = document.getElementById(`progress`);
    this.tNbMines = document.getElementById(`nbMines`);
    this.btnNewGame = document.getElementById(`btnNewGame`);
    this.btnNewGame.addEventListener("click", this.setup.bind(this));
  }

  initGridArray(params) {}

  initCells_Mines(params) {
    let iMines = 0;
    while (iMines < this.settings_MinesCount) {
      var iRand = Math.floor(Math.random() * this.aCells.length);
      if (this.aCells[iRand].bBomb == false) {
        this.aCells[iRand].bBomb = true;
        iMines++;
      }
      if (this.LOGS) console.log('initCells_Mines', this.aCells)
    }
  }

  initCells_Flags() {
    this.aCells.forEach((element) => {
      if (element.bBomb == true) {
        let aCellsNear = this.getCellsNearCell(element);
        aCellsNear.forEach((cellNear) => {
          cellNear.iBombNear++;
        });
      }
    });
  }

  clickOnCell(evt) {
    if (this.LOGS) console.log("clickOnCell" + evt.currentTarget.attributes.id);
    let sID = evt.currentTarget.id;
    let cell = this.getCellFromId(sID);
    this.checkCellContent(cell);
    this.showRemainings();
    setTimeout(this.checkIfWin.bind(this), this.iAlertDelay);
  }

  rightclickOnCell(evt) {
    evt.preventDefault();
    if (this.LOGS) console.log("rightclickOnCell" + evt.currentTarget.attributes.id);
    let sID = evt.currentTarget.id;
    let cell = this.getCellFromId(sID);
    this.revealCellFlag(cell, true);
  }

  getCellFromId(sID) {
    let aPoint = sID.split("_").map(Number);
    let cell = this.aCellsPatern[aPoint[0]][aPoint[1]];
    return cell;
  }

  checkCellContent(cell, bRecursive) {
    if (cell.isFree()) {
      this.revealCell(cell, true);
    } else if (cell.isBomb()) {
      this.revealCell(cell, false);
      setTimeout(this.gameOver.bind(this), this.iAlertDelay);
    }
  }

  gameOver() {
    var res = confirm("Game Over! Want to retry?");
    if (res == true) {
      this.setup();
    } else {
    }
  }

  getCellsNearCellSquare(cell) {
    let cells = [];
    cells.push(this.aCellsPatern?.[cell.iRow - 1]?.[cell.iCol - 1]);
    cells.push(this.aCellsPatern?.[cell.iRow - 1]?.[cell.iCol]);
    cells.push(this.aCellsPatern?.[cell.iRow - 1]?.[cell.iCol + 1]);
    cells.push(this.aCellsPatern?.[cell.iRow]?.[cell.iCol - 1]);
    cells.push(this.aCellsPatern?.[cell.iRow]?.[cell.iCol + 1]);
    cells.push(this.aCellsPatern?.[cell.iRow + 1]?.[cell.iCol - 1]);
    cells.push(this.aCellsPatern?.[cell.iRow + 1]?.[cell.iCol]);
    cells.push(this.aCellsPatern?.[cell.iRow + 1]?.[cell.iCol + 1]);
    cells = cells.filter(function (element) {
      return element !== undefined;
    });
    if (this.LOGS) console.log('getCellsNearCellSquare', cells);
    return cells;
  }

  getCellsNearCell(cell) {
    let cells = [];
    let icol = cell.iCol + (cell.iRow % 2 == 0);
    cells.push(this.aCellsPatern?.[cell.iRow - 1]?.[icol - 1]);
    cells.push(this.aCellsPatern?.[cell.iRow - 1]?.[icol]);
    cells.push(this.aCellsPatern?.[cell.iRow]?.[cell.iCol - 1]);
    cells.push(this.aCellsPatern?.[cell.iRow]?.[cell.iCol + 1]);
    cells.push(this.aCellsPatern?.[cell.iRow + 1]?.[icol - 1]);
    cells.push(this.aCellsPatern?.[cell.iRow + 1]?.[icol]);

    cells = cells.filter(function (element) {
      return element !== undefined;
    });
    if (this.LOGS) console.log("getCellsNearCell", cells);
    return cells;
  }

  revealCell(cell, bRecurSive) {
    let eCell = cell.getHTMLReference();
    //console.log(eCell)
    cell.isRevealed = true;
    if (cell.bBomb == true) {
      eCell.style.background = "#ff0000";
      eCell.style.fontSize = "24px";
      eCell.firstElementChild.innerText = "💣";
    } else {
      eCell.style.background = "#eee";
      eCell.firstChild.innerText = cell.iBombNear;
      if (bRecurSive) {
        if (cell.acceptRecursive()) {
          let aCells = this.getCellsNearCell(cell);
          this.revealCells(aCells, bRecurSive);
        }
      }
    }
  }

  revealCellFlag(cell, bRotative) {
    if (!cell.isRevealed) {
      cell.revealFlag(true);
    }
  }

  revealCells(cells, bRecurSive) {
    cells.forEach((cell) => {
      if (!cell.isRevealed) {
        let iRow = cell.iRow;
        let iCol = cell.iCol;
        cell.getHTMLReference().style.background = "#0000";
        this.revealCell(cell, bRecurSive);
      }
    });
  }

  getRemainings(cells) {
    var newArray = cells.filter(function (cell) {
      return cell.isRevealed == true;
    });
    return newArray;
  }

  showRemainings() {
    let cells = this.getRemainings(this.aCells);
    if (this.LOGS) console.log("showRemainings" + cells);
    this.tProgress.innerText =
      "Cellules déminées: " +
      cells.length +
      "/" +
      (this.aCells.length - this.settings_MinesCount);
  }

  showMinesNumber() {
    let cells = this.getRemainings(this.aCells);
    if (this.LOGS) console.log("showMinesNumber" + cells);
    this.tNbMines.innerText = "Nombre de mines: " + this.settings_MinesCount;
  }

  checkIfWin() {
    let cells = this.getRemainings(this.aCells);
    if (cells.length == this.aCells.length - this.settings_MinesCount) {
      alert("Vous avez gagné!");
    }
  }
}
