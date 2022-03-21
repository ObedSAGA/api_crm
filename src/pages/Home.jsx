import {useState, useEffect} from 'react'
import Client from '../components/Client';

const Home = () => {
  const [clients, setClients] = useState([]);
  useEffect(() => {
    const getClientsAPI = async () => {
      try {
        const url = import.meta.VITE_API_URL
        const request = await fetch(url)

        const response = await request.json()
        setClients(response);
      } catch (error) {
        console.log(error);
      }
    }
    getClientsAPI()
  }, []);

  const handleDelete = async (id) => {
    const inputConfirm = confirm('¿Deseas eliminar este cliente?');
    if (inputConfirm) {
      try {
        const url = `${import.meta.VITE_API_URL}/${id}`;
        const response = await fetch(url, {
          method: 'DELETE'
        })
        await response.json();

        const arrayClients = clients.filter(client => client.id !== id)
        setClients(arrayClients);
      } catch (error) {
        console.log(error);
      }
    }
  }

  return (
    <>
      <h1 className="font-black text-4xl text-blue-900">Clientes</h1>
      <p className="mt-3">Administra tus clientes</p>


      <table className="w-full mt-5 table-auto shadow bg-white">
        <thead className="bg-blue-800 text-white">
          <tr>
            <th className="p-2">Nombre</th>
            <th className="p-2">Contacto</th>
            <th className="p-2">Empresa</th>
            <th className="p-2">Acciones</th>
          </tr>
        </thead>
        <tbody>
          {clients.map(client => (
            <Client
              key={client.id}
              client={client}
              handleDelete={handleDelete}
            />
          ))}
        </tbody>

      </table>
    </>
  )
}

export default Home
