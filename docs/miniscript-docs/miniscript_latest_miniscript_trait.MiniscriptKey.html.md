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
# Trait MiniscriptKeyCopy item path
Settings
Help
SummarySource
```
pub trait MiniscriptKey:
  Clone
  + Eq
  + Ord
  + Debug
  + Display
  + Hash {
  type Sha256: Clone + Eq + Ord + Display + Debug + Hash;
  type Hash256: Clone + Eq + Ord + Display + Debug + Hash;
  type Ripemd160: Clone + Eq + Ord + Display + Debug + Hash;
  type Hash160: Clone + Eq + Ord + Display + Debug + Hash;
  // Provided methods
  fn is_uncompressed(&self) -> bool { ... }
  fn is_x_only_key(&self) -> bool { ... }
  fn num_der_paths(&self) -> usize { ... }
}
```
Expand description
Public key trait which can be converted to Hash type
## Required Associated Types§
Source
#### type Sha256: Clone + Eq + Ord + Display + Debug + Hash
The associated `bitcoin::hashes::sha256::Hash` for this `MiniscriptKey`, used in the sha256 fragment.
Source
#### type Hash256: Clone + Eq + Ord + Display + Debug + Hash
The associated `miniscript::hash256::Hash` for this `MiniscriptKey`, used in the hash256 fragment.
Source
#### type Ripemd160: Clone + Eq + Ord + Display + Debug + Hash
The associated `bitcoin::hashes::ripemd160::Hash` for this `MiniscriptKey` type, used in the ripemd160 fragment.
Source
#### type Hash160: Clone + Eq + Ord + Display + Debug + Hash
The associated `bitcoin::hashes::hash160::Hash` for this `MiniscriptKey` type, used in the hash160 fragment.
## Provided Methods§
Source
#### fn is_uncompressed(&self) -> bool
Returns true if the pubkey is uncompressed. Defaults to `false`.
Source
#### fn is_x_only_key(&self) -> bool
Returns true if the pubkey is an x-only pubkey. Defaults to `false`.
Source
#### fn num_der_paths(&self) -> usize
Returns the number of different derivation paths in this key. Only >1 for keys in BIP389 multipath descriptors.
## Dyn Compatibility§
This trait is **not** dyn compatible.
_In older versions of Rust, dyn compatibility was called "object safety", so this trait is not object safe._
## Implementations on Foreign Types§
Source§
### impl MiniscriptKey for String
Source§
#### type Sha256 = String
Source§
#### type Hash256 = String
Source§
#### type Ripemd160 = String
Source§
#### type Hash160 = String
Source§
### impl MiniscriptKey for PublicKey
Source§
#### fn is_uncompressed(&self) -> bool
Returns the compressed-ness of the underlying secp256k1 key.
Source§
#### type Sha256 = Hash
Source§
#### type Hash256 = Hash
Source§
#### type Ripemd160 = Hash
Source§
#### type Hash160 = Hash
Source§
### impl MiniscriptKey for PublicKey
Source§
#### type Sha256 = Hash
Source§
#### type Hash256 = Hash
Source§
#### type Ripemd160 = Hash
Source§
#### type Hash160 = Hash
Source§
### impl MiniscriptKey for XOnlyPublicKey
Source§
#### type Sha256 = Hash
Source§
#### type Hash256 = Hash
Source§
#### type Ripemd160 = Hash
Source§
#### type Hash160 = Hash
Source§
#### fn is_x_only_key(&self) -> bool
## Implementors§
Source§
### impl MiniscriptKey for DescriptorPublicKey
Source§
#### type Sha256 = Hash
Source§
#### type Hash256 = Hash
Source§
#### type Ripemd160 = Hash
Source§
#### type Hash160 = Hash
Source§
### impl MiniscriptKey for DefiniteDescriptorKey
Source§
#### type Sha256 = Hash
Source§
#### type Hash256 = Hash
Source§
#### type Ripemd160 = Hash
Source§
#### type Hash160 = Hash
