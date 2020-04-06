import styled from 'styled-components';

export const Wrapper = styled.div`
  margin-bottom: 5px;
  justify-content: center;
  display: inline-flex;
  position: relative;
  width: 100%;
  max-width: 700px;
  cursor: pointer;
`;

export const ClickWrapper = styled.div`
  width: 100%;
  height: 100%;
`;

export const CardWrapper = styled.div`
  width: 100%;
  height: 100%;
  position: fixed;
  top: 0;
  left: 0;
  display: ${({active}) => active ? 'flex' : 'none'};
  justify-content: center;
  align-items: center;
  z-index: 10001;
`;

export const Overlay = styled.div`
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
  background: black;
  opacity: 0.5;
  z-index: 10001;
`;