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
    const oldCanvas = document.querySelector('.canvas');
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

        const indexRow = Math.floor(i / quantityColumns);
        const indexCol = i % quantityColumns;
        divTile.setAttribute('data-row',indexRow);
        divTile.setAttribute('data-col',indexCol);
        
        divCanvas.appendChild(divTile);
    }
}

function coloringTile(colorTile = '#f6b73c',quantityColumns = 16,quantityLines = 16) {
    const divCanvas = document.querySelector('.canvas');
    let trackingButtonDown = false;
    let tilesOpacity = [];


    for (let i = 0; i<quantityLines; i++){
        tilesOpacity[i] = [];
        for (let j = 0; j < quantityColumns; j++){
            tilesOpacity[i][j] = 0;
        }
    }

    divCanvas.addEventListener('mousedown', (event) => {
        if (event.target.classList.contains('divTile')){
            trackingButtonDown = true;
            const tile = event.target;
            const row = Number(tile.getAttribute('data-row'));
            const col = Number(tile.getAttribute('data-col'));
            let tileOpacity = tilesOpacity[row][col];

            tileOpacity = tileOpacity + 0.2;
            tilesOpacity[row][col] = tileOpacity;
            tile.style.opacity = tileOpacity;
            tile.style.backgroundColor = `${colorTile}`;
        }
        })
    divCanvas.addEventListener('mouseover', (event) => {
        if (trackingButtonDown && event.target.classList.contains('divTile')) {
            const tile = event.target;
            const row = Number(tile.getAttribute('data-row'));
            const col = Number(tile.getAttribute('data-col'));
            let tileOpacity = tilesOpacity[row][col];

            tileOpacity = tileOpacity + 0.2;
            tilesOpacity[row][col] = tileOpacity;
            tile.style.opacity = tileOpacity;
            tile.style.backgroundColor = `${colorTile}`;
        }
    })
    divCanvas.addEventListener('mouseup', () => {
        trackingButtonDown = false;
    })
}


createGrid(16, 16, 50);
coloringTile();
