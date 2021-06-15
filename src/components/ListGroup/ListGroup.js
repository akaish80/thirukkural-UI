import React from 'react';
import PropTypes from 'prop-types';
import './ListGroup.styles.scss';

const ListGroup = (props) => {
  const { listData, className, handleButtonClick } = props;
  return (
    <ul className={`itemList ${className}`}>
      {listData.map((data) => (
        <li key={data.Index} className={`itemData ${data.isClicked ? 'active' : ''}`} onClick={handleButtonClick}>
          {data.Tamil}
          {/* <button /> */}
        </li>
      ))}
    </ul>
  );
};

ListGroup.propTypes = {
  listData: PropTypes.arrayOf(PropTypes.object),
  className: PropTypes.string,
  handleButtonClick: PropTypes.func,
};
ListGroup.defaultProps = {
  listData: [],
  className: '',
  handleButtonClick: () => {},
};
export default ListGroup;
