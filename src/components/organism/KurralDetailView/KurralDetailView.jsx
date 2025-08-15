import React from 'react';
 
const KurralDetailView = ({ kurral }) => {
  const {
    Index, Tamil, MuVaUrai, SolomonPaapaiyaUrai, KalaignarUrai,
  } = kurral;
 
  const renderParaWithHTML = (value) => (
    <p
      dangerouslySetInnerHTML={{ __html: value }}
    />
  );
 
  const renderPara = (title, value, classKey, Index) => (
    <>
      <p className={classKey}>
        {Index ? `${title} - ${Index}` : `${title}`}
      </p>
      {value && (renderParaWithHTML(value))}
    </>
  );
 
  return (
    <div className="kurralContainer">
 
      {Tamil && renderPara('குறள்', Tamil, 'title', Index)}
 
      {MuVaUrai && renderPara('மு.வ உரை', MuVaUrai, 'urraiTitle')}
 
      {SolomonPaapaiyaUrai && renderPara('சாலமன் பாப்பையா உரை', SolomonPaapaiyaUrai, 'urraiTitle')}
 
      {KalaignarUrai && renderPara('கலைஞர் உரை', KalaignarUrai, 'urraiTitle')}
 
    </div>
  );
};
 
export default KurralDetailView;
 