import { Component } from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';

const modalRoot = document.getElementById('modal-root');

class CalendarDialog extends Component {
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
    let bg = this.props.background || 'rgba(0,0,0, 0.76)';

    this.el.style = `
      width: 100%;
      height: 100%;
      // margin: auto;
      // width: 50%;
      // // border: 3px solid green;
      // padding: 10px;
    `;

    return ReactDOM.createPortal(this.props.children, this.el);
  }
}

CalendarDialog.propTypes = {
  children: PropTypes.object.isRequired
};

export default CalendarDialog;
