using System;
using System.Collections.Generic;
using System.Text.Json;
using ClienteWeb.Models;
using ClienteWeb.Repositorio;
using Microsoft.AspNetCore.Mvc;

namespace ClienteWeb.Controllers
{
    [Route("api/[controller]")]
    public class ClienteController : ControllerBase
    {
        private RepositorioCliente _repositorioCliente = new RepositorioCliente();

        [HttpGet]
        public IActionResult Get()
        {
            List<Cliente> clientes = new List<Cliente>();


            clientes = _repositorioCliente.ListarTodos();

            var cont = clientes.Count;

            return Ok(clientes);
        }
        
        [HttpGet("numeroDeClientes")]
        public IActionResult GetQuantidadeDeClientes()
        {
            List<Cliente> clientes = new List<Cliente>();


            clientes = _repositorioCliente.ListarTodos();

            var cont = clientes.Count;

            return Ok(cont);
        }

        [HttpGet("pesquizarClientePeloNome/{nome}")]
        public IActionResult PesquizarClientePeloNome(string nome)
        {
            var cliente = new Cliente();
            cliente.Nome = nome;
            List<Cliente> clientesLista = new List<Cliente>();
            clientesLista = _repositorioCliente.ProcurarPeloNome(cliente);

            if (clientesLista.Count >= 1)
            {
                return Ok(clientesLista);
            }

            return NotFound();
        }
        

        [HttpGet("{id}")]
        public IActionResult GetClienteId(int id)
        {
            var cliente = new Cliente();
            cliente = _repositorioCliente.BuscarPeloId(id);
            return Ok(cliente);
        }

        [HttpPost]
        public Exception InserirCliente([FromBody] Cliente cliente)
        {
            try
            {
                var clienteVerificado = camposEstaoVazios(cliente);
                if (clienteVerificado)
                {
                    _repositorioCliente.Inserir(cliente);
                    return new Exception("Cadastro salvo com sucesso");
                }

                return new Exception("Preencha todos os campos");
            }
            catch (Exception e)
            {
                Console.WriteLine(e);
                return new Exception("Erro ao cadastrar no servido! \n" + e);
            }
        }

        [HttpDelete("{id}")]
        public IActionResult DeletarCliente(int id)
        {
            Cliente cliente = new Cliente();
            cliente.Id = id;
            _repositorioCliente.Deletar(cliente);
            return Ok("Deletado com sucesso");
        }
        

        public bool camposEstaoVazios(Cliente cliente)
        {
            if (cliente.Nome == "" && cliente.Cpf == "" && cliente.Cep == "" && cliente.Rua == "" &&
                cliente.Bairro == "" &&
                cliente.Numero == 0 && cliente.Estado == "" && cliente.Municipio == "" && cliente.Email == "" &&
                cliente.Telefone == "") 
            {
                return false;
            }

            return true;
        }
    }
}