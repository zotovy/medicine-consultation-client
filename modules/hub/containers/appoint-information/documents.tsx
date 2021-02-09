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
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(160px, 1fr));
    column-gap: 30px;
    row-gap: 10px;
  }
`;

const Documents: React.FC<Props> = (appointment) => {
    return <DocumentsContainer className="documents">
        <h3 className="title">Документы</h3>
        <div className="documents">
            <Document name="a.png" path="/a/s.py" size="10KB" type="img" />
        </div>
    </DocumentsContainer>;
};

export default Documents;
