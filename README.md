# BANK PAYMENT VALIDATOR

Validador de linhas digitáveis para titulo bancário e Convenio bancário

<hr />

## Instruções

### dependências
Para rodar o projeto é necessário instalar as dependências.

```sh
yarn install
```



### Executar o servidor

o servidor está rodando na porta 8080 mas é configuravel pelo arquivo `.env`. Copie o arquivo `.env.copy` para a raiz do projeto com o nome `.env` e modifique os argumentos.

```sh
yarn dev
```

Após ter o servidor online, é possível acessar a documentação (gerada pelo swagger) em

```sh
http://localhost:8080/docs
```

<hr />

## Testes

É possível executar os testes com o comando

```sh
yarn test
```

Esse comando vai executar todos os testes.

Para verificar a cobertura de testes (após rodar todos os testes). Use o comando

```sh
yarn coverage
```

é possível que peça para instalar o `live-server` para mostrar a página web do istanbul.

os arquivos de testes foram feitos ao lado do código fonte.

<hr />

## Dados de teste

é possivel encontrar dados para teste dentro da pasta `/src/fixtures` onde tem json com input/output dos dados dependendo do que é desejado testar.
