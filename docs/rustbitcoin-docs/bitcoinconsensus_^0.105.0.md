Docs.rs
  * bitcoinconsensus-0.105.0+25.1
    * bitcoinconsensus 0.105.0+25.1 
    * Docs.rs crate page 
    * Apache-2.0
    * Links
    * Homepage 
    * Repository 
    * crates.io 
    * Source 
    * Owners
    * apoelstra 
    * TheBlueMatt 
    * tamasblummer 
    * stevenroose 
    * Dependencies
    *       * rustc-serialize ^0.3 _dev_
      * cc ^1.0.28 _build_
    * Versions
    * **91.3%** of the crate is documented 
  * Go to latest version
  * Platform
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


# Crate bitcoinconsensus![Copy item path](https://docs.rs/-/rustdoc.static/clipboard-7571035ce49a181d.svg)
source · [−]
Expand description
This project builds the `libbitcoinconsensus` library from Bitcoin’s C++ sources using Cargo and provides Rust bindings to its API.
Quoting from `bitcoin/doc/shared-libraries.md`:
> The purpose of this library is to make the verification functionality that is critical to Bitcoin’s consensus available to other applications, e.g. to language bindings.
And that is exactly what this library is, the Rust bindings to `bitcoinconsensus`.
## Modules§
  * ffi


## Enums§
  * Error
Errors returned by `libbitcoinconsensus`.


## Constants§
  * VERIFY_ALL
  * VERIFY_CHECKLOCKTIMEVERIFY
Enable CHECKLOCKTIMEVERIFY (BIP65).
  * VERIFY_CHECKSEQUENCEVERIFY
Enable CHECKSEQUENCEVERIFY (BIP112).
  * VERIFY_DERSIG
Enforce strict DER (BIP66) compliance.
  * VERIFY_NONE
Do not enable any verification.
  * VERIFY_NULLDUMMY
Enforce NULLDUMMY (BIP147).
  * VERIFY_P2SH
Evaluate P2SH (BIP16) subscripts.
  * VERIFY_WITNESS
Enable WITNESS (BIP141).


## Functions§
  * height_to_flags
Computes flags for soft fork activation heights on the Bitcoin network.
  * verify
Verifies a single spend (input) of a Bitcoin transaction.
  * verify_with_flags
Same as verify but with flags that turn past soft fork features on or off.
  * version
Returns `libbitcoinconsensus` version.


