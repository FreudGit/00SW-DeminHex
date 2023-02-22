class DeminHex {
  constructor (height, width) {
    this.height = height
    this.width = width
    this.aCells = []
    this.aCellsPatern = []
    this.aPatern = [3, 4, 3, 4]
    this.settings_MinesCount = 3
  }

  setup () {
    this.initCells();
    this.initCells_Mines();
    this.initCells_Flags();
    this.initGridLayout();
  }

  initCells (params) {
    const aPattern = this.aPatern
    this.aCellsPatern = []
    for (let i = 0; i < aPattern.length; i++) {
      this.aCellsPatern.push([])
      for (let j = 0; j < aPattern[i]; j++) {
        let cell = new Cell(i, j)
        this.aCells.push(cell)
        this.aCellsPatern[i].push(cell)
      }
    }
  }

  initGridLayout (params) {
    const container = document.querySelector('.container')
    const hexagonPattern = this.aPatern

    for (let i = 0; i < hexagonPattern.length; i++) {
      const row = document.createElement('div')
      row.classList.add('row')
      for (let j = 0; j < hexagonPattern[i]; j++) {
        const hexagon = document.createElement('div')
        hexagon.classList.add('hexagon')
        hexagon.id = `${i}_${j}`
        //hexagon.id = `bobo`;
        hexagon.addEventListener('click', this.clickOnCell.bind(this))
        //console.log(hexagon.attributes.id)
        const eSpan = document.createElement('p')
        eSpan.classList.add('text')
        eSpan.classList.add('not-selectable')
        eSpan.innerHTML = hexagon.id
        hexagon.appendChild(eSpan)
        row.appendChild(hexagon)
      }
      container.appendChild(row)
    }
  }
  initGridArray (params) {}

  initCells_Mines (params) {
    let iMines = 0
    while (iMines < this.settings_MinesCount) {
      // FH REmoved as i'll use linear array
      //var iRow = Math.floor(Math.random() * this.options.rows);
      //var iCol = Math.floor(Math.random() * this.options.cols);
      var iRand = Math.floor(Math.random() * this.aCells.length)
      if (this.aCells[iRand].bBomb == false) {
        this.aCells[iRand].bBomb = true
        iMines++
      }
      //console.log(this.aCells)
    }
  }

  initCells_Flags () {
    this.aCells.forEach(element => {
      if (element.bBomb == true) {
            let aCellsNear=this.getCellsNearCell(element);
            this.aCells.forEach(cellNear => {
                cellNear.iBombNear++;
            })
      }
    })

  }

  clickOnCell (evt) {
    // target pointe sur les enfants, currenttarget est parfait
    console.log('clickOnCell' + evt.currentTarget.attributes.id)
    let sID = evt.currentTarget.id
    let aPoint = sID.split('_').map(Number)
    let cell = this.aCellsPatern[aPoint[0]][aPoint[1]]
    //let cell = this.aCellsPatern[0];
    this.checkCellContent(cell)
    //console.log(cell)
    console.log(this.getCellsNearCell(cell))
  }

  checkCellContent (cell, bRecursive) {
    if (!cell.isFree()) {
      console.log('bb')
      this.revealCell(cell)
      cell.isRevealed = true
      let aCells = this.getCellsNearCell(cell)
      this.revealCells(aCells)
    }
  }

  getCellsNearCellSquare (cell) {
    let cells = []
    //cells.push(null);

    cells.push(this.aCellsPatern?.[cell.iRow - 1]?.[cell.iCol - 1])
    cells.push(this.aCellsPatern?.[cell.iRow - 1]?.[cell.iCol])
    cells.push(this.aCellsPatern?.[cell.iRow - 1]?.[cell.iCol + 1])

    cells.push(this.aCellsPatern?.[cell.iRow]?.[cell.iCol - 1])
    cells.push(this.aCellsPatern?.[cell.iRow]?.[cell.iCol + 1])

    cells.push(this.aCellsPatern?.[cell.iRow + 1]?.[cell.iCol - 1])
    cells.push(this.aCellsPatern?.[cell.iRow + 1]?.[cell.iCol])
    cells.push(this.aCellsPatern?.[cell.iRow + 1]?.[cell.iCol + 1])

    cells = cells.filter(function (element) {
      return element !== undefined
    })
    console.log(cells)
    return cells
  }

  getCellsNearCell (cell) {
    let cells = []
    //console.log('getCellsNearCell')
    let icol = cell.iCol + (cell.iRow % 2 == 0)

    cells.push(this.aCellsPatern?.[cell.iRow - 1]?.[icol - 1])
    cells.push(this.aCellsPatern?.[cell.iRow - 1]?.[icol])
    cells.push(this.aCellsPatern?.[cell.iRow]?.[cell.iCol - 1])
    cells.push(this.aCellsPatern?.[cell.iRow]?.[cell.iCol + 1])
    cells.push(this.aCellsPatern?.[cell.iRow + 1]?.[icol - 1])
    cells.push(this.aCellsPatern?.[cell.iRow + 1]?.[icol])

    cells = cells.filter(function (element) {
      return element !== undefined
    })
    console.log(cells)
    return cells
  }

  getHTMLReference () {
    let eElement = document.getElementById(`${this.iRow} ${this.iCol}`)
    console.log('hhh' + eElement)
    return eElement
  }

  revealCell (cell) {
    let eCell = cell.getHTMLReference()
    //console.log('ssw' + eCell)
    if (cell.bBomb == true) {
      eCell.style.background = '#ff0000'
      eCell.style.fontSize = '24px'
      eCell.firstElementChild.innerText = '💣'
    } else {
      eCell.style.background = '#eee'
    }
  }

  revealCells (cells) {
    //console.log(cells)
    cells.forEach(cell => {
      if (!cell.isRevealed) {
        let iRow = cell.iRow
        let iCol = cell.iCol
        cell.getHTMLReference().style.background = '#0000'
        this.revealCell(cell)
      }
    })
  }
}
