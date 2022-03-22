import { Formik, Form, Field } from "formik";
import { useNavigate } from "react-router-dom";
import * as Yup from "yup";
import Alerta from "./Alerta";
import Spinner from "./Spinner";

const FormNew = ({ client, loading }) => {

  const navigate = useNavigate();

  const newClientSchema = Yup.object().shape({
    nombre: Yup.string()
               .min(3, "El nombre es muy corto")
               .max(40, "El nombre es muy largo")
               .required("Campo obligatorio"),
    empresa: Yup.string().required("Campo obligatorio"),
    email: Yup.string().email("Email no válido").required("Campo obligatorio"),
    tel: Yup.number()
            .integer("Número de teléfono no válido")
            .positive("Número de teléfono no válido")
            .typeError("Número de teléfono no válido"),
  });

  const handleSubmit = async(values) => {
    try {
      let response;
      if (client.id) {
        //EDITANDO
        const url = `${import.meta.env.VITE_API_URL}/${client.id}`;
        response = await fetch(url, {
          method: "PUT",
          body: JSON.stringify(values),
          headers: {
            "Content-Type": "application/json",
          }
        })

      } else {
        //NUEVO CLIENTE
        const url = import.meta.env.VITE_API_URL

        response = await fetch(url, {
          method: "POST",
          body: JSON.stringify(values),
          headers: {
            "Content-Type": "application/json",
          }
        })
      }
      await response.json();
      navigate('/');

    } catch (error) {
      console.log(error);
    }
  };

  return loading ? (
    <Spinner />
  ) : (
    <div className="bg-white mt-10 px-5 py-10 rounded-md shadow-xl md:w-3/4 mx-auto">
      <h1 className="text-gray-600 font-bold text-xl uppercase text-center">
        {client?.nombre ? "Editar Cliente" : "Agregar Cliente"}
      </h1>
      <Formik
        initialValues={{
          nombre: client?.nombre ?? "",
          empresa: client?.empresa ?? "",
          email: client?.email ?? "",
          tel: client?.tel ?? "",
          notas: client?.notas ?? "",
        }}
        enableReinitialize={true}
        onSubmit={async (values, { resetForm }) => {
          await handleSubmit(values);

          resetForm();
        }}
        validationSchema={newClientSchema}
      >
        {({ errors, touched }) => {
          return (
            <Form className="mt-10">
              <div className="mb-4">
                <label className="text-gray-800" htmlFor="nombre">
                  Nombre:
                </label>
                <Field
                  id="nombre"
                  type="text"
                  className="mt-2 block w-full p-3 bg-gray-50"
                  placeholder="Nombre del cliente"
                  name="nombre"
                />
                {errors.nombre && touched.nombre ? (
                  <Alerta>{errors.nombre}</Alerta>
                ) : null}
              </div>
              <div className="mb-4">
                <label className="text-gray-800" htmlFor="empresa">
                  Empresa:
                </label>
                <Field
                  id="empresa"
                  type="text"
                  className="mt-2 block w-full p-3 bg-gray-50"
                  placeholder="Empresa del cliente"
                  name="empresa"
                />
                {errors.empresa && touched.empresa ? (
                  <Alerta>{errors.empresa}</Alerta>
                ) : null}
              </div>
              <div className="mb-4">
                <label className="text-gray-800" htmlFor="email">
                  Email:
                </label>
                <Field
                  id="email"
                  type="email"
                  className="mt-2 block w-full p-3 bg-gray-50"
                  placeholder="Correo electrónico"
                  name="email"
                />
                {errors.email && touched.email ? (
                  <Alerta>{errors.email}</Alerta>
                ) : null}
              </div>
              <div className="mb-4">
                <label className="text-gray-800" htmlFor="telefono">
                  Teléfono:
                </label>
                <Field
                  id="telefono"
                  type="tel"
                  className="mt-2 block w-full p-3 bg-gray-50"
                  placeholder="Número de contacto"
                  name="tel"
                />
                {errors.tel && touched.tel ? (
                  <Alerta>{errors.tel}</Alerta>
                ) : null}
              </div>
              <div className="mb-4">
                <label className="text-gray-800" htmlFor="notas">
                  Notas:
                </label>
                <Field
                  as="textarea"
                  id="notas"
                  type="tel"
                  className="mt-2 block w-full p-3 bg-gray-50 h-40"
                  placeholder="Obsevaciones"
                  name="notas"
                />
              </div>

              <input
                type="submit"
                value={client?.nombre ? "Guardar cambios" : "Agregar Cliente"}
                className="mt-5 w-full bg-blue-800 p-3 text-white uppercase font-bold text-lg cursor-pointer"
              />
            </Form>
          );
        }}
      </Formik>
    </div>
  );
};

FormNew.defaultProps = {
  client: {},
  loading: false,
};

export default FormNew;
