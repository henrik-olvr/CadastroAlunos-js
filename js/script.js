
// Classe Principal para realizar operações com o objeto Aluno.
class Aluno {

    constructor() {

        this.id = 1;
        this.arrayAlunos = [];
        this.editId = null;
    }

    // Salvar os dados de um aluno.
    salvar() {
        
        // Leitura dos dados do Aluno.
        let aluno = this.lerDados();
        
        if(this.editId == null) {

            this.adicionar(aluno);

        } else {
            
            this.atualizar(this.editId, aluno);
        }
        
        this.listarDados();
        this.cancelar();
    }

    // Adicionar um Aluno no arrayAlunos.
    adicionar(aluno) {

        aluno.nota = parseFloat(aluno.nota);

        this.arrayAlunos.push(aluno);
        this.id++;
    }

    // Listar os dados dos Alunos cadastrados.
    listarDados() {

        let tbody = document.getElementById("tbody");
        tbody.innerText = "";

        // Listagem dos dados
        for(let i = 0; i < this.arrayAlunos.length; i++) {

            let tr = tbody.insertRow();

            let tdId = tr.insertCell();
            let tdNome = tr.insertCell();
            let tdTel = tr.insertCell();
            let tdNota = tr.insertCell();
            let tdOpcoes = tr.insertCell();

            tdId.innerText = this.arrayAlunos[i].id;
            tdNome.innerText = this.arrayAlunos[i].nome;
            tdTel.innerText = this.arrayAlunos[i].tel;
            tdNota.innerText = this.arrayAlunos[i].nota;

            // Centralizando as informações dos dados.
            tdId.classList.add("center");
            tdNome.classList.add("center");
            tdTel.classList.add("center");
            tdNota.classList.add("center");

            // Criando as imagens presentes na coluna 'Opções'.
            let imgEdit = document.createElement("img");
            let imgDelete = document.createElement("img");

            imgEdit.src = "assets/edit.png";
            imgDelete.src = "assets/delete.png";

            imgEdit.title = "Atualizar";
            imgDelete.title = "Excluir";

            imgEdit.setAttribute("onclick", "aluno.editar("+ JSON.stringify(this.arrayAlunos[i]) +")");
            imgDelete.setAttribute("onclick", "aluno.deletar("+ this.arrayAlunos[i].id +")");

            // Adicionando as imagens na tabela do HTML.
            tdOpcoes.appendChild(imgEdit);
            tdOpcoes.appendChild(imgDelete);

            tdOpcoes.classList.add("center", "pointer");
        }
    }

    // Obter os dados de um Aluno e exibir nos campos
    // de cadastro.
    editar(aluno) {
        
        this.editId = aluno.id;

        document.getElementById("nome").value = aluno.nome;
        document.getElementById("tel").value = aluno.tel;
        document.getElementById("nota").value = aluno.nota;

        document.getElementById("btnForm").value = "Atualizar";
    }


    // Atualizar os dados de um Aluno.
    atualizar(id, aluno) {

        for(let i = 0; i < this.arrayAlunos.length; i++) {

            if(this.arrayAlunos[i].id === id) {

                this.arrayAlunos[i].nome = aluno.nome;
                this.arrayAlunos[i].tel = aluno.tel;
                this.arrayAlunos[i].nota = aluno.nota;
            }
        }
    }

    // Obter os dados do Aluno presentes nos campos de input.
    lerDados() {

        let aluno = {};

        aluno.id = this.id;
        aluno.nome = document.getElementById("nome").value;
        aluno.tel = document.getElementById("tel").value;
        aluno.nota = document.getElementById("nota").value;

        return aluno;
    }

    // Limpar os campos de input.
    cancelar() {
        
        document.getElementById("nome").value = "";
        document.getElementById("tel").value = "";
        document.getElementById("nota").value = "";

        document.getElementById("btnForm").value = "Salvar";
        this.editId = null;
    }

    // Deletar um Aluno.
    deletar(id) {
        
        if(confirm("Deseja realmente deletar o aluno do ID: " + id + "?")) {

            let tbody = document.getElementById("tbody");

            for(let i = 0; i < this.arrayAlunos.length; i++) {

                if(this.arrayAlunos[i].id === id) {
    
                    this.arrayAlunos.splice(i, 1);
                    tbody.deleteRow(i);
                }
            }
        }
    }
}

let aluno = new Aluno();