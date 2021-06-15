/* eslint-disable consistent-return */
import React, { useState } from 'react';
import ListGroup from '../../components/ListGroup';
import { isEmpty } from '../../components/utils';
import { Container } from '../Common/common.styles';
import './practice.styles.scss';
import MatchAdhikaramToPaal from './matchadhikaramtopaal/match.adhikaram.to.paal';
import FillInKurral from './fillinkurral/fill.in.kurral';

const practiceTypes = [
  { Tamil: 'Match Paal to Adhikaram', index: 1 },
  { Tamil: 'Fill in Kurral Data', index: 2 },
];

const Excercise = () => {
  const [selectedExcercise, setSelectedExcercise] = useState({});
  const handleClick = (e) => {
    const selInd = practiceTypes.find(
      (item) => item.Tamil === e.target.innerText
    );
    setSelectedExcercise(selInd);
  };
  const getExcerciseSessionContainer = (selInd) => {
    switch (selInd.index) {
      case 1:
        return <MatchAdhikaramToPaal selExcercise={selectedExcercise} />;
      case 2:
        return <FillInKurral />;
      default:
        break;
    }
  };

  return (
    <Container>
      <div className="container">
        <ListGroup
          listData={practiceTypes}
          handleButtonClick={handleClick}
          className="practiceList"
        />
        {!isEmpty(selectedExcercise) && (
          <div className="practiceContainer">
            {getExcerciseSessionContainer(selectedExcercise)}
          </div>
        )}
      </div>
    </Container>
  );
};

export default Excercise;
