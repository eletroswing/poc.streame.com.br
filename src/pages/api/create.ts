import type { NextApiRequest, NextApiResponse } from "next";
import { z } from "zod";

import prisma from './../../../lib/prisma';

const BodySchema = z.object({
    email: z.string().nonempty('O email precisa ser passado no body').email("O campo email precisa ser do tipo email"),
});

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<any>
) {
  if (req.method === "POST") {
    const validateBody: any = BodySchema.safeParse(req.body)
    if(!validateBody.success) return res.status(400).json(JSON.parse(validateBody.error.message))
    
    //verify if already exists
    const UserInDb = await prisma.beta.findUnique({
        where: {
           email: req.body.email
        }
    })

    if(UserInDb && UserInDb.active) return res.status(406).json({message: 'O úsuario já está em nosso sistema.'})

    //exists, but is inactive
    if(UserInDb && !UserInDb.active) {
        let user = await prisma.beta.update({
            where: {
                email: req.body.email
            },
            data: {
                active: true
            }
        }) 
        return res.status(201).json(user)
    }

    //dont exists
    let user = await prisma.beta.create({
        data: {
            email: req.body.email
        }
    }) 
    return res.status(201).json(user)
  } else {
    return res.status(405).json({message: 'This method doest allowed on this route.'})
  }
}
