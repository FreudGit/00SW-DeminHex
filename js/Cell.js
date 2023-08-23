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

  getHTMLReference() {
    let eElement = document.getElementById(`${this.iRow}_${this.iCol}`);
    //console.log('getHTMLReference' + eElement)
    return eElement;
  }

  isReavealed() {
    return this.bRevealed == false;
  }

  isBomb() {
    return this.bBomb == true;
  }

  isFlag() {
    return this.iFlag != 0;
  }

  isFree() {
    if (this.isRevealed) {
      return false;
    } else if (this.isBomb()) {
      return false;
    } else {
      return true;
    }
  }

  acceptRecursive() {
    let bOK = this.bBomb == false && this.iBombNear == 0;
    return bOK;
  }

  revealFlag(bRotative) {
    if (bRotative) {
      this.iFlag++;
      if (this.iFlag > 2) this.iFlag = 0;
    }

    let eCell = this.getHTMLReference();
    console.log(eCell);
    if (this.iFlag == 0) {
      eCell.firstElementChild.innerText = "";
    } else if (this.iFlag == 1) {
      eCell.firstElementChild.innerText = "⚑";
      eCell.style.background = "orange";
    } else if (this.iFlag == 2) {
      eCell.firstElementChild.innerText = "?";
      eCell.style.background = "orange";
    }
  }

  revealBomb(bCompleted=false) {
    let eCell = this.getHTMLReference();
    if (bCompleted) {
    eCell.style.background = "#FFA500";
  } else {
      eCell.style.background = "#ff0000";
    }
    eCell.style.fontSize = "24px";
    eCell.firstElementChild.innerText = "💣";
  }
}
