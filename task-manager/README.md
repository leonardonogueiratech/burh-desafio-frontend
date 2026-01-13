# Task Manager

Gerenciador de tarefas para o desafio de Frontend da BURH.

## Sobre

CRUD de tarefas usando a API do [crudcrud.com](https://crudcrud.com/).

### Campos

- Titulo (texto)
- Descricao (texto)
- Prioridade (1 a 5)
- Data de Entrega
- Status de conclusao

## Stack

- React
- Vite
- SASS
- Axios

## Rodar o Projeto

```bash
npm install
npm run dev
```

Antes de rodar, configure o ID da API em `src/services/api.js` (pegue em https://crudcrud.com/).

Acesse http://localhost:5173

## Scripts

- `npm run dev` - Desenvolvimento
- `npm run build` - Build
- `npm run preview` - Preview

## Features

- CRUD completo de tarefas
- Validacao de campos
- Indicador de tarefas atrasadas
- Layout responsivo
- Animacoes CSS

## Estrutura

```
src/
├── components/
│   ├── Header/
│   ├── TaskForm/
│   ├── TaskList/
│   ├── TaskItem/
│   └── Modal/
├── hooks/
│   └── useTasks.js
├── services/
│   └── api.js
├── styles/
└── App.jsx
```

## Perfil BURH

[Inserir link do perfil]
