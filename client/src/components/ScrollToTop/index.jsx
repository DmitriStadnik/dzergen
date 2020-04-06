import React, {Component} from 'react';
import styled from 'styled-components';
import up from './up-arrow.svg'
import colors from "../Reusable/colors";

const Wrapper = styled.div`
  position: fixed;
  bottom: 0;
  right: 0;
  height: 50px;
  width: 50px;
  display: ${({visible}) => visible ? 'flex' : 'none'};
  justify-content: center;
  align-items: center;
  font-size: 18px;
  color: white;
  background-color: ${({bgColor}) => bgColor ? bgColor : 'auto'};
  box-shadow: 0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.24);
  transition: all 0.2s cubic-bezier(.25,.8,.25,1);
  z-index: 9999;
  &:hover {
    background-color: ${({hlColor}) => hlColor ? hlColor : 'white'};
    cursor: pointer;
    box-shadow: 0 2px 4px rgba(0,0,0,0.25), 0 2px 3px rgba(0,0,0,0.22);
  }
`;

const Icon = styled.img`
  height: 15px;
`;

class ScrollToTop extends Component {
  constructor() {
    super();

    this.state = {
      visible: false
    };

    this.onScroll = this.onScroll.bind(this)
  }

  componentDidMount() {
    this.onScroll()
    window.addEventListener('scroll', this.onScroll);
  }

  componentWillUnmount() {
    window.removeEventListener('scroll', this.onScroll)
  }

  onScroll() {
    if (window.scrollY > 100) {
      this.changeVisible(true)
    } else {
      this.changeVisible(false)
    }
  }

  changeVisible(newVal) {
    this.setState({
      visible: newVal
    })
  }

  scrollToTop() {
    window.scrollTo(0, 0);
  }

  render() {
    const {visible} = this.state;
    return (
      <Wrapper 
        visible={visible} 
        onClick={() => this.scrollToTop()} 
        bgColor={colors.green_main}
        hlColor={colors.green_hl}
      >
        <Icon src={up} />
      </Wrapper>
    )
  }

}

export default ScrollToTop;