import React from 'react';
import PropTypes from 'prop-types';
import Collapse from '@material-ui/core/Collapse';
import { useSpring, animated } from 'react-spring/web.cjs';

const CollapseAnimated = (props) => {
  const style = useSpring({
    from: { opacity: 0, transform: 'translate3d(20px,0,0)' },
    to: {
      opacity: props.in ? 1 : 0,
      transform: `translate3d(${props.in ? 0 : 20}px,0,0)`
    }
  });

  return (
    <animated.div style={style}>
      <Collapse {...props} />
    </animated.div>
  );
};

CollapseAnimated.propTypes = {
  in: PropTypes.bool
};

export { CollapseAnimated };
