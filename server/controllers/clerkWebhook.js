// controllers/clerkWebhook.js
import { Webhook } from "svix";
import User from "../models/User.js";

const clerkWebhooks = async (req, res) => {
  try {
    /* 2️⃣: use the **webhook signing secret** (starts with `whsec_`) */
    const whook = new Webhook(process.env.CLERK_WEBHOOK_SECRET);

    /* 3️⃣: forward headers exactly as received */
    const headers = {
      "svix-id": req.headers["svix-id"],
      "svix-timestamp": req.headers["svix-timestamp"],
      "svix-signature": req.headers["svix-signature"],
    };

    /* 4️⃣: verify with the RAW body captured earlier */
    await whook.verify(JSON.stringify(req.body()), headers);

    const { data, type} = req.body; // payload is already parsed JSON

    const userData = {
      _id: data.id,
      username: data.first_name + " " + data.last_name,
      email: data.email_addresses[0].email_address,
      image: data.image_url,
    };

    switch (type) {
      case "user.created":{
        await User.create(userData);
        break;
      }
      case "user.updated":{
        await User.findByIdAndUpdate(data.id, userData);
        break;
      }
      case "user.deleted":{
        await User.findByIdAndDelete(data.id);
        break;
      }
      default: break;
       
    }

    res.json({ received: true });
  } catch (err) {
    console.error("Webhook verification failed:", err.message);
    res.json({ received: false , msg: err.message});
  }
};

export default clerkWebhooks;
