import cookie from 'cookie'
import { NextApiRequest, NextApiResponse } from 'next'

const API_URL = 'http://localhost:3333' // TO DO

export default async (
    req: NextApiRequest,
    res: NextApiResponse
) => {
    if (req.method === 'GET') {
        if (!req.headers.cookie) {
            console.log('Not Authorized');
            res.status(403).json({ message: 'Not Authorized' })
            return
        }

        const { token } = cookie.parse(req.headers.cookie)

        const response = await fetch(`${API_URL}/user/profile`, {
            method: 'GET',
            headers: {
                Authorization: `Bearer ${token}`
            }
        })

        const user = await response.json()

        if (response.ok) {
            res.status(200).json({ user })
        } else {
            console.log('User forbidden');

            res.status(403).json({ message: 'User forbidden' })
        }
    } else {
        res.setHeader('Allow', ['POST'])
        res.status(405).json({ message: `Method ${req.method} not allowed` })
    }
}