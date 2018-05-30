var FiniteStateMachine = function(bot_entity) {

  var activeState;
  var states = []; // List of all states
  this.entity = bot_entity
  console.log('adding entity to fsm', this.entity)

  this.addState = function(state) {
    states.push(state);
  }

  this.setState = function(state) {
    activeState = state;
  }

  this.update = function(players) {
    action = -1;
    if (activeState) {
      action = activeState.action(players);
    }
    return action;
  }

  return this;
}

// TODO: remove this, make every state a single class in states.js folder
var State = function() {

  var nextState;
  var fsm;
  var name;

  this.test = 'a';

  this.init = function(stateName, fsmachine, ) {
    name = stateName;
    fsm = fsmachine;
  }

  this.setNextState = function(state) {
    nextState = state;
  }

  this.action = function() {
    // fsm.entity.rotateRight();
    // if (condition) { // TODO:
    //   transition();
    // }
  }

  this.transition = function() {
    setNextState(nextState); // TODO:
  }

  return this;
}
