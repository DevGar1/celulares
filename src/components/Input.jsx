
// eslint-disable-next-line react/prop-types
const Input = ({ children, title, isInvalid, errorMessage }) => {
  return (
    <div className="my-2 flex flex-col h-24">
      <label className="text-gray-700 font-bold mb-2" htmlFor={title}>
        {title}:
      </label>
      {children}
      {isInvalid && (
        <div className="pl-2">
          <p className=" text-red-600 text-xs mt-2">{errorMessage}</p>
        </div>
      )}
    </div>
 
  );
};

export default Input;
