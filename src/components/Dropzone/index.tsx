import React from 'react'
import Dropzone from 'react-dropzone';

interface Props {
    handleAcceptedFiles: (e: any) => any,
    placeholder?: JSX.Element
}

const text = "Drag 'n' drop some files here, or click to select files"

const CustomDropzone = (props: Props) => {
  return (
    <Dropzone 
        onDrop={acceptedFiles => props.handleAcceptedFiles(acceptedFiles)} 
        multiple={false}
        accept="image/png"
    >
        {({getRootProps, getInputProps}) => (
            <div 
                {...getRootProps({ className: 'dropzone' })} 
                    className={`
                        ${props.placeholder ? 
                            "relative card w-full text-gray-500 border rounded-md border-gray-500 border-dashed text-center mt-2 cursor-pointer" 
                        : 
                            "card py-32 w-full text-gray-500 border rounded-t-md border-gray-500 border-dashed text-center mt-2 cursor-pointer"
                        }`
                }
            >
                {props.placeholder ? 
                    <>
                        {props.placeholder}
                        <p className='text-white absolute top-1/2 left-0 right-0 mr-auto ml-auto bg-gray-500 bg-opacity-20'>{text}</p>
                    </>
                :
                    <p>{text}</p>
                }
                <input {...getInputProps()} />
            </div>
        )}
    </Dropzone> 
  )
}

export default CustomDropzone;