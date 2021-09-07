sap.ui.define([
	"invent/clientes/controller/BaseController",
	"sap/ui/model/json/JSONModel",
	"sap/ui/core/routing/History",
	"sap/m/MessageBox"
], function (Controller, JSONModel,History,MessageBox) {
	"use strict";

	return Controller.extend("invent.clientes.controller.Atualizar", {
		onInit: function () {
			var oRouter = this.getOwnerComponent().getRouter();
			oRouter.getRoute("AtualizarName").attachPatternMatched(this._onObjectMatched, this);
			
		},

		_onObjectMatched:async function (oEvent) {
			this.Id = oEvent.getParameter("arguments").id;

			const dados = await fetch(`/api/Cliente/${this.Id}`);
			const cliente = await dados.json();
			const oModel = new JSONModel(cliente);
			this.getView().setModel(oModel, "cliente");

		},
		
		onNavBack: function () {
			var oHistory = History.getInstance();
			var sPreviousHash = oHistory.getPreviousHash();
			
			if (sPreviousHash !== undefined) {
				window.history.go(-1);
			} else {
				var oRouter = this.getOwnerComponent().getRouter();
				oRouter.navTo("listaName", {}, true);
			}
		},

		setClienteModel: function (data) {
			var oModel = new JSONModel(data);
			this.getView().setModel(oModel, "cliente");
		},

		getClienteModel: function () {
			return this.getView().getModel("cliente").getData();
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
			console.log(cliente)
			if (!cliente){

				MessageBox.warning("Preencha todos os campos");
				return;
			}

			this.handlePress("carregando");

			const uri = await fetch('/api/Cliente', {
				method: 'PUT',
				headers: {
					'Accept': 'application/json',
					'Content-Type': 'application/json'
				},
				body: JSON.stringify(cliente)

			});

			this.handlePress("carregado");
			const content = await uri.json();

			var oRouter = this.getOwnerComponent().getRouter();
			MessageBox.alert("Atualizado com sucesso", {
				onClose: function () {
					oRouter.navTo("listaName", {}, true);
				}
			});

		},

	});
});