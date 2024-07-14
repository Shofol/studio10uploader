import "@styles/react/libs/file-uploader/file-uploader.scss";
import axios from "axios";
import { useState } from "react";
import toast from "react-hot-toast";
import { Card, CardBody, Progress } from "reactstrap";
import api from "../@core/api/api";
import DatenTable from "../@core/components/daten/DatenTable";
import FileUploaderSingle from "../@core/components/form-elements/file-uploader/FileUploaderSingle";

const Daten = () => {
  const [progress, setProgress] = useState(0);

  const toBase64 = (file) => new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = reject;
    });

  const handleUpload = async (file, size) => {
    // const base64File = await toBase64(file);

    const formData = new FormData();
    formData.append("file", file);

    try {
      const res = await axios.post("http://localhost:5500/upload", formData, {
        headers: {
          "Content-Type": "multipart/form-data"
        }
      });

      console.log("File Uploaded Successfully");
    } catch (err) {
      console.error("Error uploading file");
    }

    return;

    const data = {
      title: file.name,
      file_name: base64File,
      file_type: file.type,
      file_size: size,
      file_duration: "10s"
    };

    const config = {
      onUploadProgress: (progressEvent) => {
        const percentCompleted = Math.floor(
          (progressEvent.loaded * 100) / progressEvent.total
        );
        setProgress(percentCompleted);
      }
    };
    try {
      const result = await api.post("file/store", data, config);
      toast.success("File(s) uploaded successfully.", { className: "py-2" });
      console.log(result);
      setProgress(0);
    } catch (error) {
      console.log(error);
      setProgress(0);
    }

    // setProgress(1);
    // setTimeout(() => {
    //   setProgress(100);
    //   setTimeout(() => {
    //     setProgress(0);
    //     toast.success('File(s) uploaded successfully.', {className: 'py-2'})
    //   }, 1000);
    // }, 100);
  };

  return (
    <div>
      <Card>
        <CardBody>
          <FileUploaderSingle
            showTitle={true}
            showUploadButton={true}
            onUpload={(file, size) => {
              handleUpload(file, size);
            }}
          />
          {progress > 0 && (
            <Progress value={progress} className="mx-2 py-10" animated>
              {progress}
            </Progress>
          )}
        </CardBody>
      </Card>

      <Card>
        <CardBody>
          <DatenTable />
        </CardBody>
      </Card>
    </div>
  );
};

export default Daten;
