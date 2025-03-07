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
# Trait TranslatorCopy item path
Settings
Help
SummarySource
```
pub trait Translator<P, Q, E>
where
  P: MiniscriptKey,
  Q: MiniscriptKey,
{
  // Required methods
  fn pk(&mut self, pk: &P) -> Result<Q, E>;
  fn sha256(&mut self, sha256: &P::Sha256) -> Result<Q::Sha256, E>;
  fn hash256(&mut self, hash256: &P::Hash256) -> Result<Q::Hash256, E>;
  fn ripemd160(&mut self, ripemd160: &P::Ripemd160) -> Result<Q::Ripemd160, E>;
  fn hash160(&mut self, hash160: &P::Hash160) -> Result<Q::Hash160, E>;
}
```
Expand description
Describes an object that can translate various keys and hashes from one key to the type associated with the other key. Used by the `TranslatePk` trait to do the actual translations.
## Required Methods§
Source
#### fn pk(&mut self, pk: &P) -> Result<Q, E>
Translates public keys P -> Q.
Source
#### fn sha256(&mut self, sha256: &P::Sha256) -> Result<Q::Sha256, E>
Provides the translation from P::Sha256 -> Q::Sha256
Source
#### fn hash256(&mut self, hash256: &P::Hash256) -> Result<Q::Hash256, E>
Provides the translation from P::Hash256 -> Q::Hash256
Source
#### fn ripemd160(&mut self, ripemd160: &P::Ripemd160) -> Result<Q::Ripemd160, E>
Translates ripemd160 hashes from P::Ripemd160 -> Q::Ripemd160
Source
#### fn hash160(&mut self, hash160: &P::Hash160) -> Result<Q::Hash160, E>
Translates hash160 hashes from P::Hash160 -> Q::Hash160
## Implementors§
