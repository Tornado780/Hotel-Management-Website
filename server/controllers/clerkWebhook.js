import User from "../models/User.js";
import { Webhook } from "svix";
const clerkWebhooks = async (req, res)=>{
    try {
           // Create a Svix instance with clerk webhook secret.
            const whook = new Webhook(process.env.CLERK_WEBHOOK_KEY);
            // Getting Headers
            const headers = {
            "svix-id": req.headers["svix-id"],
            "svix-timestamp": req.headers["svix-timestamp"],
            "svix-signature": req.headers["svix-signature"],
            };
            // Verify the payload
            const payload = await whook.verify(JSON.stringify(req.body), headers);
            const { data,type } = req.body;
            const userData ={
                _id: data.id,
                username: data.first_name + " " + data.last_name,
                email: data.email_addresses[0].email_address,
                image: data.image_url,
            }

            switch(type){
                case "user.created":
                    console.log("hey i am in user")
                    await User.create(userData);
                    break;
                case "user.updated":
                    await User.findByIdAndUpdate(data.id, userData)
                    break;
                case "user.deleted":
                    await User.findByIdAndDelete(data.id );
                    break;

                default:
                    break;
                
            }
            res.json({success: true, msg: "webhook verified"});

    } catch (error) {
        console.log(error);
        res.json({success: false, msg: "webhook not verified"});
    }
}

export default clerkWebhooks