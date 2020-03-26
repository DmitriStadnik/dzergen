import React, { Component } from 'react';
import styled from 'styled-components';
import { Link } from "react-router-dom";
import { withRouter } from "react-router";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars } from '@fortawesome/free-solid-svg-icons';
import User from "./User";
import {connect} from "react-redux";

const Wrapper = styled.div`
  width: 200px;
  background-color: #26a65b;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  height: 100%;
`;

const Logo = styled.div`
  padding: 10px;
  font-size: 20px;
  color: white;
  width: 100%;
  text-align: center;
`;

const MenuList = styled.ul`
  margin: 0;
  display: flex;
  justify-content: flex-start;
  align-items: flex-start;
  flex-direction: column;
  padding: 0;
  width: 100%;
  margin-top: 20px;
`;

const ListItem = styled.li`
  list-style: none;
  width: 100%;
  font-size: 14px;

  a {
    padding: 2px 10px;
    color: white;
    transition: 0.2s;
    width: 100%;
    display: block;
    text-align: center;
    &:hover {
      text-decoration: none;
      background: #87d37c;
    }
  }
`;

const MobileWrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
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
  z-index: 9999;
  @media screen and (max-width: 767px) {
    display: block;
  }
`;

class Header extends Component {
  constructor(props) {
    super(props);

    this.state = {
      version: '3.0',
      mobileMenuVisible: false,
    }

    this.toggleMobileMenu = this.toggleMobileMenu.bind(this);
    this.closeMobileMenu = this.closeMobileMenu.bind(this);
  }

  componentDidMount () {
    this.unlisten = this.props.history.listen(() => this.closeMobileMenu());
  }

  componentWillUnmount() {
    this.unlisten();
  }

  toggleMobileMenu () {
    const { mobileMenuVisible } = this.state;
    if (window.innerWidth < 768) {
      this.setState({
        mobileMenuVisible: !mobileMenuVisible
      })
    }
  }

  closeMobileMenu () {
    if (window.innerWidth < 768) {
      this.setState({
        mobileMenuVisible: false
      })
    }
  }

  render () {
    const {
      version,
      mobileMenuVisible,
    } = this.state;

    const {
      toggleMobileMenu,
    } = this;

    return (
      <Wrapper> 
        <Logo>{`DG v${version}`}</Logo>
        <MobileWrapper visible={mobileMenuVisible}>
          <User />
          <MenuList>
            <ListItem>
              <Link to="/">
                Генератор
              </Link>
            </ListItem>
            <ListItem>
              <Link to="/collection/all">
                Коллекция
              </Link>
            </ListItem>
            <ListItem>
              <Link to="/market/">
                Рынок
              </Link>
            </ListItem>
          </MenuList>       
        </MobileWrapper>
        <MobileMenuIcon icon={faBars} onClick={() => toggleMobileMenu()} />
      </Wrapper>
    )
  }
}

const mapStateToProps = state => ({
  user: state.user,
});

export default withRouter(connect(mapStateToProps)(Header));