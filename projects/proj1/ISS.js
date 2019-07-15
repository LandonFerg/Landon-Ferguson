
// Made By Landon J. Ferguson //
// TY DAN //

var mapimg;

var zoom = 1;

var clat = 20;
var clon = 10;

var spaceLat = 0;
var spaceLon = 0;


var spaceStation;
var ssSize = 10;
var issimg;
var cnv;

function preload()
{
  mapimg = loadImage('https://api.mapbox.com/styles/v1/mapbox/dark-v9/static/'+ clon + ',' + clat + ',' + zoom + ',0,0/1024x512?access_token=pk.eyJ1IjoibGFuZG9ubGpmIiwiYSI6ImNqbjhsZGRnMTFlcXQzcW52M21wb25odGQifQ.wn8uDH5rYnlvmAi9hn1OQg');
  loadJSON('//api.open-notify.org/iss-now.json', gotData);
}


function centerCanvas()
{
  var x = (windowWidth - width) / 2;
  var y = (windowHeight - height) / 2;
  cnv.position(x, y);
}

/*function windowResized()
{
  centerCanvas();
}*/

function gotData(data)
{
  console.log("got data");
  spaceLat = data.iss_position.latitude;
  spaceLon = data.iss_position.longitude;
}

function mercX(lon) // These functions convert the positions to work with a mercator map projection
{
  lon = radians(lon); // Taking degrees and converting to radians
  var a = (256 / PI) * pow(2, zoom);  // Merc projection equation for lon
  var b = lon + PI;
  return a * b;
}

function mercY(lat)
{
  lat = radians(lat);
  var a = (256 / PI) * pow(2, zoom);
  var b = tan(PI / 4 + lat / 2);
  var c = PI - log(b);
  return a * c;
}

class ISS
{
  constructor(x,y,s)
  {
    this.x = x;
    this.y = y;
    this.s = s;
  }
  show()
  {
    image(issimg, this.x, this.y, issimg.width/4,issimg.height/4);
  }
}

function askISS()
{
    loadJSON('http://api.open-notify.org/iss-now.json', gotData);
}

function setup()
{
  issimg = loadImage("ISS4.png");

  cnv = createCanvas(1024,512);
  cnv.parent('sketch-holder');

  //var canvasx = (windowWidth - width) / 2;
  //var canvasy = (windowHeight - height) / 2;
  //cnv.position(canvasx, canvasy);

  //translate(width / 2, height / 2); // set our origins
  //imageMode(CENTER);


  image(mapimg,0,0);

  setInterval(askISS, 1000);

}

 function draw()
 {
   cnv.clear() // clear our past circles from the canvas

   translate(width / 2, height / 2); // set our origins
   imageMode(CENTER);

   image(mapimg,0,0); // redraw our BG to prevent duplicate circles


   var size = 20;
   var centerX = mercX(clon);  // HAS TO BE BEFORE THE FOR LOOP -- ME FUCKING 2 HOURS LATER JESUS CHRIST
   var centerY = mercY(clat);

   // Drawing ISS

   var x = mercX(spaceLon) - centerX;
   var y = mercY(spaceLat) - centerY;  // Centering out things based on the center of lon/lat

   fill(255);
   spaceStation = new ISS(x,y,ssSize);
   spaceStation.show();
 }
