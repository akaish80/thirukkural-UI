import KurralActionTypes from './kurral.types';

const INITIAL_STATE = {
};

const kurralReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case KurralActionTypes.GET_KURRAL_DATA_SUCCESS:
    return { ...state, kurral: action.payload };
  default:
    return state;
  }
};

export default kurralReducer;
