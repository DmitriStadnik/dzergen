import React, { Component } from 'react';
import styled from 'styled-components';
import { Link } from "react-router-dom";
import { withRouter } from "react-router";
import equal from 'fast-deep-equal';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faBars } from '@fortawesome/free-solid-svg-icons';
import userRequests from "../../requests/user-requests";
import Functions from "../../utils/Functions";

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
  @media screen and (max-width: 767px) {
    height: 300px;
    flex-direction: column;
  }
`;

const RightList = styled.div`
  display: flex;
  justify-content: flex-end;
  margin-left: auto;
  @media screen and (max-width: 767px) {
    height: 300px;
    margin-right: 20px;
    align-items: flex-start;
  }
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

  @media screen and (max-width: 767px) {
    width: 100%;
    margin-right: 0px;
  }
`;

const UserIconWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  color: white;
  transition: 0.2s;
  border: 3px solid white;
  border-radius: 50%;
  width: 30px;
  height: 30px;
  overflow: hidden;
`;

const UserName = styled.div`
  margin-right: 10px;
`;

const RightItemWrapper = styled.div`  
  display: flex;
  align-items: center;
  color: white;
  transition: 0.2s;
  cursor: pointer;
  &:hover {
    text-decoration: none;
    color: #87d37c;
    div {
      border-color: #87d37c;
      svg {
        color: #87d37c;
      }
    }
  }
`;

const UserIconLink = styled(Link)`
  display: flex;
  justify-content: center;
  align-items: center;
  color: white;
  transition: 0.2s;
  border: 3px solid white;
  border-radius: 50%;
  width: 30px;
  height: 30px;
  &:hover {
    border-color: #87d37c;
    svg {
      color: #87d37c;
    }
  }
`;

const UserIcon = styled(FontAwesomeIcon)`
  color: white;
  transition: 0.2s;
  font-size: 23px;
`;

const UserImage = styled.img`
  height: 100%;
  width: 100%;
  object-fit: cover;
`;

const MobileWrapper = styled.div`
  width: 100%;
  display: flex;
  @media screen and (max-width: 767px) {
    display: ${({visible}) => visible ? 'flex' : 'none'};
    background: #26a65b;
    padding-top: 50px;
    position: absolute;
    left: 0;
    top: 0;
    height: 3000px;
    z-index: 3000;
  }
`;

const MobileMenuIcon = styled(FontAwesomeIcon)`
  color: white;
  transition: 0.2s;
  font-size: 23px;
  position: absolute;
  cursor: pointer;
  top: 15px;
  right: 20px;
  display: none;
  z-index: 3002;
  @media screen and (max-width: 767px) {
    display: block;
  }
`;

class Header extends Component {
  constructor(props) {
    super(props);

    this.state = {
      version: '2.1',
      user: null,
      mobileMenuVisible: false,
    }

    this.getUser = this.getUser.bind(this);
    this.setUser = this.setUser.bind(this);
    this.toggleMobileMenu = this.toggleMobileMenu.bind(this);
  }

  componentDidMount () {
    this.checkAuth();
  }

  componentDidUpdate(prevProps) {
    if(!equal(this.props, prevProps)) {
      this.checkAuth();
    }
  } 

  checkAuth () {
    const token = localStorage.getItem('authToken');
    const { getUser, setUser } = this;
    userRequests.checkAuth(`JWT ${token}`)
      .then(response => {
        if (response.data.auth) {
          getUser(response.data.userId);
        } else {
          setUser(null);
          localStorage.removeItem('authToken');
        }
      })
      .catch(error => console.log(error));
  }

  getUser (id) {
    const { setUser } = this;
    userRequests.getUser({id})
      .then(response => {
        setUser(response.data)
      })
      .catch(error => console.log(error));
  }

  setUser (data) {
    this.setState({
      user: data
    })
  }

  toggleMobileMenu () {
    const { mobileMenuVisible } = this.state;
    if (window.innerWidth < 768) {
      this.setState({
        mobileMenuVisible: !mobileMenuVisible
      })
    }
  }

  render () {
    const {
      version,
      user,
      mobileMenuVisible
    } = this.state;

    const {
      imagePath,
    } = Functions;

    const {
      toggleMobileMenu,
    } = this;

    return (
      <Wrapper> 
        <Logo>{`DG v${version}`}</Logo>
        <MobileWrapper visible={mobileMenuVisible}>
          <LeftList>
            <ListItem>
              <Link to="/" onClick={() => toggleMobileMenu()}>
                Генератор
              </Link>
            </ListItem>
            <ListItem>
              <Link to="/collection" onClick={() => toggleMobileMenu()}>
                Коллекция
              </Link>
            </ListItem>
          </LeftList>
          <RightList>
            {
              user ? (
                <RightItemWrapper onClick={() => toggleMobileMenu()}>
                  <UserName>
                    { user.name }
                  </UserName>
                  <UserIconWrapper>
                    {
                      user.image ? (
                        <UserImage src={imagePath(user.image)} />
                      ) : (
                        <UserIcon icon={faUser} />
                      )
                    }
                  </UserIconWrapper>          
                </RightItemWrapper>
              ) : (
                <RightItemWrapper>
                  <UserIconLink title={'Войти'} to="/auth/login" onClick={() => toggleMobileMenu()}>
                    <UserIcon icon={faUser} />
                  </UserIconLink>          
                </RightItemWrapper>
              )
            } 
          </RightList>         
        </MobileWrapper>
        <MobileMenuIcon icon={faBars} onClick={() => toggleMobileMenu()} />
      </Wrapper>
    )
  }
}

export default withRouter(Header);