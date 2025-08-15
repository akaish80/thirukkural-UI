import React, { useState } from 'react';
import ListGroup from '../../components/ListGroup';
import { Container } from '../../Common/common.styles';
import paalList from '../../Common/paalList_data';
import adikaram from '../../Common/adikaram_data';
import kurral from '../../Common/kurral_data';
import './thirukurral.styles.scss';

// const test = require('test');

const Thirukkural = () => {
  const [paalListData, updatePaalListData] = useState([...paalList]);
  const [adhikaramList, updateAdhikaramList] = useState([]);
  const [kurralDataList, updateKurralDataList] = useState([]);
  const [selectedKurral, updateSelectedKurral] = useState([]);

  const handlePaalListClick = (e) => {
    const newPaalListData = paalListData.map((item) => ({
      ...item,
      isClicked: item.Tamil === e.target.innerText,
    }));
    const paalObj = newPaalListData.find((item) => item.isClicked === true);

    const adiList = adikaram.filter(
      (item) => item.Index >= paalObj.adikaramStart && item.Index < paalObj.adikaramEnd
    );
    updateAdhikaramList(adiList);
    updatePaalListData(newPaalListData);
    updateSelectedKurral([]);
    updateKurralDataList([]);
  };

  const handleAdikaramClick = (e) => {
    const newAdhikaramList = adhikaramList.map((item) => ({
      ...item,
      isClicked: item.Tamil === e.target.innerText,
    }));

    const kurralObj = newAdhikaramList.find((item) => item.isClicked === true);
    const kurralList = kurral.filter(
      (item) => item.Index >= kurralObj.kurralStart && item.Index <= kurralObj.kurralEnd
    );

    const kurralData = kurralList[0];
    // kurralData.map((item) => (item.isClicked = false));
    kurralData.isClicked = true;
    updateKurralDataList(kurralList);

    updateAdhikaramList(newAdhikaramList);
    // updateSelectedKurral(kurralList[0].kurral[0]);
    updateSelectedKurral(kurralData);
  };

  const handleOnClick = (e) => {
    kurralDataList.map(
      (item) => (item.isClicked = item.Index === Number(e.target.innerText))
    );
    const selKurral = kurralDataList.find((item) => item.isClicked === true);
    updateSelectedKurral(selKurral);
  };

  return (
    <Container>
      <p>List Page</p>
      <div className="container">
        <div className="palVagaiContainer">
          <ListGroup
            listData={paalListData}
            className="palVagaiList"
            handleButtonClick={handlePaalListClick}
          />
        </div>
        {adhikaramList.length > 0 && (
          <div className="adikaramListContainer">
            <ListGroup
              listData={adhikaramList}
              className="adikaramList"
              handleButtonClick={handleAdikaramClick}
            />
          </div>
        )}

        {kurralDataList.length > 0 && (
          <div className="kurralListContainer">
            <div className="childContainer">
              {kurralDataList.map((_item, index) => {
                return (
                  <button
                    key={index}
                    onClick={handleOnClick}
                    className={`${_item.isClicked ? 'active' : ''}`}
                  >
                    {_item.Index}
                  </button>
                );
              })}
              {selectedKurral && (
                <div className="kurralContainer">
                  <p className="title">
                    குறள் -
                    {selectedKurral.Index}
                  </p>
                  <p
                    dangerouslySetInnerHTML={{ __html: selectedKurral.Tamil }}
                  />
                  <p className="urraiTitle">மு.வ உரை</p>
                  <p
                    dangerouslySetInnerHTML={{
                      __html: selectedKurral.MuVaUrai,
                    }}
                  />
                  <p className="urraiTitle">சாலமன் பாப்பையா உரை</p>
                  <p
                    dangerouslySetInnerHTML={{
                      __html: selectedKurral.SolomonPaapaiyaUrai,
                    }}
                  />
                  <p className="urraiTitle">கலைஞர் உரை</p>
                  <p
                    dangerouslySetInnerHTML={{
                      __html: selectedKurral.KalaignarUrai,
                    }}
                  />
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </Container>
  );
};

export default Thirukkural;
