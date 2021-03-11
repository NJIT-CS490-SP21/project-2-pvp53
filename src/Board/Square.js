import { React } from 'react';

function Square({ item, onClickButton }) {
  const i = item;
  const eventLis = onClickButton;
  return (
    <div role="button" tabIndex="-1" className="box" onClick={(evLis) => eventLis(evLis)} onKeyDown={(evLis) => eventLis(evLis)}>
      {i}
    </div>
  );
}

export default Square;
