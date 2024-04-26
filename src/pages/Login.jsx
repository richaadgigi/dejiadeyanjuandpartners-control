import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import ErrorAlert from '../components/alerts/Error';
import SuccessAlert from '../components/alerts/Success';
import { Cookies } from 'react-cookie';
import { useNavigate } from 'react-router-dom';

const Login = () => {
    const navigate = useNavigate();
    const { register, handleSubmit, formState: { errors } } = useForm();
    const [ isDisabled, setIsDisabled ] = useState(false);
    const [ validationErrMsg, setValidationErrMsg ] = useState('');
    const [ successErrMsg, setSuccessErrMsg ] = useState('');
    const cookies = new Cookies();
    const setKey = (fields) => {
        setIsDisabled(true)
        if(fields.key === "8b5cf853172883b20df2d8e1e0e55371914b946a"){
            cookies.set('lfr-access-key', fields.key, { path: '/' });
            navigate('/stories');
        } else {
            setIsDisabled(false);
            setValidationErrMsg('Invalid Key');
            window.xuiAnimeStart('errorAlert');
            setTimeout(() => {
                window.xuiAnimeEnd('errorAlert');
            }, 2800);
        }
    }
    return (
        <>
        <section className='dap-fixed dap-bg-primary xui-d-flex xui-flex-ai-center xui-flex-jc-center'>
            <form className='xui-form xui-max-w-500 xui-w-fluid-100 xui-p-1-half xui-bg-white' layout="2" onSubmit={handleSubmit(setKey)} noValidate>
                <h1 className='xui-font-w-normal'>Log into your account</h1>
                <p className='xui-font-sz-90 xui-opacity-8 xui-mt-1'>Enter your key to proceed</p>
                <div className='xui-form-box'>
                    <input {...register('key', {
                        required: 'Please enter your key'
                    })} className='xui-bdr-black' type="text" name='key' id='key' placeholder='Enter your key here...' />
                    {errors.key && <span className='xui-form-error-msg'>{errors.key.message}</span>}
                </div>
                <div className='xui-form-box'>
                    <button disabled={isDisabled} className='xui-btn-block dap-bg-accent xui-text-white xui-font-sz-90'>Log into your account</button>
                </div>
            </form>
        </section>
        <ErrorAlert name={`errorAlert`} message={validationErrMsg} />
        <SuccessAlert name={`successAlert`} message={successErrMsg} noIcon={true} />
        </>
    );
};

export default Login;