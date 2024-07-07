import "@styles/react/libs/file-uploader/file-uploader.scss";
import { useState } from "react";
import toast from 'react-hot-toast';
import {
  Card,
  CardBody,
  Progress
} from "reactstrap";
import DatenTable from "../@core/components/daten/DatenTable";
import FileUploaderMultiple from "../@core/components/form-elements/file-uploader/FileUploaderMultiple";

const Daten = () => {
  const [progress, setProgress] = useState(0);

  const handleUpload = (e) => {
    setProgress(1);
    setTimeout(() => {
      setProgress(100);
      setTimeout(() => {
        setProgress(0);
        toast.success('File(s) uploaded successfully.', {className: 'py-2'})
      }, 1000);
    }, 100);
    console.log(e);
  }

  return (
    <div>
      <Card>
     
        <CardBody>
          <FileUploaderMultiple showTitle={true} showUploadButton={true} onUpload={e => {
            handleUpload(e);
          }}/>
          {progress > 0 &&  <Progress value={progress} className="mx-2 py-10" animated>
            {progress}
          </Progress>}
        </CardBody>
      </Card>

      <Card>
        <CardBody>
         <DatenTable/>
        </CardBody>
      </Card>
    </div>
  );
};

export default Daten;
