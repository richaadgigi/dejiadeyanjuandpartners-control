import { Checkmark, Pen } from '@carbon/icons-react';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import ErrorAlert from '../alerts/Error';
import SuccessAlert from '../alerts/Success';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Image = (props) => {
    const { data } = props;
    const [ image, setImage ] = useState(data.image);
    const [ isDisabled, setIsDisabled ] = useState(false);
    const [ validationErrMsg, setValidationErrMsg ] = useState('');
    const [ successErrMsg, setSuccessErrMsg ] = useState('');
    const { register, handleSubmit, formState: {errors}, watch } = useForm();
    const navigate = useNavigate();
    const handleProfileImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
          const reader = new FileReader();
          reader.onloadend = () => {
            setImage(reader.result);
          };
          reader.readAsDataURL(file);
        } else {
            setImage(data.image);
        }
    };
    const changeImage = (fields) => {
        const formdata = new FormData();
        formdata.append("image", fields.image[0]);
        formdata.append("unique_id", data.unique_id);
        setIsDisabled(true);
        axios({
            method: "PUT",
            url: `https://api.dejiadeyanjuandpartners.com/root/post/image`,
            data: formdata,
            headers: {
                'lfr-access-key': '8b5cf853172883b20df2d8e1e0e55371914b946a'
            }
        })
        .then((res) => {
            setSuccessErrMsg(res.data.message);
            window.xuiAnimeStart('successImgAlert');
            setTimeout(() => {
                window.xuiAnimeEnd('successImgAlert');
                setIsDisabled(false);
                navigate('/');
            }, 2800);
        })
        .catch((err) => {
            setIsDisabled(false);
            setValidationErrMsg(err.response.status === 422 ? err.response.data.data[0].msg : err.response.data.message);
            window.xuiAnimeStart('errorImgAlert');
            setTimeout(() => {
                window.xuiAnimeEnd('errorImgAlert');
            }, 2800);
        })
        .finally(() => {
        });
    }
    return (
        <>
        <form className='xui-form xui-max-w-600' onSubmit={handleSubmit(changeImage)} noValidate>
            <div className='xui-form-box xui-pos-relative'>
                <label style={{opacity: 1}} htmlFor="image">
                    <span className='xui-d-inline-block xui-mb-half xui-opacity-8'>Post Image</span>
                    <img className='xui-w-fluid-100 xui-h-200 xui-lg-h-300' src={image} alt="post image" />
                </label>
                <div className='xui-d-flex xui-flex-ai-center xui-flex-wrap-nowrap xui-grid-gap-2 xui-flex-space-between' style={{position: 'fixed', top: '-200%'}}>
                    <input {...register('image', {
                        required: "Please upload your profile image",
                        validate: {
                            acceptedFormats: value =>
                                value[0].type === 'image/png' ||
                                value[0].type === 'image/jpeg' ||
                                value[0].type === 'image/jpg' ||
                                'Only PNG, JPG, or JPEG files are allowed',
                            maxSize: value =>
                                value[0].size <= 5 * 1024 * 1024 || // 5MB in bytes
                                'File size should be less than 5MB'
                        }
                    })} type="file" name="image" id="image" accept="image/gif, image/jpeg, image/png" onChange={handleProfileImageChange} />
                    <div className='xui-w-100'>
                        <button type='submit' className={'xui-cursor-pointer xui-w-40 xui-h-40 xui-bdr-rad-circle xui-d-flex xui-flex-ai-center xui-flex-jc-center xui-text-white ' + (isDisabled ? 'xui-bg-light' : 'dap-bg-primary')}>
                            <Checkmark size={20} />
                        </button>
                    </div>
                </div>
                {errors.image && <span className='xui-form-error-msg'>{errors.image.message}</span>}
                <button type='submit' className='xui-d-inline-flex xui-flex-ai-center xui-grid-gap-half xui-bdr-rad-half xui-btn xui-bdr-fade xui-bdr-w-1 xui-bdr-s-solid xui-font-sz-85 xui-mt-1' disabled={isDisabled || data.image === image}>
                    <Pen size={16} />
                    <span className='xui-opacity-8'>Update content</span>
                </button>
            </div>
        </form>
        <ErrorAlert name={`errorImgAlert`} message={validationErrMsg} />
        <SuccessAlert name={`successImgAlert`} message={successErrMsg} noIcon={true} />
        </>
    );
};

export default Image;