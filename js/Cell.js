class Cell {

    constructor(iRow, iCol) {
        this.iRow = iRow;
        this.iCol = iCol;

    }

    bBomb = false;
    bRevealed = false;
    bLocked = false;

    getHTMLReference() {
        let eElement = document.getElementById(`${this.iRow} ${this.iCol}`);
        return eElement;
    }

    isReavealed() {
        return bRevealed == false
    }

    isBomb() {
        return bBomb == false
    }


    isFree() {
        if (this.isRevealed()) {
            return false;
        } else if (this.isBomb()) {
            return false;
        } else {
            return true;
        }
    }





}