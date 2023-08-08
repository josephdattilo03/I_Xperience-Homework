import React, { useRef, useState } from 'react'

export default function ImageSelector({onFileChange}) {
    const inputRef = useRef(null)
    const [fileContent, setFileContent] = useState('')

    function onFileSelected(e) {
        let file = null

        if (e.target.files.length) {
            file = e.target.files[0]
            const reader = new FileReader()

            reader.onload = (res) => {
                setFileContent(res.target.result)
            }
            reader.readAsDataURL(file)
        }
        onFileChange(file)
    }
    return (
        <div>
            <input ref={inputRef} type='file' style={{display: 'none'}} onChange={onFileSelected}></input>
            {
                fileContent ? <div className='text-center m-5'><image src={fileContent} style={{width: '200px', height: '250px', objectFit: 'cover'}}></image></div>:<></>
            }
            <div className='text-center'><button className='btn btn-success' onClick={() => inputRef.current.click()}>Select Image</button></div>
        </div>
    )
}
