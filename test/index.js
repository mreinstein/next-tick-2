'use strict'

var nextTick = require('../')
var test     = require('tap').test


test('doesnt run immediately', function(t) {
  var invoked = false

  nextTick(function() {
  	invoked = true
  })

  t.equals(invoked, false)

  t.end()
})

test('run in next tick', function(t) {
  var invoked = false

  nextTick(function() {
  	invoked = true
  })

  t.equals(invoked, false)

  setTimeout(function () {
		t.equals(invoked, true, 'Run in next tick')
		t.end()
	}, 0)
})


test('preserves run order', function(t) {
	var invoked = []

	nextTick(function() { invoked.push(99) })
	nextTick(function() { invoked.push(3) })
	nextTick(function() { invoked.push(16) })

	setTimeout(function () {
		t.deepEqual(invoked, [ 99, 3, 16 ], 'Serial')
		t.end()
	}, 10)
})
