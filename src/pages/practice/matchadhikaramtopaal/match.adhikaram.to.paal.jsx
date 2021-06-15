import React, { useEffect, useState } from 'react';
import { DragContainer } from '../../../components/DragAndDrop/DragContainer';
import { DropContainer } from '../../../components/DragAndDrop/DropContainer';
import { getRandomList, isEmpty } from '../../../components/utils';
import adikaram from '../../Common/adikaram_data';
import paalList from '../../Common/paalList_data';

const MatchAdhikaramToPaal = ({ selPractice }) => {
  const [listOfAdhikaram, setListOfAdhikaram] = useState([]);
  const [currentPaalList, setCurrentPaalList] = useState([...paalList]);

  useEffect(() => {
    setListOfAdhikaram(getRandomList(adikaram, 10));
  }, []);


  const handleDrop = (index, item) => {
    const { name } = item;

    const obj = adikaram.find((item) => item.Tamil === name);

    const sel = currentPaalList.find(
      (paalItem) => obj.Index >= paalItem.adikaramStart && obj.Index <= paalItem.adikaramEnd
    );
    // console.log(sel.Index);
    currentPaalList[sel.Index - 1].count += 1;
    const updatePaalList = [...currentPaalList];

    const indexCp = listOfAdhikaram.findIndex((item) => item.Tamil === name);

    listOfAdhikaram.splice(indexCp, 1);
    setCurrentPaalList(updatePaalList);
  };

  return (
    <>
      {listOfAdhikaram.length > 0 ? (
        <div className="tableContainer">
          <div className="tableHeader">
            <p>Adhikaram</p>
            <p>Paal</p>
          </div>
          {!isEmpty(selPractice) && (
            <div className="examContainer">
              <div className="dragDropContainer">
                {currentPaalList.map((item, index) => {
                  return (
                    <div>
                      <DragContainer
                        name={`${item.Tamil} (${item.count})`}
                        type={item.Tamil}
                        accept={item.adikaram}
                        onDrop={(item) => handleDrop(index, item)}
                        key={index}
                      />
                    </div>
                  );
                })}
              </div>
              <div className="dragDropContainer">
                {listOfAdhikaram.map((item) => (
                  <div>
                    <DropContainer name={item.Tamil} type={item.Tamil} />
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      ) : (
        <p>Hoooray...</p>
      )}
    </>
  );
};

export default MatchAdhikaramToPaal;
