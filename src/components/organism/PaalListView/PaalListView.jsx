import React from 'react';
import ListGroup from '../../ListGroup';

const PaalListDataView = ({ data, selectedId, handleListClick }) => {
    return (
        <div className="palVagaiContainer">
            <ListGroup
                listData={data}
                className="palVagaiList"
                selectedId={selectedId}
                handleButtonClick={handleListClick}
            />
        </div>
    );
};

export default PaalListDataView;
