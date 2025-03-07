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
# Macro translate_hash_cloneCopy item path
Settings
Help
SummarySource
```
macro_rules! translate_hash_clone {
  ($source: ty, $target:ty, $error_ty: ty) => { ... };
}
```
Expand description
Macro for translation of associated types where the associated type is the same Handy for Derived -> concrete keys where the associated types are the same.
Writing the complete translator trait is tedious. This macro is handy when we are not trying the associated types for hash160, ripemd160, hash256 and sha256.
See also `crate::translate_hash_fail`
