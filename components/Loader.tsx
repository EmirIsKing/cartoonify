import React from 'react'

const Loader = ({ size }: { size?: number }) => {

  return (
    <div className={`loader`} style={{width:size || 48, height:size || 48}}></div>
  );
};

export default Loader;
