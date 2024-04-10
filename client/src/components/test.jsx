import React, { useState } from 'react';
import './LoginDetailsCard.scss';

const LoginDetailsCard = () => {
  const [text, setText] = useState('');

  const inputHandler = (event) => {
    setText(event.target.value);
  };

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(text);
      alert('Text copied to clipboard!');
    } catch (error) {
      alert('Error copying to clipboard: ' + error.message);
    }
  };

  return (
    <div className="card-container">
      <div className="card-wrapper">
        <h1>Seller Sign In Details</h1>
        <table>
          <tr>
            <td><label htmlFor="user">Username:</label></td>
            <td><input id="user" type="text" value="John Maverick" readOnly /></td>
            <td><button onClick={copyToClipboard}>Copy</button></td>
          </tr>
          <tr>
            <td><label htmlFor="password">Password:</label></td>
            <td><input id="password" type="password" value="DummySellerSignin#2458" readOnly /></td>
            <td><button onClick={copyToClipboard}>Copy</button></td>
          </tr>
        </table>
      </div>
    </div>
  );
};

export default LoginDetailsCard;
