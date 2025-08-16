import  express from "express"
import  cors from "cors"
import dotenv from 'dotenv';
import userRoute from "./src/api/routes/user_route";
import { AuthMiddleware } from "./src/api/middlewares/auth_middleware";
import { AuthService } from "./src/core/infrastructure/service/auth_service";
import { IAuthService } from "./src/core/usecase/interface/services/auth_service";


const app = express();
const port = process.env.port;
dotenv.config();

app.use(express.json());
app.use(cors());
let auth: IAuthService= new AuthService()
let authmiddleware  = new AuthMiddleware(auth)
app.use("/user", userRoute)

app.get('/',authmiddleware.authenticateJWT, (req, res) => {
  res.send('Congrats you just passed the Auth middleware test');

});


  

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});

