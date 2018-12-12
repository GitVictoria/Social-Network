// gobal store (object)
// put stuff into redux using function called -> dispatch
// dispatch starts the redux process (component)
// action (action.js) -> action is an object -> describes what change we want to make in our global redux state
// every action object has property 'type:' -> can be whatever I want to call it whatever I want.
// the function with return - > action creator
// reducer - > (reducers.js) -> function taking pieces of info and puts it in a global redux state
// reducer should be immutably
// Object.aassign = ES5
// spread operator = ES6

// React Intergration
// Connect (compoenent) -> function -> call it inside of component
// mapStateToProps -> function goes to global redux state
// -> finds required properties and pulls them to the component
// -> this function is passed the global redux state
// this function runs before we acually have this globas redux statement
// connect gets passed mapStateComponenet and the property we

// caps in the type: -> in the action project capitalizing is a convention not a requirement
// dispatch and action was set up and reducer is the one to update global redux state
// redux makes a copy of orginal state, makes a copy and replaces original with the copy
// can not modify objects or arrays
// must create new object, array
