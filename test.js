var constants = require('./constants'),
	QueryString = require('./index.js');

function test(str, callback, expected){
	var output = callback();
	if (output === expected){
		return 'PASS: ' + output + ' matched expected: ' + expected;
	} else if (typeof expected === 'object'){
		var allKeysMatch = true;
		for (var key in expected){
			if (output[key] !== expected[key]){
				return 'FAIL: not every key matches. ' + 'Expected ' + output[key] + ' to equal ' + expected[key];
			} 
		}
		return 'PASS: every key in output matched every key in expected'
	}
	return 'FAIL: ' + output + ' does not match: ' + expected
}


var qs = new QueryString('?first=Taylor&last=Harwin');

var tests = [
test('gets the query string', function(){ 
	return qs.toString();
}, '?first=Taylor&last=Harwin'),

test('adds a param', function(){
	qs.add('role', 'Developer');
	return qs.toString();
}, '?first=Taylor&last=Harwin&role=Developer'),

test('removes a param', function(){
	qs.remove('first');
	return qs.toString();
}, '?last=Harwin&role=Developer'),

test('updates a param', function(){
	qs.update('role', 'engineer')
	return qs.toString();
}, '?last=Harwin&role=engineer'),

test('outputs the query string as an object', function(){
	return qs.toObject();
}, {
	last: 'Harwin',
	role: 'engineer'
}),

test('modifies the query string and outputs the modified object', function(){
	qs.add('age', 30);
	qs.update('age', 31);
	qs.remove('role');
	return qs.toObject()
}, {
	age: 31,
	last: 'Harwin'
}),
test('defaults to empty string if provided an empty query string', function(){
	var empty =  new QueryString('');
	var broken = new QueryString(broken);
	return empty.toString() + broken.toString();
}, ''),
test('defaults to empty string if provided a string with no query', function(){
	var noQuery =  new QueryString('/%winning=true&team=Warriors');
	var nonsense = new QueryString('werfwewegwerwerew234');
	return noQuery.toString() + nonsense.toString();
}, '')

];

console.log(tests);



