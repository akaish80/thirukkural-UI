/* eslint-disable no-debugger */
import KurralActionTypes from '../kurral/kurral.types';

const INITIAL_STATE = {
};

const userReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case KurralActionTypes.PAAL_CLICK_SUCCESS:
    return { ...state, paalSelectedId: action.payload, adikaramSelectedId: -1 };
  case KurralActionTypes.ADIKARAM_CLICK_SUCCESS:
    return {
      ...state,
      adikaramSelectedId: action.payload,
      selectedKurralId: ((action.payload - 1) * 10) + 1,
    };
  case KurralActionTypes.KURRAL_CLICK_SUCCESS:
    return { ...state, selectedKurralId: action.payload };
  default:
    return state;
  }
};

export default userReducer;
