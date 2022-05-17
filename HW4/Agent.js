class Agent {
  constructor(pos, group) {
    this.pos = pos.clone();
    this.vel = new THREE.Vector3();
    this.force = new THREE.Vector3();
    this.target = null;
    this.size = 6;
    this.model = group;
    scene.add (group);
    
    this.MAXSPEED = 50;
    this.ARRIVAL_R = 30;
    
    // for orientable agent
    this.angle = 0;
  }
  
  update(dt,keyframe,ul,dr) {
    this.accumulateForce();
    this.vel.add(this.force.clone().multiplyScalar(dt));

		// ARRIVAL: velocity modulation
    if (this.target !== null) {   
		let dst = this.target.distanceTo(this.pos);
		if (dst < this.ARRIVAL_R) {  // close enough
			this.vel.setLength(dst);
			this.collision(ul,dr);
		}
    }
    
   	// MAXSPEED modulation
	let speed = this.vel.length()
	this.vel.setLength(clamp (speed, 0, this.MAXSPEED))
	this.pos.add(this.vel.clone().multiplyScalar(dt))
    this.model.position.copy(this.pos)
	//console.log(speed)
	if(speed < 0.5)intKey=[0,0];
	else if(n%8==0)keyframe.walk(dt,speed);
    // for orientable agent
    // non PD version
    if (this.vel.length() > 0.1) {
	    this.angle = Math.atan2 (-this.vel.z, this.vel.x)
    	this.model.rotation.y = this.angle
   	}
  }
  
  setTarget(x,y,z) {
  	if (this.target !== null)
    	this.target.set(x,y,z);
    else {
    	this.target = new THREE.Vector3(x,y,z);
    }
  }
  
  targetInducedForce(targetPos) { // seek
    return targetPos.clone().sub(this.pos).setLength(this.MAXSPEED).sub(this.vel);
  }

  accumulateForce() {
    if (this.target) 
    	this.force.copy(this.targetInducedForce(this.target));
  }
  collision(ul,dr){
	  //console.log(ul)
	  if(ul!=undefined && dr!=undefined){
		
		/*if (this.model.position.x-this.size/2 < dr.x){
			this.vel.x = - this.vel.x;
			this.model.position.x = this.model.position.x+5;
		}
		if (this.model.position.x+this.size/2 > ul.x){
			this.vel.x = - this.vel.x;
			this.model.position.x = this.model.position.x-5;
		}
		if (this.model.position.z-this.size/2 < dr.z){
			this.vel.z = - this.vel.z;
			this.model.position.z = this.model.position.z+5;
		}
		if (this.model.position.z+this.size/2 > ul.z){
			this.vel.z = - this.vel.z;
			this.model.position.z -=5;
			this.model.position.x +=5;
		}*/
	}
  }
}
