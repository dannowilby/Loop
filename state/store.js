import { createStore, applyMiddleware } from 'redux';
import thunkMiddleware from 'redux-thunk';

const SET_TOKEN = 'SET_TOKEN';
const SET_ERROR = 'SET_ERROR';
const SET_USER = 'SET_USER';
const ADD_ITEMS = 'ADD_ITEMS';

const initial_state = {
  login: {
    token: '',
    register_error: '',
  },
  user: {},
  items: []
};

const user = (state = initial_state.user, action) => {
  switch(action.type) {

    case SET_USER:
      return { user: action.user };

    default: return state;
  }
};

const login = (state = initial_state.login, action) => {

  switch(action.type) {

    case SET_TOKEN:
      return { ...state, token: action.token };
    case SET_ERROR:
      return { ...state, register_error: action.error };

    default: return state;
  };
};

const items = (state = initial_state.items, action) => {
  
  switch(action.type) {

    case ADD_ITEMS:
      return [ ...items, action.items];

    default: return state;
  }
};

const reducer = (state = initial_state, action) => ({
  login: login(state.login, action),
  user: user(state.user, action),
  items: items(state.items, action)
});

const set_token = (token) => (
  {
    type: SET_TOKEN,
    token: token
  }
);

const set_error = (error) => ({
  type: SET_ERROR,
  error: error
});

const initializeStore = (is = initial_state) => {
  return createStore(reducer, is, applyMiddleware(thunkMiddleware));
}

export { initial_state, initializeStore, set_token, set_error };
