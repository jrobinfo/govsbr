Docs.rs
  * bincode-1.3.3
    * bincode 1.3.3 
    * Docs.rs crate page 
    * MIT
    * Links
    * Repository 
    * crates.io 
    * Source 
    * Owners
    * TyOverby 
    * VictorKoenders 
    * ZoeyR 
    * Dependencies
    *       * serde ^1.0.63 _normal_
      * serde_bytes ^0.11 _dev_
      * serde_derive ^1.0.27 _dev_
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


# Crate bincodeCopy item path
Settings
Help
SummarySource
Expand description
Bincode is a crate for encoding and decoding using a tiny binary serialization strategy. Using it, you can easily go from having an object in memory, quickly serialize it to bytes, and then deserialize it back just as fast!
#### §Using Basic Functions
ⓘ```
fn main() {
  // The object that we will serialize.
  let target: Option<String> = Some("hello world".to_string());
  let encoded: Vec<u8> = bincode::serialize(&target).unwrap();
  let decoded: Option<String> = bincode::deserialize(&encoded[..]).unwrap();
  assert_eq!(target, decoded);
}
```

#### §128bit numbers
Support for `i128` and `u128` is automatically enabled on Rust toolchains greater than or equal to `1.26.0` and disabled for targets which do not support it
## Re-exports§

`pub use config::Config;`Deprecated


`pub use config::DefaultOptions;`


`pub use config::Options;`


`pub use de::read::BincodeRead;`


`pub use de::Deserializer;`

## Modules§

config
    `bincode` uses a Builder-pattern to configure the Serializers and Deserializers in this crate. This means that if you need to customize the behavior of `bincode`, you should create an instance of the `DefaultOptions` struct:

de
    Deserialize bincode data to a Rust data structure.
## Structs§

Serializer
    An Serializer that encodes values directly into a Writer.
## Enums§

ErrorKind
    The kind of error that can be produced during a serialization or deserialization.
## Functions§

configDeprecated
    Get a default configuration object.

deserialize
    Deserializes a slice of bytes into an instance of `T` using the default configuration.

deserialize_from
    Deserializes an object directly from a `Read`er using the default configuration.

deserialize_from_custom
    Deserializes an object from a custom `BincodeRead`er using the default configuration. It is highly recommended to use `deserialize_from` unless you need to implement `BincodeRead` for performance reasons.

options
    Get a default configuration object.

serialize
    Serializes a serializable object into a `Vec` of bytes using the default configuration.

serialize_into
    Serializes an object directly into a `Writer` using the default configuration.

serialized_size
    Returns the size that an object would be if serialized using Bincode with the default configuration.
## Type Aliases§

Error
    An error that can be produced during (de)serializing.

Result
    The result of a serialization or deserialization operation.
