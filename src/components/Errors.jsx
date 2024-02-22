const Errors = (props) => {
  const { errors } = props;

  return (
    <>
      <h2>Errors:</h2>
      <ul>
        {errors.map((error) => (
          <li className="error">{error}</li>
        ))}
      </ul>
    </>
  );
};

export default Errors;
