import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export const Wrapper = styled.div`
  position: fixed;
  top: 0px;
  right: 0px;
  z-index: 9999;
  box-shadow: 0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.24);
  transition: all 0.2s cubic-bezier(.25,.8,.25,1);
  &:hover {
    box-shadow: 0 2px 4px rgba(0,0,0,0.25), 0 2px 3px rgba(0,0,0,0.22);
  }
  @media screen and (max-width: 768px) {
    left: 0;
    top: 50px;
    right: auto;
  }
`;

export const Container = styled.div`
  display: ${({active}) => active ? 'flex' : 'none'};
  justify-content: center;
  flex-direction: column;
  width: 250px;
  background: white;
  border: ${({brColor}) => brColor ? `2px solid ${brColor}` : 'white'};
`;

export const Filter = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  margin: 0 10px;
`;

export const Title = styled.div`
  font-size: 12px;
`;

export const Buttons = styled.div`
  margin-top: 10px;
`;

export const Input = styled.input`
  width: 100%;
  font-size: 12px;
  height: 30px;
  padding: 0 5px;
`;

export const Select = styled.select`
  width: 100%;
  font-size: 12px;
  height: 30px;
  padding: 0 5px;
`;

export const Button = styled.button`
  text-align: center;
  text-transform: uppercase;
  font-size: 12px;
  padding: 5px;
  color: white;
  width: 100%;
  display: block;
  border: none;
  outline: none;
  transition: 0.2s;
  background-color: ${({bgColor}) => bgColor ? bgColor : 'white'};
  &:hover {
    background-color: ${({hlColor}) => hlColor ? hlColor : 'white'};
  }
  &:focus {
    outline: none;
  }
  &:disabled {
    background-color: ${({dsColor}) => dsColor ? dsColor : 'white'};
    &:hover {
      background-color: ${({dsColor}) => dsColor ? dsColor : 'white'};
    }
  }
`;

export const SideButton = styled.div`
  text-transform: uppercase;
  font-size: 12px;
  padding: 5px 15px;
  height: 50px;
  display: flex;
  justify-content: center;
  align-items: center;
  color: white;
  transition: 0.2s;
  cursor: pointer;
  background-color: ${({bgColor}) => bgColor ? bgColor : 'white'};
  &:hover {
    background-color: ${({hlColor}) => hlColor ? hlColor : 'white'};
  }
  &:focus {
    outline: none;
  }
  &:disabled {
    background-color: ${({dsColor}) => dsColor ? dsColor : 'white'};
    &:hover {
      background-color: ${({dsColor}) => dsColor ? dsColor : 'white'};
    }
  }
`;

export const MenuIcon = styled(FontAwesomeIcon)`
  color: white;
  font-size: 20px;
`;