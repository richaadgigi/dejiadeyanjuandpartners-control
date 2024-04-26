import React, { useEffect } from 'react';
import { Cookies } from 'react-cookie';
import { useNavigate } from 'react-router-dom';

const Protected = (props) => {
    const { children, redirect } = props;
    const cookies = new Cookies();
    const navigate = useNavigate();
    useEffect(() => {
        if(cookies.get('lfr-access-key') === undefined){
            navigate('/');
        } else {
            if(redirect){
                navigate('/stories');
            }
        }
    }, []);
    return (
        <section>{children}</section>
    );
};

export default Protected;