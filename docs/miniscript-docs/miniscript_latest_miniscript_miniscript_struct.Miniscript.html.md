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


miniscript::miniscript
# Struct MiniscriptCopy item path
Settings
Help
SummarySource
```
pub struct Miniscript<Pk: MiniscriptKey, Ctx: ScriptContext> {
  pub node: Terminal<Pk, Ctx>,
  pub ty: Type,
  pub ext: ExtData,
  /* private fields */
}
```
Expand description
The top-level miniscript abstract syntax tree (AST).
## Fields§
§`node: Terminal<Pk, Ctx>`
A node in the AST.
§`ty: Type`
The correctness and malleability type information for the AST node.
§`ext: ExtData`
Additional information helpful for extra analysis.
## Implementations§
Source§
### impl<Pk: MiniscriptKey, Ctx: ScriptContext> Miniscript<Pk, Ctx>
Source
#### pub fn requires_sig(&self) -> bool
Whether all spend paths of miniscript require a signature
Source
#### pub fn is_non_malleable(&self) -> bool
Whether the miniscript is malleable
Source
#### pub fn within_resource_limits(&self) -> bool
Whether the miniscript can exceed the resource limits(Opcodes, Stack limit etc)
Source
#### pub fn has_mixed_timelocks(&self) -> bool
Whether the miniscript contains a combination of timelocks
Source
#### pub fn has_repeated_keys(&self) -> bool
Whether the miniscript has repeated Pk or Pkh
Source
#### pub fn contains_raw_pkh(&self) -> bool
Whether the given miniscript contains a raw pkh fragment
Source
#### pub fn sanity_check(&self) -> Result<(), AnalysisError>
Check whether the underlying Miniscript is safe under the current context Lifting these polices would create a semantic representation that does not represent the underlying semantics when miniscript is spent. Signing logic may not find satisfaction even if one exists.
For most cases, users should be dealing with safe scripts. Use this function to check whether the guarantees of library hold. Most functions of the library like would still work, but results cannot be relied upon
Source
#### pub fn ext_check(&self, ext: &ExtParams) -> Result<(), AnalysisError>
Check whether the miniscript follows the given Extra policy `ExtParams`
Source§
### impl<Pk: MiniscriptKey, Ctx: ScriptContext> Miniscript<Pk, Ctx>
Iterator-related extensions for Miniscript
Source
#### pub fn iter(&self) -> Iter<'_, Pk, Ctx> ⓘ
Creates a new Iter iterator that will iterate over all Miniscript items within AST by traversing its branches. For the specific algorithm please see Iter::next function.
Source
#### pub fn iter_pk(&self) -> PkIter<'_, Pk, Ctx> ⓘ
Creates a new PkIter iterator that will iterate over all plain public keys (and not key hash values) present in Miniscript items within AST by traversing all its branches. For the specific algorithm please see PkIter::next function.
Source
#### pub fn branches(&self) -> Vec<&Miniscript<Pk, Ctx>>
Enumerates all child nodes of the current AST node (`self`) and returns a `Vec` referencing them.
Source
#### pub fn get_nth_child(&self, n: usize) -> Option<&Miniscript<Pk, Ctx>>
Returns child node with given index, if any
Source
#### pub fn get_nth_pk(&self, n: usize) -> Option<Pk>
Returns `Option::Some` with cloned n’th public key from the current miniscript item, if any. Otherwise returns `Option::None`.
NB: The function analyzes only single miniscript item and not any of its descendants in AST.
Source§
### impl<Pk: MiniscriptKey, Ctx: ScriptContext> Miniscript<Pk, Ctx>
Source
#### pub const TRUE: Self
The `1` combinator.
Source
#### pub const FALSE: Self
The `0` combinator.
Source
#### pub fn from_ast(t: Terminal<Pk, Ctx>) -> Result<Miniscript<Pk, Ctx>, Error>
Add type information(Type and Extdata) to Miniscript based on `AstElem` fragment. Dependent on display and clone because of Error Display code of type_check.
Source
#### pub fn from_components_unchecked( node: Terminal<Pk, Ctx>, ty: Type, ext: ExtData, ) -> Miniscript<Pk, Ctx>
Create a new `Miniscript` from a `Terminal` node and a `Type` annotation This does not check the typing rules. The user is responsible for ensuring that the type provided is correct.
You should almost always use `Miniscript::from_ast` instead of this function.
Source§
### impl<Pk: MiniscriptKey, Ctx: ScriptContext> Miniscript<Pk, Ctx>
Source
#### pub fn into_inner(self) -> Terminal<Pk, Ctx>
Extracts the `AstElem` representing the root of the miniscript
Source
#### pub fn as_inner(&self) -> &Terminal<Pk, Ctx>
Get a reference to the inner `AstElem` representing the root of miniscript
Source
#### pub fn encode(&self) -> ScriptBuf
where Pk: ToPublicKey,
Encode as a Bitcoin script
Source
#### pub fn script_size(&self) -> usize
Size, in bytes of the script-pubkey. If this Miniscript is used outside of segwit (e.g. in a bare or P2SH descriptor), this quantity should be multiplied by 4 to compute the weight.
In general, it is not recommended to use this function directly, but to instead call the corresponding function on a `Descriptor`, which will handle the segwit/non-segwit technicalities for you.
Source
#### pub fn max_satisfaction_witness_elements(&self) -> Result<usize, Error>
Maximum number of witness elements used to satisfy the Miniscript fragment, including the witness script itself. Used to estimate the weight of the `VarInt` that specifies this number in a serialized transaction.
This function may returns Error when the Miniscript is impossible to satisfy
Source
#### pub fn max_satisfaction_size(&self) -> Result<usize, Error>
Maximum size, in bytes, of a satisfying witness. For Segwit outputs `one_cost` should be set to 2, since the number `1` requires two bytes to encode. For non-segwit outputs `one_cost` should be set to 1, since `OP_1` is available in scriptSigs.
In general, it is not recommended to use this function directly, but to instead call the corresponding function on a `Descriptor`, which will handle the segwit/non-segwit technicalities for you.
All signatures are assumed to be 73 bytes in size, including the length prefix (segwit) or push opcode (pre-segwit) and sighash postfix.
Source
#### pub fn satisfy<S: Satisfier<Pk>>( &self, satisfier: S, ) -> Result<Vec<Vec<u8>>, Error>
where Pk: ToPublicKey,
Attempt to produce non-malleable satisfying witness for the witness script represented by the parse tree
Source
#### pub fn satisfy_malleable<S: Satisfier<Pk>>( &self, satisfier: S, ) -> Result<Vec<Vec<u8>>, Error>
where Pk: ToPublicKey,
Attempt to produce a malleable satisfying witness for the witness script represented by the parse tree
Source
#### pub fn build_template<P: AssetProvider<Pk>>( &self, provider: &P, ) -> Satisfaction<Placeholder<Pk>>
where Pk: ToPublicKey,
Attempt to produce a non-malleable witness template given the assets available
Source
#### pub fn build_template_mall<P: AssetProvider<Pk>>( &self, provider: &P, ) -> Satisfaction<Placeholder<Pk>>
where Pk: ToPublicKey,
Attempt to produce a malleable witness template given the assets available
Source§
### impl<Ctx: ScriptContext> Miniscript<Ctx::Key, Ctx>
Source
#### pub fn parse_insane(script: &Script) -> Result<Miniscript<Ctx::Key, Ctx>, Error>
Attempt to parse an insane(scripts don’t clear sanity checks) script into a Miniscript representation. Use this to parse scripts with repeated pubkeys, timelock mixing, malleable scripts without sig or scripts that can exceed resource limits. Some of the analysis guarantees of miniscript are lost when dealing with insane scripts. In general, in a multi-party setting users should only accept sane scripts.
Source
#### pub fn parse_with_ext( script: &Script, ext: &ExtParams, ) -> Result<Miniscript<Ctx::Key, Ctx>, Error>
Attempt to parse an miniscript with extra features that not yet specified in the spec. Users should not use this function unless they scripts can/will change in the future. Currently, this function supports the following features: - Parsing all insane scripts - Parsing miniscripts with raw pubkey hashes
Allowed extra features can be specified by the ext `ExtParams` argument.
Source
#### pub fn parse(script: &Script) -> Result<Miniscript<Ctx::Key, Ctx>, Error>
Attempt to parse a Script into Miniscript representation.
This function will fail parsing for scripts that do not clear the `Miniscript::sanity_check` checks. Use `Miniscript::parse_insane` to parse such scripts.
###### §Decode/Parse a miniscript from script hex
```
use miniscript::{Miniscript, Segwitv0, Tap};
use miniscript::bitcoin::secp256k1::XOnlyPublicKey;
use miniscript::bitcoin::hashes::hex::FromHex;
type Segwitv0Script = Miniscript<bitcoin::PublicKey, Segwitv0>;
type TapScript = Miniscript<XOnlyPublicKey, Tap>;
// parse x-only miniscript in Taproot context
let tapscript_ms = TapScript::parse(&bitcoin::ScriptBuf::from_hex(
  "202788ee41e76f4f3af603da5bc8fa22997bc0344bb0f95666ba6aaff0242baa99ac",
).expect("Even length hex"))
  .expect("Xonly keys are valid only in taproot context");
// tapscript fails decoding when we use them with compressed keys
let err = TapScript::parse(&bitcoin::ScriptBuf::from_hex(
  "21022788ee41e76f4f3af603da5bc8fa22997bc0344bb0f95666ba6aaff0242baa99ac",
).expect("Even length hex"))
  .expect_err("Compressed keys cannot be used in Taproot context");
// Segwitv0 succeeds decoding with full keys.
Segwitv0Script::parse(&bitcoin::ScriptBuf::from_hex(
  "21022788ee41e76f4f3af603da5bc8fa22997bc0344bb0f95666ba6aaff0242baa99ac",
).expect("Even length hex"))
  .expect("Compressed keys are allowed in Segwit context");

```

Source§
### impl<Pk: MiniscriptKey, Ctx: ScriptContext> Miniscript<Pk, Ctx>
Source
#### pub fn substitute_raw_pkh( &self, pk_map: &BTreeMap<Hash, Pk>, ) -> Miniscript<Pk, Ctx>
Substitutes raw public keys hashes with the public keys as provided by map.
Source§
### impl<Pk: FromStrKey, Ctx: ScriptContext> Miniscript<Pk, Ctx>
Source
#### pub fn from_str_insane(s: &str) -> Result<Miniscript<Pk, Ctx>, Error>
Attempt to parse an insane(scripts don’t clear sanity checks) from string into a Miniscript representation. Use this to parse scripts with repeated pubkeys, timelock mixing, malleable scripts without sig or scripts that can exceed resource limits. Some of the analysis guarantees of miniscript are lost when dealing with insane scripts. In general, in a multi-party setting users should only accept sane scripts.
Source
#### pub fn from_str_ext( s: &str, ext: &ExtParams, ) -> Result<Miniscript<Pk, Ctx>, Error>
Attempt to parse an Miniscripts that don’t follow the spec. Use this to parse scripts with repeated pubkeys, timelock mixing, malleable scripts, raw pubkey hashes without sig or scripts that can exceed resource limits.
Use `ExtParams` builder to specify the types of non-sane rules to allow while parsing.
Source§
### impl<Pk: MiniscriptKey, Ctx: ScriptContext> Miniscript<Pk, Ctx>
Source
#### pub fn lift_check(&self) -> Result<(), LiftError>
Lifting corresponds to conversion of a miniscript into a `Semantic` policy for human readable or machine analysis. However, naively lifting miniscripts can result in incorrect interpretations that don’t correspond to the underlying semantics when we try to spend them on bitcoin network. This can occur if the miniscript contains:
  1. A combination of timelocks
  2. A spend that exceeds resource limits


## Trait Implementations§
Source§
### impl<Pk: Clone + MiniscriptKey, Ctx: Clone + ScriptContext> Clone for Miniscript<Pk, Ctx>
Source§
#### fn clone(&self) -> Miniscript<Pk, Ctx>
Returns a copy of the value. Read more
1.0.0 · Source§
#### fn clone_from(&mut self, source: &Self)
Performs copy-assignment from `source`. Read more
Source§
### impl<Pk: MiniscriptKey, Ctx: ScriptContext> Debug for Miniscript<Pk, Ctx>
Source§
#### fn fmt(&self, f: &mut Formatter<'_>) -> Result
Formats the value using the given formatter. Read more
Source§
### impl<Pk: MiniscriptKey, Ctx: ScriptContext> Display for Miniscript<Pk, Ctx>
Source§
#### fn fmt(&self, f: &mut Formatter<'_>) -> Result
Formats the value using the given formatter. Read more
Source§
### impl<Pk: MiniscriptKey, Ctx: ScriptContext> ForEachKey<Pk> for Miniscript<Pk, Ctx>
Source§
#### fn for_each_key<'a, F: FnMut(&'a Pk) -> bool>(&'a self, pred: F) -> bool
Run a predicate on every key in the descriptor, returning whether the predicate returned true for every key
Source§
#### fn for_any_key<'a, F: FnMut(&'a Pk) -> bool>(&'a self, pred: F) -> bool
where Pk: 'a,
Run a predicate on every key in the descriptor, returning whether the predicate returned true for any key
Source§
### impl<Pk: FromStrKey, Ctx: ScriptContext> FromStr for Miniscript<Pk, Ctx>
Source§
#### fn from_str(s: &str) -> Result<Miniscript<Pk, Ctx>, Error>
Parse a Miniscript from string and perform sanity checks See Miniscript::from_str_insane to parse scripts from string that do not clear the Miniscript::sanity_check checks.
Source§
#### type Err = Error
The associated error which can be returned from parsing.
Source§
### impl<Pk: FromStrKey, Ctx: ScriptContext> FromTree for Miniscript<Pk, Ctx>
Source§
#### fn from_tree(top: &Tree<'_>) -> Result<Miniscript<Pk, Ctx>, Error>
Parse an expression tree into a Miniscript. As a general rule, this should not be called directly; rather go through the descriptor API.
Source§
### impl<Pk: MiniscriptKey, Ctx: ScriptContext> Hash for Miniscript<Pk, Ctx>
`Hash` of `Miniscript` must depend only on node and not the type information.
The type information and extra properties are implied by the AST.
Source§
#### fn hash<H: Hasher>(&self, state: &mut H)
Feeds this value into the given `Hasher`. Read more
1.3.0 · Source§
#### fn hash_slice<H>(data: &[Self], state: &mut H)
where H: Hasher, Self: Sized,
Feeds a slice of this type into the given `Hasher`. Read more
Source§
### impl<Pk: MiniscriptKey, Ctx: ScriptContext> Liftable<Pk> for Miniscript<Pk, Ctx>
Source§
#### fn lift(&self) -> Result<Semantic<Pk>, Error>
Converts this object into an abstract policy.
Source§
### impl<Pk: MiniscriptKey, Ctx: ScriptContext> Ord for Miniscript<Pk, Ctx>
`Ord` of `Miniscript` must depend only on node and not the type information.
The type information and extra properties are implied by the AST.
Source§
#### fn cmp(&self, other: &Miniscript<Pk, Ctx>) -> Ordering
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
### impl<Pk: MiniscriptKey, Ctx: ScriptContext> PartialEq for Miniscript<Pk, Ctx>
`PartialEq` of `Miniscript` must depend only on node and not the type information.
The type information and extra properties are implied by the AST.
Source§
#### fn eq(&self, other: &Miniscript<Pk, Ctx>) -> bool
Tests for `self` and `other` values to be equal, and is used by `==`.
1.0.0 · Source§
#### fn ne(&self, other: &Rhs) -> bool
Tests for `!=`. The default implementation is almost always sufficient, and should not be overridden without very good reason.
Source§
### impl<Pk: MiniscriptKey, Ctx: ScriptContext> PartialOrd for Miniscript<Pk, Ctx>
`PartialOrd` of `Miniscript` must depend only on node and not the type information.
The type information and extra properties are implied by the AST.
Source§
#### fn partial_cmp(&self, other: &Miniscript<Pk, Ctx>) -> Option<Ordering>
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
### impl<Pk, Q, Ctx> TranslatePk<Pk, Q> for Miniscript<Pk, Ctx>
where Pk: MiniscriptKey, Q: MiniscriptKey, Ctx: ScriptContext,
Source§
#### fn translate_pk<T, E>(&self, t: &mut T) -> Result<Self::Output, TranslateErr<E>>
where T: Translator<Pk, Q, E>,
Translates a struct from one generic to another where the translation for Pk is provided by `Translator`
Source§
#### type Output = Miniscript<Q, Ctx>
The associated output type. This must be `Self<Q>`.
Source§
### impl<'a, Pk: MiniscriptKey, Ctx: ScriptContext> TreeLike for &'a Miniscript<Pk, Ctx>
Source§
#### fn as_node(&self) -> Tree<Self>
Interpret the node as an abstract node.
Source§
#### fn n_children(&self) -> usize
Accessor for the number of children this node has.
Source§
#### fn nth_child(&self, n: usize) -> Option<Self>
Accessor for the nth child of the node, if a child with that index exists.
Source§
#### fn pre_order_iter(self) -> PreOrderIter<Self> ⓘ
Obtains an iterator of all the nodes rooted at the node, in pre-order.
Source§
#### fn verbose_pre_order_iter(self) -> VerbosePreOrderIter<Self> ⓘ
Obtains a verbose iterator of all the nodes rooted at the DAG, in pre-order. Read more
Source§
#### fn post_order_iter(self) -> PostOrderIter<Self> ⓘ
Obtains an iterator of all the nodes rooted at the DAG, in post order. Read more
Source§
### impl<Pk: MiniscriptKey, Ctx: ScriptContext> Eq for Miniscript<Pk, Ctx>
`Eq` of `Miniscript` must depend only on node and not the type information.
The type information and extra properties are implied by the AST.
## Auto Trait Implementations§
§
### impl<Pk, Ctx> Freeze for Miniscript<Pk, Ctx>
where Pk: Freeze, <Pk as MiniscriptKey>::Sha256: Freeze, <Pk as MiniscriptKey>::Hash256: Freeze, <Pk as MiniscriptKey>::Ripemd160: Freeze, <Pk as MiniscriptKey>::Hash160: Freeze,
§
### impl<Pk, Ctx> RefUnwindSafe for Miniscript<Pk, Ctx>
where Pk: RefUnwindSafe, <Pk as MiniscriptKey>::Sha256: RefUnwindSafe, <Pk as MiniscriptKey>::Hash256: RefUnwindSafe, <Pk as MiniscriptKey>::Ripemd160: RefUnwindSafe, <Pk as MiniscriptKey>::Hash160: RefUnwindSafe, Ctx: RefUnwindSafe,
§
### impl<Pk, Ctx> Send for Miniscript<Pk, Ctx>
where Pk: Send + Sync, <Pk as MiniscriptKey>::Sha256: Send + Sync, <Pk as MiniscriptKey>::Hash256: Send + Sync, <Pk as MiniscriptKey>::Ripemd160: Send + Sync, <Pk as MiniscriptKey>::Hash160: Send + Sync, Ctx: Send + Sync,
§
### impl<Pk, Ctx> Sync for Miniscript<Pk, Ctx>
where Pk: Sync + Send, <Pk as MiniscriptKey>::Sha256: Sync + Send, <Pk as MiniscriptKey>::Hash256: Sync + Send, <Pk as MiniscriptKey>::Ripemd160: Sync + Send, <Pk as MiniscriptKey>::Hash160: Sync + Send, Ctx: Sync + Send,
§
### impl<Pk, Ctx> Unpin for Miniscript<Pk, Ctx>
where Pk: Unpin, <Pk as MiniscriptKey>::Sha256: Unpin, <Pk as MiniscriptKey>::Hash256: Unpin, <Pk as MiniscriptKey>::Ripemd160: Unpin, <Pk as MiniscriptKey>::Hash160: Unpin, Ctx: Unpin,
§
### impl<Pk, Ctx> UnwindSafe for Miniscript<Pk, Ctx>
where Pk: UnwindSafe + RefUnwindSafe, <Pk as MiniscriptKey>::Sha256: UnwindSafe + RefUnwindSafe, <Pk as MiniscriptKey>::Hash256: UnwindSafe + RefUnwindSafe, <Pk as MiniscriptKey>::Ripemd160: UnwindSafe + RefUnwindSafe, <Pk as MiniscriptKey>::Hash160: UnwindSafe + RefUnwindSafe, Ctx: UnwindSafe + RefUnwindSafe,
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
### impl<T> ToString for T
where T: Display + ?Sized,
Source§
#### fn to_string(&self) -> String
Converts the given value to a `String`. Read more
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
