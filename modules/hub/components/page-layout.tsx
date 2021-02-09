import styled from "styled-components";
import { centerPageContent } from "@/static/mixins";

const Page = styled.main`
  ${centerPageContent}
  
  .cards {
    width: 100%;
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
    column-gap: 80px;
    row-gap: 40px;
    margin-top: 15px;
  }
  
  .loading {
    width: 100%;
    height: calc(100vh - 70px);
    display: flex;
    justify-content: center;
    align-items:center;
  }
`;

export default Page;
