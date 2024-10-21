import { AppDataSource } from "./config/data-source";
import { PORT } from "./config/envs"
import server from "./server";
import "reflect-metadata"


AppDataSource.initialize()
    .then( () => {
				console.log("DB connected successfully ");

				server.listen(PORT, () => {
					console.log(`Server listen on port: ${PORT}`);
				})
		})
		.catch((error) => {
					console.log("Error to connect", error);
		})


