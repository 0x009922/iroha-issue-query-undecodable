# iroha-issue-query-undecodable

## Steps to reproduce

1. Start Iroha
    ```bash
    docker compose up
    ```
2. Prepare the node package
    ```bash
    # Install node v14

    curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.1/install.sh | bash

    export NVM_DIR="$([ -z "${XDG_CONFIG_HOME-}" ] && printf %s "${HOME}/.nvm" || printf %s "${XDG_CONFIG_HOME}/nvm")"
    [ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh" # This loads nvm

    nvm install 14

    # Install pnpm
    npm i -g pnpm

    # Install packages
    pnpm i
    ```
3. Run the script
    ```bash
    pnpm run-ts
    ```

## What is expected

Expected to see success log with decoded `VersionedQueryResult`.

## What is actually happens

Unable to decode Iroha response. Partial decode trace:

```
VersionedQueryResult / <enum>::V1 / Value / <enum>::Identifiable / IdentifiableBox / <enum>::Domain / Domain / <struct>.accounts / BTreeMapAccountIdAccount / <map>.<value> / Account / <struct>.assets / BTreeMapAssetIdAsset / <map>.<key> / AssetId / <struct>.definition_id / DefinitionId / <struct>.name / str
    Walk: <offset: 162; …77 6f 6e 64 65 72 6c 61 6e 64 00 04 1c 65 64 32 35 35 31 39 80 9a b2 c1 fb 75 ca 9d db 66 2f 3f 70 bf 56 85 67 33 58 e4 b3 56 ef af 5d 30 d8 65 82 f2 dc 22 95 00 11 13 5c 74 72 61 6e 73 61 63 74 69 6f 6e 5f 73 69 67 6e 61 74 6f 72 69 65 73 13 4c 61 63 63 6f 75 6e 74 5f 73 69 67 6e 61 74 6f 72 69 65 73 00 00 00 00 00>
    Result: ERROR - TypeError [ERR_ENCODING_INVALID_ENCODED_DATA]: The encoded data was not valid for encoding utf-8
    Child steps: 0
```

You will see full trace when you run the script
