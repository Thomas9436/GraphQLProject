import { motion } from 'framer-motion';
import { useState } from 'react';
import { Link, useNavigate } from 'react-router';

import { useMutation } from '@apollo/client';
import { toast } from 'sonner';

import {gql} from "../gql/gql"

const SIGNIN_MUTATION = gql(`
  mutation SignIn($username: String!, $password: String!) {
    signIn(username: $username, password: $password) {
      code
      message
      success
      token
    }
  }
`)
  
function Login() {
    const navigate = useNavigate();
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    
    const [signIn, { loading }] = useMutation(
        SIGNIN_MUTATION,
        {
          onCompleted: (data) => {
            const response = data.signIn;
            console.log(data)
            if (response?.token && response?.success) {
              // Stocker le token dans le localStorage
              toast.success("Vous êtes connecté !")
              localStorage.setItem('token', response.token);
              // Rediriger l'utilisateur vers la page d'accueil
              navigate('/');
            } else {
              toast.error("Erreur lors de la connexion")
            }
          },
          onError: (error) => {
            toast.error("Erreur lors de la connexion")
          },
        }
      );

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        await signIn({ variables: { username, password } });
    };


  return (
    <motion.div initial={{ opacity: 0, x: -50 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 50 }} transition={{ duration: 0.5 }} className='login-page d-flex justify-content-center align-items-center px-4'>
        <div className='login-wild-section d-flex gap-2'>
            <div className='login-left-section rounded shadow'></div>
            <div className='login-right-section rounded shadow p-3 d-flex flex-column justify-content-center gap-5'>
                
                <div className='d-flex flex-column justify-content-center align-items-center'>
                    <h1 className='fw-bold p-0 m-0'>Se connecter</h1>
                    <p className='m-0 p-0'>Content de vous revoir !!!</p>
                </div>
                <form onSubmit={handleSubmit}>
                      <div className="mb-3">
                          <label htmlFor="exampleInputEmail1" className="form-label">Nom d'utilisateur</label>
                          <input type="text" className="form-control fw-bold fs-5" id="exampleInputEmail1" name='username' required value={username} onChange={(e)=>setUsername(e.target.value)} />
                      </div>
                      <div className="mb-3">
                          <label htmlFor="exampleInputPassword1" className="form-label">Mot de passe</label>
                          <input type="password" className="form-control fw-bold fs-5" id="exampleInputPassword1" required value={password} onChange={(e)=>setPassword(e.target.value)}/>
                      </div>
                      <div className="mb-3 mt-3">
                            <p className="text-center redirect">
                                Vous n'avez pas de compte ? &nbsp;
                                <Link className="text-danger" to={"/register"}>
                                Inscrivez-vous.
                                </Link>
                            </p>
                        </div>

                      <div className='d-flex justify-content-center mt-4'>
                        <button type="submit" className="btn-submit rounded" disabled={loading}>Se connecter 
                        {
                            (!loading)?
                            <i className="fa-solid fa-right-to-bracket"></i>
                            :
                            <div className="spinner-border" style={{width:"1.5rem", height: "1.5rem"}} role="status">
                                <span className="visually-hidden">Loading...</span>
                            </div>
                        }
                        </button>
                      </div>
                  </form>
            </div>
        </div>

    </motion.div>
  )
}

export default Login