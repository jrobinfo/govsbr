Docs.rs
  * serde_test-1.0.177
    * serde_test 1.0.177 
    * Docs.rs crate page 
    * MIT OR Apache-2.0
    * Links
    * Repository 
    * crates.io 
    * Source 
    * Owners
    * dtolnay 
    * github:serde-rs:publish 
    * Dependencies
    *       * serde ^1.0.69 _normal_
      * serde ^1 _dev_
      * serde_derive ^1 _dev_
    * Versions
    * **68.06%** of the crate is documented 
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


# Crate serde_testCopy item path
Settings
Help
SummarySource
Expand description
This crate provides a convenient concise way to write unit tests for implementations of `Serialize` and `Deserialize`.
The `Serialize` impl for a value can be characterized by the sequence of `Serializer` calls that are made in the course of serializing the value, so `serde_test` provides a `Token` abstraction which corresponds roughly to `Serializer` method calls. There is an `assert_ser_tokens` function to test that a value serializes to a particular sequence of method calls, an `assert_de_tokens` function to test that a value can be deserialized from a particular sequence of method calls, and an `assert_tokens` function to test both directions. There are also functions to test expected failure conditions.
Here is an example from the `linked-hash-map` crate.
```
use linked_hash_map::LinkedHashMap;
use serde_test::{assert_tokens, Token};
#[test]
fn test_ser_de_empty() {
  let map = LinkedHashMap::<char, u32>::new();
  assert_tokens(
    &map,
    &[
      Token::Map { len: Some(0) },
      Token::MapEnd,
    ],
  );
}
#[test]
fn test_ser_de() {
  let mut map = LinkedHashMap::new();
  map.insert('b', 20);
  map.insert('a', 10);
  map.insert('c', 30);
  assert_tokens(
    &map,
    &[
      Token::Map { len: Some(3) },
      Token::Char('b'),
      Token::I32(20),
      Token::Char('a'),
      Token::I32(10),
      Token::Char('c'),
      Token::I32(30),
      Token::MapEnd,
    ],
  );
}
```

## Structs§

Compact


Readable

## Enums§

Token

## Traits§

Configure
    Trait to determine whether a value is represented in human-readable or compact form.
## Functions§

assert_de_tokens
    Asserts that the given `tokens` deserialize into `value`.

assert_de_tokens_error
    Asserts that the given `tokens` yield `error` when deserializing.

assert_ser_tokens
    Asserts that `value` serializes to the given `tokens`.

assert_ser_tokens_error
    Asserts that `value` serializes to the given `tokens`, and then yields `error`.

assert_tokens
    Runs both `assert_ser_tokens` and `assert_de_tokens`.
