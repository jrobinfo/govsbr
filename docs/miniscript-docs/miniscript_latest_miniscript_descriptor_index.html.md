Docs.rs
  * miniscript-12.3.0
    * miniscript 12.3.0 
    * Permalink 
    * Docs.rs crate page 
    * CC0-1.0
    * Links
    * Homepage 
    * Repository 
    * crates.io 
    * Source 
    * Owners
    * apoelstra 
    * sanket1729 
    * Dependencies
    *       * serde ^1.0.103 _normal_ _optional_
      * bech32 ^0.11.0 _normal_
      * bitcoin ^0.32.0 _normal_
      * bitcoin ^0.32.0 _dev_
      * secp256k1 ^0.29.0 _dev_
      * serde_test ^1.0.147 _dev_
    * Versions
    * **100%** of the crate is documented 
  * Platform
    * i686-unknown-linux-gnu
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


miniscript
# Module descriptorCopy item path
Settings
Help
SummarySource
Expand description
## §Output Descriptors
Tools for representing Bitcoin output’s scriptPubKeys as abstract spending policies known as “output descriptors”. These include a Miniscript which describes the actual signing policy, as well as the blockchain format (P2SH, Segwit v0, etc.)
The format represents EC public keys abstractly to allow wallets to replace these with BIP32 paths, pay-to-contract instructions, etc.
## Modules§

checksum
    Descriptor checksum
## Structs§

Bare
    Create a Bare Descriptor. That is descriptor that is not wrapped in sh or wsh. This covers the Pk descriptor

DefiniteDescriptorKey
    A `DescriptorPublicKey` without any wildcards.

DerivPaths
    The derivation paths in a multipath key expression.

DescriptorKeyParseError
    Descriptor Key parsing errors

DescriptorMultiXKey
    Instance of one or more extended keys, as specified in BIP 389.

DescriptorXKey
    An extended key with origin, derivation path, and wildcard.

Pkh
    A bare PkH descriptor at top level

Sh
    A Legacy p2sh Descriptor

SinglePriv
    A descriptor `bitcoin::PrivateKey` with optional origin information.

SinglePub
    A descriptor `SinglePubKey` with optional origin information.

SortedMultiVec
    Contents of a “sortedmulti” descriptor

Tr
    A taproot descriptor

Wpkh
    A bare Wpkh descriptor at top level

Wsh
    A Segwitv0 wsh descriptor
## Enums§

ConversionError
    Descriptor key conversion error

Descriptor
    Script descriptor

DescriptorPublicKey
    The descriptor pubkey, either a single pubkey or an xpub.

DescriptorSecretKey
    The descriptor secret key, either a single private key or an xprv.

DescriptorType
    Descriptor Type of the descriptor

ShInner
    Sh Inner

SinglePubKey
    Single public key without any origin or range information.

TapTree
    A Taproot Tree representation.

Wildcard
    Whether a descriptor has a wildcard in it

WshInner
    Wsh Inner
## Traits§

InnerXKey
    Trait for “extended key” types like `xpub` and `xprv`. Used internally to generalize parsing and handling of `bip32::Xpub` and `bip32::Xpriv`.
## Type Aliases§

KeyMap
    Alias type for a map of public key to secret key
