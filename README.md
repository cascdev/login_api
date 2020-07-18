# Simples API CRUD Node + Login
Api para Login e proteção de rotas com Middleware com exemplo de CRUD de usuários.

Este código fornece uma API Node com MongoDB de exemplo, implementado CRUD de usuário.

Para executá-la, deve-se ter instalado o mongodb e o node em suas atuais versões.

A) Após se certificar que têm os resquisitos acima: baixe e descomprima a api, em seguida, vá até a pasta onde se encontra o arquivo package.json, abra um bash ou prompt e digite:
```
npm install
```

B) Abra outra instância do bash e rode o mongo, executando o comando abaixo:
```
mongod
```

C) Agora, no mesmo lugar onde digitou o primeiro comando digite:
```
nodemon
```
ou
```
node app
```
###Pronto!! Nossa API está pronta para ser testada!

# Documentação da API com Postman - Aqui vc encontra exemplos de usos da API.
[CLICK AQUI, para ir a Documentação desta API e aprenda como ela funciona.](https://documenter.getpostman.com/view/10466579/T1DjjK5P?version=latest) 
Acho que ficou legal e simples. Vai lá e [confira](https://documenter.getpostman.com/view/10466579/T1DjjK5P?version=latest) 

#Passos para uso da API - Pequena Documentação ;-)

0) Renomeie o arquivo `.env.example` para `.env`, Ele se encontra na raiz da nossa aplicação.

1) Crie um usuário passando, no Body nome, email, password, img, role (USER_ROLE ou ADMIN_ROLE);
    - Rota (POST) em, localhost:3030/api/usuarios/   (Postman)        


2) OBTENHA um TOKEN para poder usar os recursos das demais rotas, que se encontram 'Potegidas';
    - Rota (POST) em, localhost:3030/api/usuarios/login   passar: { email e password}  no Body (Postman)
    - Obs: O usuário deve existir no banco dados, caso  contrário, faça o passo acima!


Nota:
    i) Nas ROTAS PROTEGIDAS: Passar o TOKEN (Obtido no passo acima) no 'Headers', adcionando seu valor a um ítem chamado: 'x-access-token'. (Mais informações vide) [DOCUMETAÇÃO](https://documenter.getpostman.com/view/10466579/T1DjjK5P?version=latest) dessa API.

Exemplo:
Listar todos os usuários cadastrados,criados ou existentes no banco de dados:
 - Na Rota (GET) em, localhost:3030/api/usuarios/   { passar o ítem 'i' acima}



