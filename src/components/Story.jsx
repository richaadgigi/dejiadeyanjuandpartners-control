import React from 'react';
import { Link } from 'react-router-dom';

const Story = (props) => {
    const { image, date, category, heading, unique_id, stripped, skeleton } = props;
    return (
        <Link to={`/story/${unique_id}/${stripped}`} className='xui-bdr-w-1 xui-bdr-fade xui-bdr-s-solid xui-overflow-hidden xui-bdr-rad-1 xui-text-dc-none xui-text-inherit dap-story-box'>
            <div className='xui-p-1 xui-lg-p-1-half'>
                <div className='xui-d-flex xui-flex-jc-space-between'>
                    <span className={'xui-font-w-700 xui-font-sz-85 dap-text-secondary xui-text-uppercase ' + (skeleton && 'xui--skeleton')}>{category}</span>
                    <span className={'xui-font-sz-75 xui-opacity-7 ' + (skeleton && 'xui--skeleton')}>{date}</span>
                </div>
                <h2 className={'xui-font-sz-150 xui-line-height-2-half xui-my-2 ' + (skeleton && 'xui--skeleton')}>{heading}</h2>
            </div>
            <div className={'xui-h-250 xui-bg-pos-center xui-bg-sz-cover xui-bg-lazy dap-story-box-image ' + (skeleton && 'xui--skeleton')} xui-bg-img={image}></div>
        </Link>
    );
};

export default Story;