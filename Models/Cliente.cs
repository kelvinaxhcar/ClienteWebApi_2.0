namespace ClienteWeb.Models
{
    public class Cliente
    {
        public Cliente()
        {
        }

       

        public int Id { get; set; }
        public string Nome {get; set; }
        public string Cpf { get; set; }
        public string Municipio { get; set; }
        public string Rua { get; set; }
        public string Cep  { get; set; }
        public int Numero { get; set; }
        public string Bairro { get; set; }
        public string Estado { get; set; }
        public string Email { get; set; }
        public string Telefone { get; set; }
    }
}