import React from 'react'
import { Tags } from 'lucide-react';
import "./LabelContainer.scss";

function LabelContainer() {
    return (
        <div className='label-main-container'>
            <div className='label-center-container'>
                <Tags className='icon' />
                <p className='text'>Your Labels Appear Here</p>
            </div>
        </div>
    )
}

export default LabelContainer
