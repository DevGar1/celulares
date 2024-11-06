// eslint-disable-next-line react/prop-types
const Modal = ({ children }) => {
  return (
    <div className="w-full h-screen fixed top-0 left-0 flex justify-center items-center bg-[rgba(0,0,0,0.30)] px-4">
      <div className="min-w-[250px] max-w-[750px] w-full rounded-xl py-4 px-2 bg-white flex flex-col shadow-2xl">
        <h3 className="text-center font-bold text-2xl">Mensaje</h3>
        <div className="pt-3 min-h-56 flex justify-center items-center">{children}</div>
      </div>
    </div>
  );
};

export default Modal;
