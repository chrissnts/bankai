import styled from 'styled-components';

export const Input = styled.input `
    display: inline-block;
    width: 90%;
    height: 30px;
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
`

export const Label = styled.label`
    display: block;
    font-size: 18px;
    color: #111;
    margin-top: 15px;
    margin-bottom: 5px;
`

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
    cursor: grab;
    margin-right: 5px;
`