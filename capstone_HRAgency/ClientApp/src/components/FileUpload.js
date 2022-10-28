import React, { useState, useEffect } from "react";
import axios from "axios";
import "./FileUpload/FileUpload-Style.css";

export const FileUpload = () => {
    const [file, setFile] = useState();
    const [fileName, setFileName] = useState();
    const [isDisabled, setIsDisabled] = useState(false)
    const [respons, setRespons] = useState("");
    const [isMsgTrue, setIsMsgTrue] = useState(false);

    const saveFile = (e) => {
        //console.log(e.target.files[0]);
        //console.log(e.target.files[0].type);
        if (e.target.files[0].type !== "image/jpeg") {
            setIsDisabled(true)
            setIsMsgTrue(true)
            setRespons("Please upload 'jpeg' image file.")
        } else {
            setIsDisabled(false)
            setIsMsgTrue(false)
        }
        //const oldName = e.target.files[0].name;
        //const newName = "NewCard-Hello";
        setFile(e.target.files[0]);
        setFileName(e.target.files[0].name);
        //setFileName(newName);
    };

    useEffect(() => {
        setTimeout(() => {
            setIsMsgTrue((prev) => !prev);
            setRespons("");
        }, 10000);

        // return () => {
        // 	second;
        // };
    }, [respons]);

    const uploadFile = async (e) => {
        e.preventDefault();



        console.log(file);
        const formData = new FormData();
        formData.append("formFile", file);
        formData.append("fileName", fileName);
        try {
            const res = await axios.post("api/file", formData);
            console.log(res.data);
            if (res) {
                setIsMsgTrue(true);
                setRespons("Your file has been successfully uploaded to the database.");
                document.getElementById("fileUpload").value = "";
            }
        } catch (ex) {
            console.log(ex);
            alert("An error occurred uploading your image." + ex);
        }

    };

    return (
        <>
            <form className="form-container file-upload " onSubmit={uploadFile}>
                <div>
                    <input id="fileUpload" type="file" onChange={saveFile} />

                    <small className={isDisabled ? "error-text" : ""} >{isMsgTrue ? respons : ""}</small>
                </div>

                <div>
                    <button disabled={isDisabled ? true : false} className={isDisabled ? "but-general disabled" : "but-general but-col-prim "}>Upload Card</button>
                </div>
            </form>
        </>
    );
};
