sap.ui.define([
	"sap/ui/core/UIComponent",
	"sap/ui/model/json/JSONModel",
	
	"sap/ui/Device"
], function (UIComponent, JSONModel,  Device) {
	"use strict";
	return UIComponent.extend("invent.clientes.Component", {
		metadata: {
			interfaces: ["sap.ui.core.IAsyncContentCreation"],
			manifest: "json"
		},
		init: function () {
			
			UIComponent.prototype.init.apply(this, arguments);

			
			var oData = {
				recipient: {
					name: "World"
				}
			}
			var oModel = new JSONModel(oData);
			this.setModel(oModel);
			
			

			var oDeviceModel = new JSONModel(Device);
			oDeviceModel.setDefaultBindingMode("OneWay");
			this.setModel(oDeviceModel, "device");

			
		
			
			this.getRouter().initialize();
		},
		getContentDensityClass : function () {
			if (!this._sContentDensityClass) {
				if (!Device.support.touch) {
					this._sContentDensityClass = "sapUiSizeCompact";
				} else {
					this._sContentDensityClass = "sapUiSizeCozy";
				}
			}
			return this._sContentDensityClass;
		},

	

	});
});