Docs.rs
  * hex-conservative-0.2.1
    * hex-conservative 0.2.1 
    * Docs.rs crate page 
    * CC0-1.0
    * Links
    * Repository 
    * crates.io 
    * Source 
    * Owners
    * apoelstra 
    * Dependencies
    *       * arrayvec ^0.7.2 _normal_
      * core2 ^0.3.2 _normal_ _optional_
      * serde ^1.0 _normal_ _optional_
      * serde ^1.0 _dev_
      * serde_json ^1.0 _dev_
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


# Crate hex_conservativeCopy item path
source · [−]
Expand description
Hex encoding and decoding.
General purpose hex encoding/decoding library with a conservative MSRV and dependency policy.
### §Basic Usage
```
// In your manifest use the `package` key to improve import ergonomics.
// hex = { package = "hex-conservative", version = "*" }
use hex::prelude::*;
// Decode an arbitrary length hex string into a vector.
let v = Vec::from_hex("deadbeef").expect("valid hex digits");
// Or a known length hex string into a fixed size array.
let a = <[u8; 4]>::from_hex("deadbeef").expect("valid length and valid hex digits");
// We support `LowerHex` and `UpperHex` out of the box for `[u8]` slices.
println!("An array as lower hex: {:x}", a.as_hex());
// And for vecs since `Vec` derefs to byte slice.
println!("A vector as upper hex: {:X}", v.as_hex());
// Allocate a new string (also `to_upper_hex_string`).
let s = v.to_lower_hex_string();
// Please note, mixed case strings will still parse successfully but we only
// support displaying hex in a single case.
assert_eq!(
  Vec::from_hex("dEaDbEeF").expect("valid mixed case hex digits"),
  Vec::from_hex("deadbeef").expect("valid hex digits"),
);
```

## Modules§
  * buf_encoder
Implements a buffered encoder.
  * display
Helpers for displaying bytes as hex strings.
  * error
Error code for the `hex-conservative` crate.
  * parse
Hex encoding and decoding.
  * prelude
Re-exports of the common crate traits.
  * serde`serde`
Hex encoding with `serde`.


## Macros§
  * fmt_hex_exact
Format known-length array as hex.
  * impl_fmt_traits
Adds `core::fmt` trait implementations to type `$ty`.
  * test_hex_unwrap
Quick and dirty macro for parsing hex in tests.
  * write_err
Formats error.


## Structs§
  * BytesToHexIter
Iterator over bytes which encodes the bytes and yields hex characters.
  * HexToBytesIter
Iterator yielding bytes decoded from an iterator of pairs of hex digits.
  * InvalidCharError
Invalid hex character.
  * OddLengthStringError
Purported hex string had odd length.


## Enums§
  * Case
Possible case of hex.
  * HexToArrayError
Hex decoding error.
  * HexToBytesError
Hex decoding error.


## Traits§
  * DisplayHex
Extension trait for types that can be displayed as hex.
  * FromHex
Trait for objects that can be deserialized from hex strings.


## Type Aliases§
  * HexSliceToBytesIter
Convenience alias for `HexToBytesIter<HexDigitsIter<'a>>`.


