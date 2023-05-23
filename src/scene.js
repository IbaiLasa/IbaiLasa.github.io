import * as BABYLON from 'babylonjs';
import 'babylonjs-loaders';
import 'babylonjs-serializers';
import * as CANNON from 'cannon';

// Create a Babylon.js engine and a new scene
const EscenaAterrizaje = () => {
    // Inicializacion
    const canvas = document.getElementById('renderCanvas');
    const engine = new BABYLON.Engine(canvas, true);
    const scene = new BABYLON.Scene(engine);
    
    window.CANNON = CANNON;
    scene.enablePhysics(new BABYLON.Vector3(0,-3.72,0), new BABYLON.CannonJSPlugin()); 

    // Estructura de la pagina
    const container = document.createElement('div');
    container.style.position = 'relative';
    container.style.width = '100%';
    container.style.height = '100%';
    document.body.appendChild(container);

    container.appendChild(canvas);
   
    // Luz puntual
    const Luz = new BABYLON.PointLight("LuzPuntual", new BABYLON.Vector3(-1000, 200, 300), scene);
    Luz.diffuse = new BABYLON.Color3(0.9922, 0.9843, 0.8275); // Luz del sol
    Luz.specular = new BABYLON.Color3(0.4972, 0.49215, 0.41375);
    Luz.intensity = 10;
    Luz.shadowEnabled = true;

    const shadowGenerator = new BABYLON.ShadowGenerator(3000, Luz);
    shadowGenerator.useBlurExponentialShadowMap = true;
    shadowGenerator.useKernelBlur = true;

    // Colliders
    const CapCollider = BABYLON.MeshBuilder.CreateBox('CapCollider', {width: 2.5, height: 3.5, depth: 2.5}, scene);
    let Xrndm = Math.random()*300-200;
    let Zrndm = Math.random()*400-200;
    let Yrndm = Math.random()*500+500;
    CapCollider.position = new BABYLON.Vector3(Xrndm,Yrndm,Zrndm);
    CapCollider.isVisible = false;
    CapCollider.setPivotMatrix(BABYLON.Matrix.Translation(0, 0, 0));
    CapCollider.rotation = new BABYLON.Vector3.Zero();
    const CapsulaImpostor = new BABYLON.PhysicsImpostor(CapCollider, BABYLON.PhysicsImpostor.BoxImpostor, {mass: 15000, restitution: 0.5}, scene);

    const Plataforma = BABYLON.MeshBuilder.CreateCylinder('Plataforma', {diameter: 40, height: 6}, scene);
    Plataforma.position = new BABYLON.Vector3(400,0,0);
    Plataforma.tessellation = 50;
    const PlatImpostor = new BABYLON.PhysicsImpostor(Plataforma, BABYLON.PhysicsImpostor.CylinderImpostor, {mass: 0, restitution: 0.2}, scene);

    const MatPlat = new BABYLON.StandardMaterial('MatPlat', scene);
    // MatPlat.diffuseColor = new BABYLON.Color3(0.2, 0.2, 0.2);
    // MatPlat.emissiveColor = new BABYLON.Color3(0.1, 0.1, 0.1);
    MatPlat.specularTexture = new BABYLON.Texture("./src/Imagenes/Landing.jpg");
    MatPlat.diffuseTexture = new BABYLON.Texture("./src/Imagenes/Landing.jpg");
    MatPlat.shadowEnabled = true;
    Plataforma.material = MatPlat;

    const SueloCollider = BABYLON.MeshBuilder.CreateBox("SueloCollider", {width:2304, height: 2, depth: 1440}, scene);
    SueloCollider.isVisible = false;
    SueloCollider.position.y = -0.25;
    const sueloImpostor = new BABYLON.PhysicsImpostor(SueloCollider, BABYLON.PhysicsImpostor.BoxImpostor, {mass: 0, restitution: 0.15, friction:0.8}, scene);

    const ParedXCollider = BABYLON.MeshBuilder.CreateBox("ParedXCollider", {width:4, height: 1000, depth: 1440}, scene);
    ParedXCollider.isVisible = false;
    ParedXCollider.position.x = 900;
    ParedXCollider.position.y = 500;
    const ParedXImpostor = new BABYLON.PhysicsImpostor(ParedXCollider, BABYLON.PhysicsImpostor.BoxImpostor, {mass: 0, restitution: 1, friction:0.8}, scene);

    const ParednegXCollider = ParedXCollider.clone("ParednegXCollider");
    ParednegXCollider.position.x = -900;
    const ParednegXImpostor = new BABYLON.PhysicsImpostor(ParednegXCollider, BABYLON.PhysicsImpostor.BoxImpostor, {mass: 0, restitution: 1, friction:0.8}, scene);

    const ParedZCollider = BABYLON.MeshBuilder.CreateBox("ParedZCollider", {width:2304, height: 1000, depth: 4}, scene);
    ParedZCollider.isVisible = false;
    ParedZCollider.position.y = 500;
    ParedZCollider.position.x = 0;
    ParedZCollider.position.z = 600;
    const ParedZImpostor = new BABYLON.PhysicsImpostor(ParedZCollider, BABYLON.PhysicsImpostor.BoxImpostor, {mass: 0, restitution: 1, friction:0.8}, scene);

    const ParednegZCollider = ParedZCollider.clone("ParednegZCollider");
    ParednegZCollider.position.z = -600;
    const ParednegZImpostor = new BABYLON.PhysicsImpostor(ParednegZCollider, BABYLON.PhysicsImpostor.BoxImpostor, {mass: 0, restitution: 1, friction:0.8}, scene);

    // Modulo aterrizaje
    async function importmesh(modelname, scene) {
        let result = await BABYLON.SceneLoader.ImportMeshAsync("", "./src/Models/", modelname, scene);
        let meshes = result.meshes;
      
        for (let i = 0; i < meshes.length; i++) {
            let mesh = meshes[i];
            let MatModelo = new BABYLON.StandardMaterial("MatModelo", scene);
            if (i == 5 || i == 6){
                MatModelo.diffuseTexture = new BABYLON.Texture("./src/ModuloLunar/textures/texture_lem_flag.png", scene);
            }
            if (i == 0){
                MatModelo.diffuseTexture = new BABYLON.Texture("./src/ModuloLunar/textures/booster3.png", scene);
            }
            if (i == 11 || i == 14 || i == 10){
                MatModelo.diffuseTexture = new BABYLON.Texture("./src/Imagenes/metal.jpg", scene);
            }
            if (i == 1 || i == 4){
                MatModelo.diffuseTexture = null;
                MatModelo.diffuseTexture = new BABYLON.Texture("./src/Imagenes/Gris.png", scene);
            }
            MatModelo.shadowEnabled = true;
            mesh.material = MatModelo;
            
            shadowGenerator.addShadowCaster(mesh); 
        }
      
        let f = result.meshes[0];
        f.position = new BABYLON.Vector3(0,0,2);
        f.scaling = new BABYLON.Vector3(.03,.03,.03);
        f.parent = CapCollider;  
      
        return f;
      }
      
    const modelo = importmesh("apollo_11_lunar_module.glb", scene);   

    // Suelo marciano
    const suelo = BABYLON.MeshBuilder.CreateGroundFromHeightMap("suelo", "./src/Imagenes/relieve2.png", 
        {width:2304, height:1440, subdivisions: 50, minHeight:0.1, maxHeight: 200}, scene);
    suelo.normal = new BABYLON.Vector3(0, 0, 1);
    suelo.receiveShadows = true;

    const MatSuelo = new BABYLON.StandardMaterial('MatSuelo', scene);
    MatSuelo.diffuseColor = new BABYLON.Color3(0.5569, 0.2667, 0.1);
    MatSuelo.emissiveColor = new BABYLON.Color3(0.33, 0.15, 0.02);
    MatSuelo.specularTexture = new BABYLON.Texture("./src/Imagenes/1680736275808_1680736269482_0_360_F_81315121_NF7vLVyUyCYzUeXJkQfEWPknhFmZtnH6_Noise Remove-Quality Enhance_x1.jpg");
    MatSuelo.diffuseTexture = new BABYLON.Texture("./src/Imagenes/1680736275808_1680736269482_0_360_F_81315121_NF7vLVyUyCYzUeXJkQfEWPknhFmZtnH6_Noise Remove-Quality Enhance_x1.jpg");
    MatSuelo.bumpTexture = new BABYLON.Texture("./src/Imagenes/NormalMapDirt2.jpg", scene);
    MatSuelo.bumpTexture.uScale = 20;
    MatSuelo.bumpTexture.vScale = 20;
    MatSuelo.invertNormalMapY = true;
    MatSuelo.shadowEnabled = true;
    suelo.material = MatSuelo;

    // Piedra
    async function importpiedra(modelname, scene) {
        let result = await BABYLON.SceneLoader.ImportMeshAsync("", "./src/Models/", modelname, scene);
        let f = result.meshes[0];
        let meshes = result.meshes;

        for (let i = 0; i < meshes.length; i++) {
            let mesh = meshes[i];
            let MatPiedra = new BABYLON.StandardMaterial("MatPiedra", scene);
            if (i == 1){
                MatPiedra.specularTexture = new BABYLON.Texture("./src/Imagenes/1680736275808_1680736269482_0_360_F_81315121_NF7vLVyUyCYzUeXJkQfEWPknhFmZtnH6_Noise Remove-Quality Enhance_x1.jpg");
                MatPiedra.diffuseTexture = new BABYLON.Texture("./src/Imagenes/1680736275808_1680736269482_0_360_F_81315121_NF7vLVyUyCYzUeXJkQfEWPknhFmZtnH6_Noise Remove-Quality Enhance_x1.jpg");
                // MatPiedra.bumpTexture = new BABYLON.Texture("./src/Imagenes/NormalMapRoca.jpg", scene);
            }
            MatPiedra.shadowEnabled = false;
            mesh.material = MatPiedra;
            
            shadowGenerator.addShadowCaster(mesh); 
        }

        f.scaling = new BABYLON.Vector3(1,1,1);
        f.position = new BABYLON.Vector3(0,0.5,0);

        for (let i = 0; i < 50; i++) {
            let f0 = f.clone("desert_rock_base.glb");
            f0.position.x = Math.random() * (-1000);
            f0.position.z = Math.random() * 700;
            f0.rotate(new BABYLON.Vector3(Math.random(),Math.random(),Math.random()), Math.random()*6.28);
            shadowGenerator.addShadowCaster(f0);
        } 
        for (let i = 0; i < 50; i++) {
            let f0 = f.clone("desert_rock_base.glb");
            f0.position.x = Math.random() * 1000;
            f0.position.z = Math.random() * (-700);
            f0.rotate(new BABYLON.Vector3(Math.random(),Math.random(),Math.random()), Math.random()*6.28);
            shadowGenerator.addShadowCaster(f0);
        } 
        for (let i = 0; i < 50; i++) {
            let f0 = f.clone("desert_rock_base.glb");
            f0.position.x = Math.random() * 1000;
            f0.position.z = Math.random() * 700;
            f0.rotate(new BABYLON.Vector3(Math.random(),Math.random(),Math.random()), Math.random()*6.28);
            shadowGenerator.addShadowCaster(f0);
        } 
        for (let i = 0; i < 50; i++) {
            let f0 = f.clone("desert_rock_base.glb");
            f0.position.x = Math.random() * (-1000);
            f0.position.z = Math.random() * (-700);
            f0.rotate(new BABYLON.Vector3(Math.random(),Math.random(),Math.random()), Math.random()*6.28);
            shadowGenerator.addShadowCaster(f0);
        } 

        return f;
      }
    const Piedra = importpiedra("desert_rock_base.glb", scene);

    const skybox = BABYLON.MeshBuilder.CreateBox("skyBox", {size:3000}, scene);
    skybox.position.y = 1500;
    const skyboxMaterial = new BABYLON.StandardMaterial("skyBox", scene);
    skyboxMaterial.backFaceCulling = false;
    var imag = [
        "./src/Imagenes/skybox/Horizonte_pz.jpg",
        "./src/Imagenes/skybox/Cielo_py.jpg",
        "./src/Imagenes/skybox/Horizonte_px.jpg",
        "./src/Imagenes/skybox/Horizonte_nz.jpg",
        "./src/Imagenes/skybox/Cielo_ny.jpg",
        "./src/Imagenes/skybox/Horizonte_nx.jpg",
    ];
    skyboxMaterial.reflectionTexture = new BABYLON.CubeTexture.CreateFromImages(imag, scene);
    skyboxMaterial.reflectionTexture.coordinatesMode = BABYLON.Texture.SKYBOX_MODE;
    skyboxMaterial.diffuseColor = new BABYLON.Color3(0, 0, 0);
    skyboxMaterial.specularColor = new BABYLON.Color3(0, 0, 0);
    skybox.material = skyboxMaterial;

    const CamaraNave = new BABYLON.ArcRotateCamera('CamaraNave', 3.1416, 1, 30, CapCollider, scene);
    CamaraNave.attachControl(canvas, true);

    // Fog effect
    scene.fogMode = BABYLON.Scene.FOGMODE_EXP;
    scene.fogColor = new BABYLON.Color3(0.5569, 0.2667, 0.0118);
    scene.fogStart = 200;
    scene.fogDensity = 0.003;
   
    return {
        Escena: scene,
        CapsulaImpostor: CapsulaImpostor,
        PlatImpostor: PlatImpostor,
        sueloImpostor: sueloImpostor,
        ParedXImpostor: ParedXImpostor,
        ParednegXImpostor: ParednegXImpostor,
        ParedZImpostor: ParedZImpostor,
        ParednegZImpostor: ParednegZImpostor,
    };

};

export {EscenaAterrizaje};