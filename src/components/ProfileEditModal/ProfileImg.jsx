import React, { useState, useEffect, useCallback } from 'react';
import { useDropzone } from 'react-dropzone';

import styled from 'styled-components';
import { FaCamera } from "react-icons/fa";

const ImgWrapper = styled.div`
    width: 160px;
    height: 160px;
    margin: 20px auto 0;
    display: flex;
    position: relative;
`;

const ImgBox = styled.div`
    width: 100%;
    height: 100%;
    display: flex;
    background: ${({ theme: { colors } }) => {
        return colors.primary
    }};
    flex-direction: column;
    justify-content: center;
    align-items: center;
    border-radius: 50%;
`;

const CameraIcon = styled.div`
    width: 50px;
    height: 50px;
    background: white;
    border: none
    transform: translate(215%, -100%);
    border-radius: 50%;
    position: absolute;
    right: 0;
    bottom: 0;
    z-index: 1;
    display: flex;
    align-items: center;
    justify-content: center;
`

const Img = styled.img`
    width: 100%;
    height: 100%;
    margin: 0 auto;
    object-fit: cover;
`;

export default function MyProfileImg({ setFile }) {
    const [files, setFiles] = useState([]);
    const [preview, setPreview] = useState(null);

    const onDrop = useCallback((acceptedFile) => {
        setFiles(acceptedFile.map(file => Object.assign(file, {
            preview: URL.createObjectURL(file),
            origin: file
          })))
    }, [])
    
    const {getRootProps, getInputProps, isDragActive} = useDropzone({
        multiple: false,
        accept: {
            "image/*": [".jpeg", ".jpg", ".png", ".svg", ".gif"],
        },
        onDrop
    });

    useEffect(() => {
        if (files.length > 0) {
            if(setFile) setFile(files[0].origin);
            setPreview(files[0].preview);
        }
        return () => files.forEach(file => URL.revokeObjectURL(file.preview));
    }, [files]);


    return (
        <ImgWrapper {...getRootProps()}>
          <input {...getInputProps()} onChange={onDrop} />
          {
            isDragActive ?
              <ImgBox>
                {preview ?
                    <Img src={preview} onLoad={() => { URL.revokeObjectURL(preview) }} />:
                    <CameraIcon>
                        <FaCamera/>
                    </CameraIcon>
                }
              </ImgBox>
              :
              <ImgBox>
                {preview ?
                    <Img src={preview} onLoad={() => { URL.revokeObjectURL(preview) }} />:
                    <CameraIcon>
                        <FaCamera/>
                    </CameraIcon>
                }
              </ImgBox>   
          }
        </ImgWrapper>
      )
};