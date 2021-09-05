sap.ui.define([
	"invent/clientes/controller/BaseController",
	"sap/ui/core/routing/History",
	"sap/ui/model/json/JSONModel",
	'sap/m/MessageToast'
], function (Controller , History, JSONModel,MessageToast) {
	"use strict";

	return Controller.extend("invent.clientes.controller.Lista", {

		onInit: function () {
			this.getView().addStyleClass(this.getOwnerComponent().getContentDensityClass());
			this.attachRouter("listaName", this.buscarNoServidor)
			let numeroDeClientes = {
				nome: "",
			};
			const oModel = new JSONModel(numeroDeClientes)
			this.getView().setModel(oModel, "busca");
		},
		
		onPress: function (oEvent) {
			var oItem = oEvent.getSource();
			var oRouter = this.getOwnerComponent().getRouter();
			oRouter.navTo("detail", {
				id: window.encodeURIComponent(oItem.getBindingContext("cliente").getProperty("id"))
			});
		},
		
		onNavBack: function () {
				var oRouter = this.getOwnerComponent().getRouter();
				oRouter.navTo("overview");
		},
		
		buscarNoServidor: async function (){
			this.handlePress("carregando");
			
			const dados = await fetch(`/api/Cliente`);
			const cliente = await dados.json();
			const oModel = new JSONModel(cliente)
			this.getView().setModel(oModel, "cliente");
			
			this.handlePress("carregado");
		},

		buscarCliente:async function (oEvent){
			
			var sQuery = oEvent.getSource().getValue();
			if(sQuery != ""){
				const dados = await fetch(`/api/Cliente/pesquizarClientePeloNome/${sQuery}`);
				const cliente = await dados.json();
				const oModel = new JSONModel(cliente)
				this.getView().setModel(oModel, "cliente");
				
				if(cliente.length == 0){
					MessageToast.show("Cliente não esncontrado!");
				}
			}else
			{
				this.buscarNoServidor();
			}
			
		},

		navegarParaCadastro : function (){
			var oRouter = this.getOwnerComponent().getRouter();	
				 oRouter.navTo("cadastroDeCliente");
		}
		
	});
});