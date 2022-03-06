import styles from "./Dragger.module.scss";
import { Upload, Button } from "antd";
import {
  InboxOutlined,
  DeleteOutlined,
  CloudDownloadOutlined,
} from "@ant-design/icons";
import { useState } from "react";

/**
 *
 * @returns The main Dragger Component
 */
const Drag = () => {
  const [files, setFiles] = useState<Ifile[]>([]); //State for files
  const { Dragger } = Upload;

  const props = {
    name: "file",
    multiple: true,
    customRequest(filename) {
      console.log(filename);
    },
    onChange(e: any) {
      let newArr = [...e.fileList]; // copying the old datas array
      let filteredData = newArr.map((item) => {
        //Making status is done
        return { ...item, status: "done", url: "download" };
      });
      console.log(filteredData);
      setFiles(filteredData);
    },
    onDrop(e: any) {
      console.log("Dropped files", e.dataTransfer.files);
    },
    showUploadList: {
      showDownloadIcon: true,
      downloadIcon: <CloudDownloadOutlined />,
    },
  };

  //Reset the files
  const deleteAll = () => {
    setFiles([]); // Making the state empty
  };

  //Download all
  const downloadAll = () => {
    var link = document.createElement("a");
    link.setAttribute("download", null);
    link.style.display = "none";
    document.body.appendChild(link);
    for (var i = 0; i < files.length; i++) {
      link.setAttribute("href", files[i].url);
      link.click();
    }
    document.body.removeChild(link);
  };

  return (
    <section className={styles.dragSection}>
      <div className={styles.dragBox}>
        <Dragger {...props} fileList={files} accept=".jpg,.png,.jpeg">
          <p className="ant-upload-drag-icon">
            <InboxOutlined />
          </p>
          <p className="ant-upload-text">
            Click or drag file to this area to upload
          </p>
          <p className="ant-upload-hint">Acceptable FIles: jpg,png,jpeg</p>
        </Dragger>
      </div>
      <div className={styles.actionBar}>
        <div className={styles.label}>
          <b>Attached Document</b>
        </div>
        <div className={styles.buttons}>
          {files.length > 0 && (
            <a href="#!" type="link" onClick={downloadAll}>
              <CloudDownloadOutlined /> Download All
            </a>
          )}
          <Button
            type="text"
            onClick={deleteAll}
            danger
            disabled={files.length > 0 ? false : true}
          >
            <DeleteOutlined />
            Delete All
          </Button>
        </div>
      </div>
    </section>
  );
};

export default Drag;
