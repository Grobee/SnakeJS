var Physics = {
    checkIfOutOfBounds: function(object){
        if (object[0].x < 0) {
            object[0].moveTo(0, object[0].y)
            return true;
        }

        if (object[0].x + object[0].width > Game.canvas.width){
            object[0].moveTo(Game.canvas.width - object[0].width, object[0].y)
            return true;
        }

        if (object[0].y < 0) {
            object[0].moveTo(object[0].x, 0);
            return true;
        }

        if (object[0].y + object[0].height > Game.canvas.height){
            object[0].moveTo(object[0].x, Game.canvas.height - object[0].height);
            return true;
        }

        return false;
    },

    killSnake: function(object){
        if(object[0].direction == Direction.UP || object[0].direction == Direction.DOWN)
            object[1].moveTo(object[1].x, Math.abs(object[0].y - object[1].height));

        if(object[0].direction == Direction.LEFT || object[0].direction == Direction.RIGHT)
            object[1].moveTo(Math.abs(object[0].x - object[1].width), object[1].y);

        for(var i = 2; i < object.length; i++)
            object[i].moveTo(object[i - 1].prevX, object[i - 1].prevY);
    }
};
