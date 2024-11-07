import * as Yup from "yup";

export const paymentValues = [
  { value: 1, name: "Renta" },
  { value: 2, name: "Amigo" },
  { value: 3, name: "Renta" },
];

export const passwordValues = [
  { value: 1, name: "Huella" },
  { value: 2, name: "Patrón" },
  { value: 3, name: "Rostro" },
  { value: 4, name: "PIN" },
];

export const loginSchema = Yup.object().shape({
  phone: Yup.string()
    .matches(/^\d{10}$/, "El número debe tener exactamente 10 dígitos")
    .required("Dato requerido"),
  // payment: Yup.number()
  //   .oneOf(paymentValues.map((item) => item.value))
  //   .required("Dato requerido"),
  // password: Yup.number()
  //   .oneOf(passwordValues.map((item) => item.value))
  //   .required("Dato requerido"),
});
