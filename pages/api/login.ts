// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import cookie from 'cookie'

const API_URL = 'http://localhost:3333'

export default async (
  req: NextApiRequest,
  res: NextApiResponse
) => {

  // checking if is a post request
  if (req.method === 'POST') {
    // destructure email, and password
    const { email, password } = req.body

    // Making a post request to hit our backend api-endpoint
    const response = await fetch(`${API_URL}/auth/local/signin`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        email,
        password
      })
    })

    const data = await response.json()

    if (response.ok) {
      // @todo - Set Cookie

      res.setHeader(
        'Set-Cookie',
        cookie.serialize('token', String(data.access_token), { // only access token?
          httpOnly: true,
          secure: process.env.NODE_ENV !== 'development',
          maxAge: 60 * 60 * 24 * 7, // 1 week
          sameSite: 'strict',
          path: '/'
        })
      )

      res.status(200).json({ data })
    } else {
      console.log("fejl");
      res.status(data.statusCode)
    }

  } else {
    console.log("fejl");
    res.setHeader('Allow', ['POST'])
    res.status(405).json({ message: `Method ${req.method} not allowed` })
  }
}