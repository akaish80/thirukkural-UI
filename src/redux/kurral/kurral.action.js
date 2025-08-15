import KurralActionTypes from './kurral.types';

export const getKurralData = () => ({
  type: KurralActionTypes.GET_KURRAL_DATA,
});

export const kurralDataSuccess = (kurral) => ({
  type: KurralActionTypes.GET_KURRAL_DATA_SUCCESS,
  payload: kurral,
});

export const paalListClick = (data) => {
  return {
    type: KurralActionTypes.PAAL_CLICK,
    payload: data,
  };
};

export const paalListClickSuccess = (data) => ({
  type: KurralActionTypes.PAAL_CLICK_SUCCESS,
  payload: data,
});

export const adhikaramClick = (data) => {
  return {
    type: KurralActionTypes.ADIKARAM_CLICK,
    payload: data,
  };
};

export const adhikaramClickSuccess = (data) => ({
  type: KurralActionTypes.ADIKARAM_CLICK_SUCCESS,
  payload: data,
});

export const kurralClick = (data) => {
  return {
    type: KurralActionTypes.KURRAL_CLICK,
    payload: data,
  };
};

export const kurralClickSuccess = (data) => ({
  type: KurralActionTypes.KURRAL_CLICK_SUCCESS,
  payload: data,
});
