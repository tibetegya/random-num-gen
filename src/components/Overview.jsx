import React from 'react';
import BoxHead from './BoxHead';

const Overview = ({ total, max, min }) => (
<div className="overview">
    <BoxHead
      id="purple-bg"
      title="Total generated numbers"
      content={total}
    />
    <BoxHead
      id="green-bg"
      title="Max generated number"
      content={max}
    />
    <BoxHead
      id="orange-bg"
      title="Min generated number"
      content={min}
    />
  </div>
);
export default Overview;
