import { Component } from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';

class InternalDialog extends Component {
  constructor(props) {
    super(props);
    this.modalRoot = document.getElementById('internal-modal-root');
    this.el = document.createElement('div');
  }

  componentDidMount() {
    this.modalRoot.appendChild(this.el);
  }

  componentWillUnmount() {
    this.modalRoot.removeChild(this.el);
  }

  render() {
    this.el.style = `
			height: 100vh;
      width: 100%;
			overflow-y: auto;
    `;

    return ReactDOM.createPortal(this.props.children, this.el);
  }
}

InternalDialog.propTypes = {
  children: PropTypes.object.isRequired
};

export default InternalDialog;
