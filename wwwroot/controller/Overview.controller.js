sap.ui.define([
	"invent/clientes/controller/BaseController",
	"sap/ui/model/json/JSONModel"
], function (Controller,JSONModel) {
	"use strict";

	return Controller.extend("invent.clientes.controller.Overview", {
		onInit: function () {
			
			this.attachRouter("overview", this.buscarNoServidor)

		},
		navegarParaLista : function (){
			var oRouter = this.getOwnerComponent().getRouter();
				 oRouter.navTo("listaName");
			
		},

		navegarParaCadastro : function (){
			var oRouter = this.getOwnerComponent().getRouter();
				 oRouter.navTo("cadastroDeCliente");
		},

		buscarNoServidor: async function (){
			this.handlePress("carregando")
			
			const dados = await fetch(`/api/Cliente/numeroDeClientes`);
			const cliente = await dados.json();
			let numeroDeClientes = {
				cont: cliente,
			};
			const oModel = new JSONModel(numeroDeClientes)
			this.getView().setModel(oModel, "NumeroDeCliente");
			this.handlePress("carregado")
			
		},

	});
});