import { ArrowLeft, Checkmark, Close, Pen, TrashCan } from '@carbon/icons-react';
import axios from 'axios';
import moment from 'moment';
import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { Link, useNavigate, useParams } from 'react-router-dom';
import TitleAndCategory from '../components/edit-stories/TitleAndCategory';
import Details from '../components/edit-stories/Details';
import AltText from '../components/edit-stories/AltText';
import Image from '../components/edit-stories/Image';
import ErrorAlert from '../components/alerts/Error';
import SuccessAlert from '../components/alerts/Success';

const StoryDetails = () => {
    const navigate = useNavigate();
    const [ isDisabled, setIsDisabled ] = useState(false);
    const [ validationErrMsg, setValidationErrMsg ] = useState('');
    const [ successErrMsg, setSuccessErrMsg ] = useState('');
    const [ image, setImage ] = useState(null);
    const [ story, setStory ] = useState(null);
    const { register, handleSubmit, formState: {errors}, watch } = useForm();
    const { stripped } = useParams();
    const title = watch('title');
    const handleEditorChange = (e) => {
        console.log('Content was updated:', e.target.getContent());
    }
    const postStory = (fields) => {
        console.log(fields);
        setIsDisabled(true);
    }
    const deleteStory = () => {
        setIsDisabled(true);
        axios({
            method: "DELETE",
            url: `https://api.dejiadeyanjuandpartners.com/root/post`,
            data: {"unique_id": story.unique_id},
            headers: {
                'lfr-access-key': '8b5cf853172883b20df2d8e1e0e55371914b946a'
            }
        })
        .then((res) => {
            setSuccessErrMsg(res.data.message || "Post deleted");
            window.xuiAnimeStart('successDelAlert');
            setTimeout(() => {
                window.xuiAnimeEnd('successDelAlert');
                navigate('/stories');
            }, 2800);
        })
        .catch((err) => {
            setIsDisabled(false);
            setValidationErrMsg(err.response.status === 422 ? err.response.data.data[0].msg : err.response.data.message);
            window.xuiAnimeStart('errorDelAlert');
            setTimeout(() => {
                window.xuiAnimeEnd('errorDelAlert');
            }, 2800);
        })
        .finally(() => {
        });
    }
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
    const getStory = () => {
        axios({
            method: "GET",
            url: `https://api.dejiadeyanjuandpartners.com/public/post/stripped?stripped=${stripped}`
        })
        .then((res) => {
            console.log(res.data.data);
            setStory(res.data.data);
            setImage(res.data.data.image);
            window.xuiLazyLoadings();
        })
        .catch((err) => {
            navigate('/');
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
            setImage(story.image);
        }
    };
    useEffect(() => {
        getAllCategories();
        getStory();
        window.xuiLazyLoadings();
    }, []);
    return (
        <>
        {!story && <section className='xui-container xui-py-3 xui-lg-py-5'>
            <h1 className={'xui-font-sz-200 xui-lg-font-sz-300 xui-line-height-4-half xui xui-lg-w-fluid-70 xui--skeleton'}>{'Something happening in the tech industry in alias with the law firms of Nigeria'}</h1>
            <div className='xui-d-inline-flex xui-flex-ai-center xui-flex-jc-space-between xui-grid-gap-1'>
                <span className={'xui-font-w-700 xui-font-sz-85 dap-text-secondary xui-text-uppercase xui--skeleton'}>{'Justice'}</span>
                <div className='xui-w-5 xui-h-5 xui-bg-black'></div>
                <span className={'xui-font-sz-75 xui-opacity-7 xui--skeleton'}>{'June 11th, 2023'}</span>
            </div>
            <div className={'xui-my-2 xui-h-200 xui-lg-h-400 xui-w-fluid-100 xui-bg-pos-center xui-bg-sz-cover xui--skeleton'}></div>
        </section>}
        {story && <><section className='xui-container xui-py-3 xui-lg-py-5'>
            <Link className='xui-d-inline-flex xui-flex-ai-center xui-grid-gap-half xui-bdr-rad-half xui-btn xui-bdr-fade xui-bdr-w-1 xui-bdr-s-solid xui-font-sz-85' to={`/stories`}>
                <ArrowLeft size={16} />
                <span className='xui-opacity-8'>Go Back</span>
            </Link>
            <button xui-modal-open={'deletePostModal'} className='xui-d-inline-flex xui-flex-ai-center xui-grid-gap-half xui-bdr-rad-half xui-btn xui-btn-danger xui-font-sz-85 xui-ml-half'>
                <TrashCan size={16} />
                <span className='xui-opacity-8'>Delete this post</span>
            </button>
            <h1 className={'xui-font-sz-200 xui-lg-font-sz-300 xui-line-height-4-half xui xui-lg-w-fluid-70'}>Edit a post</h1>
            <div className='xui-max-w-600'>
                <TitleAndCategory data={story} />
                <Details data={story} />
                <AltText data={story} />
                <Image data={story} />
            </div>
        </section>
        <section className='xui-modal' xui-modal="deletePostModal" disable-click-on-outside={'true'}>
            <div className='xui-modal-content'>
                <div className='xui-h-250 xui-lg-h-300 xui-bg-lazy xui-bg-sz-cover xui-bg-pos-center' xui-bg-img={story.image}></div>
                <div className='xui-mt-2 xui-text-center'>
                    <h2 className='xui-font-sz-110 xui-font-w-normal'>Are you sure you want to delete this post?</h2>
                    <div className='xui-d-flex xui-flex-jc-center xui-flex-ai-center xui-grid-gap-half xui-mt-2'>
                        <button className='xui-d-inline-flex xui-flex-ai-center xui-grid-gap-half xui-bdr-rad-half xui-btn xui-btn-danger xui-font-sz-85 xui-ml-half' onClick={deleteStory} disabled={isDisabled}>
                            <TrashCan size={16} />
                            <span className='xui-opacity-8'>Delete this post</span>
                        </button>
                        <button xui-modal-close={'deletePostModal'} className='xui-d-inline-flex xui-flex-ai-center xui-grid-gap-half xui-bdr-rad-half xui-btn xui-bg-light xui-font-sz-85 xui-ml-half'>
                            <Close size={16} />
                            <span className='xui-opacity-8'>Cancel modal</span>
                        </button>
                    </div>
                </div>
            </div>
        </section>
        </>}
        <ErrorAlert name={`errorDelAlert`} message={validationErrMsg} />
        <SuccessAlert name={`successDelAlert`} message={successErrMsg} noIcon={true} />
        </>
    );
};

export default StoryDetails;