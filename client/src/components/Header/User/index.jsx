import React, { Component } from 'react';
import styled from 'styled-components';
import { Link } from "react-router-dom";
import { withRouter } from "react-router";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser } from '@fortawesome/free-solid-svg-icons';
import userRequests from "../../../requests/user-requests";
import Functions from "../../../utils/Functions";

const Dropdown = styled.div`
  transition: 0.2s;
  border: 2px solid #26a65b;
  border-top: none;
  background: white;
  width: 200px;
  position: absolute;
  top: 50px;
  right: 0;
  z-index: 9999;
  display: ${({active}) => active ? 'block' : 'none'};
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

class User extends Component {
  constructor(props) {
    super(props);

    this.state = {
      user: null,
      dropdownOpen: false
    }

    this.getUser = this.getUser.bind(this);
    this.setUser = this.setUser.bind(this);
    this.checkAuth = this.checkAuth.bind(this);
    this.toggleDropdown = this.toggleDropdown.bind(this);
  }

  componentDidMount () {
    this.checkAuth();
    this.unlisten = this.props.history.listen(() => this.checkAuth());
  }

  // componentDidUpdate(prevProps) {
  //   if(!equal(this.props, prevProps)) {
  //     this.checkAuth();
  //   }
  // } 

  componentWillUnmount() {
    this.unlisten();
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

  toggleDropdown () {
    const { dropdownOpen } = this.state;
    this.setState({
      dropdownOpen: !dropdownOpen
    })
  }

  render () {
    const {
      user,
      dropdownOpen
    } = this.state;

    const {
      imagePath,
    } = Functions;

    const {
      toggleDropdown,
    } = this;

    return (
      <> 
        {
          user ? (
            <RightItemWrapper onClick={() => toggleDropdown()}>
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
              <UserIconLink title={'Войти'} to="/auth/login">
                <UserIcon icon={faUser} />
              </UserIconLink>          
            </RightItemWrapper>
          )
        }
        <Dropdown active={dropdownOpen}>
          <p>fffffffffff</p>
          <p>fffffffffff</p>
          <p>fffffffffff</p>
          <p>fffffffffff</p>
        </Dropdown>       
      </>
    )
  }
}

export default withRouter(User);