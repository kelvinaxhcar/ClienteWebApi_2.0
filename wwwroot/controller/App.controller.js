sap.ui.define([
	"sap/ui/core/mvc/Controller"
], function (Controller) {
	"use strict";

	return Controller.extend("invent.clientes.controller.App", {

		onInit: function () {
			this.getView().addStyleClass(this.getOwnerComponent().getContentDensityClass());
		},
		navegarParaLista : function (){
			var oRouter = this.getOwnerComponent().getRouter();
				 oRouter.navTo("listaName");
		}

	});
});