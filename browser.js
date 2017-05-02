'use strict'

var ensureCallable = function (fn) {
	if (typeof fn !== 'function') throw new TypeError(fn + " is not a function")
	return fn
}

var byObserver = function (Observer) {
	var node = document.createTextNode(''), queue, currentQueue, i = 0
	new Observer(function () {
		var callback
		if (!queue) {
			if (!currentQueue) return
			queue = currentQueue
		} else if (currentQueue) {
			queue = currentQueue.concat(queue)
		}
		currentQueue = queue
		queue = undefined
		if (typeof currentQueue === 'function') {
			callback = currentQueue
			currentQueue = undefined
			callback()
			return
		}
		node.data = (i = ++i % 2) // Invoke other batch, to handle leftover callbacks in case of crash
		while (currentQueue) {
			callback = currentQueue.shift()
			if (!currentQueue.length) currentQueue = undefined
			callback()
		}
	}).observe(node, { characterData: true })
	return function (fn) {
		ensureCallable(fn)
		if (queue) {
			if (typeof queue === 'function') queue = [queue, fn]
			else queue.push(fn)
			return
		}
		queue = fn
		node.data = (i = ++i % 2)
	}
}

module.exports = (function () {
	// MutationObserver
	if ((typeof document === 'object') && document) {
		if (typeof MutationObserver === 'function') return byObserver(MutationObserver)
		if (typeof WebKitMutationObserver === 'function') return byObserver(WebKitMutationObserver)
	}

	// W3C Draft
	// http://dvcs.w3.org/hg/webperf/raw-file/tip/specs/setImmediate/Overview.html
	if (typeof setImmediate === 'function') {
		return function (cb) { setImmediate(ensureCallable(cb)) }
	}

	// Wide available standard
	if ((typeof setTimeout === 'function') || (typeof setTimeout === 'object')) {
		return function (cb) { setTimeout(ensureCallable(cb), 0) }
	}
}())
