using System;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using System.Net.Sockets;
using ClienteWeb.Models;

namespace ClienteWeb.Repositorio
{
    public class RepositorioCliente
    {
        public SqlConnection Open()
        {
            var dbCoonection = new SqlConnection(
                "Server=147.182.248.84;Database=ClienteInvent;UID=sa;Password=7878w1zKl");

            dbCoonection.Open();

            if (dbCoonection.State != ConnectionState.Open)
            {
                throw new Exception("Nao foi possivel se conectar");
            }

            return dbCoonection;
        }

        public List<Cliente> ListarTodos()
        {
            var listDeClientes = new List<Cliente>();

            using (var dbConnection = Open())
            {
                using (var command = dbConnection.CreateCommand())
                {
                    command.CommandText = "SELECT * FROM Cliente";

                    var dbReader = command.ExecuteReader();

                    while (dbReader.Read())
                    {

                        var cliente = new Cliente
                        {
                            Id = dbReader.IsDBNull("Id_Cliente") ? default : dbReader.GetInt32("Id_Cliente"),
                            Nome = dbReader.IsDBNull("Nome") ? default : dbReader.GetString("Nome"),
                            Cpf = dbReader.IsDBNull("Cpf") ? default : dbReader.GetString("Cpf"),
                            
                            
                        };
                        listDeClientes.Add(cliente);
                        
                    }
                }
            }

            
            return listDeClientes;
        }
        
        public Cliente BuscarPeloId(int id)
        {
            var cliente = new Cliente();
            using (var dbConnection = Open())
            {
                using (var command = dbConnection.CreateCommand())
                {
                    var query = $"SELECT * FROM Cliente WHERE  Id_Cliente = {id}";

                    command.CommandText = query;
                    var dbReader = command.ExecuteReader();

                    while (dbReader.Read())
                    {

                        cliente.Id = dbReader.IsDBNull("Id_Cliente") ? default : dbReader.GetInt32("Id_Cliente");
                        cliente.Nome = dbReader.IsDBNull("Nome") ? default : dbReader.GetString("Nome");
                        cliente.Cpf = dbReader.IsDBNull("Cpf") ? default : dbReader.GetString("Cpf");
                        cliente.Municipio = dbReader.IsDBNull("Municipio") ? default : dbReader.GetString("Municipio");
                        cliente.Rua = dbReader.IsDBNull("Rua") ? default : dbReader.GetString("Rua");
                        cliente.Cep = dbReader.IsDBNull("Cep") ? default : dbReader.GetString("Cep");
                        cliente.Bairro = dbReader.IsDBNull("Bairro") ? default : dbReader.GetString("Bairro");
                        cliente.Estado = dbReader.IsDBNull("Estado") ? default : dbReader.GetString("Estado");
                        cliente.Numero = dbReader.IsDBNull("Numero") ? default : dbReader.GetInt32("Numero");
                        cliente.Email = dbReader.IsDBNull("Email") ? default : dbReader.GetString("Email");
                        cliente.Telefone = dbReader.IsDBNull("Telefone") ? default : dbReader.GetString("Telefone");
                    }
                }
            }
            return cliente;
        }
        
        public void Inserir(Cliente cliente)
        {
            using (var dbConnection = Open())
            {
                using (var command = dbConnection.CreateCommand())
                {
                    var query = $"INSERT INTO Cliente(nome, Cpf, Cep, Rua, Bairro, Numero, Estado, Municipio, Email, Telefone) VALUES ( '{cliente.Nome}', " +
                                $"'{cliente.Cpf}', " +
                                $"'{cliente.Cep}', " +
                                $"'{cliente.Rua}', " +
                                $"'{cliente.Bairro}', " +
                                $"{cliente.Numero}, " +
                                $"'{cliente.Estado}', " +
                                $"'{cliente.Municipio}', " +
                                $"'{cliente.Email}', " +
                                $"'{cliente.Telefone}')";

                    command.CommandText = query;

                    command.ExecuteNonQuery();
                }
            }
        }
        
        public void Deletar(Cliente cliente)
        {
            using (var dbConnection = Open())
            {
                using (var command = dbConnection.CreateCommand())
                {
                    var query = $"DELETE FROM Cliente WHERE Id_Cliente = {cliente.Id}";
                    command.CommandText = query;

                    
                    command.ExecuteNonQuery();
                }
            }
        }

        public List<Cliente> ProcurarPeloNome(Cliente cliente)
        {
            var listDeClientes = new List<Cliente>();

            using (var dbConnection = Open())
            {
                using (var command = dbConnection.CreateCommand())
                {
                    command.CommandText = $"SELECT * FROM Cliente WHERE Nome like '{cliente.Nome}%'";

                    var dbReader = command.ExecuteReader();

                    while (dbReader.Read())
                    {

                        var clienteModel = new Cliente
                        {
                            Id = dbReader.IsDBNull("Id_Cliente") ? default : dbReader.GetInt32("Id_Cliente"),
                            Nome = dbReader.IsDBNull("Nome") ? default : dbReader.GetString("Nome"),
                            Cpf = dbReader.IsDBNull("Cpf") ? default : dbReader.GetString("Cpf"),
                            
                            
                        };
                        listDeClientes.Add(clienteModel);
                        
                    }
                }
            }

            
            return listDeClientes;
        }
        
        public void Update(Cliente cliente)
        {

            using (var dbConnection = Open())
            {
                using (var command = dbConnection.CreateCommand())
                {
                    var query = "UPDATE Cliente SET Nome = @parametroNome," +
                                "Cpf = @parametroCpf," +
                                " Municipio = @parametroMunicipio," +
                                " Rua = @parametroRua," +
                                " Cep = @parametroCep," +
                                " Numero = @parametroNumero," +
                                " Bairro = @parametroBairro, " +
                                "Estado = @parametroEstado, " +
                                "Email = @parametroEmail, Telefone = @parametroTelefone WHERE Id_Cliente = @parametroId";

                    command.CommandText = query;

                    SetParametroSql(cliente, command);

                    command.ExecuteNonQuery();
                }
            }
        }
        
        private void AddParam(SqlCommand command, string name, object value)
        {
            var parmName = command.CreateParameter();
            parmName.ParameterName = name;
            parmName.Value = value;
            command.Parameters.Add(parmName);
        }
        
        private void SetParametroSql(Cliente cliente, SqlCommand command)
        {
            AddParam(command, "parametroId", cliente.Id);
            AddParam(command, "parametroNome", cliente.Nome);
            AddParam(command, "parametroCpf", cliente.Cpf);
            AddParam(command, "parametroMunicipio", cliente.Municipio);
            AddParam(command, "parametroRua", cliente.Rua);
            AddParam(command, "parametroCep", cliente.Cep);
            AddParam(command, "parametroNumero", cliente.Numero);
            AddParam(command, "parametroBairro", cliente.Bairro);
            AddParam(command, "parametroEstado", cliente.Estado);
            AddParam(command, "parametroEmail", cliente.Email);
            AddParam(command, "parametroTelefone", cliente.Telefone);
        }
    }
}