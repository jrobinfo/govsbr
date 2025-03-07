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
# Module interpreterCopy item path
Settings
Help
SummarySource
Expand description
Interpreter
Provides a Miniscript-based script interpreter which can be used to iterate over the set of conditions satisfied by a spending transaction, assuming that the spent coin was descriptor controlled.
## Structs§

Interpreter
    An iterable Miniscript-structured representation of the spending of a coin

Iter
    Iterator over all the constraints satisfied by a completed scriptPubKey and witness stack
## Enums§

Error
    Detailed Error type for Interpreter

HashLockType
    Type of HashLock used for SatisfiedConstraint structure

KeySigPair
    A type for representing signatures supported as of bitcoin core 22.0

SatisfiedConstraint
    A satisfied Miniscript condition (Signature, Hashlock, Timelock) ’intp represents the lifetime of descriptor and `stack represents the lifetime of witness
