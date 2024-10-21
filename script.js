document.getElementById('buttonNewTile').addEventListener('click', function () {
    const quantityColumns = document.getElementById('quantityColumns').value;;
    const quantityLines = document.getElementById('quantityLines').value;
    const sizeTile = document.getElementById('sizeTile').value;
    const colorTile = document.getElementById('colorTile').value;
    const incorrectInput = !quantityColumns || !quantityLines || !sizeTile || !colorTile;

    if (incorrectInput) {
        alert('Введите валидные данные');
        return;
    }
    createGrid(quantityColumns, quantityLines, sizeTile);
    coloringTile(colorTile,quantityColumns,quantityLines);
})

function createGrid(quantityColumns = 16, quantityLines = 16, sizeTile = 50, sizeBorder = 1) {
    const oldCanvas = document.querySelector('.canvas')
    if (oldCanvas){
        oldCanvas.remove()
    }
    const divCanvas = document.createElement('div'); 
    divCanvas.classList.add('canvas'); 
    document.body.appendChild(divCanvas); 
    
    const widthCanvas = quantityColumns * sizeTile;
    let sumTile = quantityColumns * quantityLines;
    divCanvas.style.width = `${widthCanvas}px`;
    divCanvas.innerHTML = '';

    function borderStartEnd(i, divTile) {
        const startElement = i < quantityColumns;
        const endElement = i >= sumTile - quantityColumns;
        const isLeftColumn = i % quantityColumns === 0;
        const isRightColumn = (i + 1) % quantityColumns === 0;

        if (startElement) {
            divTile.style.borderTopWidth = `${sizeBorder * 2}px`;
        }
        if (endElement) {
            divTile.style.borderBottomWidth = `${sizeBorder * 2}px`;
        }
        if (isLeftColumn) {
            divTile.style.borderLeftWidth = `${sizeBorder * 2}px`;
        }
        if (isRightColumn) {
            divTile.style.borderRightWidth = `${sizeBorder * 2}px`;
        }
    }

    for (let i = 0; i < sumTile; i++) {
        const divTile = document.createElement('div');
        divTile.style.border = `${sizeBorder}px solid black`;
        divTile.style.width = `${sizeTile}px`;
        divTile.style.height = `${sizeTile}px`;
        divTile.classList.add('divTile');
        borderStartEnd(i, divTile);

        divCanvas.appendChild(divTile);
    }
}

function coloringTile(colorTile = '#f6b73c',quantityColumns,quantityLines) {
    const divCanvas = document.querySelector('.canvas');
    let trackingButtonDown = false
    let tilesOpacity = [];


    const divCanvasNew = document.querySelector('.canvas');
    for (let i = 0; i<quantityLines; i++){

    }

 

    divCanvasNew.addEventListener('mousedown', (event) => {
        if (event.target.classList.contains('divTile')){
            trackingButtonDown = true;
            const tile = event.target;
            let tileStyle = parseFloat(window.getComputedStyle(tile).opacity);
            tile.style.opacity = tileStyle + 0.2;
            tile.style.backgroundColor = `${colorTile}`;
            console.log(window.getComputedStyle(tile).opacity)
        }
        })
    divCanvasNew.addEventListener('mouseover', (event) => {
        if (trackingButtonDown && event.target.classList.contains('divTile')) {
            const tile = event.target;
            let tileStyle = parseFloat(window.getComputedStyle(tile).opacity);
            tile.style.backgroundColor = `${colorTile}`;
            tile.style.opacity = tileStyle + 0.2;
            console.log(window.getComputedStyle(tile).opacity)
        }
    })
    divCanvasNew.addEventListener('mouseup', () => {
        trackingButtonDown = false;
    })
}


createGrid(16, 16, 50);
coloringTile();
