import React, { Component } from 'react';
import styled from 'styled-components';
import { Link } from "react-router-dom";
import { withRouter } from "react-router";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser } from '@fortawesome/free-solid-svg-icons';
import userRequests from "../../../requests/user-requests";
import Functions from "../../../utils/Functions";
import {connect} from "react-redux";
import {updateUser} from "../../../actions/user-actions";

const Dropdown = styled.div`
  transition: 0.2s;
  border: 2px solid #26a65b;
  border-top: none;
  background: white;
  position: absolute;
  top: 50px;
  right: 0;
  z-index: 9999;
  display: ${({active}) => active ? 'block' : 'none'};
  @media screen and (max-width: 767px) {
    top: 80px;
  }
`;

const DropdownList = styled.ul`
  margin: 0;
  padding: 0;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  flex-direction: column;
`;

const ListItem = styled.li`
  width: 100%;
  list-style: none;
  transition: 0.2s;
  text-align: center;
  font-size: 12px;
  a {
    display: block;
    width: 100%;
    height: 100%;
    padding: 2px 10px;
    color: black;
    &:hover {
      text-decoration: none;
    }
  }

  &:hover {
    background-color: #26a65b;
    a {
      text-decoration: none;
      color: white;
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

class User extends Component {
  constructor(props) {
    super(props);

    this.state = {
      user: null,
      dropdownOpen: false,
      menuItems: []
    }

    this.getUser = this.getUser.bind(this);
    this.setUser = this.setUser.bind(this);
    this.checkAuth = this.checkAuth.bind(this);
    this.toggleDropdown = this.toggleDropdown.bind(this);
    this.closeDropdown = this.closeDropdown.bind(this);
    this.composeMenu = this.composeMenu.bind(this);
  }

  componentDidMount () {
    this.checkAuth();
    this.unlisten = this.props.history.listen(() => {
      this.checkAuth();
      this.closeDropdown();
    });
  }

  componentWillUnmount() {
    this.unlisten();
  }

  checkAuth () {
    const { getUser, setUser } = this;
    const token = localStorage.getItem('authToken');
    if (!token) {
      setUser(null);
      return;
    }
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

  logOut () {
    localStorage.removeItem('authToken');
    this.checkAuth();  
    this.toggleDropdown();
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
    data ? this.props.onUpdateUser(data._id) : this.props.onUpdateUser(null);
    this.composeMenu();
  }

  composeMenu () {
    const { user } = this.state;
    if (user) {
      this.setState({
        menuItems: [
          {
            name: 'Профиль',
            route: `/user/${user._id}`,
            onClick: null
          },
          {
            name: 'Личная коллекция',
            route: `/collection/${user._id}`,
            onClick: null
          },
          {
            name: 'Выйти',
            route: this.props.location.pathname,
            onClick: this.logOut.bind(this)
          },
        ]
      })
    } else {
      this.setState({
        menuItems: []
      })
    }
    
  }

  toggleDropdown () {
    const { dropdownOpen } = this.state;
    this.setState({
      dropdownOpen: !dropdownOpen
    })
  }

  closeDropdown () {
    this.setState({
      dropdownOpen: false
    })
  }

  render () {
    const {
      user,
      dropdownOpen,
      menuItems
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
            <>
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
              <Dropdown active={dropdownOpen}>
                <DropdownList>
                  { menuItems && menuItems.map(item => (
                    
                    <ListItem key={item.name}>
                      {item.onClick ? (
                        <Link to={item.route} onClick={() => item.onClick()}>
                          {item.name}
                        </Link>
                      ) : (
                        <Link to={item.route}>
                          {item.name}
                        </Link>
                      )}
                    </ListItem>
                  ))}
                </DropdownList>
              </Dropdown> 
            </>
          ) : (
            <RightItemWrapper>
              <UserIconLink title={'Войти'} to="/auth/login">
                <UserIcon icon={faUser} />
              </UserIconLink>          
            </RightItemWrapper>
          )
        }      
      </>
    )
  }
}

const mapStateToProps = state => ({
  user: state.user,
});

const mapActionsToProps = {
  onUpdateUser: updateUser
};

export default withRouter(connect(mapStateToProps, mapActionsToProps)(User));