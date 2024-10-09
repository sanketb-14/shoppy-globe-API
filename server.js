import connectDB from "./db/config.js";
import app from "./app.js";

// Set the port for the server, using the environment variable if available, otherwise defaulting to 4000
const port = process.env.PORT || 4000;

connectDB();

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});

