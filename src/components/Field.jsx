// eslint-disable-next-line react/prop-types
const Field = ({ titulo, valor, className }) => {
  return (
    <div className={`w-20 ${className}`}>
      <p className="h-12">
        <b>{titulo}: </b>
      </p>
      <p>{valor}</p>

    </div>
  );
};

export default Field;
