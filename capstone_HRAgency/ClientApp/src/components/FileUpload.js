import React, { useState } from "react";
import axios from "axios";
import "./FileUpload/FileUpload-Style.css";

export const FileUpload = () => {
    const [file, setFile] = useState();
    const [fileName, setFileName] = useState();

    const saveFile = (e) => {
        console.log(e.target.files[0]);
        setFile(e.target.files[0]);
        setFileName(e.target.files[0].name);
    };

    const uploadFile = async (e) => {
        console.log(file);
        const formData = new FormData();
        formData.append("formFile", file);
        formData.append("fileName", fileName);
        try {
            const res = await axios.post("api/file", formData);
            console.log(res);
        } catch (ex) {
            console.log(ex);
        }
    };

    return (
        <>
            <section className="main-container center">
                <div>
                    <input class="file-upload" type="file" onChange={saveFile} />
                </div>
            </section>
            <section className="main-container center">
                <div>
                    <input class="but-general but-col-prim" type="button" value="Upload Card" onClick={uploadFile} />
                </div>
            </section>
        </>
    );
};