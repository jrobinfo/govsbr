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
# Trait ToPublicKeyCopy item path
Settings
Help
SummarySource
```
pub trait ToPublicKey: MiniscriptKey {
  // Required methods
  fn to_public_key(&self) -> PublicKey;
  fn to_sha256(hash: &<Self as MiniscriptKey>::Sha256) -> Hash;
  fn to_hash256(hash: &<Self as MiniscriptKey>::Hash256) -> Hash;
  fn to_ripemd160(hash: &<Self as MiniscriptKey>::Ripemd160) -> Hash;
  fn to_hash160(hash: &<Self as MiniscriptKey>::Hash160) -> Hash;
  // Provided methods
  fn to_x_only_pubkey(&self) -> XOnlyPublicKey { ... }
  fn to_pubkeyhash(&self, sig_type: SigType) -> Hash { ... }
}
```
Expand description
Trait describing public key types which can be converted to bitcoin pubkeys
## Required Methods§
Source
#### fn to_public_key(&self) -> PublicKey
Converts an object to a public key
Source
#### fn to_sha256(hash: &<Self as MiniscriptKey>::Sha256) -> Hash
Converts the generic associated `MiniscriptKey::Sha256` to `sha256::Hash`
Source
#### fn to_hash256(hash: &<Self as MiniscriptKey>::Hash256) -> Hash
Converts the generic associated `MiniscriptKey::Hash256` to `hash256::Hash`
Source
#### fn to_ripemd160(hash: &<Self as MiniscriptKey>::Ripemd160) -> Hash
Converts the generic associated `MiniscriptKey::Ripemd160` to `ripemd160::Hash`
Source
#### fn to_hash160(hash: &<Self as MiniscriptKey>::Hash160) -> Hash
Converts the generic associated `MiniscriptKey::Hash160` to `hash160::Hash`
## Provided Methods§
Source
#### fn to_x_only_pubkey(&self) -> XOnlyPublicKey
Convert an object to x-only pubkey
Source
#### fn to_pubkeyhash(&self, sig_type: SigType) -> Hash
Obtain the public key hash for this MiniscriptKey Expects an argument to specify the signature type. This would determine whether to serialize the key as 32 byte x-only pubkey or regular public key when computing the hash160
## Dyn Compatibility§
This trait is **not** dyn compatible.
_In older versions of Rust, dyn compatibility was called "object safety", so this trait is not object safe._
## Implementations on Foreign Types§
Source§
### impl ToPublicKey for PublicKey
Source§
#### fn to_public_key(&self) -> PublicKey
Source§
#### fn to_sha256(hash: &Hash) -> Hash
Source§
#### fn to_hash256(hash: &Hash) -> Hash
Source§
#### fn to_ripemd160(hash: &Hash) -> Hash
Source§
#### fn to_hash160(hash: &Hash) -> Hash
Source§
### impl ToPublicKey for PublicKey
Source§
#### fn to_public_key(&self) -> PublicKey
Source§
#### fn to_sha256(hash: &Hash) -> Hash
Source§
#### fn to_hash256(hash: &Hash) -> Hash
Source§
#### fn to_ripemd160(hash: &Hash) -> Hash
Source§
#### fn to_hash160(hash: &Hash) -> Hash
Source§
### impl ToPublicKey for XOnlyPublicKey
Source§
#### fn to_public_key(&self) -> PublicKey
Source§
#### fn to_x_only_pubkey(&self) -> XOnlyPublicKey
Source§
#### fn to_sha256(hash: &Hash) -> Hash
Source§
#### fn to_hash256(hash: &Hash) -> Hash
Source§
#### fn to_ripemd160(hash: &Hash) -> Hash
Source§
#### fn to_hash160(hash: &Hash) -> Hash
## Implementors§
Source§
### impl ToPublicKey for DefiniteDescriptorKey
