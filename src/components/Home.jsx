import { useLocation, useNavigate } from "react-router-dom";
import antena from "../assets/image.png";
import phone from "../assets/cell-phone.png";
import Field from "./Field";
import {
  alcaldias,
  antenas,
  codigoEstados,
  estados,
  frecuencia,
  marcas,
  myData,
  operadores,
  paqueteServicio,
  planes,
  seguridad,
  servicios,
} from "../datos";
import { useEffect, useState } from "react";
import Modal from "./Modal";

const options = [
  "Voz",
  "SMS",
  "MMS",
  "Redes",
  "Mensajeria",
  "Video, música",
  "Juegos",
];

const Home = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [isVisible, setIsVisible] = useState(false);
  const [message, setMessage] = useState("");
  const [isHome, setIsHome] = useState(true);
  const [query, setQuery] = useState("");
  const [filteredOptions, setFilteredOptions] = useState([]);

  useEffect(() => {
    if (isVisible) {
      const id = setTimeout(() => {
        setIsVisible(false);
        clearTimeout(id);
      }, 4000);
    }
  }, [isVisible]);

  if (!location.state.nombre) return navigate("/");

  const {
    abonado,
    alcaldia,
    banda,
    desbloqueo,
    estado,
    lac,
    marca,
    nombre,
    operador,
    plan,
    servicio,
  } = location.state;

  const handleOptionClick = (option) => {
    setQuery(option);
    setFilteredOptions([]); // Ocultar las opciones después de seleccionar
  };
  const handleInputChange = (e) => {
    const value = e.target.value;
    setQuery(value);

    // Filtrar las opciones según el texto del input
    const filtered = options.filter((option) =>
      option.toLowerCase().includes(value.toLowerCase())
    );
    setFilteredOptions(filtered);
  };

  if (isVisible) {
    return (
      <Modal>
        <p>{message}</p>
      </Modal>
    );
  }

  console.log(
    operador,
    antenas.gsm.operador,
    Number(operador) === Number(antenas.gsm.operador),
    Number(operador),
    Number(antenas.gsm.operador)
  );

  return (
    <main className=" w-full h-screen flex justify-center items-center px-4  overflow-scroll ">
      <div className="min-w-[250px] max-w-[750px] w-full  rounded-xl py-2  overflow-scroll px-2 bg-white flex flex-col shadow-2xl border-2 border-gray">
        <h2 className="text-center font-bold text-2xl mb-5">
          Bienvenid@ <b>{nombre}</b>
        </h2>
        <div className="flex justify-end">
          <button
            onClick={() => setIsHome((value) => !value)}
            className="cursor-pointer bg-[#3ea6ff] py-1 px-4 rounded-2xl text-white border-[#3ea6ff] border-2 hover:bg-white hover:text-[#3ea6ff] duration-300 active:scale-105 disabled:bg-gray-400 disabled:border-gray-400 disabled:hover:text-white disabled:cursor-not-allowed"
          >
            {isHome ? " Solicitar servicio" : "Ver datos"}
          </button>
        </div>
        <div className="max-h-[642px] min-h-[256px] h-full overflow-scroll">
          {isHome ? (
            <>
              <div className="pl-2 pt-4">
                <p className="text-xl mb-5 flex items-center">
                  Datos de la red:{" "}
                  <img className="inline-block w-10" src={antena} />
                </p>
                <div className="flex gap-10 flex-wrap">
                  <Field titulo={"Compañia"} valor={antenas.gsm.network} />
                  <Field titulo={"MNC"} valor={antenas.gsm.mnc} />
                  <Field titulo={"MCC"} valor={antenas.gsm.mcc} />
                  <Field titulo={"Cell ID"} valor={antenas.gsm.cid} />
                  <Field
                    titulo={"Frecuencia"}
                    valor={`${antenas.gsm.frecuencia} Hz`}
                  />
                  <Field
                    titulo={"Registro"}
                    valor={
                      myData.find((person) => person.abonado === abonado)
                        ? "HLR"
                        : "VLR"
                    }
                  />
                  <Field
                    titulo={"HandOff"}
                    className={
                      operador === antenas.gsm.operador ?   "": "animate-blink"
                    }
                    valor={
                      Number(operador) === Number(antenas.gsm.operador)
                        ? "Sin handoff"
                        : "Handoff de operador"
                    }
                  />
                </div>
              </div>
              <div className="pl-2 pt-4">
                <p className="text-xl mb-5">
                  Estos son tus datos:{" "}
                  <img className="inline-block w-10" src={phone} />
                </p>
                <div className="flex gap-10 flex-wrap">
                  <Field titulo={"abonado"} valor={abonado} />
                  <Field titulo={"plan"} valor={planes[plan]} />
                  <Field titulo={"alcaldia"} valor={alcaldias[alcaldia]} />
                  <Field titulo={"banda"} valor={frecuencia[banda]} />
                  <Field titulo={"desbloqueo"} valor={seguridad[desbloqueo]} />
                  <Field titulo={"estado MS"} valor={estados[estado]} />
                  <Field
                    titulo={"estado "}
                    valor={codigoEstados[abonado.slice(0, 2)] || "Foraneo"}
                  />
                  <Field titulo={"lac"} valor={lac} />
                  <Field titulo={"marca"} valor={marcas[marca]} />
                  <Field titulo={"operador"} valor={operadores[operador]} />
                  <Field titulo={"servicio"} valor={servicios[servicio]} />
                  <Field
                    titulo={"Roaming"}
                    valor={alcaldia === "000" ? "Es roaming" : "Sin roaming"}
                  />
                </div>
              </div>
            </>
          ) : (
            <>
              <div className="relative w-full max-w-sm mx-auto py-4">
                <input
                  type="text"
                  value={query}
                  onChange={handleInputChange}
                  placeholder="Search..."
                  className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                {filteredOptions.length > 0 && (
                  <ul className="absolute w-full bg-white border border-gray-200 rounded-lg mt-1 max-h-60 overflow-y-auto z-10">
                    {filteredOptions.map((option, index) => (
                      <li
                        key={index}
                        onClick={() => handleOptionClick(option)}
                        className="px-4 py-2 cursor-pointer hover:bg-gray-100"
                      >
                        {option}
                      </li>
                    ))}
                  </ul>
                )}
                <div className="mt-6">
                  <button
                    onClick={() => {
                      const isValid =
                        Number(paqueteServicio[query]) === Number(plan);
                      setMessage(
                        isValid
                          ? "Servicio obtenido de manera correcta"
                          : "El plan actual no permite este servicio"
                      );
                      setIsVisible(true);
                    }}
                    className="cursor-pointer bg-[#3ea6ff] py-1 px-4 rounded-2xl text-white border-[#3ea6ff] border-2 hover:bg-white hover:text-[#3ea6ff] duration-300 active:scale-105 disabled:bg-gray-400 disabled:border-gray-400 disabled:hover:text-white disabled:cursor-not-allowed"
                    disabled={!query || query === ""}
                  >
                    Solicitar
                  </button>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </main>
  );
};

export default Home;
