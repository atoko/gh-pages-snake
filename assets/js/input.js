const input = (() => {
    let horizontalInput = 0;
    let verticalInput = 0;

    const listener = (event) => {
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
    };

    const left = () => {
        if (horizontalInput === 1) {
            return;
        }
        horizontalInput = -1;
        verticalInput = 0;
    }

    const right = () => {
        if (horizontalInput === -1) {
            return;
        }

        horizontalInput = 1;
        verticalInput = 0;
    }

    const up = () => {
        if (verticalInput === 1) {
            return;
        }

        horizontalInput = 0;
        verticalInput = -1;
    }

    const down = () => {
        if (verticalInput === -1) {
            return;
        }

        horizontalInput = 0;
        verticalInput = 1;        
    }

    return {
        initialize: (element) => {
            element.addEventListener("keydown", listener);    
        },
        teardown: (element) => {
            element.removeEventListener("keydown", listener);
        },
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