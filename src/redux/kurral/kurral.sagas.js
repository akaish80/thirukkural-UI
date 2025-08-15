import {
  call, all, takeLatest, put,
} from 'redux-saga/effects';
import fetchWrapper from '../../utils/fetchWrapper';
import {
  adhikaramClickSuccess, kurralClickSuccess, kurralDataSuccess, paalListClickSuccess,
} from './kurral.action';
import KurralActionTypes from './kurral.types';

export function* fetchKurralData() {
  // console.log('Arun');
  const res = yield fetchWrapper('/master.json');

  yield put(kurralDataSuccess(res));
}

export function* fetchCollectionsStart() {
  yield takeLatest(KurralActionTypes.GET_KURRAL_DATA, fetchKurralData);
}

export function* handlePaalListClick({ payload: data }) {
  yield put(paalListClickSuccess(data));
}

export function* onPaalListClick() {
  yield takeLatest(KurralActionTypes.PAAL_CLICK, handlePaalListClick);
}

export function* handleAdikaramClick({ payload: data }) {
  yield put(adhikaramClickSuccess(data));
}

export function* onAdikaramClick() {
  yield takeLatest(KurralActionTypes.ADIKARAM_CLICK, handleAdikaramClick);
}

export function* handleKurralClick({ payload: data }) {
  yield put(kurralClickSuccess(data));
}

export function* onKurralClick() {
  yield takeLatest(KurralActionTypes.KURRAL_CLICK, handleKurralClick);
}

export function* kurralSagas() {
  yield all([
    call(fetchCollectionsStart),
    call(onPaalListClick),
    call(onAdikaramClick),
    call(onKurralClick),
  ]);
}
