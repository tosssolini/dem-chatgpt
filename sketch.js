// Define the number of particles in the system
const numParticles = 100;

// Define the particle radius and mass
const particleRadius = 5;
const particleMass = 1;

// Define the gravitational constant
const G = 1;

// Create an array to store the particles
let particles = [];

// Create a canvas to draw the simulation
function setup() {
  createCanvas(400, 400);

  // Initialize the particles with random positions and velocities
  for (let i = 0; i < numParticles; i++) {
    particles.push(new Particle(random(width), random(height), random(-5, 5), random(-5, 5)));
  }
}

// Draw the simulation on the canvas
function draw() {
  background(0);

  // Compute the gravitational forces between all pairs of particles
  for (let i = 0; i < numParticles; i++) {
    for (let j = i + 1; j < numParticles; j++) {
      let force = computeGravitationalForce(particles[i], particles[j]);
      particles[i].applyForce(force);
      particles[j].applyForce(force.mult(-1));

      // Detect contact between the particles
      if (particles[i].pos.dist(particles[j].pos) < particleRadius * 2) {
        particles[i].vel.mult(-1);
        particles[j].vel.mult(-1);
      }
    }
  }

  // Update the particle positions based on their velocities
  for (let i = 0; i < numParticles; i++) {
    particles[i].update();
  }

  // Draw the particles on the canvas
  for (let i = 0; i < numParticles; i++) {
    particles[i].show();
  }
}

// Compute the gravitational force between two particles
function computeGravitationalForce(p1, p2) {
  let distance = p5.Vector.dist(p1.pos, p2.pos);
  let direction = p5.Vector.sub(p2.pos, p1.pos).normalize();
  let magnitude = (G * p1.mass * p2.mass) / (distance * distance);
  return direction.mult(magnitude);
}

// Particle class
class Particle {
  constructor(x, y, vx, vy) {
    this.pos = createVector(x, y);
    this.vel = createVector(vx, vy);
    this.acc = createVector(0, 0);
    this.mass = particleMass;
  }

  // Update the particle position based on its velocity and acceleration
  update() {
    this.vel.add(this.acc);
    this.pos.add(this.vel);
    this.acc.mult(0);
  }

  // Apply a force to the particle
  applyForce(force) {
    let f = p5.Vector.div(force, this.mass);
    this.acc.add(f);
  }

  // Draw the particle on the canvas
  show() {
    stroke(255);
    strokeWeight(2);
    fill(255, 100);
    ellipse(this.pos.x, this.pos.y, particleRadius * 2);
  }
}
