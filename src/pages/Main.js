import React from 'react';
import { useState, useEffect } from 'react';
import styled from 'styled-components';

const Button = styled.button`
    margin: 10px;
    width: max-content;
    height: 40px;
`;
const SingleNumberInput = styled.input`
    width : 40px;
    height: 40px;
    border-radius: 10px;
    border: 1px solid black;
    text-align: center;
    outline: none;
    & + & {
        margin-left: 10px;
    }
`;

const ResultWrap = styled.div`
    width: 300px;
    height: 800px;
    padding: 20px;
    /* border: 1px solid #000000; */
    margin: 0 auto;
`;

const ResultBox = styled.div`
    width: 100%;
    height: 100px;
    border: 1px solid;
    border-radius: 10px;
    padding: 10px;
    box-sizing: border-box;
    & + & {
        margin-top: 20px;
    }
`;

const ResultIndex = styled.p`
    font-size: 36px;
    color: #0047ab;
    text-align: left;
`;

const ResultContent = styled.p`
    font-size: 18px;
`;

let resultId = 1;

const Main = () => {
    const [number, setNumber] = useState(null);
    const [firstInputNumber, setFirstInputNumber] = useState('');
    const [secondInputNumber, setSecondInputNumber] = useState('');
    const [thirdInputNumber, setThirdInputNumber] = useState('');
    const [fourthInputNumber, setFourthInputNumber] = useState('');
    const [checkResultArray, setCheckResultArray] = useState([]);
    const [isEnding, setIsEnding] = useState(false);

    const inputNumberInit = () => {
        setFirstInputNumber('');
        setSecondInputNumber('');
        setThirdInputNumber('');
        setFourthInputNumber('');
    }

    const makeRandomNumber = () => {
        resultId = 1;
        setIsEnding(false);
        inputNumberInit();
        setCheckResultArray([]);
        let resultArray = [];
        
        while (resultArray.length < 4) {
            resultArray.push(Math.floor(Math.random() * 10));
            const resultSet = new Set(resultArray);
            resultArray = Array.from(resultSet);
        }
        return resultArray;
    }
    
    const checkNumber = (userArray, gameNumberArray) => {
        let strikeCount = 0;
        let ballCount = 0;
        for (let i = 0; i < userArray.length; i++) {
            const checkIndex = gameNumberArray.indexOf(userArray[i]);
            if (checkIndex !== -1) {
                if (checkIndex === i) {
                    strikeCount++;
                } else {
                    ballCount++;
                }
            }
        }
    
        if (strikeCount === 0 && ballCount === 0) {
            return ['OUT', false];
        } else if (strikeCount === 4) {
            return [`${strikeCount} S`, true];
        } else if (strikeCount === 0) {
            return [`${ballCount} B`, false];
        } else if (ballCount === 0) {
            return [`${strikeCount} S`, false];
        } else {
            return [`${strikeCount} S ${ballCount} B`, false];
        }
    }

    return (
        <div>
            <Button type="" onClick={() => setNumber(makeRandomNumber)}>
                새 게임 시작하기 
            </Button>
            {/* <button onClick={() => {console.log(number)}}>
                현재 숫자보기
            </button> */}
            {/* <button onClick={() => {inputNumberInit()}}>
                입력칸 초기화
            </button> */}
            <div>
                <SingleNumberInput maxLength={1} min="0" onChange={(event) => {
                    setFirstInputNumber(`${event.target.value}`);
                }} value={firstInputNumber}/>
                <SingleNumberInput maxLength={1} min="0" onChange={(event) => {
                    setSecondInputNumber(`${event.target.value}`);
                }} value={secondInputNumber}/>
                <SingleNumberInput maxLength={1} min="0" onChange={(event) => {
                    setThirdInputNumber(`${event.target.value}`);
                }} value={thirdInputNumber}/>
                <SingleNumberInput maxLength={1} min="0" onChange={(event) => {
                    setFourthInputNumber(`${event.target.value}`);
                }} value={fourthInputNumber}/>
            </div>
            <div>
                <Button type="" onClick={() => {
                    if (isEnding) {
                        alert('승리하였습니다 새 게임을 시작하기를 눌러주세요');
                        return;
                    }
                    if (!number) {
                        alert('새 게임 시작하기를 먼저 눌러주세요!');
                        return;
                    }

                    if (!firstInputNumber || !secondInputNumber || !thirdInputNumber || !fourthInputNumber) {
                        alert('모든 숫자를 채워주세요');
                        return;
                    } else {
                        const setArray = Array.from(new Set([firstInputNumber, secondInputNumber, thirdInputNumber, fourthInputNumber]));
                        if (setArray.length !== 4) {
                            alert('중복된 숫자가 있습니다 다시 입력해주세요');
                            return;
                        }
                        inputNumberInit();
                        const resultInputArray = [Number(firstInputNumber), Number(secondInputNumber), Number(thirdInputNumber), Number(fourthInputNumber)];
                        const resultString = `${resultInputArray.toString(' ').split(',').join('')} => ${checkNumber(resultInputArray, number)[0]}`;
                        const isEnding = checkNumber(resultInputArray, number)[1];
                        if (isEnding) {                        
                            setIsEnding(true);
                            alert(`${resultId}회차에 승리하셨습니다! 타켓 숫자 : ${number}`)
                        }
                        setCheckResultArray([
                            ...checkResultArray,
                            {   
                                index : resultId++,
                                value : resultString
                            }
                        ]);
                    }
                }}>
                    확인하기
                </Button>
            </div>
            <ResultWrap>
                {checkResultArray.map(result => (
                    // <li key={artist.id}>{artist.name}</li>  
                    <ResultBox key={result.index}>
                        <ResultIndex>
                            {result.index}.
                        </ResultIndex>
                        <ResultContent>
                            {result.value}
                        </ResultContent>
                    </ResultBox>
                ))}
            </ResultWrap>
        </div>
    );
};

export default Main;