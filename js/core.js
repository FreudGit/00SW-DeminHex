var deminHex;


function newGame(pOptions = {}) {
    pOptions['gameType'] = ["square", "hexagon"];
    pOptions['sType'] =  pOptions['gameType'] [Math.floor(Math.random() * pOptions['gameType'].length)];;
    pOptions['bRandomize'] = true;
    deminHex = new DeminHex(pOptions);
    deminHex.setup();
}
