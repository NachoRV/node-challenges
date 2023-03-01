import test from 'node:test'
import assert from 'node:assert'
import { promisify } from 'node:util'

test('Todo integration test', async (t) => {
  const testPort = '9009'
  process.env.PORT = testPort

  const { server } = await import('../../src/index.js')
  const testServerAddress = `http://localhost:${testPort}/todo`

  await t.test('it should create a new todo', async (t) => {
    const data = {
      description: 'Task one',
      status: true,
      important: false
    }

    const request = await fetch(testServerAddress, {
      method: 'POST',
      body: JSON.stringify(data)
    })

    assert.deepStrictEqual(
      request.headers.get('content-type'), 'application/json'
    )

    assert.strictEqual(request.status, 201)
    const result = await request.json()
    assert.deepStrictEqual(
      result.success,
      'todo created with success!!',
      'it Should return a valid todo'
    )
    assert.ok(
      result.id.length > 30,
      'it Should return a valid uuid'
    )
  })

  await promisify(server.close.bind(server))()
})
