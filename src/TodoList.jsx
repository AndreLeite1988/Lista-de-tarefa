import React, { useState, useEffect } from "react";
import './TodoList.css';
import Icone from './assets/icon.png'

function TodoList() {
    // Verifica se há alguma lista armazenada no localStorage
    const listaStorage = localStorage.getItem('Lista');

    // Inicializa o estado da lista de tarefas com os dados armazenados ou uma lista vazia
    const [lista, setLista] = useState(listaStorage ? JSON.parse(listaStorage) : []);
    // Inicializa o estado do novo item da lista como uma string vazia
    const [novoItem, setNovoItem] = useState("");

    // Efeito colateral para atualizar o localStorage sempre que a lista mudar
    useEffect(() => {
        localStorage.setItem('Lista', JSON.stringify(lista));
    }, [lista]);

    // Função para adicionar um novo item à lista
    function adicionaItem(form) {
        form.preventDefault();
        // Verifica se o novo item não está vazio
        if (!novoItem) {
            return;
        }
        // Adiciona o novo item à lista
        setLista([...lista, { text: novoItem, isCompleted: false }]);
        // Limpa o campo do novo item
        setNovoItem("");
        // Define o foco de volta para o campo de entrada
        document.getElementById('input-entrada').focus();
    }

    // Função para marcar/desmarcar um item como concluído
    function cliclou(index){
        const listaAux = [...lista];
        listaAux[index].isCompleted = !listaAux[index].isCompleted;
        setLista(listaAux);
    }
    
    // Função para deletar um item da lista
    function deleta(index){
        const listaAux = [...lista];
        listaAux.splice(index, 1);
        setLista(listaAux);
    }

    // Função para deletar todos os itens da lista
    function deletaTudo(){
        setLista([]);
    }

    return (
        <div>
            <h1> Lista de tarefas</h1>
            <form onSubmit={adicionaItem}>
                <input 
                    id="input-entrada"
                    type="text"
                    value={novoItem} onChange={(e) => { setNovoItem(e.target.value) }}
                    placeholder="Adicione uma tarefa" />
                <button className="add" type="submit">Add</button>
            </form>

            <div className="listaTarefas">
                <div style={{textAlign:'center'}}>
                    {
                        // Renderiza a lista de tarefas, mostrando cada item e botões para marcar como concluído e deletar
                        lista.length < 1 ?
                        <img className="icone-central" src={Icone} alt="Icone" /> :
                        lista.map((item, index) => (
                            <div key={index} className={item.isCompleted ? "item completo" : "item"}>
                                <span onClick={() => cliclou(index)}>{item.text}</span>
                                <button onClick={() => deleta(index)}>Deletar</button>
                            </div>
                        ))
                    }
                    {
                        // Renderiza o botão para deletar todas as tarefas caso haja pelo menos uma na lista
                        lista.length > 0 &&
                        <button onClick={() => deletaTudo()} className="deleteAll">Deletar todas</button>
                    }
                </div>
            </div>
        </div>
    );
}

export default TodoList;
