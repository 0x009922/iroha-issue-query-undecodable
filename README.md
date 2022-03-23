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

## What actually happens

Unable to decode Iroha response. Partial decode trace:

```
VersionedQueryResult / <enum>::V1 / Value / <enum>::Identifiable / IdentifiableBox / <enum>::Domain / Domain / <struct>.accounts / BTreeMapAccountIdAccount / <map>.<value> / Account / <struct>.assets / BTreeMapAssetIdAsset / <map>.<key> / AssetId / <struct>.definition_id / DefinitionId / <struct>.name / str
    Walk: <offset: 162; …77 6f 6e 64 65 72 6c 61 6e 64 00 04 1c 65 64 32 35 35 31 39 80 9a b2 c1 fb 75 ca 9d db 66 2f 3f 70 bf 56 85 67 33 58 e4 b3 56 ef af 5d 30 d8 65 82 f2 dc 22 95 00 11 13 5c 74 72 61 6e 73 61 63 74 69 6f 6e 5f 73 69 67 6e 61 74 6f 72 69 65 73 13 4c 61 63 63 6f 75 6e 74 5f 73 69 67 6e 61 74 6f 72 69 65 73 00 00 00 00 00>
    Result: ERROR - TypeError [ERR_ENCODING_INVALID_ENCODED_DATA]: The encoded data was not valid for encoding utf-8
    Child steps: 0
```

You will see full trace when you run the script

## Env info

```bash

$ pnpx envinfo

  System:
    OS: macOS 12.2.1
    CPU: (8) arm64 Apple M1
    Memory: 123.11 MB / 16.00 GB
    Shell: 5.8 - /bin/zsh
  Binaries:
    Node: 14.17.6 - ~/.nvm/versions/node/v14.17.6/bin/node
    Yarn: 1.22.18 - ~/.nvm/versions/node/v14.17.6/bin/yarn
    npm: 6.14.15 - ~/.nvm/versions/node/v14.17.6/bin/npm
  Managers:
    Cargo: 1.59.0 - ~/.cargo/bin/cargo
    Homebrew: 3.3.3 - /opt/homebrew/bin/brew
    pip3: 20.2.3 - /usr/bin/pip3
    RubyGems: 3.0.3.1 - /usr/bin/gem
  Utilities:
    Make: 3.81 - /usr/bin/make
    GCC: 4.2.1 - /usr/bin/gcc
    Git: 2.32.0 - /usr/bin/git
    Clang: 13.0.0 - /usr/bin/clang
  Servers:
    Apache: 2.4.51 - /usr/sbin/apachectl
  Virtualization:
    Docker: 20.10.7 - /usr/local/bin/docker
  IDEs:
    Nano: 2.0.6 - /usr/bin/nano
    Vim: 8.2 - /usr/bin/vim
    Xcode: /undefined - /usr/bin/xcodebuild
  Languages:
    Bash: 3.2.57 - /bin/bash
    Elixir: 1.12.3 - /opt/homebrew/bin/elixir
    Erlang: 24.1.4 - /opt/homebrew/bin/erl
    Perl: 5.30.3 - /usr/bin/perl
    Python: 2.7.18 - /usr/bin/python
    Python3: 3.8.9 - /usr/bin/python3
    Ruby: 2.6.8 - /usr/bin/ruby
    Rust: 1.59.0 - /Users/0x/.cargo/bin/rustc
  Databases:
    SQLite: 3.36.0 - /usr/bin/sqlite3
  Browsers:
    Chrome: 99.0.4844.83
    Firefox: 98.0.1
    Safari: 15.3
```
