Docs.rs
  * serde-1.0.218
    * serde 1.0.218 
    * Docs.rs crate page 
    * MIT OR Apache-2.0
    * Links
    * Homepage 
    * Repository 
    * crates.io 
    * Source 
    * Owners
    * dtolnay 
    * github:serde-rs:publish 
    * Dependencies
    *       * serde_derive ^1 _normal_ _optional_
      * serde_derive ^1 _dev_
      * serde_derive =1.0.218 _normal_
    * Versions
    * **100%** of the crate is documented 
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


# Crate serdeCopy item path
Settings
Help
SummarySource
Expand description
## §Serde
Serde is a framework for _**ser**_ ializing and _**de**_ serializing Rust data structures efficiently and generically.
The Serde ecosystem consists of data structures that know how to serialize and deserialize themselves along with data formats that know how to serialize and deserialize other things. Serde provides the layer by which these two groups interact with each other, allowing any supported data structure to be serialized and deserialized using any supported data format.
See the Serde website https://serde.rs/ for additional documentation and usage examples.
### §Design
Where many other languages rely on runtime reflection for serializing data, Serde is instead built on Rust’s powerful trait system. A data structure that knows how to serialize and deserialize itself is one that implements Serde’s `Serialize` and `Deserialize` traits (or uses Serde’s derive attribute to automatically generate implementations at compile time). This avoids any overhead of reflection or runtime type information. In fact in many situations the interaction between data structure and data format can be completely optimized away by the Rust compiler, leaving Serde serialization to perform the same speed as a handwritten serializer for the specific selection of data structure and data format.
### §Data formats
The following is a partial list of data formats that have been implemented for Serde by the community.
  * JSON, the ubiquitous JavaScript Object Notation used by many HTTP APIs.
  * Postcard, a no_std and embedded-systems friendly compact binary format.
  * CBOR, a Concise Binary Object Representation designed for small message size without the need for version negotiation.
  * YAML, a self-proclaimed human-friendly configuration language that ain’t markup language.
  * MessagePack, an efficient binary format that resembles a compact JSON.
  * TOML, a minimal configuration format used by Cargo.
  * Pickle, a format common in the Python world.
  * RON, a Rusty Object Notation.
  * BSON, the data storage and network transfer format used by MongoDB.
  * Avro, a binary format used within Apache Hadoop, with support for schema definition.
  * JSON5, a superset of JSON including some productions from ES5.
  * URL query strings, in the x-www-form-urlencoded format.
  * Starlark, the format used for describing build targets by the Bazel and Buck build systems. _(serialization only)_
  * Envy, a way to deserialize environment variables into Rust structs. _(deserialization only)_
  * Envy Store, a way to deserialize AWS Parameter Store parameters into Rust structs. _(deserialization only)_
  * S-expressions, the textual representation of code and data used by the Lisp language family.
  * D-Bus’s binary wire format.
  * FlexBuffers, the schemaless cousin of Google’s FlatBuffers zero-copy serialization format.
  * Bencode, a simple binary format used in the BitTorrent protocol.
  * Token streams, for processing Rust procedural macro input. _(deserialization only)_
  * DynamoDB Items, the format used by rusoto_dynamodb to transfer data to and from DynamoDB.
  * Hjson, a syntax extension to JSON designed around human reading and editing. _(deserialization only)_
  * CSV, Comma-separated values is a tabular text file format.


## Modules§

de
    Generic data structure deserialization framework.

ser
    Generic data structure serialization framework.
## Macros§

forward_to_deserialize_any
    Helper macro when implementing the `Deserializer` part of a new data format for Serde.
## Traits§

Deserialize
    A **data structure** that can be deserialized from any data format supported by Serde.

Deserializer
    A **data format** that can deserialize any data structure supported by Serde.

Serialize
    A **data structure** that can be serialized into any data format supported by Serde.

Serializer
    A **data format** that can serialize any data structure supported by Serde.
## Derive Macros§

Deserialize`derive`
    Derive macro available if serde is built with `features = ["derive"]`.

Serialize`derive`
    Derive macro available if serde is built with `features = ["derive"]`.
