const tap = require('tap')
const goats = require('../server/endpoints/goats')
const t = tap.test
const goatsLib = require('../server/libs/goatsLib')

// using a set of single character strings as facts
// since we want to always return 20, I'm testing with just one item more than a
// single set (21) to ensure we roll back to the beginning after all facts have
// been displayed once, and to also test a returned set of 20 contains no
// duplicate items.
const mockFacts = 'abcdefghijklmnopqrstu'.split('')
const goatService = new goatsLib.GoatService(mockFacts)

t('getRandomFact should always return a non-empty string', async t => {
	// call enough times to ensure the fact pool is drained twice
	let times = 43
	while (times--) {
		const fact = goatService.getRandomFact()
		t.type(fact, 'string')
		// ensure we don't get an empty string
		t.ok(fact.length)
	}
})

t('goatFacts should return an array', async t => {
	const facts = await goatService.goatFacts()
	t.type(facts, Array)
})

t('goatFacts should return 20 items each time', async t => {
	const facts1 = await goatService.goatFacts()
	const facts2 = await goatService.goatFacts()
	const facts3 = await goatService.goatFacts()

	t.equal(facts1.length, 20)
	t.equal(facts2.length, 20)
	t.equal(facts3.length, 20)

	t.test('each set of 20 should contain no duplicates', async t => {
		const facts1unique = [...new Set(facts1)]
		const facts2unique = [...new Set(facts2)]
		const facts3unique = [...new Set(facts3)]

		t.equal(facts1unique.length, 20)
		t.equal(facts2unique.length, 20)
		t.equal(facts3unique.length, 20)
	})
})
