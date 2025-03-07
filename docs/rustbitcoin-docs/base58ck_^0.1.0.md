Docs.rs
  * base58ck-0.1.0
    * base58ck 0.1.0 
    * Docs.rs crate page 
    * CC0-1.0
    * Links
    * Repository 
    * crates.io 
    * Source 
    * Owners
    * apoelstra 
    * Dependencies
    *       * bitcoin_hashes ^0.14.0 _normal_
      * bitcoin-internals ^0.3.0 _normal_
      * hex-conservative ^0.2.0 _dev_
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


# Crate base58ck![Copy item path](https://docs.rs/-/rustdoc.static/clipboard-7571035ce49a181d.svg)
source · [−]
Expand description
Bitcoin base58 encoding and decoding.
This crate can be used in a no-std environment but requires an allocator.
## Modules§
  * error
Error code for the `base58` crate.


## Structs§
  * InvalidCharacterError
Found a invalid ASCII byte while decoding base58 string.
  * String`std`
A UTF-8–encoded, growable string.
  * Vec`std`
A contiguous growable array type, written as `Vec<T>`, short for ‘vector’.


## Enums§
  * Error
An error occurred during base58 decoding (with checksum).


## Functions§
  * decode
Decodes a base58-encoded string into a byte vector.
  * decode_check
Decodes a base58check-encoded string into a byte vector verifying the checksum.
  * encode
Encodes `data` as a base58 string (see also `base58::encode_check()`).
  * encode_check
Encodes `data` as a base58 string including the checksum.
  * encode_check_to_fmt
Encodes a slice as base58, including the checksum, into a formatter.


