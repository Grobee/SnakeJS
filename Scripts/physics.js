var Physics = {
    checkIfOutOfBounds: function(obj){
        if (obj.x < 0) {
            obj.x = 0;
            return true;
        }

        if (obj.x >= Map.tiles.length){
            obj.x = Map.tiles.length - 1;
            return true;
        }

        if (obj.y < 0) {
            obj.y = 0;
            return true;
        }

        if (obj.y >= Map.tiles[0].length){
            obj.y = Map.tiles[0].length - 1;
            return true;
        }

        return false;
    },

    checkCollision: function(obj1, obj2){
        if(obj2){ return !!(obj1.x == obj2.x && obj1.y == obj2.y); }
        else {
            if(Map.tiles[obj1.head.x][obj1.head.y] == Type.WALL) obj1.collisionWith = Type.WALL;
            return !!(Map.tiles[obj1.head.x][obj1.head.y] == Type.SNAKE
                || Map.tiles[obj1.head.x][obj1.head.y] == Type.ENEMY
                || Map.tiles[obj1.head.x][obj1.head.y] == Type.WALL);
        }
    }
};
