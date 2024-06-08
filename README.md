# QDMedia

## Objetivo do projeto
O projeto busca simular o funcionamento de uma rede social, onde usuários podem realizar postagens e comentários de textos, contando com a segurança de autenticação de usuários por hierarquia e políticas de edição e exclusão de conteúdos personalizada. 



## Stack utilizada

- **Runtime:** Node.js v21.0.0

- **Linguagem:** Typescript

- **Framework REST:** ExpressJS

- **Autenticação de tokens:** JWT

- **Framework de persistência:** PrismaORM

- **Camada DTO:** Class-Validator e Class-Transformer 

- **Banco de dados:** PostgreSQL v15.7

- **Conteinerização:** Docker v26.1.1

  

### Escolha de framework
O framework ExpressJS disponibiliza uma grande liberdade quando se trata de estrutura de API RESTful, tendo em vista sua diferença com o NestJS que é mais mandatório em relação a estrutura de pastas e módulos. Além disso, é a ferramenta que o contribuidor do projeto mais possui experiência enquanto desenvolvedor.



## Arquitetura do projeto
#### Banco de dados

![Modelagem do banco](C:\Projetos\qd_media\docs\modelagem_banco.png)



#### Servidor

O projeto possui uma arquitetura limpa, com o foco em praticidade que foi necessária no desenvolvimento. O servidor conta com as camadas Contêiner, Rotas, Controllers, DTO, Services e ORM.

 

## Execução do projeto

1. **Banco de dados**
O primeiro passo é a execução do banco de dados, por meio do container da pasta *database*. O comando a seguir irá iniciar o banco de dados criando as tabelas e suas relações, deixando pronto para as operações do servidor.
```sh
cd pasta_qdmedia
docker compose -f database/docker-compose.yml up -d
```

2. **Servidor QDMedia**
O segundo passo diz respeito ao servidor em si. Para o início do processo, é necessária a instalação do NodeJS v21.7.3 para que as dependências sejam instaladas, com o comando:
```sh
cd pasta_qdmedia/server
npm install
```
Assim que as dependências forem instaladas, é possível iniciar o serviço no contêiner, por meio do comando:
```sh
cd pasta_qdmedia
docker compose -f server/docker-compose.yml up --build -d
```
O contêiner será lançado, copiando para si as dependências, sincronizando se com o banco de dados local, e iniciando a escuta e o gerenciamento de requisições.



## Características do servidor
### Tipos de usuário

| Código | Tipo de Usuário |                 Permissões                 |
| :----: | :-------------: | :----------------------------------------: |
|   0    |  Admnistrador   |      Pode fazer todas as requisições.      |
|   1    |     Cliente     | Não possui permissão de manipular usuários |



## Autores

- **Edy Sanches** - *Projetou e implementou a infraestrutura, o banco de dados, a arquitetura Clean, o esquema de módulos e o todas as regras de negócio.* - [GitHub](https://github.com/EdySanches)
