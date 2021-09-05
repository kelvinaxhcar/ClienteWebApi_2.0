sap.ui.define([
    "sap/ui/core/mvc/Controller"
], function (Controller) {
    "use strict";

    return Controller.extend("invent.clientes.controller.Base", {
            
       getRouter: function (){
         return this.getOwnerComponent().getRouter();  
       },
        
        attachRouter(routerName, func){
           const router =   this.getRouter();
           
           if (!!routerName){
               router.getRoute(routerName).attachPatternMatched(func, this)
           }else {
               router.attachRouter(func, this);
           }
             
           
        },

        navegarParaCadastro : function (){
			var oRouter = this.getOwnerComponent().getRouter();
				 oRouter.navTo("cadastroDeCliente");
                 console.log("Aqui")
		},
        teste : function (){
			
                 console.log("No base controller")
		},
        
        handlePress: function (estado) {
            var oDialog = this.byId("BusyDialog");
            
            if(estado === "carregando"){
                oDialog.open();
            }
            if (estado === "carregado"){
                    oDialog.close();
            }

            
        }



    });
});