import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import FormNew from "../components/FormNew";

const UpdateClient = () => {

  const [client, setClient] = useState({});
  const [loading, setLoading] = useState(true);

  const { id } = useParams();

  useEffect(() => {
    const getCLientAPI = async () => {
      try {
        const url = `${import.meta.env.VITE_API_URL}/${id}`;
        const resp = await fetch(url);
        const body = await resp.json();
        setClient(body);
      } catch (error) {
        console.log(error);
      }
        setLoading(false);
    };
    getCLientAPI(!loading);
  }, []);

  return (
    <>
      <h1 className="font-black text-4xl text-blue-900">Editar Cliente</h1>
      <p className="mt-3">Utiliza el siguiente formulario para editar la información del cliente</p>
      
      {client?.nombre ? (
        <FormNew
          client={client}
          loading={loading}
        />
      ) : <p className="mt-3">Cliente ID no válido</p>}
    </>
  )
}

export default UpdateClient
