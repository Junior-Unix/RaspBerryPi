// typeDefs define o schema GraphQL usando a função gql.
// resolvers define como as queries serão resolvidas.
// ApolloServer é usado para criar e configurar o servidor GraphQL.
// server.listen() inicia o servidor e exibe a URL onde ele está rodando.
const { ApolloServer, gql } = require('apollo-server')

const perfis = [
    { id: 1, nome: 'comum' },
    { id: 2, nome: 'administrador' }
]

const usuarios = [{
    id: 1,
    nome: 'João Silva',
    email: 'js@z.com',
    idade: 29
}, {
    id: 2,
    nome: 'Rafael Junior',
    email: 'rf@w.com',
    idade: 31
}, {
    id: 3,
    nome: 'Daniela Smith',
    email: 'ds@u.com',
    idade: 24
}]

const typeDefs = gql`

    scalar Date


    type Produto {
        nome: String!
        preco: Float!
        desconto: Float
        precoComDesconto: Float
    }

    type Perfil {
        id: Int
        nome: String
    }

    type Usuario {
        id: ID
        nome: String
        email: String
        idade: Int
        salario: Float
        vip: Boolean
    }

    type Query {
        ola: String #ou String! = não pode ser nulo
#        horaAtual: String
        horaAtual: Date
        usuarioLogado: Usuario
        produtoEmDestaque: Produto
        numeroMegaSena: [Int]!
        usuarios: [Usuario]
        usuario(id: ID): Usuario
        perfis: [Perfil]
        perfil(id: Int): Perfil

    }
`
const resolvers = {

    Produto: {
        precoComDesconto(produto) {
            if (produto.desconto) {
                return produto.preco 
                    * (1 - produto.desconto)
            } else {
                return produto.preco
            }
        }
 
    },
    Usuario: {
        salario(usuario) {
            return usuario.salario_real
        }
    },

    Query: {
        ola() {
            return 'Olá Mundo!'
        },
        horaAtual() {
//           return `${new Date}`
            return new Date
        },

        usuarioLogado() {
            return {
                id: 1,
                nome: 'Ana da Web',
                email: 'ana@git.com',
                idade: 23,
                salario_real: 1234.56,
                vip: true
            }
        },

        produtoEmDestaque() {
            return {
                nome: 'Notebook',
                preco: 4899.99,
                desconto: 0.15
            }
        },

// Função numeroMegaSena:
// Esta função gera um conjunto de números aleatórios para um sorteio da Mega-Sena.
// Função de Comparação crescente:
// const crescente = (a, b) => a - b:
// Define uma função de comparação que ordena os números em ordem crescente.
// Se a for menor que b, a função retorna um valor negativo, indicando que a deve vir antes de b.
// Criação de um Array de 6 Elementos:
// Array(6).fill(0):
// Cria um array de 6 elementos, todos inicializados com 0.
// Mapeamento para Números Aleatórios:
// .map(n => parseInt(Math.random() * 60 + 1)):
// Usa o método map para substituir cada elemento do array por um número aleatório entre 1 e 60.
// Math.random() * 60 gera um número aleatório entre 0 e 59.999…
// parseInt(Math.random() * 60 + 1) converte esse número para um inteiro entre 1 e 60.
// Ordenação dos Números:
// .sort(crescente):
// Ordena os números gerados em ordem crescente usando a função de comparação crescente.
        numeroMegaSena() {
            const crescente = (a, b) => a - b
            return Array(6).fill(0)
                .map(n => parseInt(Math.random() * 60 + 1))
                .sort(crescente)
        },
        usuarios() {
            return usuarios
        },
// Função usuario:
// Esta função é um resolver GraphQL que busca um usuário específico com base no id fornecido.
// Parâmetros da Função:
// A função recebe dois parâmetros: _ e { id }. O primeiro parâmetro (_) é geralmente usado 
//para o objeto pai (root), mas não é utilizado aqui. O segundo parâmetro é um objeto que contém 
//o id do usuário que está sendo buscado.
// Filtragem de Usuários:
// const selecionados = usuarios.filter(u => u.id === parseInt(id)):
// usuarios é um array de objetos de usuários.
// filter é um método de array que cria um novo array com todos os elementos que passam no 
//teste implementado pela função fornecida.
// u => u.id === parseInt(id) é a função de teste que verifica se o id do usuário (u.id) 
//é igual ao id fornecido, convertido para um número inteiro com parseInt(id).
// Retorno do Usuário:
// return selecionados ? selecionados[0] : null:
// Se o array selecionados não estiver vazio, retorna o primeiro elemento (selecionados[0]).
// Se o array estiver vazio, retorna null.
        usuario(_, { id }) {
            const selecionados = usuarios
                .filter(u => u.id === parseInt(id))
            return selecionados ? selecionados[0] : null
        },
        
// Parâmetros da Função:
// A função perfil recebe dois parâmetros: _ e { id }.
// O primeiro parâmetro (_) é geralmente usado para o objeto pai (root), mas não é utilizado aqui.
// O segundo parâmetro é um objeto que contém o id do perfil que está sendo buscado.
// Filtragem de Perfis:
// const selecionados = perfis.filter(p => p.id === id):
// perfis é um array de objetos de perfis.
// filter é um método de array que cria um novo array com todos os elementos que passam no teste implementado pela função fornecida.
// p => p.id === id é a função de teste que verifica se o id do perfil (p.id) é igual ao id fornecido.
// Retorno do Perfil:
// return selecionados ? selecionados[0] : null:
// Se o array selecionados não estiver vazio, retorna o primeiro elemento (selecionados[0]).
// Se o array estiver vazio, retorna null.
        perfis() {
            return perfis
        },

        perfil(_, { id }) {
            const selecionados = perfis
                .filter(p => p.id === id)
            return selecionados ? selecionados[0] : null
        }
    }
}

// Criação do Servidor Apollo:
// const server = new ApolloServer({ typeDefs, resolvers }):
// Aqui, você está criando uma nova instância do ApolloServer.
// typeDefs são as definições de tipos GraphQL que você criou anteriormente.
// resolvers são as funções que resolvem as consultas (queries) e mutações definidas nos typeDefs.
const server = new ApolloServer({
    typeDefs,
    resolvers
})

// Iniciando o Servidor:
// server.listen():
// Este método inicia o servidor Apollo.
// Ele retorna uma promessa que, quando resolvida, fornece um objeto contendo a URL onde o servidor está sendo executado.
// Log da URL:
// .then(({ url }) => { console.log(Executando em ${url}) }):
// Quando a promessa é resolvida, a URL do servidor é extraída do objeto retornado.
// A URL é então exibida no console com a mensagem Executando em ${url}.
server.listen().then(({ url }) => {
    console.log(`Executando em ${url}`)
})
