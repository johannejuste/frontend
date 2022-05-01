import Link from "next/link"
import { SyntheticEvent, useContext, useState } from "react"
import AuthContext from "../context/AuthContext";


export default function LoginPage() {
  const { login, error, user, isLoading } = useContext(AuthContext)
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLoginSubmit = async (e: SyntheticEvent) => {
    console.log("handleLoginSubmit");
    e.preventDefault();
    login({ email, password })
  }

  return (
    <>
      <section >
        <div>
          <div >
            <div >
              <h3 >Sign in your account</h3>
              <p >
                Don&apos;t have an account?{' '}
                <Link href='/signup'>
                  <a>Sign up now</a>
                </Link>
              </p>
            </div>

            <form
              onSubmit={handleLoginSubmit}
            >

              {user && <div>success</div>}
              {error && <div>{error}</div>}
              <div>
                <div>
                  <label>Email</label>
                  <input
                    aria-label='Email'
                    name='email'
                    type='email'
                    placeholder='Email'
                    required={true}
                    onChange={(event) => {
                      setEmail(event.target.value);
                    }}
                  />
                </div>
                <div >
                  <label>Password</label>
                  <input
                    aria-label='Password'
                    required={true}
                    name='password'
                    type='password'
                    placeholder='Password'
                    onChange={(event) => {
                      setPassword(event.target.value);
                    }}
                  />
                </div>
              </div>
              <div className='mt-6'>
                <button
                  type='submit'
                >Log In</button>

              </div>
            </form>
          </div>
        </div>
      </section>
    </>
  )
}