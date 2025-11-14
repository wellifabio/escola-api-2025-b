# Escola API
Sistema simples para gestão de atividades e turmas em uma escola.

## Funcionalidades (Requisitos Funcionais)
- Fazer login como **professor**
- Criar e administrar **turmas**
- Criar e administrar **atividades**

## DER
![MER x DER](./docs/der.png)

## Implantada na Vercel
- SGBD postgresql (Neon)
## Passos para executar localmente
- SGBD mysql (XAMPP)
### Requisitos não funcionais (Ambiente)
- Node.js
- VsCode
- MySQL - XAMPP (MariaDB)
- Insomnia
#### Passos
- 1 Abrir com VsCode e em um terminal CMD ou BASH instalar as dependências
```bash
npm install
```
- 2 Abrir o XAMPP, dar Start em MySQL e criar o arquivo .env contendo:
```env
DATABASE_URL="mysql://root@localhost:3306/escola"
```
- 3 Implantar o Banco de dados e popular com a semente
```bash
npx prisma migrate dev --name init
npx prisma db seed
```
- 4 Alterar o SGBD de `mysql` para `postgresql` no arquivo `prisma/schema.prisma`
- 5 Executar a API
```bash
npm run dev
```
Teste
