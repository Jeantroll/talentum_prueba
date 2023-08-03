"use client"

import { Formik, Field, Form, FormikHelpers } from 'formik';
import axios from 'axios'; // Asegúrate de tener instalado axios
import { useRouter } from 'next/navigation';

interface Values {
  username: string;
  password: string;
}

export default function LoginForm() {
  const router = useRouter()


  const handleSubmit = async (
    values: Values,
    { setSubmitting }: FormikHelpers<Values>
  ) => {
    try {
      const response = await axios.post('http://host.docker.internal:4000/signin', {  // Cambio de URL al puerto 400
        username: values.username,
        password: values.password,
      });

      if (response.status === 200) {
        router.push('/dashboard');
      }

      // Aquí puedes redirigir al usuario o manejar la respuesta según necesites
      console.log('Respuesta del backend:', response.data);
    } catch (error) {
      console.error('Error de inicio de sesión:', error);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Formik
      initialValues={{
        username: '',
        password: '',
      }}
      onSubmit={handleSubmit}
    >
      <Form>
        <Field id="username" name="username" placeholder="Username" />
        <Field type="password" id="password" name="password" placeholder="Password" />
        <button type="submit">Login</button>
      </Form>
    </Formik>
  );
}
