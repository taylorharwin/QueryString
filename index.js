var constants = require('./constants');


function QueryString(str){
	if(!this.isValid(str)){
		this.qString = '';

	} else {
		this.qString = str;
		this.qsObj = this.toObject(str);
	}
}

QueryString.prototype.isValid = function(str){
	var type = typeof str;
	if (type === 'string'){
		if (str.indexOf(constants.start) > -1){
			return str;
		}
		return false;
	}
	return false;
}

QueryString.prototype.toString = function(){
	return this.qString;
}
QueryString.prototype.toObject = function(){
	if (this.qsObj !== undefined){
		return this.qsObj;
	} else {
		this.qsObj = this.decodeStr(this.qString);
		return this.qsObj;
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
	var keys = Object.keys(this.qsObj);
	encodedString = '';

	if (keys.length > -1){
		encodedString += constants.start + keys[0] + constants.equals + this.qsObj[keys[0]];
	}

	for (var i = 1; i < keys.length; i++){
		encodedString += constants.separate + keys[i] + constants.equals + this.qsObj[keys[i]];
	}
	this.qString = encodedString;
	return encodedString;
}

QueryString.prototype.add = function(key, value){
	this.qsObj[key] = value;
	this.encodeStr();
}

QueryString.prototype.remove = function(key){
	delete this.qsObj[key];
	this.encodeStr();
}

QueryString.prototype.update = function(key, value){
	if (this.qsObj[key] !== undefined){
		this.qsObj[key] = value;
		this.encodeStr();
	} else {
		throw new Error('tried to update a nonexistant param: ' + key)
	}
}

module.exports = QueryString;
