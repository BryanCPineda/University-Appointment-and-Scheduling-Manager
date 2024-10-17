import { PORT } from "./config/envs"
import server from "./server";


server.listen(PORT, () => {
    console.log(`Server listen on port: ${PORT}`);
})

