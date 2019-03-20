// pour utiliser dat.gui, il faut d'abord créer une classe qui contient
// l'ensemble des données qui seront utilisées dans l'interface
var Parameters = function() {
  //les champs de paramètres peuvent être de plusieurs types
  //Un chiffre :
  this.currAngle = 10;
  this.width = 400;
  this.height = 400;
  //Une couleur :
  this.color = [255, 0, 0];
  //Du texte :
  this.text = "HeLLo wOrLd";
  //Une fonction qui s'éxécutera quand on clique dessus
  this.save = function() {
    //ce code permet de télécharger un canvas avec du JS vanilla
    var link = document.createElement('a');
    link.innerHTML = 'download image';
    link.addEventListener('click', function(ev) {
        link.href = canvas.toDataURL();
        link.download = "myLogo"+(new Date().getTime())+".png";
    }, false);
    link.click();
  }
  this.randomize = function() {
    this.currAngle = Math.random()*360;
    this.width = Math.random()*800;
    this.height = Math.random()*800;
    this.color[0] = Math.floor(Math.random()*255);
    this.color[1] = Math.floor(Math.random()*255);
    this.color[2] = Math.floor(Math.random()*255);

    //le code suivant permet d'updater les valeurs affichées par dat.gui
    for (var i in gui.__controllers) {
        gui.__controllers[i].updateDisplay();
    }
  }
};

var params = new Parameters();

var canvas,context,gui;

function setup() {
  canvas = document.getElementById("mainCanvas")
  canvas.width = 2*800;
  canvas.height = 2*800;
  context = canvas.getContext("2d");
  context.font = "60px sans-serif";
  context.textAlign = "center";

  //SETUP DAT.GUI
  //ici on crée une instance de dat.gui
  gui = new dat.GUI();
  //puis on crée des sliders qui sont associés aux paramètres créés avant
  gui.add(params, 'randomize').name("Randomize");
  gui.add(params, 'currAngle', 0, 360).name("Current Angle");
  gui.add(params, 'width', 0, 800).name("Width");
  gui.add(params, 'height', 0, 800).name("Height");
  gui.add(params, 'text').name("Text");
  gui.addColor(params, 'color').name("Color");
  gui.add(params, 'save').name("Save Image");

  //.name() permet d'afficher un autre texte à l'écran
  //si c'est une couleur, il faut utiliser la fonction addColor
  //si c'est un chiffre, on peut indiquer des valeurs max et min

  draw();
}
function draw() {

  context.fillStyle = "rgb("+params.color[0]+","+params.color[1]+","+params.color[2]+")";

  context.clearRect(0,0,canvas.width,canvas.height);
  context.save();
  context.translate(canvas.width/2, canvas.height/2);
  context.rotate(2*Math.PI*params.currAngle/360);
  context.beginPath();
  context.ellipse(0, 0, params.width, params.height, 0,  0, 2 * Math.PI);
  context.fill();
  context.rotate(Math.PI/2);
  context.fillText(params.text,0,-params.width-20 );
  context.rotate(Math.PI/2);
  context.fillText(params.text,0,-params.height-20 );
  context.rotate(Math.PI/2);
  context.fillText(params.text,0,-params.width-20 );
  context.rotate(Math.PI/2);
  context.fillText(params.text,0,-params.height-20 );
  context.restore();
  requestAnimationFrame(draw);
}



window.onload = setup;
