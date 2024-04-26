import { ArrowLeft, Checkmark, Pen, TrashCan } from '@carbon/icons-react';
import axios from 'axios';
import moment from 'moment';
import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { Link, useNavigate, useParams } from 'react-router-dom';
import TitleAndCategory from '../components/edit-stories/TitleAndCategory';
import Details from '../components/edit-stories/Details';
import AltText from '../components/edit-stories/AltText';
import Image from '../components/edit-stories/Image';

const StoryDetails = () => {
    const navigate = useNavigate();
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
        {story && <section className='xui-container xui-py-3 xui-lg-py-5'>
            <Link className='xui-d-inline-flex xui-flex-ai-center xui-grid-gap-half xui-bdr-rad-half xui-btn xui-bdr-fade xui-bdr-w-1 xui-bdr-s-solid xui-font-sz-85' to={`/`}>
                <ArrowLeft size={16} />
                <span className='xui-opacity-8'>Go Back</span>
            </Link>
            <h1 className={'xui-font-sz-200 xui-lg-font-sz-300 xui-line-height-4-half xui xui-lg-w-fluid-70'}>Edit a post</h1>
            <div className='xui-max-w-600'>
                <TitleAndCategory data={story} />
                <Details data={story} />
                <AltText data={story} />
                <Image data={story} />
            </div>
        </section>}
        </>
    );
};

export default StoryDetails;