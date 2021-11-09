function get_height(x,y){
    // get height using perlin noise
   return perlin.get(x,y)*2;
}

function get_patch(xmin, xmax, zmin, zmax) {
    var step = 0.1;
    var patch = [];    
    
    // find number of steps in rows and columns
    // var step_rows = Math.floor((zmax - zmin) / step) + 1;
    // var step_cols = Math.floor((xmax - xmin) / step) + 1;

    // iterate over rows and columns
    for (let z = zmin; z <= zmax; z += step){
        for (let x = xmin; x <= xmax; x += step) {
            // push initial triangle
            patch.push(vec3(x,get_height(x,z),z)); 
            patch.push(vec3(x+step,get_height(x+step,z), z));
            patch.push(vec3(x,get_height(x,z+step),z+step));
            
            // push second triangle
            patch.push(vec3(x+step,get_height(x+step,z), z));
            patch.push(vec3(x+step,get_height(x+step,z+step),z+step));
            patch.push(vec3(x,get_height(x,z+step),z+step));

        }
    }
    return patch
    // return triangles;
}

function frustum(left, right, bottom, top, near, far) {

    if (left == right) { throw "frustum(): left and right are equal"; }
    if (bottom == top) { throw "frustum(): bottom and top are equal"; }
    if (near == far) { throw "frustum(): near and far are equal"; }

    let w = right - left;
    let h = top - bottom;
    let d = far - near;
    let result = mat4();

    result[0][0] = 2.0 * near / w;
    result[1][1] = 2.0 * near / h;
    result[2][2] = -(far + near) / d;
    result[0][2] = (right + left) / w;
    result[1][2] = (top + bottom) / h;
    result[2][3] = -2 * far * near / d;
    result[3][2] = -1;
    result[3][3] = 0.0;

    return result;

}
function initWebGL(){

    canvas = document.getElementById("gl-canvas");
    gl = canvas.getContext("webgl2");
    if(!gl) alert("WebGL not supported");

    gl.viewport(0, 0, canvas.width, canvas.height);
    gl.clearColor(135/255,206/255,235/255, 1.0);

    program = initShaders(gl, "vertex-shader", "fragment-shader");
    gl.useProgram(program);
    gl.enable(gl.DEPTH_TEST);
}

function bindtoBuffer(){
   
    //Bind matrices to buffer
    modelViewMatrixLoc = gl.getUniformLocation(program, "modelViewMatrix");
    projectionMatrixLoc = gl.getUniformLocation(program, "projectionMatrix");
    rotationMatrixLoc = gl.getUniformLocation(program, "rotationMatrix");
    gl.uniformMatrix4fv(modelViewMatrixLoc, false, flatten(modelViewMatrix));
    gl.uniformMatrix4fv(projectionMatrixLoc, false, flatten(projectionMatrix));
    gl.uniformMatrix4fv(rotationMatrixLoc, false, flatten(rotationMatrix));
    //Bind vertices to buffer
    var vPosition = gl.getAttribLocation(program, "vPosition");
    gl.bindBuffer(gl.ARRAY_BUFFER, gl.createBuffer());
    gl.bufferData(gl.ARRAY_BUFFER, flatten(vertices), gl.STATIC_DRAW);
    gl.enableVertexAttribArray(vPosition);
    gl.vertexAttribPointer(vPosition, 3, gl.FLOAT, false, 0, 0);

}

function render(){
    gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
    //Update camera vectors
    eye = vec3(eye[0], eye[1], eye[2] - speed);
    at = vec3(at[0], at[1], at[2] - speed);
    //Update modelview
    modelViewMatrix = lookAt(eye, at, up);
    //Update projection
    projectionMatrix = frustum(left, right, bottom, topval, near, far);
    //Update rotation
    rotationMatrix = mult(mult(rotateX(pitch), rotateY(yaw)), rotateZ(roll));
    
    bindtoBuffer();

    if(renderMode == 1){
        gl.drawArrays(gl.LINE_STRIP, 0, vertices.length);
    }
    if(renderMode == 2){
        gl.drawArrays(gl.POINTS, 0, vertices.length);
    }
    if(renderMode == 3){
        gl.drawArrays(gl.TRIANGLES, 0, vertices.length);
    }
    requestAnimationFrame(render);
}

function initVars(){
    
    pitch = 0;
    yaw = 0;
    roll = 0;
    speed = 0.01;
    renderMode = 1;
    shaderMode = 1;

    vertices = get_patch(-5, 5, -5, 5);

    eye = vec3(0, 2, 5);
    at = vec3(0, 0, -1);
    up = vec3(0, 1, 0);

    left = -1;
    right = 1;
    bottom = -1;
    topval = 1;
    near = 1;
    far = -1;

}
window.onload = function(){

    initWebGL();
    initVars();
    eventHandler();
    render();
};