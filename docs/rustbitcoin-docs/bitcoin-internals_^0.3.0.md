Docs.rs
  * bitcoin-internals-0.3.0
    * bitcoin-internals 0.3.0 
    * Docs.rs crate page 
    * CC0-1.0
    * Links
    * Repository 
    * crates.io 
    * Source 
    * Owners
    * apoelstra 
    * Dependencies
    *       * serde ^1.0.103 _normal_ _optional_
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


# Crate bitcoin_internals![Copy item path](https://docs.rs/-/rustdoc.static/clipboard-7571035ce49a181d.svg)
source · [−]
Expand description
## §Rust Bitcoin Internal
This crate is only meant to be used internally by crates in the rust-bitcoin ecosystem.
## Modules§
  * array_vec
A simplified `Copy` version of `arrayvec::ArrayVec`.
  * const_tools
Contains tools (workarounds) to make implementing `const fn`s easier.
  * error
Error
  * macros
Various macros used by the Rust Bitcoin ecosystem.
  * serde
Contains extensions of `serde` and internal reexports.


## Macros§
  * concat_bytes_to_arr
Concatenates two byte slices or byte arrays (or combination) to a single array.
  * cond_const
Enables const fn in specified Rust version
  * const_assert
Asserts a boolean expression at compile time.
  * copy_byte_array_from_slice
Copies first `$len` bytes from `$slice` and returns them as an array.
  * debug_from_display
Implements `Debug` by calling through to `Display`.
  * impl_array_newtype
Implements standard array methods for a given wrapper type.
  * impl_from_infallible
Derives `From<core::convert::Infallible>` for the given type.
  * impl_parse
Implements conversions from various string types.
  * impl_parse_and_serde
Implements conversions from various string types as well as `serde` (de)serialization.
  * parse_error_type
Creates an error type intended for string parsing errors.
  * write_err
Formats error.


