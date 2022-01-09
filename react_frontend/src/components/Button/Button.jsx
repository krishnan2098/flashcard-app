import './Button.css';

const Button = (props) => {
  return (
    <button style={props.style} disabled={props.disabled} hidden={props.setValue === -1 ? 'hidden' : null} className={props.className + " btn"} onClick={props.onClick}>{props.children}</button>
  );
};

export default Button