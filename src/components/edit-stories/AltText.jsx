import { Checkmark } from '@carbon/icons-react';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import ErrorAlert from '../alerts/Error';
import SuccessAlert from '../alerts/Success';
import axios from 'axios';

const AltText = (props) => {
    const { data } = props;
    const [ isDisabled, setIsDisabled ] = useState(false);
    const [ validationErrMsg, setValidationErrMsg ] = useState('');
    const [ successErrMsg, setSuccessErrMsg ] = useState('');
    const { register, handleSubmit, formState: {errors}, watch } = useForm();
    const changeAltText = (fields) => {
        setIsDisabled(true);
        axios({
            method: "PUT",
            url: `https://api.dejiadeyanjuandpartners.com/root/post/update/alt/text`,
            data: {...fields, "unique_id": data.unique_id},
            headers: {
                'lfr-access-key': '8b5cf853172883b20df2d8e1e0e55371914b946a'
            }
        })
        .then((res) => {
            setSuccessErrMsg(res.data.message);
            window.xuiAnimeStart('successATAlert');
            setTimeout(() => {
                window.xuiAnimeEnd('successATAlert');
                setIsDisabled(false);
            }, 2800);
        })
        .catch((err) => {
            setIsDisabled(false);
            setValidationErrMsg(err.response.status === 422 ? err.response.data.data[0].msg : err.response.data.message);
            window.xuiAnimeStart('errorATAlert');
            setTimeout(() => {
                window.xuiAnimeEnd('errorATAlert');
            }, 2800);
        })
        .finally(() => {
        });
    }
    return (
        <>
        <form className='xui-form xui-max-w-600' onSubmit={handleSubmit(changeAltText)} noValidate>
            <div className='xui-form-box'>
                <label htmlFor="alt_text">Alternative text</label>
                <div className='xui-d-flex xui-flex-ai-center xui-flex-wrap-nowrap xui-grid-gap-2 xui-flex-space-between'>
                    <input {...register('alt_text', {
                        required: 'This field is required'
                    })} defaultValue={data.alt_text} type="text" name='alt_text' id='alt_text' />
                    <div className='xui-w-100'>
                        <button type='submit' className={'xui-cursor-pointer xui-w-40 xui-h-40 xui-bdr-rad-circle xui-d-flex xui-flex-ai-center xui-flex-jc-center xui-text-white ' + (isDisabled ? 'xui-bg-light' : 'dap-bg-primary')}>
                            <Checkmark size={20} />
                        </button>
                    </div>
                </div>
                {errors.alt_text && <span className='xui-form-error-msg'>{errors.alt_text.message}</span>}
            </div>
        </form>
        <ErrorAlert name={`errorATAlert`} message={validationErrMsg} />
        <SuccessAlert name={`successATAlert`} message={successErrMsg} noIcon={true} />
        </>
    );
};

export default AltText;