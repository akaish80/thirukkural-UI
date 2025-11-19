import React from 'react';

interface KurralDetailViewProps {
  kurral: any;
}

const KurralDetailView = ({ kurral }: KurralDetailViewProps) => {
  const { Index, Tamil, MuVaUrai, SolomonPaapaiyaUrai, KalaignarUrai } = kurral;

  const renderParaWithHTML = (value: string) => (
    <p dangerouslySetInnerHTML={{ __html: value }} />
  );

  const renderPara = (title: string, value: string, classKey: string, idx?: number) => (
    <>
      <p className={classKey}>{idx ? `${title} - ${idx}` : `${title}`}</p>
      {value && renderParaWithHTML(value)}
    </>
  );

  return (
    <div className='kurralContainer'>
      {Tamil && renderPara('கறள', Tamil, 'title', Index)}
      {MuVaUrai && renderPara('ம.வ உர', MuVaUrai, 'urraiTitle')}
      {SolomonPaapaiyaUrai && renderPara('சலமன பபபய உர', SolomonPaapaiyaUrai, 'urraiTitle')}
      {KalaignarUrai && renderPara('கலஞர உர', KalaignarUrai, 'urraiTitle')}
    </div>
  );
};

export default KurralDetailView;
