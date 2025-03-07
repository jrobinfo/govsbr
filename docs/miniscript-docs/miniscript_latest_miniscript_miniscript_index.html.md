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
# Module miniscriptCopy item path
Settings
Help
SummarySource
Expand description
## §Abstract Syntax Tree
Defines a variety of data structures for describing Miniscript, a subset of Bitcoin Script which can be efficiently parsed and serialized from Script, and from which it is easy to extract data needed to construct witnesses.
Users of the library in general will only need to use the structures exposed from the top level of this module; however for people wanting to do advanced things, the submodules are public as well which provide visibility into the components of the AST.
## Modules§

analyzable
    Miniscript Analysis

astelem
    AST Elements

decode
    Script Decoder

hash256
    Provides a Double SHA256 `Hash` type that displays forwards.

iter
    Miniscript Iterators

lex
    Lexer

limits
    Miscellaneous constraints imposed by Bitcoin. These constraints can be either Consensus or Policy (standardness) rules, for either Segwitv0 or Legacy scripts.

satisfy
    Satisfaction and Dissatisfaction

types
    Miniscript Types Contains structures representing Miniscript types and utility functions Contains all the type checking rules for correctness and malleability Implemented as per rules on bitcoin.sipa.be/miniscript
## Structs§

Miniscript
    The top-level miniscript abstract syntax tree (AST).
## Enums§

BareCtx
    Bare ScriptContext To be used as raw script pubkeys In general, it is not recommended to use Bare descriptors as they as strongly limited by standardness policies.

Legacy
    Legacy ScriptContext To be used as P2SH scripts For creation of Bare scriptpubkeys, construct the Miniscript under `Bare` ScriptContext

Segwitv0
    Segwitv0 ScriptContext

Tap
    Tap ScriptContext
## Traits§

ScriptContext
    The ScriptContext for Miniscript. Additional type information associated with miniscript that is used for carrying out checks that dependent on the context under which the script is used. For example, disallowing uncompressed keys in Segwit context
