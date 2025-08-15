/* eslint-disable max-len */
/* eslint-disable no-debugger */
import { createSelector } from 'reselect';

const kurral = (state) => state.kurralMaster.kurral || [];
const paalSelectedId = (state) => state.userData.paalSelectedId || -1;
const adikaramSelectedId = (state) => state.userData.adikaramSelectedId || -1;
const selectedKurralId = (state) => state.userData.selectedKurralId || -1;

const getPaalList = (kurralList) => {
  const data = kurralList.map((kurralData) => {
    return { Tamil: kurralData.Tamil, Index: kurralData.Index, isClicked: false };
  });
  return data;
};

export const getPaalData = createSelector(
  [kurral],
  (kurral) => (kurral.length ? getPaalList(kurral) : {}),
);

const getAdhikaramData = (kurralList, paalSelectedId) => {
  const data = kurralList.filter((kurralData) => (kurralData.Index === paalSelectedId));
  return data.length && data[0].adikaram;
};

export const getAdhikaramList = createSelector(
  [kurral, paalSelectedId],
  (kurral, paalSelectedId) => (paalSelectedId !== -1 ? getAdhikaramData(kurral, paalSelectedId) : {}),
);

const getKurralSelectedData = (adikaramList, adikaramSelectedId) => {
  debugger;
  const data = adikaramList.filter((adikaram) => (adikaram.Index === adikaramSelectedId));
  return data.length && data[0].kurral;
};

export const getKurralList = createSelector(
  [getAdhikaramList, adikaramSelectedId],
  (adhikaramList, adikaramSelectedId) => (adikaramSelectedId !== -1 ? getKurralSelectedData(adhikaramList, adikaramSelectedId) : {}),
);

const getSelectedKurralData = (kurralList, selectedKurralId) => {
  const data = kurralList.length > 0 && kurralList.filter((kurral) => kurral.Index === selectedKurralId);
  return data.length && data[0];
};

export const getSelectedKurral = createSelector(
  [getKurralList, selectedKurralId],
  (kurralList, selectedKurralId) => (selectedKurralId !== -1 ? getSelectedKurralData(kurralList, selectedKurralId) : {})
);

// selectedKurralId
