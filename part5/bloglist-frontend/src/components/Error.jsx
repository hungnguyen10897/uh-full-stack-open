const Notification = ({ message }) => {
  const style = {
    backgroundColor: "#ffe6e6",   // light red background
    color: "#cc0000",             // dark red text
    border: "2px solid #cc0000",  // solid red border
    borderRadius: "4px",
    padding: "8px 15px",
    fontFamily: "Arial, sans-serif",
    fontSize: "16px",
    display: "inline-block",
  };

  if (message === null) {
    return null;
  }

  return <div style={style}>{message}</div>;
};

export default Notification;
