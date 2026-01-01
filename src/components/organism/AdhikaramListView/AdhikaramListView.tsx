import React from 'react';
import ListGroup from '../../ListGroup';

interface AdhikaramListViewProps {
  data: any[];
  selectedId: number;
  handleListClick: (id: number) => void;
}

const AdhikaramListView = ({ data, selectedId, handleListClick }: AdhikaramListViewProps) => {
  const handleClick = (e: React.MouseEvent<HTMLLIElement>) => {
    const id = Number(e.currentTarget.getAttribute('data-id'));
    handleListClick(id);
  };

  return (
    <div className='adikaramListContainer'>
      <ListGroup
        listData={data}
        selectedId={selectedId}
        className='adikaramList'
        handleButtonClick={handleClick}
      />
    </div>
  );
};
export default AdhikaramListView;
