import styled from "styled-components";
import React from "react";
import Document from "@/modules/hub/components/document";

const DocumentsContainer = styled.div` 
  h3.title {
    font-size: 20px;
    color: #282828;
    font-weight: 500;
  }
  
  .documents {
    margin-top: 5px;
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(160px, 1fr));
    column-gap: 30px;
    row-gap: 10px;
  }
  
  @media screen and (max-width: 1024px) {
    h3.title {
      font-size: 18px;
    }
    
    .documents {
       grid-template-columns: repeat(auto-fill, minmax(155px, 1fr));
       column-gap: 24px;
    }
  }
`;

type Props = {
    documents?: ConsultationDocument[],
}

const Documents: React.FC<Props> = (props) => {
    if (!props.documents) return <React.Fragment/>

    return <DocumentsContainer className="documents">
        <h3 className="title">Документы</h3>
        <div className="documents">
            {
                props.documents.map(doc => {
                    return <a
                        target="_blank"
                        key={doc.name}
                        href={doc.type !== "img" ? doc.path : ""}
                        download={doc.type !== "img"}>
                        <Document

                                onClick={() => openFile(doc.path, doc.type)}
                                name={doc.name}
                                path={doc.path}
                                size={doc.size}
                                type={doc.type}/>
                    </a>
                })
            }

        </div>
    </DocumentsContainer>;
};

const openFile = (url: string, type: "img" | "pdf" | "file") => {
    if (type === "img") {
        const fileTab = window.open(url);
        if (!fileTab) return;
        fileTab.document.write(`<img src="${url}"/>`);
    } else {

    }
}

export default Documents;
