class DeminHex {
  constructor(options = {}) {
    this.aCells = [];
    this.aCellsPatern = [];
    this.aPatern = [3, 4, 3, 4];
    this.settings_MinesCount = 3;
    this.tProgress = 0;
    this.tNbMines = 0;
    this.iAlertDelay = 500;
    this.btnNewGame = 0;
    this.gameType = ["square", "hexagon"];
    this.LOGS = false;
    this.bRandomize = false;
    // set options specifiques
    for (const key in options) {
      this[key] = options[key];
    }
  }

  /**
   * Préparer le jeu
   */
  setup() {
    this.initGlobals();
    this.reset();
    this.showMinesNumber();
    this.initCells();
    this.initCells_Mines();
    this.initCells_Flags();
    this.initGridLayout();
    this.showRemainings();
    if (this.LOGS) console.log(this.easyDebug());
  }

  /**
   * Redémarrer la partie
   */
  reset() {
    this.aCells = [];
    this.aCellsPatern = [];
    if (this.bRandomize) {
      this.sType =
        this.gameType[Math.floor(Math.random() * this.gameType.length)];
      const aPatternRamdom = Math.floor(Math.random() * 5) + 3;
      this.aPatern = [
        aPatternRamdom,
        aPatternRamdom + (this.sType == "hexagon"),
        aPatternRamdom,
        aPatternRamdom + (this.sType == "hexagon"),
      ];
      this.settings_MinesCount = aPatternRamdom;
    }
  }

  /**
   * Initialiser les cellules
   */
  initCells() {
    const aPattern = this.aPatern;
    this.aCellsPatern = [];
    this.aCellsPaternDebug = [];
    for (let i = 0; i < aPattern.length; i++) {
      this.aCellsPatern.push([]);
      for (let j = 0; j < aPattern[i]; j++) {
        let cell = new Cell(i, j);
        this.aCells.push(cell);
        this.aCellsPatern[i].push(cell);
      }
    }
  }

  /**
   * Initialiser les mines
   */
  initCells_Mines(params) {
    let iMines = 0;
    while (iMines < this.settings_MinesCount) {
      var iRand = Math.floor(Math.random() * this.aCells.length);
      if (this.aCells[iRand].bBomb == false) {
        this.aCells[iRand].bBomb = true;
        iMines++;
      }
      if (this.LOGS) console.log("initCells_Mines", this.aCells);
    }
  }

  /**
   * Initialiser les flags
   */
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

  /**
   * Récupérer une cellule à partir de son ID
   * @param {*} sID ID de la cellule
   * @returns Cell la cellule
   */
  getCellFromId(sID) {
    let aPoint = sID.split("_").map(Number);
    let cell = this.aCellsPatern[aPoint[0]][aPoint[1]];
    return cell;
  }

  /**
   * Vérifier le contenu d'une cellule
   * @param {*} cell Cellule à vérifier
   */
  checkCellContent(cell) {
    if (cell.isFree()) {
      this.revealCell(cell, true);
    } else if (cell.isBomb()) {
      this.revealCell(cell, false);
      this.revealCells_Bomb(this.aCells);

      setTimeout(this.gameOver.bind(this), this.iAlertDelay);
    }
  }

  /**
   * Partie Terminée, demander à l'utilisateur s'il veut recommencer
   */
  gameOver() {
    var res = confirm("Vous avez perdu! Voulez-vous recommencer?");
    if (res == true) {
      this.setup();
    } else {
    }
  }

  /**
   * Récupérer les cellules voisines d'une cellule
   * @param {*} cell Cellule de référence
   * @returns Array<Cell> Tableau de cellules voisines
   */
  getCellsNearCell(cell) {
    let cells = [];
    let icol = cell.iCol;
    if (this.sType == "hexagon") {
      icol += cell.iRow % 2 == 0;
    }
    cells.push(this.aCellsPatern?.[cell.iRow - 1]?.[icol - 1]);
    cells.push(this.aCellsPatern?.[cell.iRow - 1]?.[icol]);
    cells.push(this.aCellsPatern?.[cell.iRow]?.[cell.iCol - 1]);
    cells.push(this.aCellsPatern?.[cell.iRow]?.[cell.iCol + 1]);
    cells.push(this.aCellsPatern?.[cell.iRow + 1]?.[icol - 1]);
    cells.push(this.aCellsPatern?.[cell.iRow + 1]?.[icol]);

    if (this.sType == "square") {
      cells.push(this.aCellsPatern?.[cell.iRow - 1]?.[icol + 1]);
      cells.push(this.aCellsPatern?.[cell.iRow + 1]?.[icol + 1]);
    }

    cells = cells.filter(function (element) {
      return element !== undefined;
    });
    if (this.LOGS) console.log("getCellsNearCell", cells);
    return cells;
  }

  /**
   * Révéler une cellule
   * @param {*} cell Cellule à révéler
   * @param {*} bRecurSive Indique si la révélation est récursive
   */
  revealCell(cell, bRecurSive) {
    let eCell = cell.getHTMLReference();
    cell.bRevealed = true;
    if (cell.bBomb == true) {
      cell.revealBomb(false);
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

  /**
   * Révéler le flag d'une cellule
   * @param {*} cell Cellule référence
   */
  revealCellFlag(cell) {
    if (!cell.isRevealed()) {
      cell.revealFlag(true);
    }
  }

  /**
   * Révéler les cellules
   * @param {*} cell Cellules référence
   * @param {*} bRecurSive Indique si la révélation est récursive
   */
  revealCells(cells, bRecurSive) {
    cells.forEach((cell) => {
      if (!cell.isRevealed()) {
        let iRow = cell.iRow;
        let iCol = cell.iCol;
        cell.getHTMLReference().style.background = "#0000";
        this.revealCell(cell, bRecurSive);
      }
    });
  }

  /**
   * Révéler les bombes
   * @param {*} cell Cellules à valider
   */
  revealCells_Bomb(cells) {
    const bombCells = cells.filter((cell) => cell.bBomb === true);
    bombCells.forEach((cell) => {
      if (!cell.isRevealed()) {
        cell.revealBomb(true);
      }
    });
  }

  /**
   * Récupérer le nombre de cellules révélées
   * @param {*} cells Cellules à valider
   */
  getRemainings(cells) {
    var newArray = cells.filter(function (cell) {
      return cell.isRevealed() == true;
    });
    return newArray;
  }

  /**
   * Valider si le joueur a gagné
   */
  checkIfWin() {
    let cells = this.getRemainings(this.aCells);
    if (cells.length == this.aCells.length - this.settings_MinesCount) {
      this.revealCells_Bomb(this.aCells);
      alert("Vous avez gagné!");
    }
  }

  ////////////////////////////////////////////////////////////
  // DOM
  ////////////////////////////////////////////////////////////

  /**
   * Initialiser les élément html(DOM)
   */
  initGlobals(params) {
    this.tProgress = document.getElementById(`progress`);
    this.tNbMines = document.getElementById(`nbMines`);
    this.btnNewGame = document.getElementById(`btnNewGame`);
    this.btnNewGame.addEventListener("click", this.setup.bind(this));
  }

  /**
   * Initialiser le grid(DOM)
   */
  initGridLayout(params) {
    const container = document.querySelector(".container");
    container.innerHTML = "";
    const hexagonPattern = this.aPatern;

    for (let i = 0; i < hexagonPattern.length; i++) {
      const row = document.createElement("div");
      row.classList.add(this.sType + "row");
      for (let j = 0; j < hexagonPattern[i]; j++) {
        const cell = document.createElement("div");
        cell.classList.add(this.sType);
        cell.id = `${i}_${j}`;
        cell.addEventListener("click", this.clickOnCell.bind(this));
        cell.addEventListener("contextmenu", this.rightclickOnCell.bind(this));
        const eSpan = document.createElement("p");
        eSpan.classList.add("text");
        eSpan.classList.add("not-selectable");
        cell.appendChild(eSpan);
        row.appendChild(cell);
      }
      container.appendChild(row);
    }
  }

  /**
   * Afficher le nombre de cellules restante(décompte) (DOM)
   */
  showRemainings() {
    let cells = this.getRemainings(this.aCells);
    if (this.LOGS) console.log("showRemainings" + cells);
    this.tProgress.innerText =
      "Cellules déminées: " +
      cells.length +
      "/" +
      (this.aCells.length - this.settings_MinesCount);
  }

  /**
   * Afficher le nombre de mines (DOM)
   */
  showMinesNumber() {
    let cells = this.getRemainings(this.aCells);
    if (this.LOGS) console.log("showMinesNumber" + cells);
    this.tNbMines.innerText = "Nombre de mines: " + this.settings_MinesCount;
  }

  ////////////////////////////////////////////////////////////
  // GAME ACTIONS
  ////////////////////////////////////////////////////////////

  /**
   * Click sur une cellule
   * @param {*} evt Objet event
   */
  clickOnCell(evt) {
    if (this.LOGS) console.log("clickOnCell" + evt.currentTarget.attributes.id);
    let sID = evt.currentTarget.id;
    let cell = this.getCellFromId(sID);
    this.checkCellContent(cell);
    this.showRemainings();
    setTimeout(this.checkIfWin.bind(this), this.iAlertDelay);
  }

  /**
   * Click Droit sur une cellule
   * @param {*} evt Objet event
   */
  rightclickOnCell(evt) {
    evt.preventDefault();
    if (this.LOGS)
      console.log("rightclickOnCell" + evt.currentTarget.attributes.id);
    let sID = evt.currentTarget.id;
    let cell = this.getCellFromId(sID);
    this.revealCellFlag(cell, true);
  }

  ////////////////////////////////////////////////////////////////////
  // DEBUG
  ////////////////////////////////////////////////////////////////////

  /**
   * Faciliter le dug en affuchant un array d'information dans la console
   */
  easyDebug() {
    return this.aCellsPatern.map((row) => row.map((cell) => cell.toString()));
  }
}
