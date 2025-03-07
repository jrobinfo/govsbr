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
# Module iterCopy item path
Settings
Help
SummarySource
Expand description
Abstract Tree Iteration
This module provides functionality to treat Miniscript objects abstractly as trees, iterating over them in various orders. The iterators in this module can be used to avoid explicitly recursive algorithms.
## Structs§

PostOrderIter
    Iterates over a DAG in _post order_.

PostOrderIterItem
    A set of data yielded by a `PostOrderIter`.

PreOrderIter
    Iterates over a `TreeLike` in _pre order_.

PreOrderIterItem
    A set of data yielded by a `VerbosePreOrderIter`.

VerbosePreOrderIter
    Iterates over a `TreeLike` in “verbose pre order”, yielding extra state changes.
## Enums§

Tree
    Abstract node of a tree.
## Traits§

TreeLike
    A trait for any structure which has the shape of a Miniscript tree.
