/* eslint-disable react/prop-types */

import { CheckmarkOutline } from "@carbon/icons-react";
import { useEffect } from "react";

/* eslint-disable react/no-unknown-property */
const SuccessAlert = (props) => {
    const { name, message, noIcon } = props;
    useEffect(() => {
        window.xuiAlerts();
    });
    return (
        <>
        <div className="xui-alert xui-alert-success" xui-custom={name} xui-placed="bottom-center" no-icon={noIcon ? `'${noIcon}'` : 'false'}>
        <div className="xui-alert-close">
                <CheckmarkOutline size={24} color="currentColor" />
            </div>
            <div className="xui-alert-content">
                <span>{message}</span>
            </div>
        </div>
        </>
    )
};

export default SuccessAlert;