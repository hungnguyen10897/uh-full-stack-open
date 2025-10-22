const Notification = ({ message }) => {
  const style = {
    backgroundColor: "#d9d9d9",
    color: "#006400",
    border: "2px solid #008000",
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
