Docs.rs
  * bitcoin-0.32.5
    * bitcoin 0.32.5 
    * Permalink 
    * Docs.rs crate page 
    * CC0-1.0
    * Links
    * Repository 
    * crates.io 
    * Source 
    * Owners
    * apoelstra 
    * TheBlueMatt 
    * Dependencies
    *       * serde ^1.0.103 _normal_ _optional_
      * base58ck ^0.1.0 _normal_
      * base64 ^0.21.3 _normal_ _optional_
      * bech32 ^0.11.0 _normal_
      * bitcoinconsensus ^0.105.0 _normal_ _optional_
      * bitcoin_hashes ^0.14.0 _normal_
      * hex-conservative ^0.2.0 _normal_
      * hex_lit ^0.1.1 _normal_
      * bitcoin-internals ^0.3.0 _normal_
      * bitcoin-io ^0.1.1 _normal_
      * ordered ^0.2.0 _normal_ _optional_
      * secp256k1 ^0.29.0 _normal_
      * bitcoin-units ^0.1.0 _normal_
      * bincode ^1.3.1 _dev_
      * serde_json ^1.0.0 _dev_
      * serde_test ^1.0.19 _dev_
    * Versions
    * **100%** of the crate is documented 
  * Platform
    * x86_64-unknown-linux-gnu
  * Feature flags


  * Rust
    * About docs.rs 
    * Privacy policy 
    * Rust website 
    * The Book 
    * Standard Library API Reference 
    * Rust by Example 
    * The Cargo Guide 
    * Clippy Documentation 


# Crate bitcoinCopy item path
Settings
Help
SummarySource
Expand description
## §Rust Bitcoin Library
This is a library that supports the Bitcoin network protocol and associated primitives. It is designed for Rust programs built to work with the Bitcoin network.
Except for its dependency on libsecp256k1 (and optionally libbitcoinconsensus), this library is written entirely in Rust. It illustrates the benefits of strong type safety, including ownership and lifetime, for financial and/or cryptographic software.
See README.md for detailed documentation about development and supported environments.
### §Available feature flags
  * `std` - the usual dependency on `std` (default).
  * `secp-recovery` - enables calculating public key from a signature and message.
  * `base64` - (dependency), enables encoding of PSBTs and message signatures.
  * `rand` - (dependency), makes it more convenient to generate random values.
  * `serde` - (dependency), implements `serde`-based serialization and deserialization.
  * `secp-lowmemory` - optimizations for low-memory devices.
  * `bitcoinconsensus-std` - enables `std` in `bitcoinconsensus` and communicates it to this crate so it knows how to implement `std::error::Error`. At this time there’s a hack to achieve the same without this feature but it could happen the implementations diverge one day.
  * `ordered` - (dependency), adds implementations of `ArbitraryOrdOrd` to some structs.


## Re-exports§

`pub extern crate base58;`


`pub extern crate base64;`


`pub extern crate bech32;`


`pub extern crate hashes;`


`pub extern crate hex;`


`pub extern crate io;`


`pub extern crate ordered;`


`pub extern crate secp256k1;`

## Modules§

absolute
    Provides type `LockTime` that implements the logic around nLockTime/OP_CHECKLOCKTIMEVERIFY.

address
    Bitcoin addresses.

amount
    Bitcoin amounts.

bip32
    BIP32 implementation.

bip152
    BIP152 Compact Blocks

bip158
    BIP 158 Compact Block Filters for Light Clients.

block
    Bitcoin blocks.

blockdata
    Bitcoin block data.

consensus
    Bitcoin consensus.

constants
    Blockdata constants.

ecdsa
    ECDSA Bitcoin signatures.

error
    Contains error types and other error handling tools.

hash_types
    Bitcoin hash types.

key
    Bitcoin keys.

locktime
    Provides absolute and relative locktimes.

merkle_tree
    Bitcoin merkle tree functions.

network
    Bitcoin network.

opcodes
    Bitcoin script opcodes.

p2p
    Bitcoin p2p network types.

params
    Bitcoin consensus parameters.

parse
    Unit parsing utilities.

policy
    Bitcoin policy.

pow
    Proof-of-work related integer types.

psbt
    Partially Signed Bitcoin Transactions.

relative
    Provides type `LockTime` that implements the logic around nSequence/OP_CHECKSEQUENCEVERIFY.

script
    Bitcoin scripts.

sighash
    Signature hash implementation (used in transaction signing).

sign_message
    Signature

taproot
    Bitcoin Taproot.

transaction
    Bitcoin transactions.

witness
    Witness

witness_program
    The segregated witness program as defined by BIP141.

witness_version
    The segregated witness version byte as defined by BIP141.
## Structs§

Address
    A Bitcoin address.

Amount
    Amount

Block
    Bitcoin block.

BlockHash
    A bitcoin block hash.

CompactTarget
    Encoding of 256-bit target as 32-bit float.

CompressedPublicKey
    An always-compressed Bitcoin ECDSA public key

FeeRate
    Re-export everything from the `units::fee_rate` module. Represents fee rate.

FilterHash
    Filter hash, as defined in BIP-157

FilterHeader
    Filter header, as defined in BIP-157

LegacySighash
    Hash of a transaction according to the legacy signature algorithm.

MerkleBlock
    Data structure that represents a block header paired to a partial merkle tree.

Opcode
    A script Opcode.

OutPoint
    A reference to a transaction output.

PrivateKey
    A Bitcoin ECDSA private key

Psbt
    A Partially Signed Transaction.

PubkeyHash
    A hash of a public key.

PublicKey
    A Bitcoin ECDSA public key

Script
    Bitcoin script slice.

ScriptBuf
    An owned, growable script.

ScriptHash
    A hash of Bitcoin Script bytecode.

SegwitV0Sighash
    Hash of a transaction according to the segwit version 0 signature algorithm.

Sequence
    Bitcoin transaction input sequence number.

SignedAmount
    SignedAmount

TapBranchTag
    The tag used for `TapNodeHash`

TapLeafHash
    Taproot-tagged hash with tag "TapLeaf".

TapLeafTag
    The tag used for `TapLeafHash`

TapNodeHash
    Tagged hash used in taproot trees.

TapSighash
    Taproot-tagged hash with tag "TapSighash".

TapSighashTag
    The tag used for `TapSighash`

TapTweakHash
    Taproot-tagged hash with tag "TapTweak".

TapTweakTag
    The tag used for `TapTweakHash`

Target
    A 256 bit integer representing target.

Transaction
    Bitcoin transaction.

TxIn
    Bitcoin transaction input.

TxMerkleNode
    A hash of the Merkle tree branch or root for transactions.

TxOut
    Bitcoin transaction output.

Txid
    A bitcoin transaction hash/transaction ID.

VarInt
    A variable-length unsigned integer.

WPubkeyHash
    SegWit version of a public key hash.

WScriptHash
    SegWit version of a Bitcoin Script bytecode hash.

Weight
    Re-export everything from the `units::weight` module. Represents block weight - the weight of a transaction or block.

Witness
    The Witness is the data used to unlock bitcoin since the segwit upgrade.

WitnessCommitment
    A hash corresponding to the witness structure commitment in the coinbase transaction.

WitnessMerkleNode
    A hash corresponding to the Merkle tree root for witness data.

WitnessProgram
    The segregated witness program.

Work
    A 256 bit integer representing work.

Wtxid
    A bitcoin witness transaction ID.

XKeyIdentifier
    Extended key identifier as defined in BIP-32.

XOnlyPublicKey
    An x-only public key, used for verification of Taproot signatures and serialized according to BIP-340.
## Enums§

AddressType
    The different types of addresses.

Denomination
    A set of denominations in which amounts can be expressed.

EcdsaSighashType
    Hashtype of an input’s signature, encoded in the last byte of the signature.

KnownHrp
    Known bech32 human-readable parts.

Network
    The cryptocurrency network to act on.

NetworkKind
    What kind of network we are on.

TapSighashType
    Hashtype of an input’s signature, encoded in the last byte of the signature. Fixed values so they can be cast as integer types for encoding.

WitnessVersion
    Version of the segregated witness program.
