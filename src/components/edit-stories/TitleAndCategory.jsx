import { Checkmark } from '@carbon/icons-react';
import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import ErrorAlert from '../alerts/Error';
import SuccessAlert from '../alerts/Success';
import axios from 'axios';

const TitleAndCategory = (props) => {
    const { data } = props;
    const [ isDisabled, setIsDisabled ] = useState(false);
    const [ categories, setCategories ] = useState(null);
    const [ validationErrMsg, setValidationErrMsg ] = useState('');
    const [ successErrMsg, setSuccessErrMsg ] = useState('');
    const { register, handleSubmit, formState: {errors}, watch } = useForm();
    const getAllCategories = () => {
        axios({
            method: "GET",
            url: `https://api.dejiadeyanjuandpartners.com/public/categories`
        })
        .then((res) => {
            setCategories(res.data.data);
        })
        .catch((err) => {
            
        })
        .finally(() => {
        });
    }
    const changeTitle = (fields) => {
        setIsDisabled(true);
        axios({
            method: "PUT",
            url: `https://api.dejiadeyanjuandpartners.com/root/post/update`,
            data: {...fields, "category_unique_id": data.category_unique_id, "unique_id": data.unique_id},
            headers: {
                'lfr-access-key': '8b5cf853172883b20df2d8e1e0e55371914b946a'
            }
        })
        .then((res) => {
            setSuccessErrMsg(res.data.message);
            window.xuiAnimeStart('successPrAlert');
            setTimeout(() => {
                window.xuiAnimeEnd('successPrAlert');
                setIsDisabled(false);
            }, 2800);
        })
        .catch((err) => {
            setIsDisabled(false);
            setValidationErrMsg(err.response.status === 422 ? err.response.data.data[0].msg : err.response.data.message);
            window.xuiAnimeStart('errorPrAlert');
            setTimeout(() => {
                window.xuiAnimeEnd('errorPrAlert');
            }, 2800);
        })
        .finally(() => {
        });
    }
    useEffect(() => {
        getAllCategories();
    }, []);
    return (
        <>
        <form className='xui-form xui-max-w-600' onSubmit={handleSubmit(changeTitle)} noValidate>
            <div className='xui-form-box'>
                <label htmlFor="title">Title of this post</label>
                <div className='xui-d-flex xui-flex-ai-center xui-flex-wrap-nowrap xui-grid-gap-2 xui-flex-space-between'>
                    <input {...register('title', {
                        required: 'This field is required'
                    })} defaultValue={data.title} type="text" name='title' id='title' />
                    <div className='xui-w-100'>
                        <button type='submit' className={'xui-cursor-pointer xui-w-40 xui-h-40 xui-bdr-rad-circle xui-d-flex xui-flex-ai-center xui-flex-jc-center xui-text-white ' + (isDisabled ? 'xui-bg-light' : 'dap-bg-primary')}>
                            <Checkmark size={20} />
                        </button>
                    </div>
                </div>
                {errors.title && <span className='xui-form-error-msg'>{errors.title.message}</span>}
            </div>
            <div className='xui-form-box xui-w-250'>
                <label htmlFor="">What category?</label>
                <select defaultValue={data.category_unique_id} name="" id="">
                    <option value="" disabled>--Select category--</option>
                    {categories && categories.rows.map((cat, index) => (
                        <option key={index} value={cat.unique_id}>{cat.name}</option>
                    ))}
                </select>
            </div>
        </form>
        <ErrorAlert name={`errorPrAlert`} message={validationErrMsg} />
        <SuccessAlert name={`successPrAlert`} message={successErrMsg} noIcon={true} />
        </>
    );
};

export default TitleAndCategory;