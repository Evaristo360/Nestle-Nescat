import { Component } from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';

const modalRoot = document.getElementById('modal-root2');

class Dialog extends Component {
  constructor(props) {
    super(props);

    this.el = document.createElement('div');
  }

  componentDidMount() {
    modalRoot.appendChild(this.el);
  }

  componentWillUnmount() {
    modalRoot.removeChild(this.el);
  }

  render() {
    this.el.style = `
      width: 100vw;
      height: 100vh;
      background: rgba(0,0,0, 0.76);
      display: flex;
      justify-content: center;
      align-items: center;
    `;

    return ReactDOM.createPortal(this.props.children, this.el);
  }
}

Dialog.propTypes = {
  children: PropTypes.object.isRequired
};

export default Dialog;
