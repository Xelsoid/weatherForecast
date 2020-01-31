import React from 'react';
import './index.css';

export default (props) => {
  const { cellData } = props;
  return (
    <td>
      {cellData}
    </td>
  );
};
