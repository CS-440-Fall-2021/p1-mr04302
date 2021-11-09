function eventHandler() {
    document.addEventListener('keydown', (event) => {
        var name = event.key;
        console.log(name);

        if (name == 'V' || name == 'v') {
            if (renderMode + 1 > 3) {
                renderMode = 1;
            } else {
                renderMode += 1;
            }
        }
        if (name == "C" || name == "c") {
            if (shaderMode + 1 > 3) {
                shaderMode = 1;
            } else {
                shaderMode += 1;
            }
        }

        if (name == "W" || name == "w") {
            if (pitch - 0.5 > -90) {
                pitch -= 0.5;
            } else {
                pitch = -90;
            }
        }
        if (name == "S" || name == "s") {
            if (pitch + 0.5 < 90) {
                pitch += 0.5;
            } else {
                pitch = 90;
            }
        }
        if (name == "A" || name == "a") {
            if (yaw - 0.5 > -90) {
                yaw -= 0.5;
            } else {
                yaw = -90;
            }
        }
        if (name == "D" || name == "d") {
            if (yaw + 0.5 < 90) {
                yaw += 0.5;
            } else {
                yaw = 90;
            }
        }
        if (name == "Q" || name == "q") {
            if (roll + 0.5 < 90) {
                roll += 0.5;
            } else {
                roll = 90;
            }
        }
        if (name == "E" || name == "e") {
            if (roll - 0.5 > -90) {
                roll -= 0.5;
            } else {
                roll = -90;
            }
        }
        if (name == "ArrowUp") {
            if (speed + 0.01 < 1) {
                speed += 0.01;
            } else {
                speed = 1;
            }
        }
        if (name == "ArrowDown") {
            if (speed - 0.1 > 0) {
                speed -= 0.1;
            } else {
                speed = 0;
            }
        }
        if (name == "1" || name == "!") {
            if (left - 0.1 > -10) {
                left -= 0.1;
            } else {
                left = -10;
            }
        }
        if (name == "2" || name == "@") {
            if (right + 0.1 < 10) {
                right += 0.1;
            } else {
                right = 10;
            }
        }
        if (name == "3" || name == "#") {
            if (topval + 0.1 < 10) {
                topval += 0.1;
            } else {
                top = 10;
            }
        }
        if (name == "4" || name == "$") {
            if (bottom - 0.1 > -10) {
                bottom -= 0.1;
            } else {
                bottom = -10;
            }
        }
        if (name == "5" || name == "%") {
            if (near + 0.1 < 10) {
                near += 0.1;
                console.log(near);
            } else {
                near = 106666;
            }
        }
        if (name == "6" || name == "^") {
            if (far - 0.1 > -10) {
                far -= 0.1;
                console.log(far);
            } else {
                far = -10;
            }
        }
    });
}