const input = (() => {
    let horizontalInput = 0;
    let verticalInput = 0;

    document.addEventListener("keydown", (event) => {
        switch(event.key) {
            case "Down": // IE specific value
            case "ArrowDown":
                horizontalInput = 0;
                verticalInput = 1;
                break;
            case "Up": // IE specific value
            case "ArrowUp":
                horizontalInput = 0;
                verticalInput = -1;
                break;
            case "Left": // IE specific value
            case "ArrowLeft":
                horizontalInput = -1;
                verticalInput = 0;
                break;
            case "Right": // IE specific value
            case "ArrowRight":
                horizontalInput = 1;
                verticalInput = 0;
                break;
        }
    });
    
    return {
        getHorizontal: () => {
            return horizontalInput;
        },
        getVertical: () => {
            return verticalInput;
        },
        reset: () => {
            horizontalInput = 0;
            verticalInput = 0;
        }
    }
})()