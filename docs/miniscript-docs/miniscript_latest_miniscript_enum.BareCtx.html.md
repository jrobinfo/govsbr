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
# Enum BareCtxCopy item path
Settings
Help
SummarySource
```
pub enum BareCtx {}
```
Expand description
Bare ScriptContext To be used as raw script pubkeys In general, it is not recommended to use Bare descriptors as they as strongly limited by standardness policies.
## Trait Implementations§
Source§
### impl Clone for BareCtx
Source§
#### fn clone(&self) -> BareCtx
Returns a copy of the value. Read more
1.0.0 · Source§
#### fn clone_from(&mut self, source: &Self)
Performs copy-assignment from `source`. Read more
Source§
### impl Debug for BareCtx
Source§
#### fn fmt(&self, f: &mut Formatter<'_>) -> Result
Formats the value using the given formatter. Read more
Source§
### impl Hash for BareCtx
Source§
#### fn hash<__H: Hasher>(&self, state: &mut __H)
Feeds this value into the given `Hasher`. Read more
1.3.0 · Source§
#### fn hash_slice<H>(data: &[Self], state: &mut H)
where H: Hasher, Self: Sized,
Feeds a slice of this type into the given `Hasher`. Read more
Source§
### impl Ord for BareCtx
Source§
#### fn cmp(&self, other: &BareCtx) -> Ordering
This method returns an `Ordering` between `self` and `other`. Read more
1.21.0 · Source§
#### fn max(self, other: Self) -> Self
where Self: Sized,
Compares and returns the maximum of two values. Read more
1.21.0 · Source§
#### fn min(self, other: Self) -> Self
where Self: Sized,
Compares and returns the minimum of two values. Read more
1.50.0 · Source§
#### fn clamp(self, min: Self, max: Self) -> Self
where Self: Sized,
Restrict a value to a certain interval. Read more
Source§
### impl PartialEq for BareCtx
Source§
#### fn eq(&self, other: &BareCtx) -> bool
Tests for `self` and `other` values to be equal, and is used by `==`.
1.0.0 · Source§
#### fn ne(&self, other: &Rhs) -> bool
Tests for `!=`. The default implementation is almost always sufficient, and should not be overridden without very good reason.
Source§
### impl PartialOrd for BareCtx
Source§
#### fn partial_cmp(&self, other: &BareCtx) -> Option<Ordering>
This method returns an ordering between `self` and `other` values if one exists. Read more
1.0.0 · Source§
#### fn lt(&self, other: &Rhs) -> bool
Tests less than (for `self` and `other`) and is used by the `<` operator. Read more
1.0.0 · Source§
#### fn le(&self, other: &Rhs) -> bool
Tests less than or equal to (for `self` and `other`) and is used by the `<=` operator. Read more
1.0.0 · Source§
#### fn gt(&self, other: &Rhs) -> bool
Tests greater than (for `self` and `other`) and is used by the `>` operator. Read more
1.0.0 · Source§
#### fn ge(&self, other: &Rhs) -> bool
Tests greater than or equal to (for `self` and `other`) and is used by the `>=` operator. Read more
Source§
### impl ScriptContext for BareCtx
Source§
#### type Key = PublicKey
The consensus key associated with the type. Must be a parseable key
Source§
#### fn check_terminal_non_malleable<Pk: MiniscriptKey>( _frag: &Terminal<Pk, Self>, ) -> Result<(), ScriptContextError>
Depending on ScriptContext, fragments can be malleable. For Example, under Legacy context, PkH is malleable because it is possible to estimate the cost of satisfaction because of compressed keys This is currently only used in compiler code for removing malleable compilations. This does NOT recursively check if the children of the fragment are valid or not. Since the compilation proceeds in a leaf to root fashion, a recursive check is unnecessary.
Source§
#### fn check_pk<Pk: MiniscriptKey>(pk: &Pk) -> Result<(), ScriptContextError>
Each context has slightly different rules on what Pks are allowed in descriptors Legacy/Bare does not allow x_only keys Segwit does not allow uncompressed keys and x_only keys Tapscript does not allow uncompressed keys
Source§
#### fn check_global_consensus_validity<Pk: MiniscriptKey>( ms: &Miniscript<Pk, Self>, ) -> Result<(), ScriptContextError>
Depending on script Context, some of the Terminals might not be valid under the current consensus rules. Or some of the script resource limits may have been exceeded. These miniscripts would never be accepted by the Bitcoin network and hence it is safe to discard them For example, in Segwit Context with MiniscriptKey as bitcoin::PublicKey uncompressed public keys are non-standard and thus invalid. In LegacyP2SH context, scripts above 520 bytes are invalid. Post Tapscript upgrade, this would have to consider other nodes. This does _NOT_ recursively check the miniscript fragments.
Source§
#### fn check_local_consensus_validity<Pk: MiniscriptKey>( ms: &Miniscript<Pk, Self>, ) -> Result<(), ScriptContextError>
Consensus rules at the Miniscript satisfaction time. It is possible that some paths of miniscript may exceed resource limits and our current satisfier and lifting analysis would not work correctly. For example, satisfaction path(Legacy/Segwitv0) may require more than 201 opcodes.
Source§
#### fn other_top_level_checks<Pk: MiniscriptKey>( ms: &Miniscript<Pk, Self>, ) -> Result<(), Error>
Other top level checks that are context specific
Source§
#### fn max_satisfaction_size<Pk: MiniscriptKey>( ms: &Miniscript<Pk, Self>, ) -> Option<usize>
Depending on script context, the size of a satifaction witness may slightly differ.
Source§
#### fn pk_len<Pk: MiniscriptKey>(pk: &Pk) -> usize
Get the len of public key when serialized based on context Note that this includes the serialization prefix. Returns 34/66 for Bare/Legacy based on key compressedness 34 for Segwitv0, 33 for Tap
Source§
#### fn name_str() -> &'static str
Local helper function to display error messages with context
Source§
#### fn sig_type() -> SigType
The type of signature required for satisfaction
Source§
#### fn check_witness(_witness: &[Vec<u8>]) -> Result<(), ScriptContextError>
Check whether the given satisfaction is valid under the ScriptContext For example, segwit satisfactions may fail if the witness len is more 3600 or number of stack elements are more than 100.
Source§
#### fn check_global_policy_validity<Pk: MiniscriptKey>( _ms: &Miniscript<Pk, Self>, ) -> Result<(), ScriptContextError>
Depending on script Context, some of the script resource limits may have been exceeded under the current bitcoin core policy rules These miniscripts would never be accepted by the Bitcoin network and hence it is safe to discard them. (unless explicitly disabled by non-standard flag) For example, in Segwit Context with MiniscriptKey as bitcoin::PublicKey scripts over 3600 bytes are invalid. Post Tapscript upgrade, this would have to consider other nodes. This does _NOT_ recursively check the miniscript fragments.
Source§
#### fn check_local_policy_validity<Pk: MiniscriptKey>( _ms: &Miniscript<Pk, Self>, ) -> Result<(), ScriptContextError>
Policy rules at the Miniscript satisfaction time. It is possible that some paths of miniscript may exceed resource limits and our current satisfier and lifting analysis would not work correctly. For example, satisfaction path in Legacy context scriptSig more than 1650 bytes
Source§
#### fn check_global_validity<Pk: MiniscriptKey>( ms: &Miniscript<Pk, Self>, ) -> Result<(), ScriptContextError>
Check the consensus + policy(if not disabled) rules that are not based satisfaction
Source§
#### fn check_local_validity<Pk: MiniscriptKey>( ms: &Miniscript<Pk, Self>, ) -> Result<(), ScriptContextError>
Check the consensus + policy(if not disabled) rules including the ones for satisfaction
Source§
#### fn top_level_type_check<Pk: MiniscriptKey>( ms: &Miniscript<Pk, Self>, ) -> Result<(), Error>
Check whether the top-level is type B
Source§
#### fn top_level_checks<Pk: MiniscriptKey>( ms: &Miniscript<Pk, Self>, ) -> Result<(), Error>
Check top level consensus rules.
Source§
### impl Eq for BareCtx
Source§
### impl StructuralPartialEq for BareCtx
## Auto Trait Implementations§
§
### impl Freeze for BareCtx
§
### impl RefUnwindSafe for BareCtx
§
### impl Send for BareCtx
§
### impl Sync for BareCtx
§
### impl Unpin for BareCtx
§
### impl UnwindSafe for BareCtx
## Blanket Implementations§
Source§
### impl<T> Any for T
where T: 'static + ?Sized,
Source§
#### fn type_id(&self) -> TypeId
Gets the `TypeId` of `self`. Read more
Source§
### impl<T> Borrow<T> for T
where T: ?Sized,
Source§
#### fn borrow(&self) -> &T
Immutably borrows from an owned value. Read more
Source§
### impl<T> BorrowMut<T> for T
where T: ?Sized,
Source§
#### fn borrow_mut(&mut self) -> &mut T
Mutably borrows from an owned value. Read more
Source§
### impl<T> CloneToUninit for T
where T: Clone,
Source§
#### unsafe fn clone_to_uninit(&self, dst: *mut u8)
🔬This is a nightly-only experimental API. (`clone_to_uninit`)
Performs copy-assignment from `self` to `dst`. Read more
Source§
### impl<T> From<T> for T
Source§
#### fn from(t: T) -> T
Returns the argument unchanged.
Source§
### impl<T, U> Into<U> for T
where U: From<T>,
Source§
#### fn into(self) -> U
Calls `U::from(self)`.
That is, this conversion is whatever the implementation of `From<T> for U` chooses to do.
Source§
### impl<T> ToOwned for T
where T: Clone,
Source§
#### type Owned = T
The resulting type after obtaining ownership.
Source§
#### fn to_owned(&self) -> T
Creates owned data from borrowed data, usually by cloning. Read more
Source§
#### fn clone_into(&self, target: &mut T)
Uses borrowed data to replace owned data, usually by cloning. Read more
Source§
### impl<T, U> TryFrom<U> for T
where U: Into<T>,
Source§
#### type Error = Infallible
The type returned in the event of a conversion error.
Source§
#### fn try_from(value: U) -> Result<T, <T as TryFrom<U>>::Error>
Performs the conversion.
Source§
### impl<T, U> TryInto<U> for T
where U: TryFrom<T>,
Source§
#### type Error = <U as TryFrom<T>>::Error
The type returned in the event of a conversion error.
Source§
#### fn try_into(self) -> Result<U, <U as TryFrom<T>>::Error>
Performs the conversion.
Source§
### impl<V, T> VZip<V> for T
where V: MultiLane<T>,
Source§
#### fn vzip(self) -> V
