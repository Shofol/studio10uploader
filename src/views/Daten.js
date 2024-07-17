import "@styles/react/libs/file-uploader/file-uploader.scss";
import { useRef, useState } from "react";
import toast from "react-hot-toast";
import { Card, CardBody, Progress } from "reactstrap";
import api from "../@core/api/api";
import DatenTable from "../@core/components/daten/DatenTable";
import FileUploaderSingle from "../@core/components/form-elements/file-uploader/FileUploaderSingle";
import { formatSeconds } from "../utility/functions/formatTime";

const Daten = () => {
  const [progress, setProgress] = useState(0);
  const tableRef = useRef(null);
  const videoRef = useRef(null);
  const audioRef = useRef(null);

  const submit = async (data) => {
    try {
      const result = await api.post("file/store", data);
      toast.success("File(s) uploaded successfully.", { className: "py-2" });
      tableRef.current.updateData();
      setProgress(0);
    } catch (error) {
      console.log(error);
      setProgress(0);
    }
  };

  const handleData = async (file, size, duration) => {
    let filePath = "";
    const config = {
      onUploadProgress: (progressEvent) => {
        const percentCompleted = Math.floor(
          (progressEvent.loaded * 100) / progressEvent.total
        );
        setProgress(percentCompleted);
      }
    };

    try {
      const formData = new FormData();
      formData.append("file", file);
      const uploadResult = await api.post("file/upload", formData, config);
      filePath = uploadResult.data.filePath;
    } catch (error) {
      console.log(error);
    }

    const data = {
      title: file.name,
      file_name: filePath,
      file_type: file.type,
      file_size: size,
      file_duration: duration
    };
    submit(data);
  };

  const handleUpload = async (file, size) => {
    let fileDuration = "00:00:10";
    let mediaRef = null;
    if (file.type.includes("video") || file.type.includes("audio")) {
      const fileURL = URL.createObjectURL(file);
      mediaRef = file.type.includes("video") ? videoRef : audioRef;
      mediaRef.current.src = fileURL;
      mediaRef.current.onloadedmetadata = function () {
        const duration = formatSeconds(mediaRef.current.duration);
        fileDuration = duration;
        handleData(file, size, fileDuration);
      };
    } else {
      handleData(file, size, fileDuration);
    }
  };

  return (
    <div>
      <Card>
        <CardBody>
          <video ref={videoRef} className="d-none" />
          <audio ref={audioRef} className="d-none" />

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
          <DatenTable ref={tableRef} />
        </CardBody>
      </Card>
    </div>
  );
};

export default Daten;
