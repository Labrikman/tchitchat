import React from 'react';
import fields from './fieldsArray';
import CustomInput from '../../components/CustomInput';


const Fields = ({ update, state })=>{
    return fields.map(field => (
      <CustomInput
        type={field.type}
        key={field.name}
        update={update}
        value={state[field.name]}
        placeholder={field.placeholder}
        name={field.name}
      />
    ))
  }

  export default Fields;
