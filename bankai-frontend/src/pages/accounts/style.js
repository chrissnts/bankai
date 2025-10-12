import styled from 'styled-components';

export const Input = styled.input`
    display: inline-block;
    width: 90%;
    height: 35px;
    border: 0px;
    border-left: 1px solid #888;
    border-bottom: 1px solid #888;
    border-radius: 3px;
    margin-bottom: 10px;
    padding-left: 10px;

    &:focus {
        outline: none;
        border: 1px solid #555;
        border-radius: 4px;
    }
`;

export const Label = styled.label`
    display: block;
    font-size: 16px;
    color: #111;
    margin-top: 15px;
    margin-bottom: 5px;
`;

export const Submit = styled.input.attrs({ type: 'submit' })`
    box-sizing: border-box;
    width: 180px;
    height: 35px;
    background-color: lightseagreen;
    color: white;
    font-size: 16px;
    font-weight: bold;
    border-radius: 8px;
    margin-top: 20px;
    border: 0px;
    cursor: pointer;
    margin-right: 5px;

    &:hover {
        background-color: #20b2aa;
    }
`;

export const ModalTitle = styled.h5`
    font-weight: bold;
    color: #333;
`;

export const ModalContent = styled.div`
    padding: 15px;
`;
