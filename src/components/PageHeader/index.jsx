import React from 'react';
import './styles.scss';
import footerPhoto from '../Footer/photo/footerPhoto.jpg'

export const PageHeader = (props) => {
    return (
        <div className='page-header' style={{backgroundImage: `url(${footerPhoto})`}}>
            <h2>{props.children}</h2>
        </div>
    )
}
