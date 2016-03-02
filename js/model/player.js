var Player = function(){

	var name = "";
	var position = [];	
	var angle = 0.0;
	var speed = 0.0;
	var hp = 100;
	var isDead = false;

	this.setName(name){name = name;}
	this.getName(){return name;}
	this.setPosition(pos){position = pos;}
	this.getPosition(){return position;}
	this.setAngle(angle){angle = angle;}
	this.getAngle(){return angle;}
	this.setSpeed(speed){speed = speed;}
	this.takeDamage(){
		hp -= 10;
		if(hp <= 0){
			isDead = true;
		}
	}
	this.getHp(){return hp;}
	this.isDead(){return isDead;}

}
