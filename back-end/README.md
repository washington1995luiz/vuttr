# VUTTR Back-End

## Para executar o código, é necessário ter instalado o Node.JS e o MongoDB

### Abra o terminal na pasta onde está localizado o projeto e digite:

```
npm init
```
Este comando irá baixar todas as dependências necessárias para executar o projeto

```
nodemon index
```

## Para consultar a documentação da API no navegador, é necessário instalar as dependências do Aglio

### Abra o terminal e vá até a pasta do projeto e digite:

```
npm install -g aglio

```
### Para executar abra o terminal, vá até a pasta doc dentro do projeto e digite:
```
aglio -i api.apib --theme-full-width --no-theme-condense -s --port 8080

```