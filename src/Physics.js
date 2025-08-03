import {
    Engine,
    Render,
    Runner,
    World,
    Bodies,
    Body,
    Events
} from "matter-js";



// Create engine and world
const engine = Engine.create();
const world = engine.world;
engine.gravity.y = 1; // Earth-like gravity


// DOM element
const boxDiv = document.getElementById("box");
console.log(boxDiv);


// Create a box body
const boxBody = Bodies.rectangle(100, 100, boxDiv.clientWidth, boxDiv.clientHeight*2, {
    restitution: 1,
});



// Create a static ground
const ground = Bodies.rectangle(100, (window.innerHeight + (10 / 2)), 600, 10, {
    isStatic: true
});



World.add(world, [boxBody, ground]);


// Run the engine
// const runner = Runner.create();
// Runner.run(runner, engine);



// Animate DOM
const timeStep = 800 / 60;
function update() {

    Engine.update(engine, timeStep)

    // Update div position (center -> top-left)
    boxDiv.style.left = (boxBody.position.x - 50) + "px";
    boxDiv.style.top = (boxBody.position.y ) + "px";
    // boxDiv.style.transform = `rotate(${boxBody.angle}rad)`;

    requestAnimationFrame(update);
}

update();