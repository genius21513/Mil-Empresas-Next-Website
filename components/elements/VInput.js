import React from "react";

const VInput = React.forwardRef(({label, placeholder, error, maxLength=1000, type='text', ...field}, ref) => (
    <div className="form-group">
        <label className="form-label"> {label} </label>
        <input className={`form-control ${ error? 'is-invalid' : '' }`} {...field} maxLength={maxLength} placeholder={placeholder} type={type} ref={ref} /> 
        <div className={ error? 'invalid-feedback' : 'valid-feedback' }>{ error && error.message }</div>
    </div>
))

export default VInput;