import React, { Component } from 'react'
import {
  Link,
  Redirect
} from "react-router-dom";
import equal from 'fast-deep-equal';
import styled from 'styled-components';
import { Grid, Row, Col } from 'react-flexbox-grid';
import { PaddingWrapper } from '../Reusable/styled.js';
import userRequests from "../../requests/user-requests";
import colors from "../Reusable/colors";

const Button = styled.button`
  text-align: center;
  text-transform: uppercase;
  font-size: 16px;
  padding: 10px;
  color: white;
  background-color: ${({bgColor}) => bgColor ? bgColor : 'auto'};
  width: 100%;
  border: none;
  outline: none;
  box-shadow: 0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.24);
  transition: all 0.2s cubic-bezier(.25,.8,.25,1);
  &:hover {
    background-color: ${({hlColor}) => hlColor ? hlColor : 'auto'}; 
    box-shadow: 0 2px 4px rgba(0,0,0,0.25), 0 2px 3px rgba(0,0,0,0.22);
  }
  &:focus {
    outline: none;
  }
  &:disabled {
    background-color: ${({dsColor}) => dsColor ? dsColor : 'auto'}; 
    &:hover {
      background-color: ${({dsColor}) => dsColor ? dsColor : 'auto'}; 
      box-shadow: 0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.24);
    }
  }
`;

const AuthMenu = styled.form`
  max-width: 400px;
  margin: auto;
  margin-top: 80px;
  display: block;
`;

const InputWrapper = styled.div`
  margin-bottom: 20px;
`;

const InputTitle = styled.div`
  font-size: 12px;
`;

const ErrorMessage = styled.div`
  font-size: 12px;
  color: #cf000f;
  display: ${({visible}) => visible ? 'block' : 'none'};
  text-align: center;
`;

const SmallButton = styled(Link)`
  font-size: 12px;
  cursor: pointer;
  transition: 0.2s;
  text-align: center;
  color: black;
  display: block;
  &:hover {
    color:  ${({hlColor}) => hlColor ? hlColor : 'auto'}; 
    text-decoration: none;
  }
`;

const Input = styled.input`
  width: 100%;
  font-size: 14px;
  height: 40px;
  padding: 0 10px;
`;

export default class Auth extends Component {
  constructor(props) {
    super(props);
  
    const { 
      match: {
        params: {
          type
        }
      } 
    } = this.props;

    this.state = {
      register: type === 'register' ? true : false,
      username: '',
      email: '',
      password: '',
      errorMsgVisible: false,
      loggedIn: false,
      registerSuccess: false,
    }

    this.handleUsernameChange = this.handleUsernameChange.bind(this);
    this.handleEmailChange = this.handleEmailChange.bind(this);
    this.handlePasswordChange = this.handlePasswordChange.bind(this);
    this.handleLoginSuccess = this.handleLoginSuccess.bind(this);
    this.handleRegisterSuccess = this.handleRegisterSuccess.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.changeErrorMsg = this.changeErrorMsg.bind(this);
  }

  componentDidUpdate(prevProps) {
    if(!equal(this.props.match.params.type, prevProps.match.params.type)) {
      this.update(this.props.match.params.type === 'register' ? true : false);
    }
  } 

  update(newVal) {
    this.setState({
      register: newVal
    })
  }

  setRegisterState(newValue) {
    this.setState({
      register: newValue
    })
  }

  changeErrorMsg(visible) {
    this.setState({
      errorMsgVisible: visible
    })
  }

  handleUsernameChange(event) {
    this.setState({
      username: event.target.value
    })
  }

  handleEmailChange(event) {
    this.setState({
      email: event.target.value
    })
  }

  handlePasswordChange(event) {
    this.setState({
      password: event.target.value
    })
  }

  handleLoginSuccess(data) {
    localStorage.setItem('authToken', data.token)
    this.setState({
      loggedIn: true
    })
  }

  handleRegisterSuccess() {
    this.setState({
      register: false,
    })
  }

  validateEmail (email) {
    var re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(String(email).toLowerCase());
  }

  handleLogin() {
    const {email, password} = this.state;
    const {changeErrorMsg, handleLoginSuccess} = this;
    userRequests.login({email, password})
      .then(response => {
        if (!response.data.auth) changeErrorMsg(true);
        else handleLoginSuccess(response.data);
      })
      .catch(error => console.log(error))
  }

  handleRegister() {
    const {username, email, password} = this.state;
    const {changeErrorMsg, handleRegisterSuccess, validateEmail} = this;

    if (!validateEmail(email)) {
      changeErrorMsg(true);
      return;
    }

    userRequests.register({name: username, email, password})
      .then(response => {
        if (!response.data._id) changeErrorMsg(true);
        else handleRegisterSuccess();
      })
      .catch(error => console.log(error))
  }

  handleSubmit(event) {
    event.preventDefault();
  }

  render () {
    const {
      register,
      errorMsgVisible,
      loggedIn,
      registerSuccess
    } = this.state;
    return loggedIn ? (
      <Redirect to={"/"} />
    ) : registerSuccess ? (
      <Redirect to={{
          pathname: "/auth/login",
          state: { registerSuccess: false }
        }}
      /> 
    ) : (
      <PaddingWrapper>
      <Grid fluid> 
        <Row>
          <Col sm={12}>
            <AuthMenu onSubmit={this.handleSubmit}>
              {
                register && (
                  <InputWrapper>
                    <InputTitle>
                      Имя пользователя
                    </InputTitle>
                    <Input onChange={this.handleUsernameChange} />
                  </InputWrapper>
                )
              }
              <InputWrapper>
                <InputTitle>
                  Email
                </InputTitle>
                <Input onChange={this.handleEmailChange} />
              </InputWrapper>
              <InputWrapper>
                <InputTitle>
                  Пароль
                </InputTitle>
                <Input type='password' onChange={this.handlePasswordChange} />
              </InputWrapper>
              {
                register ? (
                  <>
                    <Button 
                      onClick={() => this.handleRegister()}
                      bgColor={colors.green_main}
                      hlColor={colors.green_hl}
                      dsColor={colors.green_ds}
                    >
                      Зарегистрироваться
                    </Button> 
                    <SmallButton to='/auth/login' hlColor={colors.green_hl}>Уже есть аккаунт</SmallButton>
                  </>
                ) : (
                  <>
                    <Button 
                      onClick={() => this.handleLogin()}
                      bgColor={colors.green_main}
                      hlColor={colors.green_hl}
                      dsColor={colors.green_ds}
                    >
                      Войти
                    </Button> 
                    <SmallButton to='/auth/register'>Создать аккаунт</SmallButton>
                  </>
                )
              }   
              <ErrorMessage visible={errorMsgVisible}>Ошибка. Проверьте введенные данные.</ErrorMessage>
            </AuthMenu>
          </Col>
        </Row>
      </Grid>
      </PaddingWrapper>
    )
  }
}