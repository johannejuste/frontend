import cookie from 'cookie'
import { NextApiRequest, NextApiResponse } from 'next'

export default async (
    req: NextApiRequest,
    res: NextApiResponse
) => {

    console.log("Vi var her");

    if (req.method === 'GET') { // TO DO MÅSKE LAVES OM
        // DESTROY COOKIE
        res.setHeader(
            'Set-Cookie',
            cookie.serialize('token', '', {
                httpOnly: true,
                secure: process.env.NODE_ENV !== 'development',
                expires: new Date(0),
                sameSite: 'strict',
                path: '/'
            })
        )

        // TO DO - CONNECT WITH BACKEND // delete refresh hash??

        res.status(200).json({ message: "logout Success" })

    } else {
        res.setHeader('Allow', ['POST'])
        res.status(405).json({ message: `Method ${req.method} not allowed` })
    }
}