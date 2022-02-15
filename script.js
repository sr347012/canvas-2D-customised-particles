canvas = document.querySelector('canvas');
ctx = canvas.getContext('2d');

window.addEventListener('resize', function () {
    init();
});

let particlesArray = [];

function init() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}



init();

const mouse = {
    x: undefined,
    y: undefined,
}
//try mousemove and click - remember mousemove does not work when console is open
canvas.addEventListener('mousemove', function(event) {
    mouse.x = event.x;
    mouse.y = event.y;
    handleParticles();
})

//===================================================================================
class Particle {
    constructor() {
        this.x = mouse.x;
        this.y = mouse.y;
        this.size = Math.random() * 25;
        this.speedX = Math.random() * 3 - 1.5;
        this.speedY = Math.random() * 3 - 1.5;
        this.radius = 10;
    }

    update() {
        this.x += this.speedX;
        this.y += this.speedY;

        //Control the mouse animation here
        // if (this.speedX < 2 && this.radius > 0.9 || 
        //     this.speedY < 2 && this.radius > 0.9) {
        //     this.radius--;
        // }

        if(this.size > 0.1) this.size -= 1;
    }

    draw() {
        // ctx.fillStyle = 'firebrick';
        ctx.strokeStyle = 'white';
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0 , Math.PI * 2);
        ctx.stroke();
        // ctx.fill();
    }
}
//========================================================================================
function animate() {
    // ctx.clearRect(0,0,canvas.width, canvas.height);
    // ctx.fillStyle='black';
    ctx.fillStyle= 'rgba(0,0,0,0.1)';
    ctx.fillRect(0,0,canvas.width, canvas.height);

    for (let i = 0; i < particlesArray.length; i++) {
        particlesArray[i].update();
        particlesArray[i].draw();

        if(particlesArray[i].size <=4) {
            particlesArray.splice(i,1);
            i--;
        }
        // for (let j = 0; j < particlesArray.length; j++) {
        //     const dx = particlesArray[j].x - particlesArray[i].x;
        //     const dy = particlesArray[j].y - particlesArray[i].y;
        //     const dist = Math.sqrt(dx * dx - dy * dy);

        //     ctx.strokeStyle='white';
        //     ctx.beginPath();
        //     ctx.moveTo(particlesArray[i].x,particlesArray[i].y);
        //     ctx.lineTo(particlesArray[j].x,particlesArray[j].y);
        // }
    }


    requestAnimationFrame(animate);

}
//=======================================================================================
function handleParticles() {
    for (let i = 0; i < 10; i++) {
        particlesArray.push(new Particle());
    }
    // console.log(particlesArray);
}

animate();

