var constants = require('./constants/constants.js');

function QueryString(str){
	this._qString = this.isValid(str) ? str : '';
	this._qObj = this.toObject(str);
}

QueryString.prototype.isValid = function(str){
	if (typeof str === 'string'){
		if (str.indexOf(constants.start) > -1){
			return true;
		}
		return false;
	}
	return false;
}

QueryString.prototype.toString = function(){
	return this._qString;
}
QueryString.prototype.toObject = function(){
	if (this._qObj !== undefined){
		return this._qObj;
	} else {
		this._qObj = this.decodeStr(this._qString
	);
		return this._qObj;
	}
}
QueryString.prototype.decodeStr = function(str){
	var obj = {};
	var queryParams = str.slice(1).split(constants.separate)
	queryParams.forEach(function(param){
		var keyValuePair = param.split(constants.equals);
		obj[keyValuePair[0]] = keyValuePair[1];
	});
	return obj;
}

QueryString.prototype.encodeStr = function(){
	var keys = Object.keys(this._qObj);
	encodedString = '';

	if (keys.length > -1){
		encodedString += 
		constants.start + 
		keys[0] + 
		constants.equals + 
		this._qObj
		[keys[0]];
	}

	if (keys.length >= 1){
		for (var i = 1; i < keys.length; i++){
			encodedString += 
			constants.separate + 
			keys[i] + 
			constants.equals + 
			this._qObj
			[keys[i]];
		}
	}
	this._qString = encodedString;
	return encodedString;
}

QueryString.prototype.add = function(key, value){
	if (this._qObj[key] !== undefined){
		return false;
	}
	this._qObj[key] = value;
	this.encodeStr();
	return true;
}

QueryString.prototype.remove = function(key){
	if (this._qObj[key] !== undefined){
		delete this._qObj[key];
		this.encodeStr();
		return true;
	}
	return false;	
}

QueryString.prototype.update = function(key, value){
	if (this._qObj[key] !== undefined){
		this._qObj[key] = value;
		this.encodeStr();
		return true;
	} 
	return false;
}

module.exports = QueryString;