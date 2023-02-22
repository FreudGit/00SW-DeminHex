class Cell {
  constructor (iRow, iCol) {
    this.iRow = iRow
    this.iCol = iCol
  }

  bBomb = false
  bRevealed = false
  bLocked = false
  iBombNear = 0

  getHTMLReference () {
    let eElement = document.getElementById(`${this.iRow}_${this.iCol}`)
    console.log('hhh' + eElement)
    return eElement
  }

  isReavealed () {
    return this.bRevealed == false;
  }

  isBomb () {
    return this.bBomb == true;
  }

  isFree () {
    if (this.isRevealed) {
      return false
    } else if (this.isBomb()) {
      return false
    } else {
      return true
    }
  }

  acceptRecursive () {
    let bOK = this.bBomb == false && this.iBombNear == 0
    return bOK
  }
  revealFlags () {}
}
