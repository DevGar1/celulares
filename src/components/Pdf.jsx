/* eslint-disable react/prop-types */
import { useEffect, useRef, useState } from "react";
import pdfmake from "pdfmake/build/pdfmake";
import pdfFonts from "pdfmake/build/vfs_fonts";

pdfmake.vfs = pdfFonts.pdfMake.vfs;

const DownloadPDF = ({
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
  estadoOperacion,
}) => {
  console.log("holal");
  const ref = useRef(null);
  useEffect(() => {
    console.log()
    if (!ref.current) return;
    console.log(ref.current.click)
    ref.current.click();
  }, []);

  const generatePDF = () => {
    const docDefinition = {
      content: [
        { text: "Resultados del testing", style: "header" },
        { text: "\n\n" }, // Espacio entre título y tabla
        {
          table: {
            headerRows: 1,
            widths: [
              "*",
              "*",
              "*",
              "*",
              "*",
              "*",
              "*",
              "*",
              "*",
              "*",
              "*",
              "*",
            ],
            body: [
              [
                { text: "Abonado", style: "tableHeader" },
                { text: "Alcaldia", style: "tableHeader" },
                { text: "Banda", style: "tableHeader" },
                { text: "Desbloqueo", style: "tableHeader" },
                { text: "Estado", style: "tableHeader" },
                { text: "LAC", style: "tableHeader" },
                { text: "Marca", style: "tableHeader" },
                { text: "Nombre", style: "tableHeader" },
                { text: "Operador", style: "tableHeader" },
                { text: "Plan", style: "tableHeader" },
                { text: "Servicio", style: "tableHeader" },
                { text: "Estado Operacion", style: "tableHeader" },
              ],
              // Aquí se agregan filas de datos de ejemplo
              [
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
                estadoOperacion,
              ],

              // Agrega más filas según sea necesario
            ],
          },
        },
      ],
      styles: {
        header: {
          fontSize: 18,
          bold: true,
          margin: [0, 0, 0, 10],
        },
        tableHeader: {
          bold: true,
          fontSize: 12,
          color: "white",
          fillColor: "#2f4f4f", // Usando el color primario del usuario
        },
      },
      defaultStyle: {
        fontSize: 10,
      },
    };
    const pdfGenerator = pdfmake.createPdf(docDefinition);
    pdfGenerator.getBlob((blob) => {
      const url = URL.createObjectURL(blob);
      console.log(url)
    //   setUrl(url);
    pdfGenerator.download()

    });
  };

  return (
    <div>
      <button ref={ref} onClick={generatePDF}>
        Descargar PDF
      </button>
    </div>
  );
};

export default DownloadPDF;
