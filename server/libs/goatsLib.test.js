const goatsLib = require('./goatsLib')
const factList = require('./goatFacts.json')
const length =factList.length
const factArray = []

test('test random number is positive' , () => {
    expect(goatsLib.getRandomIndex(length)).toBeGreaterThan(-1)
})

test('test random number is less than length of array' , () => {
    expect(goatsLib.getRandomIndex(length)).toBeLessThan(length)
})

test('test random number is within range' , () => {
    expect(goatsLib.getRandomIndex(length)).toBeGreaterThanOrEqual(0)
    expect(goatsLib.getRandomIndex(length)).toBeLessThan(length)
})

test('ensure we are adding one fact to the array' , () => {
    const facts = goatsLib.getRandomFact(factArray)
    expect(facts.length).toBe(1)
})

test('ensure the fact is from the original file' , () => {
    const facts = goatsLib.getRandomFact(factArray)
    expect(factList).toContain(facts[0])
})

test('ensure the wrong fact is not in the file' , () => {
    const facts = goatsLib.getRandomFact(factArray)
    expect(factList).not.toContain("This Goat Fact Doesn't Exist")
})

test('test to make sure we are gathering 20 facts', async () => {
    const facts = await goatsLib.goatFacts();
    expect(facts.length).toBe(20)
  });

test('test to make sure we are not retrieving the same facts', async () => {
    const facts1 = await goatsLib.goatFacts()
    const facts2 = await goatsLib.goatFacts()
    expect(facts1).not.toBe(facts2)
});
