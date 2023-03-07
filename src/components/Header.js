import React from 'react';
import styled from 'styled-components';
import packageJson from '../../package.json';

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
                ver {packageJson.version}
            </VersionTitle>
            <HeaderTitle>
                NUMBER BASEBALL
            </HeaderTitle>
        </>
    );
};

export default Header;