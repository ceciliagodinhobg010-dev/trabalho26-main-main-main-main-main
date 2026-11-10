import dns from "node:dns";
dns.setServers(["8.8.8.8", "1.1.1.1"]);
import mongoose from "mongoose";
//const url = "mongodb+srv://marcelosiedler:ifsul@ifsul.fify4.mongodb.net/"
const url = "mongodb+srv://aluno:123@cluster0.42p2azv.mongodb.net/?appName=Cluster0"
const conexao = await mongoose.connect(url)

export default conexao