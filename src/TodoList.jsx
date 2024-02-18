import React, { useState, useEffect } from "react";
import "./TodoList.css";
import Icone from "./assets/icon.png";

function TodoList() {
  const listaStorage = localStorage.getItem("Lista");

  const [lista, setLista] = useState(listaStorage ? JSON.parse(listaStorage) : []);
  const [novoItem, setNovoItem] = useState("");

  const [editandoIndex, setEditandoIndex] = useState(-1); // Inicialmente nenhum índice está sendo editado
  const [textoEditavel, setTextoEditavel] = useState('');

  const [mostrarAlerta, setMostrarAlerta] = useState(false);

  useEffect(() => {
    localStorage.setItem("Lista", JSON.stringify(lista));
  }, [lista]);

  function adicionaItem(form) {
    form.preventDefault();
    if (!novoItem.trim()) {
      return;
    }
    setLista([...lista, { text: novoItem.trim(), isCompleted: false }]);
    setNovoItem("");
    document.getElementById("input-entrada").focus();
  }

  function cliclou(index) {
    const listaAux = [...lista];
    listaAux[index].isCompleted = !listaAux[index].isCompleted;
    setLista(listaAux);
  }

  function deleta(index) {
    const listaAux = [...lista];
    listaAux.splice(index, 1);
    setLista(listaAux);
  }

  function deletaTudo() {
    const confirmacao = window.confirm("Tem certeza que deseja deletar todas as tarefas?");
    if (confirmacao) {
      setLista([]);
    }
  }

  function iniciarEdicao(index, texto) {
    setEditandoIndex(index);
    setTextoEditavel(texto);
}

function finalizarEdicao(index) {
    const listaAux = [...lista] ;
    listaAux[index].text = textoEditavel.trim(); // Atualiza o texto da tarefa
    setLista(listaAux);
    setEditandoIndex(-1); // Sai do modo de edição
    setTextoEditavel(''); // Limpa o texto editável
}

function finalizarEdicao(index) {
    const listaAux = [...lista];
    listaAux[index].text = textoEditavel.trim();
    setLista(listaAux);
    setEditandoIndex(-1);
    setTextoEditavel('');
    setMostrarAlerta(true); // Mostra o alerta de confirmação
}   

  return (
    <div>
      <h1>Lista de tarefas</h1>
      <form onSubmit={adicionaItem}>
        <input
          id="input-entrada"
          type="text"
          value={novoItem}
          onChange={(e) => setNovoItem(e.target.value)}
          placeholder="Adicione uma tarefa"
          autoFocus // Foca automaticamente o campo de entrada quando a página é carregada
        />
        <button className="add" type="submit">
          Add
        </button>
      </form>

      <div className="listaTarefas">
        <div style={{ textAlign: "center" }}>
          {lista.length < 1 ? (
            <img className="icone-central" src={Icone} alt="Icone" />
          ) : (
            lista.map((item, index) => (
                <div key={index} className={item.isCompleted ? "item completo" : "item"}>
                    {editandoIndex === index ? (
                        <input
                            type="text"
                            value={textoEditavel}
                            onChange={(e) => setTextoEditavel(e.target.value)}
                            onBlur={() => finalizarEdicao(index)}
                            autoFocus // Foca automaticamente o campo de entrada
                        />
                    ) : (
                        <span onClick={() => iniciarEdicao(index, item.text)}>{item.text}</span>
                    )}
                    
                    <button onClick={() => deleta(index)} className="del" aria-label="Deletar">
                        Deletar
                    </button>
                </div>
            ))
          )}
            
            {lista.length > 0 && (
            <button onClick={deletaTudo} className="deleteAll" aria-label="Deletar todas as tarefas">
              Deletar todas
            </button>
          )}          
        </div>
      </div>
    </div>
  );
}

export default TodoList;
