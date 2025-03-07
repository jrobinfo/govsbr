Docs.rs
  * bitcoin-units-0.1.2
    * bitcoin-units 0.1.2 
    * Docs.rs crate page 
    * CC0-1.0
    * Links
    * Repository 
    * crates.io 
    * Source 
    * Owners
    * apoelstra 
    * Dependencies
    *       * bitcoin-internals ^0.3.0 _normal_
      * serde ^1.0.103 _normal_ _optional_
      * serde_json ^1.0 _dev_
      * serde_test ^1.0 _dev_
    * Versions
    * **100%** of the crate is documented 
  * Go to latest version
  * Platform
    * i686-pc-windows-msvc
    * i686-unknown-linux-gnu
    * x86_64-apple-darwin
    * x86_64-pc-windows-msvc
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


# Crate bitcoin_unitsCopy item path
source · [−]
Expand description
Rust Bitcoin units library
This library provides basic types used by the Rust Bitcoin ecosystem.
## Re-exports§
  * `pub extern crate serde;`
  * `pub use self::amount::ParseAmountError;`
  * `pub use self::parse::ParseIntError;`
`alloc`


## Modules§
  * amount
Bitcoin amounts.
  * fee_rate`alloc`
Implements `FeeRate` and assoctiated features.
  * locktime`alloc`
Provides absolute and relative locktimes.
  * parse`alloc`
Parsing utilities.
  * weight`alloc`
Implements `Weight` and associated features.


## Macros§
  * impl_parse_str`alloc`
Implements standard parsing traits for `$type` by calling into `$inner_fn`.
  * impl_parse_str_from_int_infallible`alloc`
Implements `FromStr` and `TryFrom<{&str, String, Box<str>}> for $to` using `parse::int`, mapping the output using infallible conversion function `fn`.
  * impl_tryfrom_str`alloc`
Implements `TryFrom<$from> for $to`.
  * impl_tryfrom_str_from_int_infallible`alloc`
Implements `TryFrom<$from> for $to` using `parse::int`, mapping the output using infallible conversion function `fn`.


## Structs§
  * Amount
Amount
  * FeeRate`alloc`
Represents fee rate.
  * SignedAmount
SignedAmount
  * Weight`alloc`
Represents block weight - the weight of a transaction or block.


