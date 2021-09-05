sap.ui.define([
	"invent/clientes/controller/BaseController",
	"sap/ui/core/routing/History",
	"sap/m/MessageBox",
	"sap/ui/model/json/JSONModel"
], function (Controller, History, MessageBox, JSONModel) {
	"use strict";

	return Controller.extend("invent.clientes.controller.Inserir", {

		onInit: function () {
			this.getView().addStyleClass(this.getOwnerComponent().getContentDensityClass());

			

			this.setClienteModel(this.criandoModeloJsonCliente());
		},
		
		onNavBack: function () {
			var oHistory = History.getInstance();
			var sPreviousHash = oHistory.getPreviousHash();

			if (sPreviousHash !== undefined) {
				window.history.go(-1);
			} else {
				var oRouter = this.getOwnerComponent().getRouter();
				oRouter.navTo("overview", {}, true);
			}
		},
		criandoModeloJsonCliente: function(){
			let clientEmBranco = {
				nome: "Kelvin Mateus Axhcar de Jesus",
				cpf: "45434322323",
				cep: "74640140",
				rua: "225",
				bairro: "Leste vila Nova",
				numero: "333",
				estado: "GO",
				municipio: "Goiania",
				email: "kaxhcar",
				telefone: "62999999999"
				
			};
			return clientEmBranco;
		},
		setClienteModel: function (data) {
			var oModel = new JSONModel(data);
			this.getView().setModel(oModel, "cliente");
		},

		getClienteModel: function () {
			return this.getView().getModel("cliente").getData();
		},

		buscarEndereco: async function () {

			try {
				let cliente = this.getClienteModel();
				if (cliente.cep == "") {
					MessageBox.warning("Preencha todos os campos");
				} else {
					this.handlePress("carregando");
					
					const dados = await fetch(`https://viacep.com.br/ws/${cliente.cep}/json/`);
					const endereco = await dados.json();

					cliente.logradouro = endereco.logradouro;
					cliente.bairro = endereco.bairro;
					cliente.numero = endereco.gia;
					cliente.estado = endereco.uf;
					cliente.municipio = endereco.localidade;

					this.handlePress("carregado");

				}
				
				this.setClienteModel(cliente);
			} catch (error) {
				MessageBox.error(`Erro ao fazer consulta! ${error}`);
			}
		},

		
		verificaSeOsCamposEstaoVazios: function (ModelCliente) {
			let cliente = ModelCliente;
			if (cliente.cep != "" 
				&& cliente.nome != "" 
				&& cliente.cpf != ""
				&& cliente.email != "" 
				&& cliente.telefone != "" 
				&& cliente.logradouro != "" 
				&& cliente.bairro != "" 
				&& cliente.numero != "" 
				&& cliente.estado != "" 
				&& cliente.localidade != "") {
				return ModelCliente;
			} else {
				
				return null;
			}

		},

		salvarNoBancoDeDados:async function () {

			
			let cliente = this.verificaSeOsCamposEstaoVazios(this.getClienteModel())
			if (!cliente){

				MessageBox.warning("Preencha todos os campos");
				return;
			}

			this.handlePress("carregando");
			
			const uri = await fetch('/api/Cliente', {
				method: 'POST',
				headers: {
					'Accept': 'application/json',
					'Content-Type': 'application/json'
				},
				body: JSON.stringify(cliente)
				
			});

			this.handlePress("carregado");
			console.log(cliente)
			const content = await uri.json();

			var oRouter = this.getOwnerComponent().getRouter();
			MessageBox.alert(content.message, {
				onClose: function () {
					oRouter.navTo("listaName", {}, true);
				}
			});

		},

	

	});
});