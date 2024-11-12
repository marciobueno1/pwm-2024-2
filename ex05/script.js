const inputDescricao = document.getElementById("inputDescricao");
const btAdicionar = document.getElementById("btAdicionar");
const ulTarefas = document.getElementById("ulTarefas");

const tarefaURL = "https://parseapi.back4app.com/classes/Tarefa";
const headers = {
  "X-Parse-Application-Id": "s2pjRJCuR5ksa8Bhe39UTq6iydUECV1v1q52sEZ0",
  "X-Parse-REST-API-Key": "QJHI0ghoCq5Ddw3OiYueu68VUaltK3DD42KFTroG",
};
const headersJson = {
  ...headers,
  "Content-Type": "application/json",
};

async function getListaTarefas() {
  const response = await fetch(tarefaURL, {
    method: "GET",
    headers: headers,
  });
  console.log("response", response);
  if (!response.ok) {
    alert("Erro ao acessar o back-end!");
    return;
  }
  const data = await response.json();
  console.log("data", data);
  return data.results;
}

function exibirTarefas(tarefas) {
  console.log("tarefas", tarefas);
  ulTarefas.innerHTML = "";
  tarefas.forEach((tarefa) => {
    const li = document.createElement("li");
    const text = document.createTextNode(`${tarefa.descricao}`);
    const cbConcluida = criarCheckBoxConcluida(tarefa);
    const btRemover = criarBotaoRemover(tarefa);
    li.appendChild(text);
    li.appendChild(cbConcluida);
    li.appendChild(btRemover);
    ulTarefas.appendChild(li);
  });
}

function criarCheckBoxConcluida(tarefa) {
  const cbConcluida = document.createElement("input");
  cbConcluida.type = "checkbox";
  cbConcluida.checked = tarefa.concluida;
  cbConcluida.onchange = async () => {
    cbConcluida.disabled = true;
    const response = await fetch(`${tarefaURL}/${tarefa.objectId}`, {
      method: "PUT",
      headers: headersJson,
      body: JSON.stringify({ concluida: cbConcluida.checked }),
    });
    if (!response.ok) {
      cbConcluida.checked = !cbConcluida.checked;
    } else {
      handleWindowLoad();
    }
    cbConcluida.disabled = false;
  };
  return cbConcluida;
}

function criarBotaoRemover(tarefa) {
  const btRemover = document.createElement("button");
  btRemover.innerHTML = "X";
  btRemover.onclick = async () => {
    btRemover.disabled = true;
    const response = await fetch(`${tarefaURL}/${tarefa.objectId}`, {
      method: "DELETE",
      headers: headers,
    });
    if (!response.ok) {
      alert("Erro ao remover a tarefa!");
    } else {
      handleWindowLoad();
    }
    btRemover.disabled = false;
  };
  return btRemover;
}

async function criarTarefa(tarefa) {
  const response = await fetch(tarefaURL, {
    method: "POST",
    headers: headersJson,
    body: JSON.stringify(tarefa),
  });
  console.log("response", response);
  if (!response.ok) {
    alert("Erro ao criar uma tarefa!");
    return false;
  }
  const data = await response.json();
  console.log("data", data);
  return true;
}

async function handleWindowLoad() {
  console.log("handleWindowLoad begin");
  const tarefas = await getListaTarefas();
  exibirTarefas(tarefas ? tarefas : []);
  console.log("handleWindowLoad end");
}

async function handleBtAdicionarClick() {
  const descricao = inputDescricao.value.trim();
  if (!descricao) {
    alert("Preencha o campo descrição da tarefa");
    return;
  }
  if (await criarTarefa({ descricao })) {
    inputDescricao.value = "";
    inputDescricao.focus();
    handleWindowLoad();
  }
}

window.onload = handleWindowLoad;
btAdicionar.onclick = handleBtAdicionarClick;
