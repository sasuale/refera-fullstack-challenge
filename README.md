# Refera - Fullstack Code Challenge

## Instruções

As decisões arquitectónicas para este sistema foram de 4 camadas, onde teremos um servidor web, um servidor de aplicação e um servidor de base de dados; e os clientes precisarão simplesmente de um browser para aceder à aplicação. Os padrões de design para este sistema foram através de Prototipagem.

Para executar a aplicação em modo de desenvolvimento precisamos de ter um servidor web (LAMP), uma vez que precisamos de um servidor FTP, HTTP e Base de Dados. Uma vez que o LAMP esteja instalado, teremos todos estes serviços. Precisamos de um gestor de pacotes ao nível da aplicação para a linguagem de programação PHP, neste caso o Composer para poder ter o nosso backend operacional e um gestor de pacotes para a linguagem de programação JavaScript, neste caso o NPM para poder ter o nosso frontend operacional. 

Para o nosso projecto backend temos de executar o comando ``` composer update ``` para actualizar todas as dependências instaladas, depois disso temos de actualizar os dados da base de dados no ficheiro .env, depois disso podemos executar o comando ``` php artisan migrate ``` para gerar as tabelas do sistema; finalmente executamos o comando ``` php artisan serv ``` para executar a aplicação.

Para o nosso projecto frontend simplesmente precisamos de executar o comando ``` npm install ``` para instalar todas dependências e de seguida executar o comando ``` npm start ``` para executar o sistema.

Num ambiente de produção precisaremos de um servidor web com as descrições dadas no modo de desenvolvimento. Depois disso, devemos actualizar a base de dados e os dados do domínio no ficheiro .env para o backend, no caso do frontend devemos actualizar o ficheiro package.json, adicionando os dados do domínio e alteramos o domínio da nossa API no ficheiro App.js e depois executar o comando de ``` npm run build ``` para gerar o ficheiro que será utilizado para a implementação.

Para a implementação de uma camada de autenticação para a aplicação web, usaria o Laravel Sanctum por fornecer um sistema de autenticação robusto para SPAs (aplicações de página única), aplicações móveis, e APIs simples, baseadas em fichas.

Neste sistema teremos uma base de dados relacional, onde teremos três tabelas, nomeadamente categorias, empresas e encomendas, nas quais a tabela de encomendas estará relacionada com as duas tabelas (categorias e empresas).

## Tela em Destaque

![Screenshot from 2022-01-10 14-13-21](https://user-images.githubusercontent.com/32305442/148764987-07eb5729-8a02-47c2-8d43-74c177513955.png)

## Endpoint

Default Link: ``` http://127.0.0.1:8000/ ```

# Categorias
- Atributos: (name, tag, description)
[METODO]: [SOURCE]
Get: api/list-category
Post: api/store-category
Get: api/edit-category/:id
Put: api/update-category/:id
Delete: api/delete-category/:id

# Empresas
- Atributos: (name, tag, description)
[METODO]: [SOURCE]
Get: api/list-company
Post: api/store-company
Get: api/edit-company/:id
Put: api/update-company/:id
Delete: api/delete-company/:id

# Encomendas
- Atributos: (contact_name, contact_phone, real_estate, description, deadline, company_id, category_id)
[METODO]: [SOURCE]
Get: api/list-order
Post: api/store-order
Get: api/edit-order/:id
Put: api/update-order/:id
Delete: api/delete-order/:id