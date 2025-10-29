import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
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

  const params = useParams();

  useEffect(() => {
    // if a kurral id is present in the url (/kurral/:id), show it
    if (params && params.id) {
      const id = Number(params.id);
      if (!Number.isNaN(id)) {
        const item = kurral.find(kk => Number(kk.Index) === id || Number(kk.Kurral_id) === id);
        if (item) {
          // show only that kurral in the list and select it
          updateKurralDataList([item]);
          updateSelectedKurral(item);
        }
      }
    }
    // otherwise leave the normal flow
  }, [params]);

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
        <div className="thirukurral-intro" style={{ margin: '1.5rem 0', background: '#f7fafc', borderRadius: '10px', padding: '1.5rem', boxShadow: '0 1px 4px rgba(0,0,0,0.04)' }}>
          <h2 style={{ fontSize: '1.3rem', marginBottom: '0.7rem', color: '#3182ce' }}>திருக்குறள் பற்றி</h2>
          <p style={{ fontSize: '1.1rem', color: '#374151', lineHeight: 1.8 }}>
            திருக்குறள் என்பது தமிழில் எழுதப்பட்ட ஒரு உலகப்புகழ் பெற்ற நூலாகும். இதை திருவள்ளுவர் இயற்றினார். 
            இதில் 1330 குறள்கள் 133 அதிகாரங்களில் தொகுக்கப்பட்டுள்ளன. ஒவ்வொரு குறளும் வாழ்வியல், அறம், பொருள், இன்பம் ஆகியவற்றை மிகச் சிறப்பாக எடுத்துரைக்கின்றன. 
            திருக்குறள் உலகின் பல மொழிகளில் மொழிபெயர்க்கப்பட்டு, மனித வாழ்வின் ஒழுக்கத்தையும், சமூக நலனையும் வலியுறுத்தும் நூலாக விளங்குகிறது.
          </p>
        </div>
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