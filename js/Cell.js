class Cell {
  constructor(iRow, iCol) {
    this.iRow = iRow;
    this.iCol = iCol;
  }

  bBomb = false;
  bRevealed = false;
  bLocked = false;
  iBombNear = 0;
  iFlag = 0;

  /**
   * Récupérer la référence HTML de la cellule(DOM)
   */
  getHTMLReference() {
    let eElement = document.getElementById(`${this.iRow}_${this.iCol}`);
    //console.log('getHTMLReference' + eElement)
    return eElement;
  }

  /**
   * Indique si la cellule est révélée
   * @returns boolean true si la cellule est révélée
   */
  isRevealed() {
    return this.bRevealed == true;
  }

  /**
   * Indique si la cellule contient une bombe
   * @returns boolean true si la cellule contient une bombe
   */
  isBomb() {
    return this.bBomb == true;
  }

  /**
   * Indique si la cellule contient un flag
   * @returns boolean true si la cellule contient une flag
   */
  isFlag() {
    return this.iFlag != 0;
  }

  /**
   * Indique si la cellule est 'free' (non révélée et non bombe)
   * @returns boolean true si la cellule est 'free'
   */
  isFree() {
    if (this.isRevealed()) {
      return false;
    } else if (this.isBomb()) {
      return false;
    } else {
      return true;
    }
  }

  /**
   * Indique si le contexte de la cellule est libre
   * @returns boolean true si le contexte de la cellule est libre
   */
  acceptRecursive() {
    let bOK = this.bBomb == false && this.iBombNear == 0;
    return bOK;
  }

  /**
   * Afficher les flags
   * @param {*} bRotative Switch entre les type de flags
   */
  revealFlag(bRotative) {
    if (bRotative) {
      this.iFlag++;
      if (this.iFlag > 2) this.iFlag = 0;
    }

    let eCell = this.getHTMLReference();
    //console.log(eCell);
    if (this.iFlag == 0) {
      eCell.firstElementChild.innerText = "";
      eCell.style.background = "grey";
    } else if (this.iFlag == 1) {
      eCell.firstElementChild.innerText = "⚑";
      eCell.style.background = "orange";
    } else if (this.iFlag == 2) {
      eCell.firstElementChild.innerText = "?";
      eCell.style.background = "orange";
    }
  }

  /**
   * Afficher les bombes
   * @param {*} bCompleted Le jeu est terminé
   */
  revealBomb(bCompleted = false) {
    let eCell = this.getHTMLReference();
    if (bCompleted) {
      eCell.style.background = "#FFA500";
    } else {
      eCell.style.background = "#ff0000";
    }
    eCell.style.fontSize = "24px";
    eCell.firstElementChild.innerText = "💣";
  }


  /**
   * Afficher les information de l'objet de facon lisible
   * @returns string Information de l'objet
   * @example Cell0-0,💣,👓,🔒,⚠1,⚑
  */
  toString() {
    let sInfo= "";
    sInfo += 'Cell' + this.iRow + "-" + this.iCol + ",";
    if (this.bBomb) sInfo += "💣"+ ",";
    if (this.bRevealed) sInfo += "👓"+ ",";
    if (this.bLocked) sInfo += "🔒"+ ",";
    if (this.iBombNear > 0) sInfo += "⚠"+ this.iBombNear+ ",";
    if (this.iFlag > 0) sInfo += "⚑";
  
    return sInfo;
  }
}
