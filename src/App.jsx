import React from 'react'; // Importação da biblioteca React
import ReactDOM from 'react-dom/client'; // Importação específica do método ReactDOM.createRoot

import TodoList from './TodoList'; // Importação do componente TodoList

ReactDOM.createRoot // Cria uma raiz para a renderização do aplicativo
  (document.getElementById('root')) // Seleciona o elemento HTML com id 'root' como o ponto de montagem
  .render( // Método render para renderizar o componente TodoList
    <React.StrictMode> // Componente React.StrictMode para ativar verificações adicionais e avisos para o desenvolvimento
      <TodoList /> // Renderiza o componente TodoList dentro do modo StrictMode
    </React.StrictMode>, // Fim do componente StrictMode
  ); // Fim da chamada do método render
