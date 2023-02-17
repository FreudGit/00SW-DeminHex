class Cell {

    constructor(iRow, iCol) {
        this.iRow = iRow;
        this.iCol = iCol;
        
    }

    bBomb=false;
    bShowed=false;
    bLocked=false;
  
    getHTMLReference() {
        let eElement= document.getElementById( `${this.iRow} ${this.iCol}`);
        return eElement;
    }
}