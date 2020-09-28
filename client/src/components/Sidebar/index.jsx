import React, { Component } from 'react';
import styled from 'styled-components';
import { Link } from "react-router-dom";
import { withRouter } from "react-router";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars } from '@fortawesome/free-solid-svg-icons';
import User from "./User";
import {connect} from "react-redux";
import colors from "../Reusable/colors";
import { MenuList, ListItem } from '../Reusable/styled.js';

const Wrapper = styled.div`
  width: 200px;
  background-color: ${({bgColor}) => bgColor ? bgColor : 'auto'};
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  height: 100%;
  position: fixed;
  z-index: ${({visible}) => !visible ? '9998' : '10000'};
  box-shadow: 0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.24);
  transition: all 0.2s cubic-bezier(.25,.8,.25,1);
  &:hover {
    box-shadow: 0 2px 4px rgba(0,0,0,0.25), 0 2px 3px rgba(0,0,0,0.22);
  }
  @media screen and (max-width: 768px) {
    display: ${({visible}) => visible ? 'flex' : 'none'};
    width: 100%;
  }
`;

const Logo = styled.div`
  padding: 10px;
  font-size: 20px;
  color: white;
  width: 100%;
  text-align: center;
`;

const MobileMenuButton = styled.div`
  position: fixed;
  cursor: pointer;
  top: 0px;
  left: 0px;
  z-index: ${({visible}) => !visible ? '9998' : '10000'};
  background-color: ${({bgColor}) => bgColor ? bgColor : 'auto'};
  height: 50px;
  width: 50px;
  display: none;
  justify-content: center;
  align-items: center;
  box-shadow: ${({visible}) => !visible ? '0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.24)' : 'none'};
  transition: all 0.2s cubic-bezier(.25,.8,.25,1);
  &:hover {
    box-shadow: ${({visible}) => !visible ? '0 2px 4px rgba(0,0,0,0.25), 0 2px 3px rgba(0,0,0,0.22)' : 'none'};
  }
  @media screen and (max-width: 768px) {
    display: flex;
  }
`;

const MobileMenuIcon = styled(FontAwesomeIcon)`
  color: white;
  font-size: 20px;
`;

class Header extends Component {
  constructor(props) {
    super(props);

    this.state = {
      version: '3.0',
      menuVisible: false,
    }

    this.toggleMenu = this.toggleMenu.bind(this);
    this.closeMenu = this.closeMenu.bind(this);
    this.isLoggedIn = this.isLoggedIn.bind(this);
  }

  componentDidMount () {
    this.unlisten = this.props.history.listen(() => this.closeMenu());
  }

  componentWillUnmount() {
    this.unlisten();
  }

  isLoggedIn() {
    const {
      user: {
        data
      },
    } = this.props;

    return data !== null;
  }

  closeMenu () {
    if (window.innerWidth < 768) {
      this.setState({
        menuVisible: false
      })
    }
  }

  toggleMenu () {
    const { menuVisible } = this.state;
    this.setState({
      menuVisible: !menuVisible
    })
  }

  render () {
    const {
      version,
      menuVisible,
    } = this.state;

    const {
      toggleMenu,
      isLoggedIn
    } = this;

    return (
      <>
        <Wrapper bgColor={colors.green_main} visible={menuVisible}> 
          <Logo>{`OG v${version}`}</Logo>
          <User />
          <MenuList>
            <ListItem сolor={colors.green_hl} visible>
              <Link to="/" onClick={() => toggleMenu()}>
                Генератор
              </Link>
            </ListItem>
            <ListItem сolor={colors.green_hl} visible>
              <Link to="/collection/all" onClick={() => toggleMenu()}>
                Коллекция
              </Link>
            </ListItem>
            <ListItem сolor={colors.green_hl} visible={isLoggedIn()}>
              <Link to="/market/" onClick={() => toggleMenu()}>
                Рынок
              </Link>
            </ListItem>
          </MenuList>       
        </Wrapper>
        <MobileMenuButton bgColor={colors.green_main} onClick={() => toggleMenu()} visible={menuVisible}>
          <MobileMenuIcon icon={faBars} />
        </MobileMenuButton>
        
      </>
    )
  }
}

const mapStateToProps = state => ({
  user: state.user,
});

export default withRouter(connect(mapStateToProps)(Header));