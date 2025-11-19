import React from 'react';
import ListGroup from '../../ListGroup';

interface PaalListDataViewProps {
  data: any[];
  selectedId: number;
  handleListClick: (id: number) => void;
}

const PaalListDataView = ({ data, selectedId, handleListClick }: PaalListDataViewProps) => {
  const handleClick = (e: React.MouseEvent<HTMLLIElement>) => {
    const id = Number(e.currentTarget.getAttribute('data-id'));
    handleListClick(id);
  };

  return (
    <div className="palVagaiContainer">
      <ListGroup
        listData={data}
        className="palVagaiList"
        selectedId={selectedId}
        handleButtonClick={handleClick}
      />
    </div>
  );
};export default PaalListDataView;
