import React, { useState } from 'react';
import ListGroup from '../../components/ListGroup';
import { Container } from '../../Common/common.styles';
import paalList from '../../Common/paalList_data';
import adikaram from '../../Common/adikaram_data';
import kurral from '../../Common/kurral_data';
import './thirukurral.styles.scss';

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
    kurralData.isClicked = true;
    updateKurralDataList(kurralList);

    updateAdhikaramList(newAdhikaramList);
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
      <div className="thirukurral-page" style={{ fontFamily: "'Noto Sans Tamil', 'Segoe UI', 'Helvetica Neue', Arial, 'sans-serif'" }}>
        <h1 className="page-title">திருக்குறள் பட்டியல்</h1>
        <div className="listing-sections">
          <div className="section paal-section">
            <h2 className="section-title">பால் வகைகள்</h2>
            <div className="section-content">
              <ListGroup
                listData={paalListData}
                className="palVagaiList"
                handleButtonClick={handlePaalListClick}
              />
            </div>
          </div>
          {adhikaramList.length > 0 && (
            <div className="section adikaram-section">
              <h2 className="section-title">அதிகாரங்கள்</h2>
              <div className="section-content">
                <ListGroup
                  listData={adhikaramList}
                  className="adikaramList"
                  handleButtonClick={handleAdikaramClick}
                />
              </div>
            </div>
          )}
          {kurralDataList.length > 0 && (
            <div className="section kurral-section">
              <h2 className="section-title">குறள்கள்</h2>
              <div className="section-content kurral-buttons">
                {kurralDataList.map((_item, index) => (
                  <button
                    key={index}
                    onClick={handleOnClick}
                    className={`kurral-btn${_item.isClicked ? ' active' : ''}`}
                  >
                    {_item.Index}
                  </button>
                ))}
              </div>
              {selectedKurral && (
                <div className="kurral-details-card">
                  <p className="kurral-title">
                    குறள் - {selectedKurral.Index}
                  </p>
                  <p
                    className="kurral-tamil"
                    dangerouslySetInnerHTML={{ __html: selectedKurral.Tamil }}
                  />
                  <div className="urai-section">
                    <p className="urai-title">மு.வ உரை</p>
                    <p
                      className="urai-text"
                      dangerouslySetInnerHTML={{
                        __html: selectedKurral.MuVaUrai,
                      }}
                    />
                    <p className="urai-title">சாலமன் பாப்பையா உரை</p>
                    <p
                      className="urai-text"
                      dangerouslySetInnerHTML={{
                        __html: selectedKurral.SolomonPaapaiyaUrai,
                      }}
                    />
                    <p className="urai-title">கலைஞர் உரை</p>
                    <p
                      className="urai-text"
                      dangerouslySetInnerHTML={{
                        __html: selectedKurral.KalaignarUrai,
                      }}
                    />
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </Container>
  );
};

export default Thirukkural;