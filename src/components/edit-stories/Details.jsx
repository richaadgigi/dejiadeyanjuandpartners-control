import { Checkmark, Pen } from '@carbon/icons-react';
import React, { useState, useEffect, useRef } from 'react';
import { useForm } from 'react-hook-form';
import ErrorAlert from '../alerts/Error';
import SuccessAlert from '../alerts/Success';
import axios from 'axios';
import tinymce from 'tinymce';
import { Editor } from '@tinymce/tinymce-react';
import BundledEditor from '../../BundledEditor';

const Details = (props) => {
    const { data } = props;
    const [ isDisabled, setIsDisabled ] = useState(false);
    const [ validationErrMsg, setValidationErrMsg ] = useState('');
    const [ successErrMsg, setSuccessErrMsg ] = useState('');
    const editorRef = useRef(null);
    const [ errorMsg, setErrorMsg ] = useState(null);
    const changeDetails = (e) => {
        e.preventDefault();
        if(editorRef.current.getContent() !== "" && editorRef.current.getContent() !== null && editorRef.current.getContent() !== undefined){
            setIsDisabled(true);
            axios({
                method: "PUT",
                url: `https://api.dejiadeyanjuandpartners.com/root/post/update/details`,
                data: {"details": editorRef.current.getContent(), "unique_id": data.unique_id},
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
    }, []);
    return (
        <>
        <form className='xui-form xui-max-w-600' onSubmit={(e) => {changeDetails(e)}} noValidate>
            <div className='xui-form-box'>
                <label htmlFor="">Post Content</label>
                <BundledEditor
                    onInit={(evt, editor) => editorRef.current = editor}
                    initialValue={data.details}
                    init={{
                        height: 300,
                        font_size_input_default_unit: "pt",
                        menubar: false,
                        skin: false,
                        content_css: false,
                        plugins: [
                            'advlist', 'anchor', 'autolink', 'help', 'image', 'link', 'lists',
                            'searchreplace', 'table', 'wordcount'
                        ],
                        toolbar: [
                            'undo redo | styles | bold italic forecolor fontsizeinput | bullist numlist outdent indent | link image | alignleft aligncenter alignright alignjustify | removeformat',
                        ],
                        toolbar_mode: 'floating',
                        content_style: 'body { font-family:Helvetica,Arial,sans-serif; font-size:14px }'
                    }}
                />
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