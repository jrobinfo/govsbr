Docs.rs
  * bitcoin-io-0.1.3
    * bitcoin-io 0.1.3 
    * Docs.rs crate page 
    * CC0-1.0
    * Links
    * Repository 
    * crates.io 
    * Source 
    * Owners
    * apoelstra 
    * tcharding 
    * Dependencies
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


# Crate bitcoin_ioCopy item path
Settings
Help
SummarySource
Expand description
Rust-Bitcoin IO Library
The `std::io` module is not exposed in `no-std` Rust so building `no-std` applications which require reading and writing objects via standard traits is not generally possible. Thus, this library exists to export a minmal version of `std::io`’s traits which we use in `rust-bitcoin` so that we can support `no-std` applications.
These traits are not one-for-one drop-ins, but are as close as possible while still implementing `std::io`’s traits without unnecessary complexity.
## Macros§
  * impl_write`std`
Because we cannot provide a blanket implementation of `std::io::Write` for all implementers of this crate’s `io::Write` trait, we provide this macro instead.


## Structs§
  * Cursor
Wraps an in memory reader providing the `position` function.
  * Error
The `io` crate error type.
  * FromStd`std`
A bridging wrapper providing the IO traits for types that already implement `std` IO traits.
  * Sink
A sink to which all writes succeed. See `std::io::Sink` for more info.
  * Take
Reader adapter which limits the bytes read from an underlying reader.
  * ToStd`std`
A bridging wrapper providing the std traits for types that already implement our traits.


## Enums§
  * ErrorKind
A minimal subset of `std::io::ErrorKind` which is used for `Error`. Note that, as with `std::io`, only `Self::Interrupted` has defined semantics in this crate, all other variants are provided here only to provide higher-fidelity conversions to and from `std::io::Error`.


## Traits§
  * BufRead
A trait describing an input stream that uses an internal buffer when reading.
  * Read
A generic trait describing an input stream. See `std::io::Read` for more info.
  * Write
A generic trait describing an output stream. See `std::io::Write` for more info.


## Functions§
  * from_std`std`
Wraps a `std` IO type to implement the traits from this crate.
  * from_std_mut`std`
Wraps a mutable reference to `std` IO type to implement the traits from this crate.
  * sink
Returns a sink to which all writes succeed. See `std::io::sink` for more info.


## Type Aliases§
  * Result
Result type returned by functions in this crate.


