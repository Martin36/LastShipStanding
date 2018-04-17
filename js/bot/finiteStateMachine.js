var State = function() {

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

  this.action = function() {
    console.log('state action ', name);
    // if (condition) { // TODO:
    //   transition();
    // }
  }

  this.transition = function() {
    setNextState(nextState); // TODO:
  }

  return this;
}

var FiniteStateMachine = function() {

  var activeState;
  var states = []; // List of all states

  this.addState = function(state) {
    states.push(state);
  }

  this.setState = function(state) {
    activeState = state;
  }

  this.update = function() {
    if (activeState) {
      activeState.action();
    }
  }

  return this;
}
