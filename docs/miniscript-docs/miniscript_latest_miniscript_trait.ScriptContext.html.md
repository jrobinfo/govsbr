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
# Trait ScriptContextCopy item path
Settings
Help
SummarySource
```
pub trait ScriptContext:
  Debug
  + Clone
  + Ord
  + PartialOrd
  + Eq
  + PartialEq
  + Hash
  + Sealed
where
  Self::Key: MiniscriptKey<Sha256 = Hash> + MiniscriptKey<Hash256 = Hash> + MiniscriptKey<Ripemd160 = Hash> + MiniscriptKey<Hash160 = Hash>,
{
  type Key: ParseableKey;
Show 16 methods  // Required methods
  fn check_terminal_non_malleable<Pk: MiniscriptKey>(
    _frag: &Terminal<Pk, Self>,
  ) -> Result<(), ScriptContextError>;
  fn check_pk<Pk: MiniscriptKey>(pk: &Pk) -> Result<(), ScriptContextError>;
  fn max_satisfaction_size<Pk: MiniscriptKey>(
    ms: &Miniscript<Pk, Self>,
  ) -> Option<usize>;
  fn sig_type() -> SigType;
  fn pk_len<Pk: MiniscriptKey>(pk: &Pk) -> usize;
  fn name_str() -> &'static str;
  // Provided methods
  fn check_witness(_witness: &[Vec<u8>]) -> Result<(), ScriptContextError> { ... }
  fn check_global_consensus_validity<Pk: MiniscriptKey>(
    _ms: &Miniscript<Pk, Self>,
  ) -> Result<(), ScriptContextError> { ... }
  fn check_global_policy_validity<Pk: MiniscriptKey>(
    _ms: &Miniscript<Pk, Self>,
  ) -> Result<(), ScriptContextError> { ... }
  fn check_local_consensus_validity<Pk: MiniscriptKey>(
    _ms: &Miniscript<Pk, Self>,
  ) -> Result<(), ScriptContextError> { ... }
  fn check_local_policy_validity<Pk: MiniscriptKey>(
    _ms: &Miniscript<Pk, Self>,
  ) -> Result<(), ScriptContextError> { ... }
  fn check_global_validity<Pk: MiniscriptKey>(
    ms: &Miniscript<Pk, Self>,
  ) -> Result<(), ScriptContextError> { ... }
  fn check_local_validity<Pk: MiniscriptKey>(
    ms: &Miniscript<Pk, Self>,
  ) -> Result<(), ScriptContextError> { ... }
  fn top_level_type_check<Pk: MiniscriptKey>(
    ms: &Miniscript<Pk, Self>,
  ) -> Result<(), Error> { ... }
  fn other_top_level_checks<Pk: MiniscriptKey>(
    _ms: &Miniscript<Pk, Self>,
  ) -> Result<(), Error> { ... }
  fn top_level_checks<Pk: MiniscriptKey>(
    ms: &Miniscript<Pk, Self>,
  ) -> Result<(), Error> { ... }
}
```
Expand description
The ScriptContext for Miniscript. Additional type information associated with miniscript that is used for carrying out checks that dependent on the context under which the script is used. For example, disallowing uncompressed keys in Segwit context
## Required Associated Types§
Source
#### type Key: ParseableKey
The consensus key associated with the type. Must be a parseable key
## Required Methods§
Source
#### fn check_terminal_non_malleable<Pk: MiniscriptKey>( _frag: &Terminal<Pk, Self>, ) -> Result<(), ScriptContextError>
Depending on ScriptContext, fragments can be malleable. For Example, under Legacy context, PkH is malleable because it is possible to estimate the cost of satisfaction because of compressed keys This is currently only used in compiler code for removing malleable compilations. This does NOT recursively check if the children of the fragment are valid or not. Since the compilation proceeds in a leaf to root fashion, a recursive check is unnecessary.
Source
#### fn check_pk<Pk: MiniscriptKey>(pk: &Pk) -> Result<(), ScriptContextError>
Each context has slightly different rules on what Pks are allowed in descriptors Legacy/Bare does not allow x_only keys Segwit does not allow uncompressed keys and x_only keys Tapscript does not allow uncompressed keys
Source
#### fn max_satisfaction_size<Pk: MiniscriptKey>( ms: &Miniscript<Pk, Self>, ) -> Option<usize>
Depending on script context, the size of a satifaction witness may slightly differ.
Source
#### fn sig_type() -> SigType
The type of signature required for satisfaction
Source
#### fn pk_len<Pk: MiniscriptKey>(pk: &Pk) -> usize
Get the len of public key when serialized based on context Note that this includes the serialization prefix. Returns 34/66 for Bare/Legacy based on key compressedness 34 for Segwitv0, 33 for Tap
Source
#### fn name_str() -> &'static str
Local helper function to display error messages with context
## Provided Methods§
Source
#### fn check_witness(_witness: &[Vec<u8>]) -> Result<(), ScriptContextError>
Check whether the given satisfaction is valid under the ScriptContext For example, segwit satisfactions may fail if the witness len is more 3600 or number of stack elements are more than 100.
Source
#### fn check_global_consensus_validity<Pk: MiniscriptKey>( _ms: &Miniscript<Pk, Self>, ) -> Result<(), ScriptContextError>
Depending on script Context, some of the Terminals might not be valid under the current consensus rules. Or some of the script resource limits may have been exceeded. These miniscripts would never be accepted by the Bitcoin network and hence it is safe to discard them For example, in Segwit Context with MiniscriptKey as bitcoin::PublicKey uncompressed public keys are non-standard and thus invalid. In LegacyP2SH context, scripts above 520 bytes are invalid. Post Tapscript upgrade, this would have to consider other nodes. This does _NOT_ recursively check the miniscript fragments.
Source
#### fn check_global_policy_validity<Pk: MiniscriptKey>( _ms: &Miniscript<Pk, Self>, ) -> Result<(), ScriptContextError>
Depending on script Context, some of the script resource limits may have been exceeded under the current bitcoin core policy rules These miniscripts would never be accepted by the Bitcoin network and hence it is safe to discard them. (unless explicitly disabled by non-standard flag) For example, in Segwit Context with MiniscriptKey as bitcoin::PublicKey scripts over 3600 bytes are invalid. Post Tapscript upgrade, this would have to consider other nodes. This does _NOT_ recursively check the miniscript fragments.
Source
#### fn check_local_consensus_validity<Pk: MiniscriptKey>( _ms: &Miniscript<Pk, Self>, ) -> Result<(), ScriptContextError>
Consensus rules at the Miniscript satisfaction time. It is possible that some paths of miniscript may exceed resource limits and our current satisfier and lifting analysis would not work correctly. For example, satisfaction path(Legacy/Segwitv0) may require more than 201 opcodes.
Source
#### fn check_local_policy_validity<Pk: MiniscriptKey>( _ms: &Miniscript<Pk, Self>, ) -> Result<(), ScriptContextError>
Policy rules at the Miniscript satisfaction time. It is possible that some paths of miniscript may exceed resource limits and our current satisfier and lifting analysis would not work correctly. For example, satisfaction path in Legacy context scriptSig more than 1650 bytes
Source
#### fn check_global_validity<Pk: MiniscriptKey>( ms: &Miniscript<Pk, Self>, ) -> Result<(), ScriptContextError>
Check the consensus + policy(if not disabled) rules that are not based satisfaction
Source
#### fn check_local_validity<Pk: MiniscriptKey>( ms: &Miniscript<Pk, Self>, ) -> Result<(), ScriptContextError>
Check the consensus + policy(if not disabled) rules including the ones for satisfaction
Source
#### fn top_level_type_check<Pk: MiniscriptKey>( ms: &Miniscript<Pk, Self>, ) -> Result<(), Error>
Check whether the top-level is type B
Source
#### fn other_top_level_checks<Pk: MiniscriptKey>( _ms: &Miniscript<Pk, Self>, ) -> Result<(), Error>
Other top level checks that are context specific
Source
#### fn top_level_checks<Pk: MiniscriptKey>( ms: &Miniscript<Pk, Self>, ) -> Result<(), Error>
Check top level consensus rules.
## Dyn Compatibility§
This trait is **not** dyn compatible.
_In older versions of Rust, dyn compatibility was called "object safety", so this trait is not object safe._
## Implementors§
Source§
### impl ScriptContext for BareCtx
Source§
#### type Key = PublicKey
Source§
### impl ScriptContext for Legacy
Source§
#### type Key = PublicKey
Source§
### impl ScriptContext for Segwitv0
Source§
#### type Key = PublicKey
Source§
### impl ScriptContext for Tap
Source§
#### type Key = XOnlyPublicKey
