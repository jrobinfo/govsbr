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
# Module policyCopy item path
Settings
Help
SummarySource
Expand description
Script Policies
Tools for representing Bitcoin scriptpubkeys as abstract spending policies. These may be compiled to Miniscript, which contains extra information to describe the exact representation as Bitcoin script.
The format represents EC public keys abstractly to allow wallets to replace these with BIP32 paths, pay-to-contract instructions, etc.
## Re-exports§

`pub use self::concrete::Policy as Concrete;`


`pub use self::semantic::Policy as Semantic;`

## Modules§

concrete
    Concrete Policies

semantic
    Abstract Policies
## Enums§

LiftError
    Error occurring during lifting.
## Traits§

Liftable
    Trait describing script representations which can be lifted into an abstract policy, by discarding information.
