import { useEffect } from 'react';
import './Button.css';

const Button = (props) => {
  useEffect(() => {
    console.log("Draw Button Mounted")
  }, [])

  // function setAction() {
  //   if (props.setAction) {
  //     console.log(props.setValue)
  //     props.setAction(props.setValue)
  //   }
  // }

  return (
    <button style={props.style} disabled={props.setValue === -1 ? 'disabled' : null} className="btn" onClick={props.onClick}>{props.children}</button>
  );
};

export default Button