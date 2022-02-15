// import * as dat from 'dat.gui';

const canvas = document.querySelector('canvas');
const ctx = canvas.getContext('2d');

 canvas.width = window.innerWidth;
 canvas.height = window.innerHeight;
console.log(ctx);

//Default values
var numberOfParticles = 10;
var backgroundOpacity = 0.07;
var customSpeed = 0;
var customRadius = 0;
var customOpacity = 1;


var controller = new function() {
    this.opacity = 0.07;
    this.particles = 10;
    this.speed = 0.001;
    this.radius = 0.01;
    this.magic = 1;
  }();

//GUI Values
const gui = new dat.GUI();

gui.add( controller, 'opacity', 0.01, 1 ).onChange( function() {
    backgroundOpacity = (controller.opacity);
} );
gui.add( controller, 'particles', 10, 100 ).onChange( function() {
    numberOfParticles = (controller.particles);
} );
gui.add( controller, 'speed', 0.001, 30 ).onChange( function() {
    customSpeed = (controller.speed);
} );
gui.add( controller, 'radius', 0.01, 100 ).onChange( function() {
    customRadius = (controller.radius);
} );
gui.add( controller, 'magic', 0.01, 1 ).onChange( function() {
    customOpacity = (controller.magic);
} );





ctx.globalAlpha = customOpacity;


class Particle {
    constructor () {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.speedX = Math.random() * 10 - 5 +customSpeed ;
        this.speedY = Math.random() * 10 - 5 + customSpeed;
        this.color = 'rgba(255,255,255,0.9)';
        this.size = Math.random() * 10;
        this.radius = Math.random() * 10 + customRadius;
        // this.draw();
    }

    draw() {
        ctx.strokeStyle = 'rgba(255,255,255,0.6)';
        ctx.fillStyle = this.color;
        ctx.beginPath();
        ctx.arc(this.x,this.y, this.radius, 0 , Math.PI * 2, false);
        ctx.stroke();
        ctx.fill();
    }

    update() {
        this.x = this.x + this.speedX;
        this.y = this.y + this.speedY;
    
        if (this.x > canvas.width  || this.x < 0) this.speedX = -this.speedX;
        if (this.y > canvas.height || this.y < 0) this.speedY = -this.speedY;
    }
}

let particlesArray = [];

for (let i = 0; i < numberOfParticles; i++) {
    particlesArray.push(new Particle());
}
// console.log(particlesArray);

function animate() {
    // For clearing the canvas and effects
    ctx.fillStyle='rgba(178,34,34,'+ backgroundOpacity +')';
    ctx.fillRect(0,0,canvas.width, canvas.height);

    for (let i = 0; i < particlesArray.length; i++) {
        particlesArray[i].update();
        particlesArray[i].draw();      
        
        for (let j = i; j < particlesArray.length; j++) {
            // const element = array[j];
            const dx = particlesArray[j].x - particlesArray[i].x;
            const dy = particlesArray[j].y - particlesArray[i].y;
            const dist = Math.sqrt((dx*dx)+(dy*dy));
            if (dist > 100 && dist < 200) {
                ctx.beginPath();
                ctx.moveTo(particlesArray[i].x,particlesArray[i].y);
                ctx.lineTo(particlesArray[j].x, particlesArray[j].y);
                ctx.stroke();
            }
            
        }
    }


    requestAnimationFrame(animate);
}

animate();