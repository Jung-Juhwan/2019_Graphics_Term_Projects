

var canvas;
var gl;


var maxNumTriangles = 1000;
var maxNumVertices = 3 * maxNumTriangles;

var colors = [
  vec4(0.0, 0.0, 0.0, 1.0),  // black
  vec4(1.0, 0.0, 0.0, 1.0),  // red
  vec4(1.0, 1.0, 0.0, 1.0),  // yellow
  vec4(0.0, 1.0, 0.0, 1.0),  // green
  vec4(0.0, 0.0, 1.0, 1.0),  // blue
  vec4(1.0, 0.0, 1.0, 1.0),  // magenta
  vec4(0.0, 1.0, 1.0, 1.0)   // cyan
];
var myColor = [];

var vertices = [];
var index = 0;


window.onload = function init() {
  canvas = document.getElementById("gl-canvas");

  gl = WebGLUtils.setupWebGL(canvas);
  if (!gl) { alert("WebGL isn't available"); }

  canvas.addEventListener("mousedown", function () {

    vertices.push(vec2(2 * event.clientX / canvas.width - 1,
      2 * (canvas.height - event.clientY) / canvas.height - 1));

    if (vertices.length % 3 == 0) {
      render();
      // vertices.clear;
      // vertices = [];
      index++;
    }
  });


  gl.viewport(0, 0, canvas.width, canvas.height);
  gl.clearColor(1, 1, 1, 1.0);


  //
  //  Load shaders and initialize attribute buffers
  //

  //render();
}


function render() {
  var program = initShaders(gl, "vertex-shader", "fragment-shader");
  gl.useProgram(program);

  var bufferId = gl.createBuffer();
  gl.bindBuffer(gl.ARRAY_BUFFER, bufferId);
  gl.bufferData(gl.ARRAY_BUFFER, flatten(vertices), gl.STATIC_DRAW);

  var vPosition = gl.getAttribLocation(program, "vPosition");
  gl.vertexAttribPointer(vPosition, 2, gl.FLOAT, false, 0, 0);
  gl.enableVertexAttribArray(vPosition);

  myColor.push(colors[index % 7]);
  myColor.push(colors[index % 7]);
  myColor.push(colors[index % 7]);

  var vertexColorBufferId = gl.createBuffer();
  gl.bindBuffer(gl.ARRAY_BUFFER, vertexColorBufferId);
  gl.bufferData(gl.ARRAY_BUFFER, flatten(myColor), gl.STATIC_DRAW);

  var vColor = gl.getAttribLocation(program, "vColor");
  gl.vertexAttribPointer(vColor, 4, gl.FLOAT, false, 0, 0);
  gl.enableVertexAttribArray(vColor);

  gl.drawArrays(gl.TRIANGLES, 0, vertices.length);

}
