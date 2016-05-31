# QueryString
A Javascript module for parsing and modifying query strings

## Installation
The module is intended for use in any environment supporting CommonJS modules and ES5, such as Node.
There are no dependencies on external libraries for production or for testing.
It is not an NPM module, so you clone it locally for use in a project
To get started, clone this module, require the entry-point file, and set equal to a constructor: 

`var QueryString = require('..QueryString/index.js')`

## Usage

Provide a query string in the format '?FIELD1=VALUE1&FIELD2=VALUE2$FIELD3=VALUE3'
(invalid inputs default to an empty string)

`var qs = new QueryString('?FIELD1=VALUE1&FIELD2=VALUE2$FIELD3=VALUE3')`

Output the query string as a string, or as a mapping of keys to values.
NOTE: Duplicate keys aren't supported. 

`qs.toString()` // 
'?FIELD1=VALUE1&FIELD2=VALUE2$FIELD3=VALUE3'

`qs.toObject()` //
{ FIELD1: 'VALUE1', FIELD2: 'VALUE2', FIELD3: 'VALUE3' }

Add new key/value pairs to the query String (adding a new key when an existing key exists is not supported)
`qs.add('FIELD4, FIELD4')`
`qs.toString()` // 
'?FIELD1=VALUE1&FIELD2=VALUE2&FIELD3=VALUE3&FIELD4=VALUE4'

Update an existing key with a new value (Updating a non-existing key is not supported)

`qs.update('FIELD1, 'NEWVALUE');`
`qs.toObject()` // 
                    { FIELD1: 'NEWVALUE',
                     FIELD2: 'VALUE2',
                     FIELD3: 'VALUE3',
                     FIELD4: 'VALUE4' }
                     
Remove the value at a key
`qs.remove('FIELD2')`;
`qs.toString()` // 

'?FIELD1=NEWVALUE&FIELD3=VALUE3&FIELD4=VALUE4'

## Tests
A separate test file is included to demonstrate typical usage of this module. The test runner is a very basic homemade implementation. 
You can run it with the command `node test.js` from within the test directory.

## Areas of interest
Supporting nested queries, like '?name[first]=Taylor&name[last]=Harwin'. 
In a Node production environment, it might make more sense to use Node's built-in QueryString module for aspects of this feature.
My basis for writing this code made me want to eliminate external dependencies

