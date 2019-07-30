import axios from "axios";

const api = axios.create({ //cria uma instância da URL base da nossa API, assim não precisamos instânciar todo o link sempre que vamos enviar uma requisição
  baseURL: "http://5c4b2a47aa8ee500142b4887.mockapi.io/api/v1/"
});

export default api;