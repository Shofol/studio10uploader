import {
  Card,
  CardHeader,
  CardBody,
  CardTitle,
  CardText,
  CardLink,
  Button,
  Progress,
} from "reactstrap";
import FileUploaderMultiple from "../@core/components/form-elements/file-uploader/FileUploaderMultiple";
import "@styles/react/libs/file-uploader/file-uploader.scss";
import { useState } from "react";

const Home = () => {
  const [progress, setProgress] = useState(0);
  return (
    <div>
      <Card>
        <CardHeader className=" mx-1">
          <CardTitle>Upload Files 🚀</CardTitle>
          <Button
            className="me-1"
            color="primary"
            type="submit"
            onClick={(e) => e.preventDefault()}
          >
            Publish Now
          </Button>
        </CardHeader>
        <CardBody>
          <FileUploaderMultiple />
          <Progress value={progress} className="mx-2 py-10" animated>
            25%
          </Progress>
        </CardBody>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Want to integrate JWT? 🔒</CardTitle>
        </CardHeader>
        <CardBody>
          <CardText>
            We carefully crafted JWT flow so you can implement JWT with ease and
            with minimum efforts.
          </CardText>
          <CardText>
            Please read our{" "}
            <CardLink
              href="https://pixinvent.com/demo/vuexy-react-admin-dashboard-template/documentation/docs/development/auth"
              target="_blank"
            >
              JWT Documentation
            </CardLink>{" "}
            to get more out of JWT authentication.
          </CardText>
        </CardBody>
      </Card>
    </div>
  );
};

export default Home;
