/* eslint-disable array-callback-return */
import React, { useEffect, useState } from 'react';
import {
  getRandomList,
  returnMatchedLine,
} from '../../../components/utils';
import kurral from '../../../Common/kurral_data';
import './fill.in.kurral.styles.scss';

const FillInKurral = () => {
  const [kurralList, setKurralList] = useState([]);
  const [success, setSetSuccess] = useState(false);
  const [acceptedWords, setAcceptedWords] = useState([]);
  // const [inputWords, setInputWords] = useState([]);
  const [loadComplete, setLoadComplete] = useState(false);

  useEffect(() => {
    setKurralList(getRandomList(kurral, 10));
  }, []);

  useEffect(() => {
    if (kurralList.length > 0 && !loadComplete) {
      const arr = [];
      kurralList.forEach((item) => {
        const kurral = item.Tamil.replace('<br />', ' ');
        const spltKurral = kurral.split(' ');
        const randomWord = getRandomList(spltKurral, 1)[0];
        arr.push(randomWord);

        item.line1Replace = false;
        item.line2Replace = false;
        const { matchedLine, replacedString } = returnMatchedLine(
          item.line1,
          item.line2,
          randomWord
        );
        if (matchedLine === 'line1') {
          item.line1 = replacedString;
          item.line1Replace = true;
        } else {
          item.line2 = replacedString;
          item.line2Replace = true;
        }
      });
      setAcceptedWords(arr);
      setLoadComplete(true);
    }
  }, [kurralList, loadComplete]);

  const handleChange = (e, index) => {
    const newKurLst = [...kurralList];
    newKurLst[index].inputWord = e.target.value;
    newKurLst[index].error = false;

    setKurralList(newKurLst);
  };

  const getInputField = ({ line, inputWord, rowNum }) => {
    const spltStr = line.split(' ');
    return spltStr.map((item, index) => (item === '_' ? (
      <input
        key={index}
        onChange={(e) => handleChange(e, rowNum)}
        value={inputWord}
      />
    ) : (
      <p key={index}>{`${item} `}</p>
    )));
  };

  const handleSubmit = () => {
    const newKurralList = kurralList.map((item) => {
      item.error = true;
      if (
        acceptedWords.findIndex(
          (acceptedWord) => item.inputWord === acceptedWord
        ) !== -1
      ) {
        item.error = false;
      }
      return item;
    });
    const filterList = newKurralList.filter((item) => item.error === true);

    if (filterList.length > 0) {
      setSetSuccess(false);
      setKurralList(newKurralList);
    } else {
      setSetSuccess(true);
      setKurralList([]);
    }
  };

  return (
    <>
      {!success ? (
        <>
          {kurralList.length > 0
            && kurralList.map((item, index) => {
              return (
                <div key={index} className="fillInTheBlanksContainer">
                  <p className="title">
                    <span>{`குறள் - ${index + 1}`}</span>
                  </p>
                  <div className="kurralFillContainer">
                    <div
                      className={`line ${item.line1Replace ? 'wrapcontent' : ''
                        }`}
                    >
                      {!item.line1Replace ? (
                        <p>{item.line1}</p>
                      ) : (
                        getInputField({
                          line: item.line1,
                          inputWord: item.inputWord,
                          rowNum: index,
                        })
                      )}
                    </div>
                    <div
                      className={`line ${item.line2Replace ? 'wrapcontent' : ''
                        }`}
                    >
                      {!item.line2Replace ? (
                        <p>{item.line2}</p>
                      ) : (
                        getInputField({
                          line: item.line2,
                          inputWord: item.inputWord,
                          rowNum: index,
                        })
                      )}
                    </div>
                    {item.error && <p className="errorField"> Error </p>}
                  </div>
                </div>
              );
            })}
          <button onClick={handleSubmit}> Submit </button>
        </>
      ) : (
        <p>Success</p>
      )}
    </>
  );
};

export default FillInKurral;
