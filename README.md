# Instalar Front-End governo

## Na máquina que for instalar o sistema terá que executar os seguintes passos

### Acesse a pasta seai-front-end e dentro dela execute os seguintes passos:

### 1 -  Criar o arquivo `.env` e ajustar as variáveis ambiente do arquivo apontando para a URL da API

```bash
VUE_APP_API_URL="http://url_da_api"
```

### 2 - Subir a aplicação

### Método 1 - Usando docker compose

Basta executar o comando abaixo que irá sempre executar a build e já subir o container.

```bash
docker compose up --build -d
```
### Método 2 - Sem usar o docker compose

Antes de subir uma nova alteração para o ambiente de produção, é necessário primeiro garantir que não haverá conflito de imagens e containers do governo.

Deletar o container já em execução

```bash
docker container rm -f gov-front-app
```

Execute o comando abaixo e verifique se o container gov-front-app não está mais na lista

```bash
docker container ls
```

Deletar a imagem antiga do front do governo

```bash
docker image rm gov-front-img
```

Execute o comando abaixo e cheque se a imagem gov-front-img de fato não está na lista

```bash
docker images
```

**Subir o serviço**

Gerar a build da imagem do governo (Aguarde a build terminar geralmente costuma demorar alguns minutos)

```bash
docker image build -t gov-front-img -f Dockerfile .
```

Executar o frontend do governo

```bash
docker container run -d --env-file .env --network host --name gov-front-app gov-front-img
```

Checar se o container gov-front-app subiu mesmo

```bash
docker container ls
```

Checar os logs do serviço

```bash
docker container logs -f --tail 10 gov-front-app
```

O sistema do governo irá estar rodando no [localhost](http://localhost) na porta **3000.** Então ao acessar a URL do sistema do governo irá acessar a página.