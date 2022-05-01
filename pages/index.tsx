import Router from "next/router";
import { useContext, useEffect } from "react"
import AuthContext from "../context/AuthContext"

export default function Page() {

  const { userTokens } = useContext(AuthContext)

  useEffect(() => {
    // checks if the user is authenticated
    userTokens
      ? Router.push("/")
      : Router.push("/login");
  }, []);

  return (
    <>
      <main className="dashboard">
        < h1 > User Dashboard</h1 >
      </main >

    </>
  )
}