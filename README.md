# MoneyFlow

Aplicativo de finanças pessoais feito com React. Registre entradas e despesas, filtre por mês e acompanhe o saldo e os gastos por categoria.

**Demo:** https://moneyflow-umber-iota.vercel.app/

![Tela do MoneyFlow](./screenshots/moneyflow.png)

## Funcionalidades

- Adicionar transações com descrição, data, valor, tipo (entrada ou despesa) e categoria
- Validação do formulário: campos obrigatórios, valor válido e data que não pode ser no futuro
- Apagar transações
- Filtro por mês, com as opções geradas automaticamente a partir das transações
- Saldo, entradas, despesas e cards de categoria que acompanham o mês escolhido
- Gráfico de barras de gastos por categoria, feito só com HTML e CSS
- Mensagem quando não há transações para mostrar
- Dados salvos no navegador (localStorage), com proteção contra dados corrompidos
- Layout responsivo, que funciona no celular
- Filtros combinados por mês, tipo (entrada ou despesa) e categoria

## Tecnologias

- React
- Vite
- JavaScript
- CSS

## Como rodar o projeto

1. Instale as dependências: `npm install`
2. Rode o servidor: `npm run dev`
3. Abra `http://localhost:5173` no navegador

## O que aprendi

- Dividir a interface em componentes e passar dados com props
- Guardar dados com `useState` e salvar com `useEffect` e `localStorage`
- Gerar listas com `.map()` e calcular totais com `.filter()` e `.reduce()`
- Formulários controlados, com um estado para cada campo
- Avisar o componente pai com funções passadas por props
- Formatar dinheiro com `toLocaleString`
- Validar dados do usuário antes de salvar
- Tratar erros com `try/catch` para o app não quebrar
- Remover repetidos com `Set` e ordenar listas com `.sort()`
- Derivar uma lista filtrada a partir do estado, para a tela inteira acompanhar uma única escolha
- Criar um gráfico sem biblioteca, calculando a largura das barras em porcentagem
- Fazer layouts responsivos com media queries

## Próximas melhorias

- Editar transações
