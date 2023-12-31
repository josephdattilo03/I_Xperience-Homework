import React, { Children } from 'react'

export default function Alert({
    show,
    onHide,
    className,
    variant = 'danger',
    children,
    ...other


}) {
    return (
        show ? <div className={`alert d-flex justify-content-between alert-${variant}`} role='alert' >
            <div>{children}</div>
            {
                onHide ? <div style={{cursor:'pointer'}} onClick={onHide}>X</div>: <></>
            }
        </div> : <></>
        )
    
}
