var AttackState = function() {
  var nextState;
  var fsm;
  var name;

  this.init = function(stateName, fsmachine) {
    name = stateName;
    fsm = fsmachine;
  }

  this.setNextState = function(state) {
    nextState = state;
  }

  // Returns an action for the entity
  // 0, 1, 2 = turnLeft, turnRight, shoot
  this.action = function(players) {
    // if (condition) { // TODO: Add condition to swap state
    //   transition();
    // }
    // Get closest player
    closest_distance = 99999;
    closest_index = -1;
    entity_pos = fsm.entity.getPosition();
    for (var i = 0; i < players.length; i++) {
      player = players[i];
      pos = player.getPosition();
      current_distance = Math.sqrt( Math.pow(pos.x - entity_pos.x,2) + Math.pow(pos.y - entity_pos.y,2)  );
      if (current_distance < closest_distance) {
        closest_distance = current_distance;
        closest_index = i;
      }
    }
    player = players[closest_index];
    // First step, rotate towards player
    shoot_treshold = Math.PI / 4;
    // TODO: calculate the target_angle correctly
    target_angle = Math.acos( Math.abs(player.getPosition().x - entity_pos.x) / closest_distance );
    entity_angle = fsm.entity.getAngle();
    angle_diff = entity_angle - target_angle;

    console.log('angle diff', angle_diff);
    console.log('shoot_treshold', shoot_treshold);
    if( Math.abs(angle_diff) > shoot_treshold ) {
      // Rotate
      return (angle_diff>0) ? 0 : 1;
    }else {
      // shoot
      return 2;
    }
    return -1;
  }

  this.transition = function() {
    setNextState(nextState); // TODO:
  }

  // this.setTargetPosition = function(x, y){
  //   this.target.x = x;
  //   this.target.y = y;
  // }

  return this;
}
