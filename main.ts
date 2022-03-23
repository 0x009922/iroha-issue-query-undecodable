import fs from 'fs/promises'
import path from 'path'
import { QueryError, VersionedQueryResult, Logger } from '@iroha2/data-model'
import { fetch } from '@iroha2/client-isomorphic-fetch'
import { toHex } from '@scale-codec/util'
import consola from 'consola'

const BASE_API = 'http://localhost:8080'
const FILE = 'request_findDomainByID.dat'

async function tryMakeRequest(queryBin: Uint8Array) {
  const response = await fetch(BASE_API + '/query', {
    method: 'POST',
    body: queryBin,
  })

  const bytes = new Uint8Array(await response.arrayBuffer())

  consola.info('Response bytes:\n%s', toHex(bytes))

  if (response.status === 200) {
    consola.success('Query OK: %o', VersionedQueryResult.fromBuffer(bytes).as('V1'))
  } else {
    consola.error('Query ERROR: %o', QueryError.fromBuffer(bytes))
  }
}

async function main() {
  // comment this to remove debug logging
  new Logger().mount()

  const data = await fs.readFile(path.resolve(__dirname, FILE))
  await tryMakeRequest(data)
}

main().catch((err) => {
  consola.fatal(err)
  process.exit(1)
})
