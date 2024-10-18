

function createGrid(quantityColumns = 16, quantityLines = 16, sizeTile = 50, sizeBorder = 1) {

    const divCanvas = document.querySelector('.canvas');
    const widthCanvas = quantityColumns * sizeTile;
    let sumTile = quantityColumns * quantityLines;
    divCanvas.style.width = `${widthCanvas}px`;

    
    function borderStartEnd(i,divTile) {
        const startElement = i < quantityColumns;
        const endElement = i >= sumTile - quantityColumns;
        const isLeftColumn = i % quantityColumns === 0;
        const isRightColumn = (i + 1) % quantityColumns === 0;

        if (startElement) {
            divTile.style.borderTopWidth = `${sizeBorder*2}px`;
        } 
        if (endElement) {
            divTile.style.borderBottomWidth = `${sizeBorder*2}px`;
        } 
        if (isLeftColumn) {
            divTile.style.borderLeftWidth = `${sizeBorder*2}px`;
        }
        if (isRightColumn) {
            divTile.style.borderRightWidth = `${sizeBorder*2}px`;
        }
    }

    for (let i = 0; i < sumTile; i++){
        const divTile = document.createElement('div');
        divTile.style.border = `${sizeBorder}px solid black`;
        divTile.style.width = `${sizeTile}px`
        divTile.style.height = `${sizeTile}px`
        divTile.classList.add('divTile');
        borderStartEnd(i,divTile);

        divCanvas.appendChild(divTile);
    }
}

function coloringTile(colorTile = 'blue') {
    const tiles = document.querySelectorAll('.divTile')
    let trackingButtonDown = false;

    tiles.forEach(tile => {
        tile.addEventListener('mousedown', () => {
            trackingButtonDown = true
            tile.style.backgroundColor = `${colorTile}`
        })
    })

    tiles.forEach(tile => {
        tile.addEventListener('mouseover', () => {
            if (trackingButtonDown){
                tile.style.backgroundColor = `${colorTile}`;
            }

        })
    })

    tiles.forEach(tile => {
        tile.addEventListener('mouseup', () => {
            trackingButtonDown = false;
        })
    })
}


createGrid(20,20,25)
coloringTile()
