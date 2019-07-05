import React from 'react';
import StyledInput from './StyledInput';

const CustomInput = ({ update, blabla, ...rest }) => (
  <div>
    <StyledInput
      onChange={(e) =>
        update(e, e.target || {})
      }
      {...rest}
    />
  </div>
);

export default CustomInput;
