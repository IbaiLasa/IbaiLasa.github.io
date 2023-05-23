import * as BABYLON from 'babylonjs';
import 'babylonjs-loaders';
import 'babylonjs-serializers';
import {EscenaAterrizaje} from "./scene";
import * as GUI from 'GUI';

// Boton altura
var BotAltura = new GUI.TextBlock("");
BotAltura.text = "";
BotAltura.fontSize = "22px";
BotAltura.fontFamily = "Arial";
BotAltura.color = "white";
BotAltura.width = "80px";
BotAltura.height = "20px";
BotAltura.horizontalAlignment = GUI.Control.HORIZONTAL_ALIGNMENT_CENTRAL;
BotAltura.verticalAlignment = GUI.Control.VERTICAL_ALIGNMENT_TOP;
BotAltura.top = "45px";
BotAltura.left = "880px";

const TXTAltura = new GUI.TextBlock("");
TXTAltura.text = "Altitud (m):";
TXTAltura.fontSize = "20px";
TXTAltura.fontFamily = "Arial";
TXTAltura.color = "white";
TXTAltura.width = "100px";
TXTAltura.height = "20px";
TXTAltura.horizontalAlignment = GUI.Control.HORIZONTAL_ALIGNMENT_CENTRAL;
TXTAltura.verticalAlignment = GUI.Control.VERTICAL_ALIGNMENT_TOP;
TXTAltura.top = "10px";
TXTAltura.left = "840px";

// Boton Objetivo
var BotDist = new GUI.TextBlock("");
BotDist.text = "";
BotDist.fontSize = "22px";
BotDist.fontFamily = "Arial";
BotDist.color = "white";
BotDist.width = "80px";
BotDist.height = "20px";
BotDist.horizontalAlignment = GUI.Control.HORIZONTAL_ALIGNMENT_CENTRAL;
BotDist.verticalAlignment = GUI.Control.VERTICAL_ALIGNMENT_TOP;
BotDist.top = "45px";
BotDist.left = "1020px";

const TXTDist = new GUI.TextBlock("");
TXTDist.text = "Objetivo (m):";
TXTDist.fontSize = "20px";
TXTDist.fontFamily = "Arial";
TXTDist.color = "white";
TXTDist.width = "150px";
TXTDist.height = "20px";
TXTDist.horizontalAlignment = GUI.Control.HORIZONTAL_ALIGNMENT_CENTRAL;
TXTDist.verticalAlignment = GUI.Control.VERTICAL_ALIGNMENT_TOP;
TXTDist.top = "10px";
TXTDist.left = "950px";

// Boton velocidad
var BotVelX = new GUI.TextBlock("");
BotVelX.text = "";
BotVelX.fontSize = "22px";
BotVelX.textAlign = "right";
BotVelX.fontFamily = "Arial";
BotVelX.color = "white";
BotVelX.width = "80px";
BotVelX.height = "20px";
BotVelX.horizontalAlignment = GUI.Control.HORIZONTAL_ALIGNMENT_CENTRAL;
BotVelX.verticalAlignment = GUI.Control.VERTICAL_ALIGNMENT_TOP;
BotVelX.top = "900px";
BotVelX.left = "770px";

const TXTVelX = new GUI.TextBlock("");
TXTVelX.text = "Vel X>0 (m/s):";
TXTVelX.fontSize = "20px";
TXTVelX.fontFamily = "Arial";
TXTVelX.color = "white";
TXTVelX.width = "150px";
TXTVelX.height = "20px";
TXTVelX.horizontalAlignment = GUI.Control.HORIZONTAL_ALIGNMENT_CENTRAL;
TXTVelX.verticalAlignment = GUI.Control.VERTICAL_ALIGNMENT_TOP;
TXTVelX.top = "860px";
TXTVelX.left = "733px";

var BotVelZ = new GUI.TextBlock("");
BotVelZ.text = "";
BotVelZ.fontSize = "22px";
BotVelZ.fontFamily = "Arial";
BotVelZ.color = "white";
BotVelZ.width = "80px";
BotVelZ.height = "20px";
BotVelZ.horizontalAlignment = GUI.Control.HORIZONTAL_ALIGNMENT_CENTRAL;
BotVelZ.verticalAlignment = GUI.Control.VERTICAL_ALIGNMENT_TOP;
BotVelZ.top = "900px";
BotVelZ.left = "1050px";

const TXTVelZ = new GUI.TextBlock("");
TXTVelZ.text = "Vel Z>0 (m/s):";
TXTVelZ.fontSize = "20px";
TXTVelZ.fontFamily = "Arial";
TXTVelZ.color = "white";
TXTVelZ.width = "150px";
TXTVelZ.height = "20px";
TXTVelZ.horizontalAlignment = GUI.Control.HORIZONTAL_ALIGNMENT_CENTRAL;
TXTVelZ.verticalAlignment = GUI.Control.VERTICAL_ALIGNMENT_TOP;
TXTVelZ.top = "860px";
TXTVelZ.left = "1015px";

// Combustible
var BotComb = new GUI.TextBlock("");
BotComb.text = "";
BotComb.fontSize = "22px";
BotComb.fontFamily = "Arial";
BotComb.color = "white";
BotComb.width = "80px";
BotComb.height = "20px";
BotComb.horizontalAlignment = GUI.Control.HORIZONTAL_ALIGNMENT_CENTRAL;
BotComb.verticalAlignment = GUI.Control.VERTICAL_ALIGNMENT_TOP;
BotComb.top = "818px";
BotComb.left = "63px";

const TXTComb = new GUI.TextBlock("");
TXTComb.text = "-500";
TXTComb.fontSize = "17px";
TXTComb.fontFamily = "Arial";
TXTComb.color = "white";
TXTComb.width = "150px";
TXTComb.height = "20px";
TXTComb.horizontalAlignment = GUI.Control.HORIZONTAL_ALIGNMENT_CENTRAL;
TXTComb.verticalAlignment = GUI.Control.VERTICAL_ALIGNMENT_TOP;
TXTComb.top = "720px";
TXTComb.left = "23px";

// Empuje
var BotE = new GUI.TextBlock("");
BotE.text = "";
BotE.fontSize = "22px";
BotE.fontFamily = "Arial";
BotE.color = "white";
BotE.width = "80px";
BotE.height = "20px";
BotE.horizontalAlignment = GUI.Control.HORIZONTAL_ALIGNMENT_CENTRAL;
BotE.verticalAlignment = GUI.Control.VERTICAL_ALIGNMENT_TOP;
BotE.top = "818px";
BotE.left = "160px";

const TXTE = new GUI.TextBlock("");
TXTE.text = "-45";
TXTE.fontSize = "17px";
TXTE.fontFamily = "Arial";
TXTE.color = "white";
TXTE.width = "150px";
TXTE.height = "20px";
TXTE.horizontalAlignment = GUI.Control.HORIZONTAL_ALIGNMENT_CENTRAL;
TXTE.verticalAlignment = GUI.Control.VERTICAL_ALIGNMENT_TOP;
TXTE.top = "720px";
TXTE.left = "110px";

// Slider Empuje
const TXTEmpuje = new GUI.TextBlock("");
TXTEmpuje.text = "Empuje";
TXTEmpuje.fontSize = "20px";
TXTEmpuje.fontFamily = "Arial";
TXTEmpuje.color = "white";
TXTEmpuje.width = "100px";
TXTEmpuje.height = "20px";
TXTEmpuje.horizontalAlignment = GUI.Control.HORIZONTAL_ALIGNMENT_CENTRAL;
TXTEmpuje.verticalAlignment = GUI.Control.VERTICAL_ALIGNMENT_CENTRAL;
TXTEmpuje.top = "675px";
TXTEmpuje.left = "103px";

const TXTkN = new GUI.TextBlock("");
TXTkN.text = "(kN):";
TXTkN.fontSize = "20px";
TXTkN.fontFamily = "Arial";
TXTkN.color = "white";
TXTkN.width = "100px";
TXTkN.height = "20px";
TXTkN.horizontalAlignment = GUI.Control.HORIZONTAL_ALIGNMENT_CENTRAL;
TXTkN.verticalAlignment = GUI.Control.VERTICAL_ALIGNMENT_CENTRAL;
TXTkN.top = "700px";
TXTkN.left = "103px";

// Slider Fuel
const TXTFuel = new GUI.TextBlock("");
TXTFuel.text = "Fuel";
TXTFuel.fontSize = "20px";
TXTFuel.fontFamily = "Arial";
TXTFuel.color = "white";
TXTFuel.width = "100px";
TXTFuel.height = "20px";
TXTFuel.horizontalAlignment = GUI.Control.HORIZONTAL_ALIGNMENT_CENTRAL;
TXTFuel.verticalAlignment = GUI.Control.VERTICAL_ALIGNMENT_CENTRAL;
TXTFuel.top = "675px";
TXTFuel.left = "2px";

const TXTkg = new GUI.TextBlock("");
TXTkg.text = "(kg):";
TXTkg.fontSize = "20px";
TXTkg.fontFamily = "Arial";
TXTkg.color = "white";
TXTkg.width = "100px";
TXTkg.height = "22px";
TXTkg.horizontalAlignment = GUI.Control.HORIZONTAL_ALIGNMENT_CENTRAL;
TXTkg.verticalAlignment = GUI.Control.VERTICAL_ALIGNMENT_CENTRAL;
TXTkg.top = "700px";
TXTkg.left = "2px";

export {BotAltura, TXTAltura, BotDist, TXTDist, BotVelX, TXTVelX, BotVelZ, TXTVelZ, BotComb, TXTComb, BotE, TXTE, TXTEmpuje, TXTkN, TXTFuel, TXTkg};