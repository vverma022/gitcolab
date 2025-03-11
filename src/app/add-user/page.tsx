import { auth, clerkClient } from '@clerk/nextjs/server'
import { notFound, redirect } from 'next/navigation'; 
import { db } from '@/server/db';

const AddUser = async() => {
    const { userId } = await auth();
    if(!userId) {
        throw new Error('User Not Found')
    }

    const client = await clerkClient();
    const user = await client.users.getUser(userId);
    if(!user.emailAddresses[0]?.emailAddress){
        return notFound()
    }

    await db.user.upsert({
    where: {
        emailAddresses: user.emailAddresses[0].emailAddress
    },
    update: {
        imageUrl: user.imageUrl,
        firstName: user.firstName,
        lastName: user.lastName,

    },
    create: {
        id: userId,
        emailAddresses: user.emailAddresses[0].emailAddress,
        imageUrl: user.imageUrl,
        firstName: user.firstName,
        lastName: user.lastName
    },
    })

 return redirect('/dashboard')
}

export default AddUser