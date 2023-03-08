import React from 'react';
import { useState, useEffect, useCallback, useRef } from 'react';
import styled from 'styled-components';

import ReactCanvasConfetti from "react-canvas-confetti";
import Header from '../components/Header';

let resultId = 1;

const Main = () => {
    const [number, setNumber] = useState(null);
    const [firstInputNumber, setFirstInputNumber] = useState('');
    const [secondInputNumber, setSecondInputNumber] = useState('');
    const [thirdInputNumber, setThirdInputNumber] = useState('');
    const [fourthInputNumber, setFourthInputNumber] = useState('');
    const [checkResultArray, setCheckResultArray] = useState([]);
    const [isEnding, setIsEnding] = useState(false);

    const refAnimationInstance = useRef(null);
    const [intervalId, setIntervalId] = useState();

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
        const number1Element = document.getElementsByName('number_1')[0];
        number1Element.focus();
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
            return [`${strikeCount}S`, true];
        } else if (strikeCount === 0) {
            return [`${ballCount}B`, false];
        } else if (ballCount === 0) {
            return [`${strikeCount}S`, false];
        } else {
            return [`${strikeCount}S ${ballCount}B`, false];
        }
    }

    const isNumeric = number => !isNaN(number);

    const numberChangeMoveEvent = (event) => {
        const number1Element = document.getElementsByName(event.target.name[0]);
        number1Element.value = event.target.value;

        if (event.keyCode === 8) {
            if (event.target.value.length !== event.target.maxLength && event.target.previousElementSibling) {
                event.target.previousElementSibling.focus();
            }
            return;
        }
        
        if (event.target.value.length === event.target.maxLength && event.target.nextElementSibling) {
            event.target.nextElementSibling.focus();
        }
    }

    const handleFocus = (event) => event.target.select();

    const enterPressEvent = (event) => {
        if (event.key === 'Enter') {
            document.getElementById('proposal-btn').click();
            return;
        }
    }

    const openInstagram = () => window.open('https://www.instagram.com/gninuyh_gnus/', '_blank');

    // SchoolPride
    const canvasStyles = {
        position: "fixed",
        pointerEvents: "none",
        width: "100%",
        height: "100%",
        top: 0,
        left: 0
      };
      
    function getAnimationSettings(angle, originX) {
        return {
            particleCount: 400,
            angle,
            spread: 90,
            origin: { x: originX },
            colors: ["#0b5394", "#ffffff", "#fbc7d4", "#9796f0"]
        };
    }
    const getInstance = useCallback((instance) => {
        refAnimationInstance.current = instance;
    }, []);
    
    const nextTickAnimation = useCallback(() => {
    if (refAnimationInstance.current) {
        refAnimationInstance.current(getAnimationSettings(60, 0));
        refAnimationInstance.current(getAnimationSettings(120, 1));
    }
    }, []);

    const startAnimation = useCallback(() => {
    if (!intervalId) {
        setIntervalId(setInterval(nextTickAnimation, 16));
    }
    }, [nextTickAnimation, intervalId]);

    const pauseAnimation = useCallback(() => {
    clearInterval(intervalId);
    setIntervalId(null);
    }, [intervalId]);

    const stopAnimation = useCallback(() => {
    clearInterval(intervalId);
    setIntervalId(null);
    refAnimationInstance.current && refAnimationInstance.current.reset();
    }, [intervalId]);

    useEffect(() => {
        setNumber(makeRandomNumber());
    }, []);

    useEffect(() => {
    return () => {
        clearInterval(intervalId);
    };
    }, [intervalId]);

    return (
        <div>
            <Header />
            <Button type="" onClick={() => {
                if (window.confirm('Would you like to start a new game?')) {
                    setNumber(makeRandomNumber);
                }
            }}>
                NEW GAME
            </Button>
            <InstaButton onClick={() => openInstagram()}>
                Go to the maker's Instagram
            </InstaButton>
            {/* <button onClick={() => {console.log(number)}}>
                현재 숫자보기
            </button> */}
            {/* <button onClick={() => {inputNumberInit()}}>
                입력칸 초기화
            </button> */}
            <div>
                <SingleNumberInput name='number_1' autoComplete="off" maxLength={1} min="0" onFocus={handleFocus} onKeyUp={(event) => {
                    numberChangeMoveEvent(event);
                }} onChange={(event) => {
                    setFirstInputNumber(`${event.target.value}`);
                }} onKeyPress={(event) => {
                    enterPressEvent(event);
                }} value={firstInputNumber}/>
                <SingleNumberInput name='number_2' autoComplete="off" maxLength={1} min="0" onFocus={handleFocus} onKeyUp={(event) => {
                    numberChangeMoveEvent(event);
                }} onChange={(event) => {
                    setSecondInputNumber(`${event.target.value}`);
                }} onKeyPress={(event) => {
                    enterPressEvent(event);
                }} value={secondInputNumber}/>
                <SingleNumberInput name='number_3' autoComplete="off" maxLength={1} min="0" onFocus={handleFocus} onKeyUp={(event) => {
                    numberChangeMoveEvent(event);
                }} onChange={(event) => {
                    setThirdInputNumber(`${event.target.value}`);
                }} onKeyPress={(event) => {
                    enterPressEvent(event);
                }} value={thirdInputNumber}/>
                <SingleNumberInput name='number_4' autoComplete="off" maxLength={1} min="0" onFocus={handleFocus} onKeyUp={(event) => {
                    numberChangeMoveEvent(event);
                }} onChange={(event) => {
                    setFourthInputNumber(`${event.target.value}`);
                }} onKeyPress={(event) => {
                    enterPressEvent(event);
                }} value={fourthInputNumber}/>
            </div>
            <div>
                <Button type="" id='proposal-btn' onClick={() => {
                    const number1Element = document.getElementsByName('number_1')[0];
                    const number2Element = document.getElementsByName('number_2')[0];
                    const number3Element = document.getElementsByName('number_3')[0];
                    const number4Element = document.getElementsByName('number_4')[0];
                    if (isEnding) {
                        if (window.confirm(`You've already won the game. Do you want to start a new game?`)) {
                            setNumber(makeRandomNumber);
                        }
                        return;
                    }
                    
                    if (!isNumeric(firstInputNumber)) {
                        alert('Please enter only numbers');
                        number1Element.focus();
                        return;
                    } else if (!isNumeric(secondInputNumber)) {
                        alert('Please enter only numbers');
                        number2Element.focus();
                        return;
                    } else if (!isNumeric(thirdInputNumber)) {
                        alert('Please enter only numbers');
                        number3Element.focus();
                        return;
                    } else if (!isNumeric(fourthInputNumber)) {
                        alert('Please enter only numbers');
                        number4Element.focus();
                        return;
                    }

                    if (!firstInputNumber || !secondInputNumber || !thirdInputNumber || !fourthInputNumber) {
                        alert('Please enter all numbers');
                        return;
                    } else {
                        const setArray = Array.from(new Set([firstInputNumber, secondInputNumber, thirdInputNumber, fourthInputNumber]));
                        if (setArray.length !== 4) {
                            alert('There are duplicate numbers, please enter again');
                            number1Element.focus();
                            return;
                        }
                        inputNumberInit();
                        const resultInputArray = [Number(firstInputNumber), Number(secondInputNumber), Number(thirdInputNumber), Number(fourthInputNumber)];
                        const resultInputString = resultInputArray.toString(' ').split(',').join('');
                        const resultString = `${resultInputArray.toString(' ').split(',').join('')} ➡ ${checkNumber(resultInputArray, number)[0]}`;
                        const isEnding = checkNumber(resultInputArray, number)[1];
                        if (isEnding) {                        
                            setIsEnding(true);
                            startAnimation();
                            setTimeout(() => {
                                pauseAnimation();
                            }, 40);
                            // alert(`Congratulations! You won the ${resultId} time! target number : ${number}`);
                            
                        }
                        setCheckResultArray([
                            {   
                                index : resultId++,
                                // number_string : resultInputString,
                                // check_number_string : checkNumber(resultInputArray, number)[0],
                                value : resultString,
                                is_ending : isEnding,
                            },
                            ...checkResultArray,
                        ]);
                        number1Element.focus();
                    }
                }}>Submit ✔</Button>
                {/* <Button onClick={() => {
                    startAnimation();
                    setTimeout(() => {
                        pauseAnimation();
                    }, 40);
                }}>테스트</Button> */}
            </div>
            <ResultWrap>
                {checkResultArray.map(result => (
                    <ResultBox key={result.index}>
                        <ResultIndex>
                            {result.index}.
                        </ResultIndex>
                        {result.is_ending ? 
                            <ResultContent>
                                {result.value} 👑
                            </ResultContent> :
                            <ResultContent>
                                {result.value}
                            </ResultContent>}
                    </ResultBox>
                ))}
            </ResultWrap>
            <ReactCanvasConfetti refConfetti={getInstance} style={canvasStyles} />
        </div>
    );
};

const Button = styled.button`
    font-family: 'Raleway', sans-serif;
    margin: 10px;
    width: max-content;
    border: none;
    border-radius: 10px;
    background-color: #0b5394;
    padding: 10px;
    color: #FFFFFF;
    height: 40px;
    cursor: pointer;
    &:active {
        scale: 0.98;
    }
`;

const InstaButton = styled.button`
    font-family: 'Raleway', sans-serif;
    position: absolute;
    bottom: 12px;
    right: 12px;
    width: max-content;
    border: none;
    border-radius: 10px;
    padding: 10px;
    color: #FFFFFF;
    height: 40px;
    background: #9796f0;  /* fallback for old browsers */
    background: -webkit-linear-gradient(to right, #fbc7d4, #9796f0);  /* Chrome 10-25, Safari 5.1-6 */
    background: linear-gradient(to right, #fbc7d4, #9796f0); /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */
    cursor: pointer;
    &:active {
        scale: 0.98;
    }
`;

const SingleNumberInput = styled.input`
    width : 40px;
    height: 40px;
    border-radius: 10px;
    border: 4px solid #0b5394;
    font-size: 18px;
    text-align: center;
    outline: none;
    & + & {
        margin-left: 10px;
    }
`;

const ResultWrap = styled.div`
    box-sizing: border-box;
    width: 100%;
    max-width: 300px;
    height: calc(100vh - 300px);
    overflow: auto;
    /* padding: 20px; */
    margin: 0 auto;
`;

const ResultBox = styled.div`
    width: 100%;
    & + & {
        margin-top: 10px;
    }
`;

const ResultIndex = styled.div`
    display: inline-block;
    font-family: 'Raleway', sans-serif;
    width: 100px;
    /* margin-right: 24px; */
    color: #0b5394;
    font-size: 36px;
    text-align: right;
`;

const ResultContent = styled.div`
    display: inline-block;
    box-sizing: border-box;
    font-feature-settings: "tnum";
    font-variant-numeric: tabular-nums;
    width: 200px;
    padding-left: 20px;
    text-align: left;
    font-size: 24px;
    font-weight: bold;
    color: #0b5394;
`;

export default Main;