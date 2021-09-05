sap.ui.define([
	"sap/ui/core/mvc/Controller",
	"sap/ui/model/json/JSONModel",
	"sap/ui/core/routing/History",
], function (Controller, JSONModel,History) {
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

	});
});