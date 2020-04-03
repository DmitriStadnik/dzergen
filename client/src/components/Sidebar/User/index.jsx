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
import colors from "../../Reusable/colors";

const Menu = styled.div`
  
`;

const MenuList = styled.ul`
  margin: 0;
  padding: 0;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  flex-direction: column;
`;

const ListItem = styled.li`
  list-style: none;
  width: 100%;
  font-size: 14px;

  a {
    padding: 5px;
    padding-left: 20px;
    color: white;
    transition: 0.2s;
    width: 100%;
    display: block;
    text-align: left;
    &:hover {
      text-decoration: none;
      background: ${({сolor}) => сolor ? сolor : 'auto'};
    }
  }
`;

const UserName = styled.div`
  margin-top: 5px;
`;

const RightItemWrapper = styled(Link)`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  color: white;
  padding-top: 10px;  
  padding-bottom: 5px;  
  transition: 0.2s;
  &:hover {
    text-decoration: none;
    color: white;
    background: ${({сolor}) => сolor ? сolor : 'auto'};
  }
`;

const UserIcon = styled(FontAwesomeIcon)`
  color: white;
  transition: 0.2s;
  font-size: 20px!important;
  transition: 0.2s;
  border: 3px solid white;
  border-radius: 50%;
  width: 120px!important;
  height: 120px!important;
  overflow: hidden!important;
`;

const UserImage = styled.img`
  object-fit: cover;
  transition: 0.2s;
  border: 3px solid white;
  border-radius: 50%;
  width: 120px;
  height: 120px;
  overflow: hidden;
`;

const UserStats = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  position: fixed;
  left: 20px;
  bottom: 20px;
`;

const UserStat = styled.div`
  width: 100%;
  color: white;
  text-align: left;
  font-size: 10px;
`;

class User extends Component {
  constructor(props) {
    super(props);

    this.state = {
      user: null,
      MenuOpen: false,
      menuItems: []
    }

    this.getUser = this.getUser.bind(this);
    this.setUser = this.setUser.bind(this);
    this.checkAuth = this.checkAuth.bind(this);
    this.toggleMenu = this.toggleMenu.bind(this);
    this.closeMenu = this.closeMenu.bind(this);
    this.composeMenu = this.composeMenu.bind(this);
  }

  componentDidMount () {
    this.checkAuth();
    this.unlisten = this.props.history.listen(() => {
      this.checkAuth();
      this.closeMenu();
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
    this.toggleMenu();
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
    data ? this.props.onUpdateUser(data) : this.props.onUpdateUser(null);
    this.composeMenu();
  }

  composeMenu () {
    const { user } = this.state;
    if (user) {
      this.setState({
        menuItems: [
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

  toggleMenu () {
    const { MenuOpen } = this.state;
    this.setState({
      MenuOpen: !MenuOpen
    })
  }

  closeMenu () {
    this.setState({
      MenuOpen: false
    })
  }

  render () {
    const {
      user,
      MenuOpen,
      menuItems
    } = this.state;

    const {
      imagePath,
    } = Functions;

    const {
      toggleMenu,
    } = this;

    return (
      <> 
        {
          user ? (
            <>
              <RightItemWrapper title={'Профиль'} to={`/user/${user._id}`} сolor={colors.green_hl}>
                {
                  user.image ? (
                    <UserImage src={imagePath(user.image)} />
                  ) : (
                    <UserIcon icon={faUser} />
                  )
                }
                <UserName>
                  { user.name }
                </UserName>       
              </RightItemWrapper>
              <Menu>
                <MenuList>
                  { menuItems && menuItems.map(item => (
                    
                    <ListItem key={item.name} сolor={colors.green_hl}>
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
                </MenuList>
              </Menu> 
              <UserStats>
                <UserStat>
                  дк: { user.currency.coin }
                </UserStat>
                <UserStat>
                  жыжа: { user.currency.z }
                </UserStat>
              </UserStats> 
            </>
          ) : (   
            <RightItemWrapper title={'Войти'} to="/auth/login" сolor={colors.green_hl}>
              <UserIcon icon={faUser} /> 
              <UserName>
                Войти 
              </UserName>     
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