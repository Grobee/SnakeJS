var Food = function(tileSize){
    this.x = 0;
    this.y = 0;

    this.tileSize = tileSize;
    this.bonus = false;

    this.spawn = function(){
        do{
            /* 8% chance of this food being a bonus food */
            if(Math.random() <= 0.08) this.bonus = true;
            else this.bonus = false;

            this.x = Math.floor(Math.random() * (Map.rows - 1));
            this.y = Math.floor(Math.random() * (Map.columns - 1));
        } while(Map.tiles[this.x][this.y] == Type.SNAKE || Map.tiles[this.x][this.y] == Type.WALL || Map.tiles[this.x][this.y] == Type.ENEMY);
    };
};
