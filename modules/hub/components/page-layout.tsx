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
`;

export default Page;
