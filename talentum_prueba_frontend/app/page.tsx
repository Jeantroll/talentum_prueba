import Image from 'next/image'
import styles from './page.module.css'
import LoginForm from './components/loginForm';

export default function Home() {
  return (
    <div>
    <h1>Iniciar sesión</h1>
      <main className="vh-100 d-flex justify-content-center align-items-center">
        <LoginForm/>
      </main>
  </div>

  )
}
