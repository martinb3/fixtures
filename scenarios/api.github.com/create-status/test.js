const axios = require('axios')
const {test} = require('tap')

const fixtures = require('../../..')

test('Create status', async (t) => {
  const mock = fixtures.mock('api.github.com/create-status')

  // create failure status
  await axios({
    method: 'post',
    url: 'https://api.github.com/repos/octokit-fixture-org/create-status/statuses/0000000000000000000000000000000000000001',
    headers: {
      Accept: 'application/vnd.github.v3+json',
      Authorization: `token 0000000000000000000000000000000000000001`,
      'Content-Type': 'application/json; charset=utf-8'
    },
    data: {
      state: 'failure',
      target_url: 'https://example.com',
      description: 'create-status failure test',
      context: 'example/1'
    }
  }).catch(mock.explain)

  // create success status
  await axios({
    method: 'post',
    url: 'https://api.github.com/repos/octokit-fixture-org/create-status/statuses/0000000000000000000000000000000000000001',
    headers: {
      Accept: 'application/vnd.github.v3+json',
      Authorization: `token 0000000000000000000000000000000000000001`,
      'Content-Type': 'application/json; charset=utf-8'
    },
    data: {
      state: 'success',
      target_url: 'https://example.com',
      description: 'create-status success test',
      context: 'example/2'
    }
  }).catch(mock.explain)

  // get all statuses
  await axios({
    method: 'get',
    url: 'https://api.github.com/repos/octokit-fixture-org/create-status/commits/0000000000000000000000000000000000000001/statuses',
    headers: {
      Accept: 'application/vnd.github.v3+json',
      Authorization: `token 0000000000000000000000000000000000000001`
    }
  })

  // get combined status
  const {data} = await axios({
    method: 'get',
    url: 'https://api.github.com/repos/octokit-fixture-org/create-status/commits/0000000000000000000000000000000000000001/status',
    headers: {
      Accept: 'application/vnd.github.v3+json',
      Authorization: `token 0000000000000000000000000000000000000001`
    }
  })

  t.is(data.state, 'failure', 'combined state is failure')
  t.doesNotThrow(mock.done.bind(mock), 'satisfies all mocks')
  t.end()
})
