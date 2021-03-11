import { React } from 'react';
import PropTypes from 'prop-types';

function Square({ item, onClickButton }) {
  const i = item;
  const eventLis = onClickButton;
  return (
    <div role="button" tabIndex="-1" className="box" onClick={(evLis) => eventLis(evLis)} onKeyDown={(evLis) => eventLis(evLis)}>
      {i}
    </div>
  );
}

Square.propTypes = {
  item: PropTypes.string.isRequired,
  onClickButton: PropTypes.func.isRequired,
};

export default Square;
