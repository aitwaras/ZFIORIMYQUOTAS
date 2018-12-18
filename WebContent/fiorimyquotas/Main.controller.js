sap.ui.define(['jquery.sap.global', 'sap/ui/core/mvc/Controller', 'sap/m/MessageToast'],
	function(jQuery, Controller, MessageToast) {
	"use strict";
	return Controller.extend( "fiorimyquotas.Main", {
		appName: "My Quotas",
		version: "1.1",
		distributionDate: "July 4, 2018",
		
		/**
		 * Called when a controller is instantiated and its View
		 * controls (if available) are already created. Can be used
		 * to modify the View before it is displayed, to bind event
		 * handlers and do other one-time initialization.
		 * 
		 * @memberOf myquota.mainpage
		 * 
		 */
		goHome : function(evt) {
			window.parent.history.back();
		},

		getData : function() {
			var _this = this;
			dataManager.getData(function(res) {
				_this.getView().setModel(res);
				var data = res.oData.TileCollection;
				
				for(var i = 0; i < data.length; i++) {
					if(data[i].DisplayQuota) {						
						var oGenericTile1 = new sap.m.GenericTile({
							header : data[i].Text,
							subheader: data[i].info,
							press : _this.tilePress,
							includeItemInSelection: true,
							tileContent : [new sap.m.TileContent({
								unit : "Days",
								content : new sap.m.NumericContent({
									value : data[i].displayValue,
									formatterValue: true,
									truncateValueTo : 5,
									tooltip: "",
									customData : new sap.ui.core.CustomData({
										key:data[i].ValueDays + "," + data[i].Value
									}),
									valueColor : data[i].displayValue > 0 ? sap.m.ValueColor.Good : (data[i].displayValue == 0 ? sap.m.ValueColor.Neutral : sap.m.ValueColor.Error),
									icon:"sap-icon://" + data[i].icon
								})
							})]
						});
						oGenericTile1.addStyleClass("extraSmallMargin");
						_this.getView().byId("appTest").addContent(oGenericTile1);
					}
				}
			});
		},

		onInit : function(evt) {
			this.getData();
		},

		handleRefresh : function(evt) {
			this.getData();
		},
		
		displayInfo : function(evt) {
	        var msg = "Version: " + this.version + "\n\n Distribution Date: " + this.distributionDate;
	        msg = msg.split("\r\n").join("");

	        sap.m.MessageBox.show(msg, sap.m.MessageBox.Icon.INFORMATION, this.appName, [sap.m.MessageBox.Action.OK], function() {});
		},

		tilePress : function(evt) {
			var unit = this.getTileContent()[0].getUnit();
			var data = this.getTileContent()[0].getContent().mAggregations.customData[0].mProperties.key.split(",");
			
			this.getTileContent()[0].setUnit(unit == "Days" ? "Hours" : "Days");
			this.getTileContent()[0].getContent().setValue(unit == "Days" ? data[1] : data[0]);
		}
	});
});