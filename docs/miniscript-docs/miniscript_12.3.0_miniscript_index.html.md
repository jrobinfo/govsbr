Docs.rs
  * miniscript-12.3.0
    * miniscript 12.3.0 
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


# Crate miniscriptCopy item path
Settings
Help
SummarySource
Expand description
Miniscript and Output Descriptors
### §Bitcoin Script
In Bitcoin, spending policies are defined and enforced by means of a stack-based programming language known as Bitcoin Script. While this language appears to be designed with tractable analysis in mind (e.g. there are no looping or jumping constructions), in practice this is extremely difficult. As a result, typical wallet software supports only a small set of script templates, cannot interoperate with other similar software, and each wallet contains independently written ad-hoc manually verified code to handle these templates. Users who require more complex spending policies, or who want to combine signing infrastructure which was not explicitly designed to work together, are simply out of luck.
### §Miniscript
Miniscript is an alternative to Bitcoin Script which eliminates these problems. It can be efficiently and simply encoded as Script to ensure that it works on the Bitcoin blockchain, but its design is very different. Essentially, a Miniscript is a monotone function (tree of ANDs, ORs and thresholds) of signature requirements, hash preimage requirements, and timelocks.
A full description of Miniscript is available here.
Miniscript also admits a more human-readable encoding.
### §Output Descriptors
While spending policies in Bitcoin are entirely defined by Script; there are multiple ways of embedding these Scripts in transaction outputs; for example, P2SH or Segwit v0. These different embeddings are expressed by _Output Descriptors_ , which are described here.
## §Examples
### §Deriving an address from a descriptor
```
use std::str::FromStr;
let desc = miniscript::Descriptor::<bitcoin::PublicKey>::from_str("\
  sh(wsh(or_d(\
  c:pk_k(020e0338c96a8870479f2396c373cc7696ba124e8635d41b0ea581112b67817261),\
  c:pk_k(0250863ad64a87ae8a2fe83c1af1a8403cb53f53e486d8511dad8a04887e5b2352)\
  )))\
  ").unwrap();
// Derive the P2SH address.
assert_eq!(
  desc.address(bitcoin::Network::Bitcoin).unwrap().to_string(),
  "3CJxbQBfWAe1ZkKiGQNEYrioV73ZwvBWns"
);
// Check whether the descriptor is safe. This checks whether all spend paths are accessible in
// the Bitcoin network. It may be possible that some of the spend paths require more than 100
// elements in Wsh scripts or they contain a combination of timelock and heightlock.
assert!(desc.sanity_check().is_ok());
// Estimate the satisfaction cost.
// scriptSig: OP_PUSH34 <OP_0 OP_32 <32-byte-hash>>
// = (1 + 1 + 1 + 32) * 4 = 140 WU
// redeemScript: varint <OP_33 <pk1> OP_CHECKSIG OP_IFDUP OP_NOTIF OP_33 <pk2> OP_CHECKSIG OP_ENDIF>
// = 1 + (1 + 33 + 1 + 1 + 1 + 1 + 33 + 1 + 1) = 74 WU
// stackItem[Sig]: varint <sig+sighash>
// = 1 + 73 = 74 WU
// Expected satisfaction weight: 140 + 74 + 74 = 288
assert_eq!(desc.max_weight_to_satisfy().unwrap().to_wu(), 288);
```

## Re-exports§

`pub use crate::descriptor::DefiniteDescriptorKey;`


`pub use crate::descriptor::Descriptor;`


`pub use crate::descriptor::DescriptorPublicKey;`


`pub use crate::expression::ParseThresholdError;`


`pub use crate::interpreter::Interpreter;`


`pub use crate::miniscript::analyzable::AnalysisError;`


`pub use crate::miniscript::analyzable::ExtParams;`


`pub use crate::miniscript::decode::Terminal;`


`pub use crate::miniscript::satisfy::Preimage32;`


`pub use crate::miniscript::satisfy::Satisfier;`


`pub use crate::miniscript::hash256;`


`pub use crate::miniscript::Miniscript;`


`pub use bitcoin;`

## Modules§

descriptor
    Output Descriptors

expression
    Function-like Expression Language

interpreter
    Interpreter

iter
    Abstract Tree Iteration

miniscript
    Abstract Syntax Tree

plan
    A spending plan or _plan_ for short is a representation of a particular spending path on a descriptor. This allows us to analayze a choice of spending path without producing any signatures or other witness data for it.

policy
    Script Policies

psbt
    Partially-Signed Bitcoin Transactions
## Macros§

translate_hash_clone
    Macro for translation of associated types where the associated type is the same Handy for Derived -> concrete keys where the associated types are the same.

translate_hash_fail
    Macro for failing translation for other associated types. Handy for testing String -> concrete keys as we don’t want to specify these functions repeatedly.
## Structs§

AbsLockTime
    An absolute locktime that implements `Ord`.

AbsLockTimeError
    Error parsing an absolute locktime.

RelLockTime
    A relative locktime which implements `Ord`.

RelLockTimeError
    Error parsing an absolute locktime.

Threshold
    Structure representing a k-of-n threshold collection of some arbitrary object `T`.

ThresholdError
    Error parsing an absolute locktime.
## Enums§

BareCtx
    Bare ScriptContext To be used as raw script pubkeys In general, it is not recommended to use Bare descriptors as they as strongly limited by standardness policies.

Error
    Miniscript

Legacy
    Legacy ScriptContext To be used as P2SH scripts For creation of Bare scriptpubkeys, construct the Miniscript under `Bare` ScriptContext

Segwitv0
    Segwitv0 ScriptContext

SigType
    Signature algorithm type

Tap
    Tap ScriptContext

TranslateErr
    An enum for representing translation errors
## Traits§

ForEachKey
    Either a key or keyhash, but both contain Pk Trait describing the ability to iterate over every key

FromStrKey
    Blanket trait describing a key where all associated types implement `FromStr`, and all `FromStr` errors can be displayed.

MiniscriptKey
    Public key trait which can be converted to Hash type

ScriptContext
    The ScriptContext for Miniscript. Additional type information associated with miniscript that is used for carrying out checks that dependent on the context under which the script is used. For example, disallowing uncompressed keys in Segwit context

ToPublicKey
    Trait describing public key types which can be converted to bitcoin pubkeys

TranslatePk
    Converts a descriptor using abstract keys to one using specific keys. Uses translator `t` to do the actual translation function calls.

Translator
    Describes an object that can translate various keys and hashes from one key to the type associated with the other key. Used by the `TranslatePk` trait to do the actual translations.
## Functions§

script_num_size
    The size of an encoding of a number in Script
