var Food = function(tileSize){
    this.x = 0;
    this.y = 0;

    this.tileSize = tileSize;

    this.spawn = function(){
        do{
            this.x = Math.floor(Math.random() * (Map.rows - 1));
            this.y = Math.floor(Math.random() * (Map.columns - 1));
        }while(Map.tiles[this.x][this.y] == Type.SNAKE);
    };
};
