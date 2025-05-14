let professor = [
    {
        id: "1",
        nome: "Prof. Carlos",
        idade: 40,
        departamento: "Matemática",
        turmas: [
            { codigo: "9A", disciplina: "MAT101", alunos: ["João", "Maria", "Pedro"] },
            { codigo: "10A", disciplina: "MAT201", alunos: ["Ana", "Luiz"] }
        ]
    },
    {
        id: "2",
        nome: "Prof. Ana",
        idade: 35,
        departamento: "História",
        turmas: [
            { codigo: "9A", disciplina: "HIS101", alunos: ["João", "Pedro"] },
            { codigo: "10B", disciplina: "HIS201", alunos: ["Maria", "Carlos", "Luiza"] }
        ]
    },
    {
        id: "3",
        nome: "Prof. João",
        idade: 50,
        departamento: "Ciências",
        turmas: [
            { codigo: "9A", disciplina: "CIE101", alunos: ["João", "Maria"] },
            { codigo: "9B", disciplina: "CIE101", alunos: ["Pedro", "Luiz"] }
        ]
    }
];

exports.listarTodos = (req, res) => {
    res.json(professor);
};
exports.buscarPorId = (req, res) => {
    const professor = professor.find(p => p.id === req.params.id);
    if (professor) res.json(professor);
    else res.status(404).send("Id não existente");
};
exports.listarTurmas = (req, res) => {
    const professor = professor.find(p => p.id === req.params.id);
    if (professor) res.json(professor.turmas);
    else res.status(404).send("Id não existente");
};
exports.atualizarProfessor = (req, res) => {
    const index = professor.findIndex(p => p.id === req.params.id);
    if (index === -1) return res.status(404).send("Id não existente");

    const { nome, idade, departamento } = req.body;
    if (nome) professor[index].nome = nome;
    if (idade) professor[index].idade = idade;
    if (departamento) professor[index].departamento = departamento;

    res.json(professor[index]);
};
exports.adicionarTurma = (req, res) => {
    const professor = professor.find(p => p.id === req.params.id);
    if (!professor) return res.status(404).send("Id não existente");

    const { codigo, disciplina, alunos } = req.body;
    if (!codigo || !disciplina || !Array.isArray(alunos)) {
        return res.status(400).send("Dados da turma inválidos.");
    }

    professor.turmas.push({ codigo, disciplina, alunos });
    res.status(201).json(professor.turmas);
};
exports.listarPorDepartamento = (req, res) => {
    const dept = req.params.departamento.toLowerCase();
    const filtrados = professor.filter(p => p.departamento.toLowerCase() === dept);
    res.json(filtrados);
};
exports.removerProfessor = (req, res) => {
    const index = professor.findIndex(p => p.id === req.params.id);
    if (index === -1) return res.status(404).send("Id não existente");

    professor.splice(index, 1);
    res.status(204).send();
};    