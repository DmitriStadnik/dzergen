import React from 'react';
import styled from 'styled-components';
import logo from './logo.svg';

const Wrapper = styled.div`
  text-align: center;
`;

const Header = styled.header`
  background-color: #282c34;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  font-size: calc(10px + 2vmin);
  color: white;
`;

const Logo = styled.img`
  animation: App-logo-spin infinite 20s linear;
  height: 40vmin;
  pointer-events: none;

  @keyframes App-logo-spin {
    from {
      transform: rotate(0deg);
    }
    to {
      transform: rotate(360deg);
    }
  }
`;

const Link = styled.a`
  color: #61dafb;
`;

const Text = styled.div`
  color: #61dafb;
`;

export default () => (
  <Wrapper>
    <Header>
      <Logo src={logo} alt="logo" />
      <Text>
        collection page
      </Text>
      <Link
        href="https://reactjs.org"
        target="_blank"
        rel="noopener noreferrer"
      >
        Learn React
      </Link>
    </Header>
  </Wrapper>
)