import styled from 'styled-components';

export const Container = styled.div`
    box-sizing: border-box;
    padding-top: 50px;
    padding-left: 50px;
    padding-bottom: 50px;
`;

export const BoxIcon = styled.div`
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    text-align: center;
    width: 90%;
    margin-top: 30px;
`

export const BoxItem = styled.div`
    text-align: center;
    display: none;

    @media (max-width: 768px) {
        display: block;
    }
`

export const Icon = styled.img`
    width: 120px;
    height: 120px;
    border-radius: 50%;
    margin-top: 0px;
    margin-bottom: 10px;
`

export const Title = styled.h1`
    font-size: 48px;
    color: #555;
    margin-bottom: 5px;
`;

export const SubTitle = styled.h3`
    font-size: 24px;
    color: #888;
    font-weight: 100;
    margin-bottom: 40px;
`;

export const Label = styled.label`
    display: block;
    font-size: 18px;
    color: #111;
    margin-top: 15px;
    margin-bottom: 5px;
`;

export const InputEmail = styled.input.attrs({ type: 'email' })`
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

export const InputPassword = styled.input.attrs({ type: 'password' })`
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

export const SendBox = styled.div`
    display: grid;
    grid-template-columns: 1fr 1fr;
    text-align: center;
    width: 90%;
    padding-bottom: 30px;
    border-bottom: 1px solid #555;
`

export const MsgBox = styled.div`
    display: grid;
    grid-template-columns: 1fr;
    text-align: center;
    width: 90%;
    padding-top: 10px;
    color: red;
`

export const Submit = styled.input.attrs({ type: 'submit' })`
    box-sizing: border-box;
    width: 180px;
    height: 35px;
    background-color: darkgreen;
    color: white;
    font-size: 16px;
    font-weight: bold;
    border-radius: 8px;
    margin-top: 20px;
    border: 0px;
    cursor: grab;
`

export const LinkForgot = styled.div`
    text-decoration: none;
    cursor: grab;
    font-size: 18px;
    margin-top: 20px;
    color: #555;
    font-weight: 600;
    padding-top: 7px;

    &:hover {
        opacity: 0.6;
    }
`