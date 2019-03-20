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
    //la fonction save() de P5 sauvegarde automatiquement le canvas en tant qu'image
    save("myLogo"+(new Date().getTime()));
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
//il faut ensuite créer une instance de cette classe
var params = new Parameters();
var gui;

function setup() {
  //SETUP CANVASP5
  createCanvas(800, 800);
  noStroke();
  textSize(30);
  textAlign(CENTER, CENTER);

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
}

function draw() {
  background(255);
  fill(params.color);
  translate(width/2, height/2);
  rotate(2*Math.PI*params.currAngle/360);
  ellipse(0, 0, params.width, params.height);
  text(params.text, 0, -params.height/2-20);
  rotate(Math.PI/2);
  text(params.text, 0, -params.width/2-20);
  rotate(Math.PI/2);
  text(params.text, 0, -params.height/2-20);
  rotate(Math.PI/2);
  text(params.text, 0, -params.width/2-20);

}
