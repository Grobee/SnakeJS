var Map = {
    tileSize: null,
    rows: null,
    columns: null,
    tiles: [],
    init: function(tileSize){
        this.tileSize = tileSize;

        this.rows = Game.canvas.height / this.tileSize;
        this.columns = Game.canvas.width / this.tileSize;
        var coords = { x: 0, y: 0 };

        for(var i = 0; i < this.rows; i++){
            coords.x = 0;
            this.tiles[i] = [];

            for(var j = 0; j < this.columns; j++){
                this.tiles[i][j] = { x: coords.x, y: coords.y };
                coords.x += this.tileSize;
            }
            coords.y += this.tileSize;
        }

        console.log(this.tiles);
    }
};