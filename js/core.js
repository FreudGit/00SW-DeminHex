var deminHex;

function newGame(pOptions = {}) {
    deminHex = new DeminHex(pOptions);
    deminHex.setup();
    
    //DeminHex.initGridLayout();
    //deminHex.initGridArray();
}
