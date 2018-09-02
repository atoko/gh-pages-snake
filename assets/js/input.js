const input = (() => {
    let horizontalInput = 0;
    let verticalInput = 0;


    document.addEventListener("keydown", (event) => {
        switch(event.key) {
            case "Down": // IE specific value
            case "ArrowDown":
                down();
                break;
            case "Up": // IE specific value
            case "ArrowUp":
                up();
                break;
            case "Left": // IE specific value
            case "ArrowLeft":
                left();
                break;
            case "Right": // IE specific value
            case "ArrowRight":
                right()
                break;
        }
    });

    const left = () => {
        horizontalInput = -1;
        verticalInput = 0;
    }

    const right = () => {
        horizontalInput = 1;
        verticalInput = 0;
    }

    const up = () => {
        horizontalInput = 0;
        verticalInput = -1;
    }

    const down = () => {
        horizontalInput = 0;
        verticalInput = 1;        
    }

    return {
        left,
        right,
        up,
        down,
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