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
# Trait ForEachKeyCopy item path
Settings
Help
SummarySource
```
pub trait ForEachKey<Pk: MiniscriptKey> {
  // Required method
  fn for_each_key<'a, F: FnMut(&'a Pk) -> bool>(&'a self, pred: F) -> bool
    where Pk: 'a;
  // Provided method
  fn for_any_key<'a, F: FnMut(&'a Pk) -> bool>(&'a self, pred: F) -> bool
    where Pk: 'a { ... }
}
```
Expand description
Either a key or keyhash, but both contain Pk Trait describing the ability to iterate over every key
## Required Methods§
Source
#### fn for_each_key<'a, F: FnMut(&'a Pk) -> bool>(&'a self, pred: F) -> bool
where Pk: 'a,
Run a predicate on every key in the descriptor, returning whether the predicate returned true for every key
## Provided Methods§
Source
#### fn for_any_key<'a, F: FnMut(&'a Pk) -> bool>(&'a self, pred: F) -> bool
where Pk: 'a,
Run a predicate on every key in the descriptor, returning whether the predicate returned true for any key
## Dyn Compatibility§
This trait is **not** dyn compatible.
_In older versions of Rust, dyn compatibility was called "object safety", so this trait is not object safe._
## Implementors§
Source§
### impl<Pk: MiniscriptKey> ForEachKey<Pk> for Descriptor<Pk>
Source§
### impl<Pk: MiniscriptKey> ForEachKey<Pk> for miniscript::policy::concrete::Policy<Pk>
Source§
### impl<Pk: MiniscriptKey> ForEachKey<Pk> for miniscript::policy::semantic::Policy<Pk>
Source§
### impl<Pk: MiniscriptKey> ForEachKey<Pk> for Bare<Pk>
Source§
### impl<Pk: MiniscriptKey> ForEachKey<Pk> for Pkh<Pk>
Source§
### impl<Pk: MiniscriptKey> ForEachKey<Pk> for Sh<Pk>
Source§
### impl<Pk: MiniscriptKey> ForEachKey<Pk> for Tr<Pk>
Source§
### impl<Pk: MiniscriptKey> ForEachKey<Pk> for Wpkh<Pk>
Source§
### impl<Pk: MiniscriptKey> ForEachKey<Pk> for Wsh<Pk>
Source§
### impl<Pk: MiniscriptKey, Ctx: ScriptContext> ForEachKey<Pk> for SortedMultiVec<Pk, Ctx>
Source§
### impl<Pk: MiniscriptKey, Ctx: ScriptContext> ForEachKey<Pk> for Miniscript<Pk, Ctx>
