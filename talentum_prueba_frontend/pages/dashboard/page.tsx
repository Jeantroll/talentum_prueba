// pages/dashboard.tsx
import { useRouter } from 'next/router';
import { useEffect } from 'react';

const DashboardPage = () => {
  const router = useRouter();

  useEffect(() => {
    // Simulamos una verificación de autenticación
    // Si el usuario no está autenticado, redirigimos a la página de inicio de sesión
    //const isAuthenticated = /* Verificar si el usuario está autenticado */;
    /*if (!isAuthenticated) {
      router.push('/login');
    }*/
  }, []);

  return (
    <div>
      <h1>Bienvenido al dashboard</h1>
      {/* Contenido para usuarios autenticados */}
    </div>
  );
};

export default DashboardPage;
