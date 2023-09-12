import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useSelector, shallowEqual } from "react-redux";

import Header from "./Header";
import CodeEditor from "./CodeEditor";
import DocumentViewer from "../FileComponent/DocumentViewer";
import ExcelViewer from "./ExcelViewer";

const FileComponent = () => {
  const { fileId } = useParams();
  const [fileData, setFileData] = useState("");
  const [prevFileData, setPrevFileData] = useState("");

  const navigate = useNavigate();

  const { currentFile, isAuthenticated } = useSelector(
    (state) => ({
      currentFile: state.filefolders.userFiles.find(
        (file) => file.docId === fileId
      ),
      isAuthenticated: state.auth.isAuthenticated,
    }),
    shallowEqual
  );

  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/");
    }
  }, []);
  useEffect(() => {
    if (currentFile) {
      setFileData(currentFile?.data?.data);
      setPrevFileData(currentFile?.data?.data);
    }
  }, [currentFile, currentFile?.data?.data]);

  const renderFilePreview = () => {
    const fileExtension = currentFile?.data?.extension.toLowerCase();
  
    if (fileExtension.includes("png") || fileExtension.includes("jpg") || fileExtension.includes("jpeg") || fileExtension.includes("gif")) {
      // Display images as you were doing
      return (
        <img
          src={currentFile?.data?.url}
          alt={currentFile?.data?.name}
          className="w-100 h-100 img-fluid"
        />
      );
    } else if (fileExtension.includes("pdf")) {
      // Use a PDF viewer component for PDF files
      return <div>PDF Viewer Goes Here</div>;
    } else if (fileExtension.includes("doc") || fileExtension.includes("docx")) {
      // Use the DocumentViewer component for document files
      return <DocumentViewer url={currentFile?.data?.url} />;
    } else if (fileExtension.includes("txt")) {
      // Display the content of a TXT file as text
      return (
        <div className="w-100 h-100 p-3">
          <pre>{currentFile?.data?.data}</pre>
        </div>
      );
    } else if (fileExtension.includes("xls") || fileExtension.includes("xlsx")) {
      // Use an Excel viewer component for Excel files
      return <ExcelViewer url={currentFile?.data?.url} />;
    } else {
      return (
        <div className="w-100 h-100 d-flex justify-content-center align-items-center">
          <p className="text-center">
            File type not supported. Please download the file to view it.
          </p>
        </div>
      );
    }
  };
  
  
  
  if (isAuthenticated)
    return (
      <div>
        {isAuthenticated && fileData !== null ? (
          <>
            <Header
              fileName={currentFile?.data?.name}
              fileData={fileData}
              prevFileData={prevFileData}
              fileId={fileId}
            />
            <CodeEditor
              fileName={currentFile?.data?.name}
              data={fileData}
              setData={setFileData}
            />
          </>
        ) : (
          <div className="position-fixed left-0 top-0 w-100 h-100 bg-black text-white">
            <div className="d-flex py-4 mt-4 px-5 justify-content-between align-items-center">
              <p title={currentFile?.data?.name} className="my-0">
                {currentFile?.data?.name.length > 40
                  ? currentFile?.data?.name.slice(0, 40) +
                    "... ." +
                    currentFile?.data?.extension
                  : currentFile?.data?.name}
              </p>
              <div className="d-flex align-items-center me-5">
                <button
                  className="btn btn-sm btn-outline-light me-2"
                  onClick={() => navigate(-1)}
                >
                  Go Back
                </button>
                <button
                  className="btn btn-sm btn-primary"
                  onClick={() => downloadFile()}
                >
                  Download
                </button>
              </div>
            </div>
            <div className="w-100 mt-4" style={{ height: "650px" }}>
              {renderFilePreview()}
            </div>
          </div>
        )}
      </div>
    );

  return <div>Login First</div>;
};

export default FileComponent;