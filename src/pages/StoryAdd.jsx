import { ArrowLeft, Camera, Pen } from '@carbon/icons-react';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import ErrorAlert from '../components/alerts/Error';
import SuccessAlert from '../components/alerts/Success';
import tinymce from 'tinymce';

const StoryAdd = () => {
    const navigate = useNavigate();
    const [ isDisabled, setIsDisabled ] = useState(false);
    const [ image, setImage ] = useState(null);
    const [ categories, setCategories ] = useState(null);
    const [ editorContent, setEditorContent ] = useState("");
    const [ validationErrMsg, setValidationErrMsg ] = useState('');
    const [ successErrMsg, setSuccessErrMsg ] = useState('');
    const { register, handleSubmit, formState: {errors} } = useForm();
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
    const addPost = (fields) => {
        const formdata = new FormData();
        formdata.append("title", fields.title);
        formdata.append("details", fields.details);
        formdata.append("category_unique_id", fields.category_unique_id);
        formdata.append("alt_text", fields.alt_text);
        formdata.append("image", fields.image[0]);
        setIsDisabled(true);
        axios({
            method: "POST",
            url: `https://api.dejiadeyanjuandpartners.com/root/post/add`,
            data: formdata,
            headers: {
                'lfr-access-key': '8b5cf853172883b20df2d8e1e0e55371914b946a'
            }
        })
        .then((res) => {
            setSuccessErrMsg(res.data.message);
            window.xuiAnimeStart('successAddAlert');
            setTimeout(() => {
                window.xuiAnimeEnd('successAddAlert');
                setIsDisabled(false);
                navigate('/');
            }, 2800);
        })
        .catch((err) => {
            setIsDisabled(false);
            setValidationErrMsg(err.response.status === 422 ? err.response.data.data[0].msg : err.response.data.message);
            window.xuiAnimeStart('errorAddAlert');
            setTimeout(() => {
                window.xuiAnimeEnd('errorAddAlert');
            }, 2800);
        })
        .finally(() => {
        });
    }
    const handleProfileImageChange = (e) => {
        const file = e.target.files[0];
    
        if (file) {
          const reader = new FileReader();
          reader.onloadend = () => {
            setImage(reader.result);
          };
          reader.readAsDataURL(file);
        } else {
            setImage(null);
        }
    };
    useEffect(() => {
        getAllCategories();
        setTimeout(() => {
            tinymce.init({
                selector: '#mytextarea',
                plugins: 'link image code',
                toolbar: 'undo redo | bold italic | alignleft aligncenter alignright'
            });
        }, 0);
    }, []);
    return (
        <>
        <section className='xui-container xui-py-3 xui-lg-py-4'>
            <Link className='xui-d-inline-flex xui-flex-ai-center xui-grid-gap-half xui-bdr-rad-half xui-btn xui-bdr-fade xui-bdr-w-1 xui-bdr-s-solid xui-font-sz-85' to={`/`}>
                <ArrowLeft size={16} />
                <span className='xui-opacity-8'>Go Back</span>
            </Link>
            <h1 className={'xui-font-sz-200 xui-lg-font-sz-300 xui-line-height-4-half xui xui-lg-w-fluid-70'}>Add a post</h1>
            <div className='xui-max-w-600'>
                <form className='xui-form' onSubmit={handleSubmit(addPost)} noValidate>
                    <div className='xui-form-box'>
                        <label htmlFor="title">Title of this post</label>
                        <div className='xui-d-flex xui-flex-ai-center xui-flex-wrap-nowrap xui-grid-gap-2 xui-flex-space-between'>
                            <input {...register('title', {
                                required: 'This field is required'
                            })} defaultValue={''} type="text" name='title' id='title' />
                        </div>
                        {errors.title && <span className='xui-form-error-msg'>{errors.title.message}</span>}
                    </div>
                    {categories && <div className='xui-form-box xui-w-250'>
                        <label htmlFor="category_unique_id">What category?</label>
                        <select {...register('category_unique_id', {
                            required: 'Please select an option'
                        })} name="category_unique_id" id="category_unique_id">
                            <option value="" disabled>--Select category--</option>
                            {categories && categories.rows.map((cat, index) => (
                                <option key={index} value={cat.unique_id}>{cat.name}</option>
                            ))}
                        </select>
                    </div>}
                    <div className='xui-form-box'>
                        <label htmlFor="">Post Content</label>
                        <textarea id="mytextarea" {...register('details')}>Hello, World!</textarea>
                        {/* <Editor 
                            // apiKey='fafpuuzz4dst2os1yr189u8t5ygv8xcc4v8kwklolx80ddxm'
                            init={{
                                skin: false,
                                content_css: false,
                                height: 500,
                                menubar: false,
                                plugins: 'link image code',
                                toolbar: 'undo redo | bold italic | alignleft aligncenter alignright'
                            }}
                            onEditorChange={(content, editor) => setEditorContent(content)}
                            initialValue='This is a description'
                        /> */}
                    </div>
                    <div className='xui-form-box'>
                        <label htmlFor="alt_text">Alternative text</label>
                        <div className='xui-d-flex xui-flex-ai-center xui-flex-wrap-nowrap xui-grid-gap-2 xui-flex-space-between'>
                            <input {...register('alt_text', {
                                required: 'This field is required'
                            })} defaultValue={''} type="text" name='alt_text' id='alt_text' />
                        </div>
                        {errors.alt_text && <span className='xui-form-error-msg'>{errors.alt_text.message}</span>}
                    </div>
                    <div className='xui-form-box xui-pos-relative'>
                        <label style={{opacity: 1}} htmlFor="image">
                            <span className='xui-d-inline-block xui-mb-half xui-opacity-8'>Post Image</span>
                            {image ? <img className='xui-w-fluid-100 xui-h-200 xui-lg-h-300' src={image} alt="post image" /> : <div className='xui-d-flex xui-flex-ai-center xui-flex-jc-center xui-h-200 xui-bdr-rad-1 xui-bdr-s-dashed xui-bdr-w-1 xui-bdr-fade'>
                                <div className='xui-opacity-8 xui-text-center'>
                                    <Camera size={24} />
                                    <span className='xui-d-block xui-font-sz-90 xui-opacity-8 xui-mt-half'>Click to add a picture</span>
                                </div>
                            </div>}
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
                        </div>
                        {errors.image && <span className='xui-form-error-msg'>{errors.image.message}</span>}
                        <div className='xui-form-box'>
                            <button type='submit' className='xui-d-inline-flex xui-flex-ai-center xui-grid-gap-half xui-bdr-rad-half xui-btn xui-bdr-fade xui-bdr-w-1 xui-bdr-s-solid xui-font-sz-85' disabled={isDisabled}>
                                <Pen size={16} />
                                <span className='xui-opacity-8'>Publish story</span>
                            </button>
                        </div>
                    </div>
                </form>
            </div>
        </section>
        <ErrorAlert name={`errorAddAlert`} message={validationErrMsg} />
        <SuccessAlert name={`successAddAlert`} message={successErrMsg} noIcon={true} />
        </>
    );
};

export default StoryAdd;