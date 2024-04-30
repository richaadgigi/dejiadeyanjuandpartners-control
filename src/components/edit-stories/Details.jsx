import { Checkmark, Pen } from '@carbon/icons-react';
import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import ErrorAlert from '../alerts/Error';
import SuccessAlert from '../alerts/Success';
import axios from 'axios';
import tinymce from 'tinymce';

const Details = (props) => {
    const { data } = props;
    const [ isDisabled, setIsDisabled ] = useState(false);
    const [ validationErrMsg, setValidationErrMsg ] = useState('');
    const [ successErrMsg, setSuccessErrMsg ] = useState('');
    const [ editorContent, setEditorContent ] = useState("");
    const [ errorMsg, setErrorMsg ] = useState(null);
    const changeDetails = (e) => {
        e.preventDefault();
        if(editorContent !== "" && editorContent !== null && editorContent !== undefined){
            setIsDisabled(true);
            axios({
                method: "PUT",
                url: `https://api.dejiadeyanjuandpartners.com/root/post/update/details`,
                data: {"details": editorContent, "unique_id": data.unique_id},
                headers: {
                    'lfr-access-key': '8b5cf853172883b20df2d8e1e0e55371914b946a'
                }
            })
            .then((res) => {
                setSuccessErrMsg(res.data.message);
                window.xuiAnimeStart('successDtlAlert');
                setTimeout(() => {
                    window.xuiAnimeEnd('successDtlAlert');
                    setIsDisabled(false);
                }, 2800);
            })
            .catch((err) => {
                setIsDisabled(false);
                setValidationErrMsg(err.response.status === 422 ? err.response.data.data[0].msg : err.response.data.message);
                window.xuiAnimeStart('errorDtlAlert');
                setTimeout(() => {
                    window.xuiAnimeEnd('errorDtlAlert');
                }, 2800);
            })
            .finally(() => {
            });
            setErrorMsg(null);
        } else {
            setErrorMsg("Please type in your content");
        }
    }
    useEffect(() => {
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
        <form className='xui-form xui-max-w-600' onSubmit={(e) => {changeDetails(e)}} noValidate>
            <div className='xui-form-box'>
                <label htmlFor="">Post Content</label>
                <textarea id="mytextarea">{data.details}</textarea>
                {errorMsg && <span className='xui-form-error-msg'>{errorMsg}</span>}
                <br />
                <button type='submit' className='xui-d-inline-flex xui-flex-ai-center xui-grid-gap-half xui-bdr-rad-half xui-btn xui-bdr-fade xui-bdr-w-1 xui-bdr-s-solid xui-font-sz-85' disabled={isDisabled}>
                    <Pen size={16} />
                    <span className='xui-opacity-8'>Update content</span>
                </button>
            </div>
        </form>
        <ErrorAlert name={`errorDtlAlert`} message={validationErrMsg} />
        <SuccessAlert name={`successDtlAlert`} message={successErrMsg} noIcon={true} />
        </>
    );
};

export default Details;