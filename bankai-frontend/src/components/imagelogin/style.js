import styled from 'styled-components';

import logo_depen from '../../images/image.png';

export const Container = styled.div`
    
    background-image: url( ${logo_depen});
    background-repeat: no-repeat;
    background-size: cover;
    background-position: center;
    border-left: 1px solid #CCC;

    @media (max-width: 800px) {
        display: none;
    }
`