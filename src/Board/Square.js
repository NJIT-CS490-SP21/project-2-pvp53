function Square( { item, onClickButton } ){
    const i = item;
    const eventLis = onClickButton;
    return (
        <div class = "box" onClick = {(evLis) => eventLis(evLis)}> {i}</div>
    );
}

export default Square;