import React from 'react';
import styled from 'styled-components';

const HeaderTitle = styled.h1`
    font-size: 48px;
    font-weight: bold;
    color: #0b5394;
    margin-top: 24px;
    font-family: 'Raleway', sans-serif;
`;

const VersionTitle = styled.p`
    position: absolute;
    top: 8px;
    right: 12px;

`;

const Header = () => {
    return (
        <>
            <VersionTitle>
                ver 0.2.0
            </VersionTitle>
            <HeaderTitle>
                NUMBER BASEBALL
            </HeaderTitle>
        </>
    );
};

export default Header;