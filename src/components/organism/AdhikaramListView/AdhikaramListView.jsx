import React from 'react';
import ListGroup from '../../ListGroup';
 
const AdhikaramListView = ({ data, selectedId, handleListClick }) => {
  return (
    <div className="adikaramListContainer">
      <ListGroup
        listData={data}
        selectedId={selectedId}
        className="adikaramList"
        handleButtonClick={handleListClick}
      />
    </div>
  );
};
export default AdhikaramListView;
 
 