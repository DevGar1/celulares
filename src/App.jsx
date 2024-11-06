import { useNavigate } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import { loginSchema, passwordValues, paymentValues } from "../validations";
import { Formik, Form, Field } from "formik";
import Input from "./components/Input";
import Modal from "./components/Modal";
import { personas } from "./datos";
import "./App.css";

function App() {
  const [isVisible, setIsVisible] = useState(false);
  const [message, setMessage] = useState("");
  const navigation = useNavigate();
  const count = useRef(0);
  const isCorrect = useRef(false);

  useEffect(() => {
    console.log(isVisible, count.current);
    if (isVisible && count.current < 2) {
      const id = setTimeout(() => {
        setIsVisible(false);
        clearTimeout(id);
        if (isCorrect.current) {
          navigation("/home", {

            state: {
              isCorrect: true,
              id: 1,
              ...isCorrect.current
            }
          });
        }
        console.log("pasa");
      }, 2000);
    }
    if (isVisible && count.current === 2) {
      setMessage(
        "Debido a error en los datos ingresados y/o esta en la lista de EIR como robado o clonado"
      );
    }
  }, [isVisible, navigation]);

  const addError = () => {
    count.current++;
  };

  if (isVisible) {
    return (
      <Modal>
        <p>{message}</p>
      </Modal>
    );
  }
  return (
    <main className=" w-full h-screen flex justify-center items-center px-4 py-8">
      <div className="min-w-[250px] max-w-[750px] w-full rounded-xl py-8 px-4 bg-white flex flex-col shadow-2xl border-2 border-gray">
        <h2 className="text-center font-bold text-2xl">Inicio de sesión</h2>
        <Formik
          initialValues={{ phone: "", payment: 1, password: 1 }}
          validationSchema={loginSchema}
          onSubmit={(values) => {
            const person = personas.find((person) => {
              return (
                String(person.abonado) == String(values.phone) &&
                Number(person.plan) === Number(values.payment) &&
                Number(person.desbloqueo) === Number(values.password) 
              );
            });
            addError();
            setIsVisible(true);
            isCorrect.current = person;
            if (
              person &&
              (person.estado === "010" || person.estado === "011")
            ) {
              setMessage(
                "Debido a error en los datos ingresados y/o esta en la lista de EIR como robado o clonado"
              );
            }

            setMessage(
              person
                ? "Conexión establecida, redirigiendo...."
                : "Error de credenciales, verificar datos"
            );
          }}
        >
          {({ errors, touched, dirty }) => (
            <Form className=" w-full h-full min-w-[250px] pt-2 ">
              <Input
                title={"Teléfono"}
                isInvalid={errors.phone && touched.phone}
                errorMessage={errors.phone}
              >
                <Field
                  name="phone"
                  className="bg-gray-100 rounded-xl border-2 px-4 py-1"
                  type="number"
                />
              </Input>
              <Input
                title={"Información de pago"}
                isInvalid={errors.payment}
                errorMessage={errors.payment}
              >
                <Field
                  name="payment"
                  className="bg-gray-100 rounded-xl border-2 px-4 py-1"
                  as="select"
                >
                  {paymentValues.map((item) => (
                    <option
                      key={item.value}
                      value={item.value}
                      label={item.name}
                    />
                  ))}
                </Field>
              </Input>
              <Input
                title={"Tipo contraseña"}
                isInvalid={errors.password}
                errorMessage={errors.password}
              >
                <Field
                  name="password"
                  className="bg-gray-100 rounded-xl border-2 px-4 py-1"
                  as="select"
                >
                  {passwordValues.map((item) => (
                    <option
                      key={item.value}
                      value={item.value}
                      label={item.name}
                    />
                  ))}
                </Field>
              </Input>

              <button
                className="cursor-pointer bg-[#3ea6ff] py-2 px-4 rounded-2xl text-white border-[#3ea6ff] border-2 hover:bg-white hover:text-[#3ea6ff] duration-300 active:scale-105 disabled:bg-gray-400 disabled:border-gray-400 disabled:hover:text-white disabled:cursor-not-allowed"
                disabled={Object.values(errors).length !== 0 || !dirty}
                type="submit"
              >
                Iniciar sesión
              </button>
            </Form>
          )}
        </Formik>
      </div>
    </main>
  );
}

export default App;
