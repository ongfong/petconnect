import React from 'react';

import Map from '../Map/map';

const contact = (props) => {
  return (
    <div>
      <Map email={props.email} />
    </div>
  );
};

export default contact;
