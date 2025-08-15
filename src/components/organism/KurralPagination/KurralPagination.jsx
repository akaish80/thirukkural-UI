import React from 'react';

const KurralPagination = ({ kurralList, selectedKurral, handleClick }) => {
    return (
        kurralList.map((_item, index) => {
            return (
                <button
                    key={index}
                    onClick={handleClick}
                    className={`${_item.Index === selectedKurral ? 'active' : ''}`}
                    data-id={_item.Index}
                >
                    {_item.Index}
                </button>
            );
        })
    );
};

export default KurralPagination;