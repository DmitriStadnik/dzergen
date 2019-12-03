import React, { Component } from 'react';
import styled from 'styled-components';
import { Link } from "react-router-dom";

const Wrapper = styled.div`
  width: 100%;
  background-color: #26a65b;
  display: flex;
  padding: 10px 20px;
`;

const Logo = styled.div`
  font-size: 20px;
  color: white;
  width: 100px;
`;

const LeftList = styled.ul`
  margin: 0;
  display: flex;
  justify-content: flex-start;
  align-items: center;
`;

const RightList = styled(LeftList)`
  justify-content: flex-end;
  margin-left: auto;
  display: none;
`;

const ListItem = styled.li`
  list-style: none;
  margin-right: 20px;

  a {
    color: white;
    transition: 0.2s;
    &:hover {
      text-decoration: none;
      color: #87d37c;
    }
  }
`;

const Button = styled.div`
  color: white;
  transition: 0.2s;
  cursor: pointer;
  &:hover {
    color: #87d37c;
  }
`;

const AuthButton = styled.div`
  text-align: center;
  font-size: 16px;
  padding: 10px;
  color: white;
  background-color: #26a65b;
  width: 100%;
  transition: 0.2s;
  cursor: pointer;
  &:hover {
    background-color: #87d37c; 
  }
  &:focus {
    outline: none;
  }
  &:disabled {
    background-color: #a2ded0; 
    &:hover {
      background-color: #a2ded0;
    }
  }
`;

const MobileWrapper = styled.div`
  width: 100%;
  display: flex;
  @media screen and (max-width: 767px) {
    display: none;
  }
`;

const AuthMenu = styled.div`
  width: 420px;
  background-color: #26a65b;
  position: absolute;
  right: 0;
  top: 50px;
  z-index: 9999;
  color: white;
  padding: 20px;
`;

const InputWrapper = styled.div`
  margin-bottom: 20px;
`;

const InputTitle = styled.div`
  font-size: 12px;
`;

const Input = styled.input`
  width: 100%;
  font-size: 14px;
  height: 40px;
  padding: 0 10px;
  border: none;
`;

export default class Header extends Component {
  constructor(props) {
    super(props);

    this.state = {
      version: '2.1',
      authMenu: {
        visible: false,
        register: true,
      }
    }
  }

  // componentDidUpdate(prevProps) {
  //   if(!equal(this.props.item, prevProps.item)) {
  //     this.update();
  //   }
  // } 

  // update() {
  //   this.setState({
  //     item: this.props.item
  //   })
  // }

  showAuthMenu(register) {
    this.setState({
      authMenu: {
        visible: true,
        register,
      }
    })
  }

  hideAuthMenu() {
    this.setState({
      authMenu: {
        visible: false
      }
    })
  }

  render () {
    const {
      version,
      authMenu
    } = this.state;

    return (
      <Wrapper> 
        <Logo>{`DG v${version}`}</Logo>
        <MobileWrapper>
          <LeftList>
            <ListItem>
              <Link to="/">
                Генератор
              </Link>
            </ListItem>
            <ListItem>
              <Link to="/collection">
                Коллекция
              </Link>
            </ListItem>
          </LeftList>
          <RightList>
            <ListItem>
              <Button onClick={() => this.showAuthMenu(true)}>
                Регистрация
              </Button>
            </ListItem>
            <ListItem>
              <Button onClick={() => this.showAuthMenu(false)}>
                Вход
              </Button>
            </ListItem>
          </RightList>
          {
            authMenu.visible && (
              <AuthMenu>
                {
                  authMenu.register && (
                    <InputWrapper>
                      <InputTitle>
                        Никнейм
                      </InputTitle>
                      <Input />
                    </InputWrapper>
                  )
                }
                <InputWrapper>
                  <InputTitle>
                    Email
                  </InputTitle>
                  <Input />
                </InputWrapper>
                <InputWrapper>
                  <InputTitle>
                    Пароль
                  </InputTitle>
                  <Input type='password' />
                </InputWrapper>
                {
                  authMenu.register ? (
                    <AuthButton onClick={() => this.hideAuthMenu()}>
                      Зарегистрироваться
                    </AuthButton> 
                  ) : (
                    <AuthButton onClick={() => this.hideAuthMenu()}>
                      Войти
                    </AuthButton> 
                  )
                }               
              </AuthMenu>
            )
          }
          
        </MobileWrapper>
      </Wrapper>
    )
  }
}