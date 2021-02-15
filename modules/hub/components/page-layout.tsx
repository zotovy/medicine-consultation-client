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
        
        @media screen and (max-width: 768px) {
            grid-template-columns: repeat(1, 1fr);
        }
        
        @media screen and (min-width: 768px) and (max-width: 1024px) {
            grid-template-columns: repeat(auto-fill, minmax(335px, 1fr));
        }
        
        @media screen and (max-width: 1440px) {
            padding: 0 20px;
        }

    }

    .loading {
        width: 100%;
        height: calc(100vh - 70px);
        display: flex;
        justify-content: center;
        align-items: center;
    }
`;

export default Page;
