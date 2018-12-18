/**
 * @namespace app
 */

/**
 * @namespace app.assets
 * @memberof app
 */

/**
 * @namespace app.assets.dataManager
 * @memberof app.assets
 */
jQuery.sap.declare("dataManager");

dataManager = {
	DATA : {"d":{"results":[{"__metadata":{"id":"http://saphgx.saskpower.sk.ca:8040/sap/opu/odata/sap/ZHR_MYQUOTAS_SRV/QuotasSet('Vacation')","uri":"http://saphgx.saskpower.sk.ca:8040/sap/opu/odata/sap/ZHR_MYQUOTAS_SRV/QuotasSet('Vacation')","type":"ZHR_MYQUOTAS_SRV.Quotas"},"DisplayQuota":true,"Text":"Vacation","ValueText":"360.0","Value":"360.00000","ValueDaysText":"45.0","ValueDays":"45.00000"},{"__metadata":{"id":"http://saphgx.saskpower.sk.ca:8040/sap/opu/odata/sap/ZHR_MYQUOTAS_SRV/QuotasSet('Sick')","uri":"http://saphgx.saskpower.sk.ca:8040/sap/opu/odata/sap/ZHR_MYQUOTAS_SRV/QuotasSet('Sick')","type":"ZHR_MYQUOTAS_SRV.Quotas"},"DisplayQuota":true,"Text":"Sick","ValueText":"1181.4","Value":"1181.41260","ValueDaysText":"147.6","ValueDays":"147.67658"},{"__metadata":{"id":"http://saphgx.saskpower.sk.ca:8040/sap/opu/odata/sap/ZHR_MYQUOTAS_SRV/QuotasSet('BDO')","uri":"http://saphgx.saskpower.sk.ca:8040/sap/opu/odata/sap/ZHR_MYQUOTAS_SRV/QuotasSet('BDO')","type":"ZHR_MYQUOTAS_SRV.Quotas"},"DisplayQuota":true,"Text":"BDO","ValueText":"80.0","Value":"80.00000","ValueDaysText":"10.0","ValueDays":"10.00000"},{"__metadata":{"id":"http://saphgx.saskpower.sk.ca:8040/sap/opu/odata/sap/ZHR_MYQUOTAS_SRV/QuotasSet('Family')","uri":"http://saphgx.saskpower.sk.ca:8040/sap/opu/odata/sap/ZHR_MYQUOTAS_SRV/QuotasSet('Family')","type":"ZHR_MYQUOTAS_SRV.Quotas"},"DisplayQuota":true,"Text":"Family","ValueText":"24.0","Value":"24.00000","ValueDaysText":"3.0","ValueDays":"3.00000"},{"__metadata":{"id":"http://saphgx.saskpower.sk.ca:8040/sap/opu/odata/sap/ZHR_MYQUOTAS_SRV/QuotasSet('Stat%20Bank')","uri":"http://saphgx.saskpower.sk.ca:8040/sap/opu/odata/sap/ZHR_MYQUOTAS_SRV/QuotasSet('Stat%20Bank')","type":"ZHR_MYQUOTAS_SRV.Quotas"},"DisplayQuota":true,"Text":"Stat Bank","ValueText":"9.9","Value":"9.99999","ValueDaysText":"9.9","ValueDays":"9.99999"},{"__metadata":{"id":"http://saphgx.saskpower.sk.ca:8040/sap/opu/odata/sap/ZHR_MYQUOTAS_SRV/QuotasSet('VO%20Bank')","uri":"http://saphgx.saskpower.sk.ca:8040/sap/opu/odata/sap/ZHR_MYQUOTAS_SRV/QuotasSet('VO%20Bank')","type":"ZHR_MYQUOTAS_SRV.Quotas"},"DisplayQuota":true,"Text":"VO Bank","ValueText":"9.9","Value":"9.99999","ValueDaysText":"9.9","ValueDays":"9.99999"},{"__metadata":{"id":"http://saphgx.saskpower.sk.ca:8040/sap/opu/odata/sap/ZHR_MYQUOTAS_SRV/QuotasSet('DO%20Bank')","uri":"http://saphgx.saskpower.sk.ca:8040/sap/opu/odata/sap/ZHR_MYQUOTAS_SRV/QuotasSet('DO%20Bank')","type":"ZHR_MYQUOTAS_SRV.Quotas"},"DisplayQuota":true,"Text":"DO Bank","ValueText":"9.9","Value":"9.99999","ValueDaysText":"9.9","ValueDays":"9.99999"}]}},
	SERVICEURL : "/sap/opu/odata/sap/ZHR_MYQUOTAS_SRV/QuotasSet?$format=json",
	icons : [
		{"id" :"Vacation","icon":"travel-itinerary","info":"Vacation Leave"},
		{"id" :"Sick","icon":"stethoscope","info":"Sick Leave"},
		{"id" :"BDO","icon":"customer-history","info":"Banked Days Off"},
		{"id" :"Family","icon":"family-care","info":"Family Leave"},
		{"id" :"Stat Bank","icon":"approvals","info":"Stat Bank"},
		{"id" :"VO Bank","icon":"appointment-2","info":"Vacation Overtime"},
		{"id" :"DO Bank","icon":"appointment","info":"Deferred Overtime"}
	],
	SIMULATEFIORI : false,

	/**
	 * Get Data
	 * 
	 * @param {callBack} onSuccess
	 * @param {String} user - test param
	 * @memberof app.assets.dataManager
	 */
	getData : function(onSuccess) {
		if (this.SIMULATEFIORI) {
			dataManager.handleResponse(200, JSON.stringify(dataManager.DATA), onSuccess);
		} else {
			var xmlhttp = new XMLHttpRequest();
			xmlhttp.open("GET", this.SERVICEURL, true);
			
			// ****************** envelope *******************
			var body = '<?xml version="1.0" encoding="UTF-8"?>'
				+ '<entry xmlns="http://www.w3.org/2005/Atom" xmlns:m="http://schemas.microsoft.com/ado/2007/08/dataservices/metadata" xmlns:d="http://schemas.microsoft.com/ado/2007/08/dataservices">'
				+ '<content type="application/xml">'
				+ '<m:properties><d:DeviceType>iPad</d:DeviceType></m:properties></content></entry>';
			// ****************** envelope *******************
			
			xmlhttp.addEventListener("load", function() {
					dataManager.handleResponse(this.status, this.responseText, onSuccess);
				}, false);
			
			xmlhttp.addEventListener("error", function(e) {
				jQuery.sap.require("sap.m.MessageBox");
				sap.m.MessageBox.show(
						"Unable to fetch your Quota details or your details were not found.\n Ensure Internet Connection is available and re-try. Thanks",
						sap.m.MessageBox.Icon.INFORMATION,
						"MyQuota Details",
						[ sap.m.MessageBox.Action.OK ],
						function() {});
			}, false);
			
			xmlhttp.send(body);
		}
	},
	
	/**
	 * Handle response from server
	 * 
	 * @param {Number} status
	 * @param {String} jsonResponse
	 * @param {callBack} onSuccess
	 * @memberof app.assets.dataManager
	 */
	handleResponse: function(status, jsonResponse, onSuccess) {	
		jQuery.sap.require("sap.m.MessageBox");
		switch (status) {
		case 200:
		case "200":
			try {
				var fjs = {TileCollection:this.processJSON(jsonResponse)};				
				onSuccess(new sap.ui.model.json.JSONModel(fjs));
			} catch (ex) {
				console.log(ex);
				sap.m.MessageBox.show(
						"Unable to complete request",
						sap.m.MessageBox.Icon.ERROR,
						"Request Error",
						[ sap.m.MessageBox.Action.OK ],
						function() {});
			}
			break;
		case 403:
			sap.m.MessageBox.show(
					"User not authorized. Thanks",
					sap.m.MessageBox.Icon.INFORMATION,
					"Access Error",
					[ sap.m.MessageBox.Action.OK ],
					function() {});
			break;
			
		default:
			sap.m.MessageBox.show(
					"Unable to fetch your Quota details or your details were not found.\n Ensure Internet Connection is available and re-try. Thanks",
					sap.m.MessageBox.Icon.INFORMATION,
					"MyQuota Details",
					[ sap.m.MessageBox.Action.OK ],
					function() {});
			break;
		}
	},
	
	/**
	 * Process response JSON
	 * 
	 * @param {String} instr - input string
	 * @memberof app.assets.dataManager
	 */
	processJSON: function(instr) {
		var result = [];
		var res = JSON.parse(instr).d.results;
		for(var i = 0; i < res.length; i++) {
			var item = res[i];
			for(var n = 0; n < this.icons.length; n++) {
				if(item.Text == this.icons[n].id) {
					item.icon = this.icons[n].icon;
					item.info = this.icons[n].info;
					break;
				}
			}
			
			item.ValueDays = helper.to1dec(item.ValueDays);
			item.Value = helper.to1dec(item.Value);
			item.displayValue = item.ValueDays;
			
			if(!item.icon) {
				item.icon = "Unknown";
				item.info = "Unknown";
			}
			
			if(item.DisplayQuota) {
				result.push(JSON.parse(JSON.stringify(item)));				
			}
		}
		return result;
	}
};