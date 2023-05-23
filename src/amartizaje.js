import * as BABYLON from 'babylonjs';
import 'babylonjs-loaders';
import 'babylonjs-serializers';
import {EscenaAterrizaje} from "./scene";
import * as myGUI from "./gui"
import * as GUI from 'GUI';

// Inicializacion
function CustomLoadingScreen(text) {
  this.loadingUIText = text;
}
CustomLoadingScreen.prototype.displayLoadingUI = function() {
  alert(this.loadingUIText);
};
CustomLoadingScreen.prototype.hideLoadingUI = function() {
  alert("Loaded!");
};

const EscenaSel = EscenaAterrizaje();
const scene = EscenaSel.Escena;
const CapsulaImpostor = EscenaSel.CapsulaImpostor;
const PlatImpostor = EscenaSel.PlatImpostor;
const sueloImpostor = EscenaSel.sueloImpostor;
const ParedXImpostor = EscenaSel.ParedXImpostor;
const ParednegXImpostor = EscenaSel.ParednegXImpostor;
const ParedZImpostor = EscenaSel.ParedZImpostor;
const ParednegZImpostor = EscenaSel.ParednegZImpostor;

let CapCollider = scene.getMeshByName('CapCollider');
let initialRotation = CapCollider.rotationQuaternion.clone();
let targetRotation = initialRotation.clone();
let Plataforma = scene.getMeshByName('Plataforma');
let VelIzq = 0;
let VelArriba = 0;
let Dir = "";
let Dir2 = "";
let condicion = false;
let Colision = false;
let Fuerza = 0;
let Consumo = 0; // (kg/s)
var Combustible = 0;
let Objetiv = 0;

async function interfaz(){
  var advancedTexture2 = GUI.AdvancedDynamicTexture.CreateFullscreenUI("GUI");
  let loadedGUI = await advancedTexture2.parseFromURLAsync("./src/Models/GUI.json");

  const Verde = advancedTexture2.getControlByName("Verde");
  Objetiv = Verde;

  const BotIzq = advancedTexture2.getControlByName("BotIzq");
  BotIzq.onPointerClickObservable.add(() => {
    Dir = "Izq";
    VelIzq = VelIzq + 200;
  });
  const BotDer = advancedTexture2.getControlByName("BotDer");
  BotDer.onPointerClickObservable.add(() => {
    Dir = "Der";
    VelIzq = VelIzq - 200;
  });
  const BotArriba = advancedTexture2.getControlByName("BotArriba");
  BotArriba.onPointerClickObservable.add(() => {
    Dir2 = "Arriba";
    VelArriba = VelArriba + 200;
  });
  const BotAbajo = advancedTexture2.getControlByName("BotAbajo");
  BotAbajo.onPointerClickObservable.add(() => {
    Dir2 = "Abajo";
    VelArriba = VelArriba - 200;
  });

  const Empuje = advancedTexture2.getControlByName("Empuje");
  Fuerza = Empuje;

  const Fuel = advancedTexture2.getControlByName("Fuel");
  Fuel.isEnabled = false;
  Combustible = Fuel;
  return loadedGUI;
} 
interfaz();

var advancedTexture = GUI.AdvancedDynamicTexture.CreateFullscreenUI("GUI");
let BotAltura = myGUI.BotAltura;
let BotDist = myGUI.BotDist;
let BotVelX = myGUI.BotVelX;
let BotVelZ = myGUI.BotVelZ;
let BotComb = myGUI.BotComb;
let BotE = myGUI.BotE;
const MisGUI = [BotAltura, myGUI.TXTAltura, BotDist, myGUI.TXTDist, BotVelX, myGUI.TXTVelX, BotVelZ, myGUI.TXTVelZ,
   BotComb, myGUI.TXTComb, BotE, myGUI.TXTE ,myGUI.TXTEmpuje, myGUI.TXTkN, myGUI.TXTFuel, myGUI.TXTkg];
for (let i=0; i<MisGUI.length; i++){
  advancedTexture.addControl(MisGUI[i]);;
}
let Condicion2 = true;
let PlatColision = false;

// Renderizado
const engine = scene.getEngine();
var loadingScreen = new CustomLoadingScreen("I'm loading!!");
engine.loadingScreen = loadingScreen;
engine.displayLoadingUI();
scene.executeWhenReady(() => {
  engine.hideLoadingUI();
  engine.runRenderLoop(() => {
    condicion = false;
    const Extremos = [sueloImpostor, ParedXImpostor, ParednegXImpostor, ParedZImpostor, ParednegZImpostor];
    CapsulaImpostor.registerOnPhysicsCollide(Extremos, () => {
        Colision = true;
        console.log('Colision de capsula!');
    });
    CapsulaImpostor.registerOnPhysicsCollide(PlatImpostor, () => {
      PlatColision = true;
      Colision = true;
      console.log('Llego!'); 
    });
    let Direccion = new BABYLON.Vector3.Zero();
    let Direccion2 = new BABYLON.Vector3.Zero();
    if (Colision || condicion) {
      VelIzq = 0;
      VelArriba = 0;
      condicion = true;
      Dir = "";
      Dir2 = "";
      if(PlatColision && Condicion2){
        alert("Ha sido un éxito!");
        Condicion2 = false;
      } else if (Condicion2){
        alert("Misión Fallida");
        Condicion2 = false;
      }
    }
    if (Dir == "Izq") {
      Dir = "Izq";
      Direccion = new BABYLON.Vector3(0, 0, 1);
    } else if (Dir == "Der"){
      Dir = "Der";
      Direccion = new BABYLON.Vector3(0, 0, 1);
    }
    if (Dir2 == "Arriba"){
      Dir2 = "Arriba";
      Direccion2 = new BABYLON.Vector3(1, 0, 0);
    } else if (Dir2 == "Abajo"){
      Dir2 = "Abajo";
      Direccion2 = new BABYLON.Vector3(1, 0, 0);
    }

    if (VelIzq >= 1600) {
      VelIzq = 1600;
    }
    if (VelArriba >= 2400) {
      VelArriba = 2400;
    }
    // console.log(VelIzq + VelArriba);

    let Distance = VelIzq/60*scene.getEngine().getDeltaTime()/1000;
    CapCollider.position = CapCollider.position.add(Direccion.scale(Distance));
    let Distance2 = VelArriba/60*scene.getEngine().getDeltaTime()/1000;
    CapCollider.position = CapCollider.position.add(Direccion2.scale(Distance2));

    if (Fuerza.value > 0 || VelIzq > 0 || VelArriba > 0) {
      let Escala = 100*Fuerza.value;
      CapsulaImpostor.applyImpulse(new BABYLON.Vector3(0, 1, 0).scale(Escala), CapCollider.getAbsolutePosition());
      Consumo = Combustible.value - Fuerza.value*1.111/60 - (VelIzq + VelArriba)/10000; // G=50kg/s a T=45kN
      Combustible.value = Consumo;
      // console.log(Consumo);
    } else {
      let Escala = 0;
      CapsulaImpostor.applyForce(CapCollider.getAbsolutePosition(BABYLON.Vector3(0, 1, 0)).scale(Escala), new BABYLON.Vector3(0, 0, 0));
    }

    if (Combustible.value <= 0) {
      Fuerza.isEnabled = false;
      Fuerza.value = 0;
    }

    BotVelX.text = VelIzq;
    BotVelZ.text = VelArriba;

    var Combu = function(valor) {
      return Math.floor(valor);
    };
    
    let Comb = Combu(Combustible.value);
    BotComb.text = Comb;

    var Em = function(valor) {
      return Math.floor(valor);
    };
    
    let E = Em(Fuerza.value);
    BotE.text = E;
    
    var Altura = function(valor) {
      return Math.floor(valor-1);
    };
    
    let h = Altura(CapCollider.position.y);
    BotAltura.text = h;

    var Distancia = function(x1,z1,x2,z2) {
      let x = x1-x2;
      let z = z1-z2;
      let dist = Math.sqrt(x**2+z**2)-20;
      return Math.floor(dist);
    };
    
    let d = Distancia(CapCollider.position.x, CapCollider.position.z, Plataforma.position.x, Plataforma.position.z);
    if ( d <= 0){
      d = 0;
    }
    BotDist.text = d;

    let dz = 320 + (CapCollider.position.x - Plataforma.position.x)/10;
    let dx = (CapCollider.position.z - Plataforma.position.z)/10;
    if (d>600){
      dz = 320 + (CapCollider.position.x - Plataforma.position.x)/20;
      dx = (CapCollider.position.z - Plataforma.position.z)/20;
    }
    let txtx = dx.toString();
    let txtz = dz.toString();
    let left = [txtx, "px"];
    let top = [txtz, "px"];
    Objetiv.left = left.join();
    Objetiv.top = top.join();
    // if (Fuerza.value > 0 && h >= 300){
    //   Fuerza.isEnabled = false;
    //   Fuerza.value = 0;
    // } else if (h <= 300) {
    //   Fuerza.isEnabled = true;
    // }
    const rotationSpeed = 1.5;
    CapCollider.rotationQuaternion = BABYLON.Quaternion.Slerp(
      CapCollider.rotationQuaternion,
      targetRotation,
      rotationSpeed
    );
    scene.render();
  });
});