sap.ui.define([
	"invent/clientes/controller/BaseController",
	"sap/ui/core/routing/History",
	"sap/ui/model/json/JSONModel",
	"sap/m/MessageBox",
	'sap/m/MessageToast'
], function (Controller, History, JSONModel,MessageBox, MessageToast) {
	"use strict";

	return Controller.extend("invent.clientes.controller.Detail", {

		onInit: function () {
			var oRouter = this.getOwnerComponent().getRouter();
			oRouter.getRoute("detail").attachPatternMatched(this._onObjectMatched, this);
		},
		
		_onObjectMatched:async function (oEvent) {
			this.handlePress("carregando");
			
			this.Id = oEvent.getParameter("arguments").id;
			const dados = await fetch(`/api/Cliente/${this.Id}`);
			const cliente = await dados.json();
			const oModel = new JSONModel(cliente);
			this.getView().setModel(oModel, "cliente");
			
			if (!cliente.nome){
				var oRouter = this.getOwnerComponent().getRouter();
				oRouter.navTo("listaName", {}, true);
			}
			
			
			this.handlePress("carregado");
			
		},

		navegarParaEditar: function (oEvent) {
			var oItem = oEvent.getSource();
			var oRouter = this.getOwnerComponent().getRouter();
			var cliente = this.getView().getModel("cliente").getData();
			oRouter.navTo("AtualizarName", {
				id: window.encodeURIComponent(cliente.id)
			});
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
		

		deletarCliente:async function (oEvent){

			const cliente = this.getView().getModel("cliente").getData();
			var oRouter = this.getOwnerComponent().getRouter();
			
			MessageBox.warning("Deseja realmente deletar cliente?.", {
				actions: [MessageBox.Action.OK, MessageBox.Action.CANCEL],
				emphasizedAction: MessageBox.Action.OK,
				onClose: async function (sAction) {
					if (sAction === "OK"){
						const uri = await fetch(`/api/Cliente/${cliente.id}`, {
							method: 'DELETE',
							headers: {
								'Accept': 'application/json',
								'Content-Type': 'application/json'
							}
						});
						
						const content = await uri.json();
						oRouter.navTo("listaName");
						
						
					}else {
						MessageToast.show("Operação cancelada");
					}
				}
			});
			
		},
		

		anavegarParaEditar: function(){
			console.log("Aqui")
			var oRouter = this.getOwnerComponent().getRouter();
			oRouter.navTo("AtualizarName");
		}
	});
});