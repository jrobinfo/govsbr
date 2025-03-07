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
# Module expressionCopy item path
Settings
Help
SummarySource
Expand description
## §Function-like Expression Language
## Structs§

Tree
    A token of the form `x(...)` or `x`
## Enums§

ParseThresholdError
    Error parsing a threshold expression.
## Constants§

INPUT_CHARSET
    Allowed characters are descriptor strings.

VALID_CHARS
    Map of valid characters in descriptor strings.
## Traits§

FromTree
    A trait for extracting a structure from a Tree representation in token form
## Functions§

binary
    Attempts to parse an expression with exactly two children

check_valid_chars
    Filter out non-ASCII because we byte-index strings all over the place and Rust gets very upset when you splinch a string.

parse_num
    Parse a string as a u32, for timelocks or thresholds

terminal
    Attempts to parse a terminal expression

unary
    Attempts to parse an expression with exactly one child
