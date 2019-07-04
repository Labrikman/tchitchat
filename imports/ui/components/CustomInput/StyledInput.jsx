import styled from 'styled-components';
import colors from '/imports/utils/colors';

const StyledInput = styled.input`
    font-size: 2rem;
    border: none;
    width:80vw;
    border-bottom: 2px solid ${({color}) => colors(color)};
    :focus{
        outline:none;
    }
    ::placeholder{
        color: ${({ color }) =>  colors(color)};
        opacity: 0.33;
    }
    color: ${({ color }) =>  colors(color)};
`;

export default StyledInput;
