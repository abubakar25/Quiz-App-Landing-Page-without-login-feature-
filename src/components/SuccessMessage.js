const SuccessMessage = ({ children }) => {
  return (
    <div
      style={{
        width: "98.5%",
        padding: 10,
        marginBottom: 10,
        borderRadius: 4,
        backgroundColor: "green",
        textAlign: "center",
        color: "white",
        textTransform: "capitalize",
      }}
    >
      {children}
    </div>
  );
};

export default SuccessMessage;
