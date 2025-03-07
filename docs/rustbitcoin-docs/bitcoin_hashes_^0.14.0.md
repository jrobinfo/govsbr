Docs.rs
  * bitcoin_hashes-0.14.0
    * bitcoin_hashes 0.14.0 
    * Docs.rs crate page 
    * CC0-1.0
    * Links
    * Repository 
    * crates.io 
    * Source 
    * Owners
    * apoelstra 
    * TheBlueMatt 
    * Dependencies
    *       * bitcoin-io ^0.1.1 _normal_ _optional_
      * hex-conservative ^0.2.0 _normal_
      * schemars ^0.8.3 _normal_ _optional_
      * serde ^1.0 _normal_ _optional_
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


# Crate bitcoin_hashes![Copy item path](https://docs.rs/-/rustdoc.static/clipboard-7571035ce49a181d.svg)
source · [−]
Expand description
Rust hashes library.
This is a simple, no-dependency library which implements the hash functions needed by Bitcoin. These are SHA256, SHA256d, and RIPEMD160. As an ancillary thing, it exposes hexadecimal serialization and deserialization, since these are needed to display hashes anway.
### §Commonly used operations
Hashing a single byte slice or a string:
```
use bitcoin_hashes::sha256;
use bitcoin_hashes::Hash;
let bytes = [0u8; 5];
let hash_of_bytes = sha256::Hash::hash(&bytes);
let hash_of_string = sha256::Hash::hash("some string".as_bytes());
```

Hashing content from a reader:
```
use bitcoin_hashes::sha256;
use bitcoin_hashes::Hash;
#[cfg(std)]
let mut reader: &[u8] = b"hello"; // in real code, this could be a `File` or `TcpStream`
let mut engine = sha256::HashEngine::default();
std::io::copy(&mut reader, &mut engine)?;
let hash = sha256::Hash::from_engine(engine);
#[cfg(not(std))]
```

Hashing content by `std::io::Write` on HashEngine:
```
use bitcoin_hashes::sha256;
use bitcoin_hashes::Hash;
use std::io::Write;
#[cfg(std)]
let mut part1: &[u8] = b"hello";
let mut part2: &[u8] = b" ";
let mut part3: &[u8] = b"world";
let mut engine = sha256::HashEngine::default();
engine.write_all(part1)?;
engine.write_all(part2)?;
engine.write_all(part3)?;
let hash = sha256::Hash::from_engine(engine);
#[cfg(not(std))]
```

## Re-exports§
  * `pub extern crate hex;`
  * `pub extern crate serde;`
  * `pub use hmac::Hmac;`
  * `pub use hmac::HmacEngine;`


## Modules§
  * cmp
Useful comparison functions.
  * hash160
HASH160 (SHA256 then RIPEMD160) implementation.
  * hmac
Hash-based Message Authentication Code (HMAC).
  * ripemd160
RIPEMD160 implementation.
  * serde_macros
Macros for serde trait implementations, and supporting code.
  * sha1
SHA1 implementation.
  * sha256
SHA256 implementation.
  * sha256d
SHA256d implementation (double SHA256).
  * sha256t
SHA256t implementation (tagged SHA256).
  * sha384
SHA384 implementation.
  * sha512
SHA512 implementation.
  * sha512_256
SHA512_256 implementation.
  * siphash24
SipHash 2-4 implementation.


## Macros§
  * borrow_slice_impl
Adds slicing traits implementations to a given type `$ty`
  * hash_newtype
Creates a new newtype around a `Hash` type.
  * hex_fmt_impl
Adds hexadecimal formatting implementation of a trait `$imp` to a given type `$ty`.
  * serde_impl`serde`
Implements `Serialize` and `Deserialize` for a type `$t` which represents a newtype over a byte-slice over length `$len`.
  * sha256t_hash_newtype
Macro used to define a newtype tagged hash.


## Structs§
  * FromSliceError
Attempted to create a hash from an invalid length slice.


## Traits§
  * Hash
Trait which applies to hashes of all types.
  * HashEngine
A hashing engine which bytes can be serialized into.


