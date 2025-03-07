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


miniscript::descriptor
# Enum DescriptorCopy item path
Settings
Help
SummarySource
```
pub enum Descriptor<Pk: MiniscriptKey> {
  Bare(Bare<Pk>),
  Pkh(Pkh<Pk>),
  Wpkh(Wpkh<Pk>),
  Sh(Sh<Pk>),
  Wsh(Wsh<Pk>),
  Tr(Tr<Pk>),
}
```
Expand description
Script descriptor
## Variants§
§
### Bare(Bare<Pk>)
A raw scriptpubkey (including pay-to-pubkey) under Legacy context
§
### Pkh(Pkh<Pk>)
Pay-to-PubKey-Hash
§
### Wpkh(Wpkh<Pk>)
Pay-to-Witness-PubKey-Hash
§
### Sh(Sh<Pk>)
Pay-to-ScriptHash(includes nested wsh/wpkh/sorted multi)
§
### Wsh(Wsh<Pk>)
Pay-to-Witness-ScriptHash with Segwitv0 context
§
### Tr(Tr<Pk>)
Pay-to-Taproot
## Implementations§
Source§
### impl<Pk: MiniscriptKey> Descriptor<Pk>
Source
#### pub fn new_pk(pk: Pk) -> Self
Create a new pk descriptor
Source
#### pub fn new_pkh(pk: Pk) -> Result<Self, Error>
Create a new PkH descriptor
Source
#### pub fn new_wpkh(pk: Pk) -> Result<Self, Error>
Create a new Wpkh descriptor Will return Err if uncompressed key is used
Source
#### pub fn new_sh_wpkh(pk: Pk) -> Result<Self, Error>
Create a new sh wrapped wpkh from `Pk`. Errors when uncompressed keys are supplied
Source
#### pub fn new_sh(ms: Miniscript<Pk, Legacy>) -> Result<Self, Error>
Create a new sh for a given redeem script Errors when miniscript exceeds resource limits under p2sh context or does not type check at the top level
Source
#### pub fn new_wsh(ms: Miniscript<Pk, Segwitv0>) -> Result<Self, Error>
Create a new wsh descriptor from witness script Errors when miniscript exceeds resource limits under p2sh context or does not type check at the top level
Source
#### pub fn new_sh_wsh(ms: Miniscript<Pk, Segwitv0>) -> Result<Self, Error>
Create a new sh wrapped wsh descriptor with witness script Errors when miniscript exceeds resource limits under wsh context or does not type check at the top level
Source
#### pub fn new_bare(ms: Miniscript<Pk, BareCtx>) -> Result<Self, Error>
Create a new bare descriptor from witness script Errors when miniscript exceeds resource limits under bare context or does not type check at the top level
Source
#### pub fn new_sh_with_wpkh(wpkh: Wpkh<Pk>) -> Self
Create a new sh wrapper for the given wpkh descriptor
Source
#### pub fn new_sh_with_wsh(wsh: Wsh<Pk>) -> Self
Create a new sh wrapper for the given wsh descriptor
Source
#### pub fn new_sh_sortedmulti(k: usize, pks: Vec<Pk>) -> Result<Self, Error>
Create a new sh sortedmulti descriptor with threshold `k` and Vec of `pks`. Errors when miniscript exceeds resource limits under p2sh context
Source
#### pub fn new_sh_wsh_sortedmulti(k: usize, pks: Vec<Pk>) -> Result<Self, Error>
Create a new sh wrapped wsh sortedmulti descriptor from threshold `k` and Vec of `pks` Errors when miniscript exceeds resource limits under segwit context
Source
#### pub fn new_wsh_sortedmulti(k: usize, pks: Vec<Pk>) -> Result<Self, Error>
Create a new wsh sorted multi descriptor Errors when miniscript exceeds resource limits under p2sh context
Source
#### pub fn new_tr(key: Pk, script: Option<TapTree<Pk>>) -> Result<Self, Error>
Create new tr descriptor Errors when miniscript exceeds resource limits under Tap context
Source
#### pub fn desc_type(&self) -> DescriptorType
Get the DescriptorType of Descriptor
Source
#### pub fn sanity_check(&self) -> Result<(), Error>
Checks whether the descriptor is safe.
Checks whether all the spend paths in the descriptor are possible on the bitcoin network under the current standardness and consensus rules. Also checks whether the descriptor requires signatures on all spend paths and whether the script is malleable.
In general, all the guarantees of miniscript hold only for safe scripts. The signer may not be able to find satisfactions even if one exists.
Source
#### pub fn max_weight_to_satisfy(&self) -> Result<Weight, Error>
Computes an upper bound on the difference between a non-satisfied `TxIn`’s `segwit_weight` and a satisfied `TxIn`’s `segwit_weight`
Since this method uses `segwit_weight` instead of `legacy_weight`, if you want to include only legacy inputs in your transaction, you should remove 1WU from each input’s `max_weight_to_satisfy` for a more accurate estimate.
In other words, for segwit inputs or legacy inputs included in segwit transactions, the following will hold for each input if that input was satisfied with the largest possible witness:
ⓘ```
for i in 0..transaction.input.len() {
  assert_eq!(
    descriptor_for_input[i].max_weight_to_satisfy(),
    transaction.input[i].segwit_weight() - TxIn::default().segwit_weight()
  );
}
```

Instead, for legacy transactions, the following will hold for each input if that input was satisfied with the largest possible witness:
ⓘ```
for i in 0..transaction.input.len() {
  assert_eq!(
    descriptor_for_input[i].max_weight_to_satisfy(),
    transaction.input[i].legacy_weight() - TxIn::default().legacy_weight()
  );
}
```

Assumes all ECDSA signatures are 73 bytes, including push opcode and sighash suffix. Assumes all Schnorr signatures are 66 bytes, including push opcode and sighash suffix.
##### §Errors
When the descriptor is impossible to safisfy (ex: sh(OP_FALSE)).
Source
#### pub fn max_satisfaction_weight(&self) -> Result<usize, Error>
👎Deprecated since 10.0.0: Use max_weight_to_satisfy instead. The method to count bytes was redesigned and the results will differ from max_weight_to_satisfy. For more details check rust-bitcoin/rust-miniscript#476.
Computes an upper bound on the weight of a satisfying witness to the transaction.
Assumes all ec-signatures are 73 bytes, including push opcode and sighash suffix. Includes the weight of the VarInts encoding the scriptSig and witness stack length.
##### §Errors
When the descriptor is impossible to safisfy (ex: sh(OP_FALSE)).
Source§
### impl<Pk: MiniscriptKey + ToPublicKey> Descriptor<Pk>
Source
#### pub fn address(&self, network: Network) -> Result<Address, Error>
Computes the Bitcoin address of the descriptor, if one exists
Some descriptors like pk() don’t have an address.
##### §Errors
For raw/bare descriptors that don’t have an address.
Source
#### pub fn script_pubkey(&self) -> ScriptBuf
Computes the scriptpubkey of the descriptor.
Source
#### pub fn unsigned_script_sig(&self) -> ScriptBuf
Computes the scriptSig that will be in place for an unsigned input spending an output with this descriptor. For pre-segwit descriptors, which use the scriptSig for signatures, this returns the empty script.
This is used in Segwit transactions to produce an unsigned transaction whose txid will not change during signing (since only the witness data will change).
Source
#### pub fn explicit_script(&self) -> Result<ScriptBuf, Error>
Computes the the underlying script before any hashing is done. For `Bare`, `Pkh` and `Wpkh` this is the scriptPubkey; for `ShWpkh` and `Sh` this is the redeemScript; for the others it is the witness script.
##### §Errors
If the descriptor is a taproot descriptor.
Source
#### pub fn script_code(&self) -> Result<ScriptBuf, Error>
Computes the `scriptCode` of a transaction output.
The `scriptCode` is the Script of the previous transaction output being serialized in the sighash when evaluating a `CHECKSIG` & co. OP code.
##### §Errors
If the descriptor is a taproot descriptor.
Source
#### pub fn get_satisfaction<S>( &self, satisfier: S, ) -> Result<(Vec<Vec<u8>>, ScriptBuf), Error>
where S: Satisfier<Pk>,
Returns satisfying non-malleable witness and scriptSig to spend an output controlled by the given descriptor if it possible to construct one using the satisfier S.
Source
#### pub fn get_satisfaction_mall<S>( &self, satisfier: S, ) -> Result<(Vec<Vec<u8>>, ScriptBuf), Error>
where S: Satisfier<Pk>,
Returns a possilbly mallable satisfying non-malleable witness and scriptSig to spend an output controlled by the given descriptor if it possible to construct one using the satisfier S.
Source
#### pub fn satisfy<S>(&self, txin: &mut TxIn, satisfier: S) -> Result<(), Error>
where S: Satisfier<Pk>,
Attempts to produce a non-malleable satisfying witness and scriptSig to spend an output controlled by the given descriptor; add the data to a given `TxIn` output.
Source§
### impl Descriptor<DefiniteDescriptorKey>
Source
#### pub fn plan<P>(self, provider: &P) -> Result<Plan, Self>
where P: AssetProvider<DefiniteDescriptorKey>,
Returns a plan if the provided assets are sufficient to produce a non-malleable satisfaction
If the assets aren’t sufficient for generating a Plan, the descriptor is returned
Source
#### pub fn plan_mall<P>(self, provider: &P) -> Result<Plan, Self>
where P: AssetProvider<DefiniteDescriptorKey>,
Returns a plan if the provided assets are sufficient to produce a malleable satisfaction
If the assets aren’t sufficient for generating a Plan, the descriptor is returned
Source§
### impl Descriptor<DescriptorPublicKey>
Source
#### pub fn is_deriveable(&self) -> bool
👎Deprecated: use has_wildcards instead
Whether or not the descriptor has any wildcards
Source
#### pub fn has_wildcard(&self) -> bool
Whether or not the descriptor has any wildcards i.e. `/*`.
Source
#### pub fn at_derivation_index( &self, index: u32, ) -> Result<Descriptor<DefiniteDescriptorKey>, ConversionError>
Replaces all wildcards (i.e. `/*`) in the descriptor with a particular derivation index, turning it into a _definite_ descriptor.
##### §Errors
  * If index ≥ 2^31


Source
#### pub fn derive( &self, index: u32, ) -> Result<Descriptor<DefiniteDescriptorKey>, ConversionError>
👎Deprecated: use at_derivation_index instead
Deprecated name for `Self::at_derivation_index`.
Source
#### pub fn derived_descriptor<C: Verification>( &self, secp: &Secp256k1<C>, index: u32, ) -> Result<Descriptor<PublicKey>, ConversionError>
Convert all the public keys in the descriptor to `bitcoin::PublicKey` by deriving them or otherwise converting them. All `bitcoin::secp256k1::XOnlyPublicKey`s are converted to by adding a default(0x02) y-coordinate.
This is a shorthand for:
```
  .expect("Valid ranged descriptor");
let derived_descriptor = descriptor.at_derivation_index(index).unwrap().derived_descriptor(&secp).unwrap();
```

and is only here really here for backwards compatibility. See `at_derivation_index` and `[derived_descriptor`] for more documentation.
##### §Errors
This function will return an error if hardened derivation is attempted.
Source
#### pub fn parse_descriptor<C: Signing>( secp: &Secp256k1<C>, s: &str, ) -> Result<(Descriptor<DescriptorPublicKey>, KeyMap), Error>
Parse a descriptor that may contain secret keys
Internally turns every secret key found into the corresponding public key and then returns a a descriptor that only contains public keys and a map to lookup the secret key given a public key.
Source
#### pub fn to_string_with_secret(&self, key_map: &KeyMap) -> String
Serialize a descriptor to string with its secret keys
Source
#### pub fn find_derivation_index_for_spk<C: Verification>( &self, secp: &Secp256k1<C>, script_pubkey: &Script, range: Range<u32>, ) -> Result<Option<(u32, Descriptor<PublicKey>)>, ConversionError>
Utility method for deriving the descriptor at each index in a range to find one matching `script_pubkey`.
If it finds a match then it returns the index it was derived at and the concrete descriptor at that index. If the descriptor is non-derivable then it will simply check the script pubkey against the descriptor and return it if it matches (in this case the index returned will be meaningless).
Source
#### pub fn is_multipath(&self) -> bool
Whether this descriptor contains a key that has multiple derivation paths.
Source
#### pub fn into_single_descriptors( self, ) -> Result<Vec<Descriptor<DescriptorPublicKey>>, Error>
Get as many descriptors as different paths in this descriptor.
For multipath descriptors it will return as many descriptors as there is “parallel” paths. For regular descriptors it will just return itself.
Source§
### impl Descriptor<DefiniteDescriptorKey>
Source
#### pub fn derived_descriptor<C: Verification>( &self, secp: &Secp256k1<C>, ) -> Result<Descriptor<PublicKey>, ConversionError>
Convert all the public keys in the descriptor to `bitcoin::PublicKey` by deriving them or otherwise converting them. All `bitcoin::secp256k1::XOnlyPublicKey`s are converted to by adding a default(0x02) y-coordinate.
##### §Examples
```
use miniscript::descriptor::{Descriptor, DescriptorPublicKey};
use miniscript::bitcoin::secp256k1;
use std::str::FromStr;
// test from bip 86
let secp = secp256k1::Secp256k1::verification_only();
let descriptor = Descriptor::<DescriptorPublicKey>::from_str("tr(xpub6BgBgsespWvERF3LHQu6CnqdvfEvtMcQjYrcRzx53QJjSxarj2afYWcLteoGVky7D3UKDP9QyrLprQ3VCECoY49yfdDEHGCtMMj92pReUsQ/0/*)")
  .expect("Valid ranged descriptor");
let result = descriptor.at_derivation_index(0).unwrap().derived_descriptor(&secp).expect("Non-hardened derivation");
assert_eq!(result.to_string(), "tr(03cc8a4bc64d897bddc5fbc2f670f7a8ba0b386779106cf1223c6fc5d7cd6fc115)#6qm9h8ym");
```

##### §Errors
This function will return an error if hardened derivation is attempted.
## Trait Implementations§
Source§
### impl<Pk: Clone + MiniscriptKey> Clone for Descriptor<Pk>
Source§
#### fn clone(&self) -> Descriptor<Pk>
Returns a copy of the value. Read more
1.0.0 · Source§
#### fn clone_from(&mut self, source: &Self)
Performs copy-assignment from `source`. Read more
Source§
### impl<Pk: MiniscriptKey> Debug for Descriptor<Pk>
Source§
#### fn fmt(&self, f: &mut Formatter<'_>) -> Result
Formats the value using the given formatter. Read more
Source§
### impl<Pk: MiniscriptKey> Display for Descriptor<Pk>
Source§
#### fn fmt(&self, f: &mut Formatter<'_>) -> Result
Formats the value using the given formatter. Read more
Source§
### impl<Pk: MiniscriptKey> ForEachKey<Pk> for Descriptor<Pk>
Source§
#### fn for_each_key<'a, F: FnMut(&'a Pk) -> bool>(&'a self, pred: F) -> bool
Run a predicate on every key in the descriptor, returning whether the predicate returned true for every key
Source§
#### fn for_any_key<'a, F: FnMut(&'a Pk) -> bool>(&'a self, pred: F) -> bool
where Pk: 'a,
Run a predicate on every key in the descriptor, returning whether the predicate returned true for any key
Source§
### impl<Pk: MiniscriptKey> From<Bare<Pk>> for Descriptor<Pk>
Source§
#### fn from(inner: Bare<Pk>) -> Self
Converts to this type from the input type.
Source§
### impl<Pk: MiniscriptKey> From<Pkh<Pk>> for Descriptor<Pk>
Source§
#### fn from(inner: Pkh<Pk>) -> Self
Converts to this type from the input type.
Source§
### impl<Pk: MiniscriptKey> From<Sh<Pk>> for Descriptor<Pk>
Source§
#### fn from(inner: Sh<Pk>) -> Self
Converts to this type from the input type.
Source§
### impl<Pk: MiniscriptKey> From<Tr<Pk>> for Descriptor<Pk>
Source§
#### fn from(inner: Tr<Pk>) -> Self
Converts to this type from the input type.
Source§
### impl<Pk: MiniscriptKey> From<Wpkh<Pk>> for Descriptor<Pk>
Source§
#### fn from(inner: Wpkh<Pk>) -> Self
Converts to this type from the input type.
Source§
### impl<Pk: MiniscriptKey> From<Wsh<Pk>> for Descriptor<Pk>
Source§
#### fn from(inner: Wsh<Pk>) -> Self
Converts to this type from the input type.
Source§
### impl<Pk: FromStrKey> FromStr for Descriptor<Pk>
Source§
#### type Err = Error
The associated error which can be returned from parsing.
Source§
#### fn from_str(s: &str) -> Result<Descriptor<Pk>, Error>
Parses a string `s` to return a value of this type. Read more
Source§
### impl<Pk: FromStrKey> FromTree for Descriptor<Pk>
Source§
#### fn from_tree(top: &Tree<'_>) -> Result<Descriptor<Pk>, Error>
Parse an expression tree into a descriptor.
Source§
### impl<Pk: Hash + MiniscriptKey> Hash for Descriptor<Pk>
Source§
#### fn hash<__H: Hasher>(&self, state: &mut __H)
Feeds this value into the given `Hasher`. Read more
1.3.0 · Source§
#### fn hash_slice<H>(data: &[Self], state: &mut H)
where H: Hasher, Self: Sized,
Feeds a slice of this type into the given `Hasher`. Read more
Source§
### impl<Pk: MiniscriptKey> Liftable<Pk> for Descriptor<Pk>
Source§
#### fn lift(&self) -> Result<Semantic<Pk>, Error>
Converts this object into an abstract policy.
Source§
### impl<Pk: Ord + MiniscriptKey> Ord for Descriptor<Pk>
Source§
#### fn cmp(&self, other: &Descriptor<Pk>) -> Ordering
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
### impl<Pk: PartialEq + MiniscriptKey> PartialEq for Descriptor<Pk>
Source§
#### fn eq(&self, other: &Descriptor<Pk>) -> bool
Tests for `self` and `other` values to be equal, and is used by `==`.
1.0.0 · Source§
#### fn ne(&self, other: &Rhs) -> bool
Tests for `!=`. The default implementation is almost always sufficient, and should not be overridden without very good reason.
Source§
### impl<Pk: PartialOrd + MiniscriptKey> PartialOrd for Descriptor<Pk>
Source§
#### fn partial_cmp(&self, other: &Descriptor<Pk>) -> Option<Ordering>
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
### impl<P, Q> TranslatePk<P, Q> for Descriptor<P>
where P: MiniscriptKey, Q: MiniscriptKey,
Source§
#### fn translate_pk<T, E>(&self, t: &mut T) -> Result<Self::Output, TranslateErr<E>>
where T: Translator<P, Q, E>,
Converts a descriptor using abstract keys to one using specific keys.
Source§
#### type Output = Descriptor<Q>
The associated output type. This must be `Self<Q>`.
Source§
### impl<Pk: Eq + MiniscriptKey> Eq for Descriptor<Pk>
Source§
### impl<Pk: MiniscriptKey> StructuralPartialEq for Descriptor<Pk>
## Auto Trait Implementations§
§
### impl<Pk> !Freeze for Descriptor<Pk>
§
### impl<Pk> RefUnwindSafe for Descriptor<Pk>
where Pk: RefUnwindSafe, <Pk as MiniscriptKey>::Sha256: RefUnwindSafe, <Pk as MiniscriptKey>::Hash256: RefUnwindSafe, <Pk as MiniscriptKey>::Ripemd160: RefUnwindSafe, <Pk as MiniscriptKey>::Hash160: RefUnwindSafe,
§
### impl<Pk> Send for Descriptor<Pk>
where Pk: Send + Sync, <Pk as MiniscriptKey>::Sha256: Send + Sync, <Pk as MiniscriptKey>::Hash256: Send + Sync, <Pk as MiniscriptKey>::Ripemd160: Send + Sync, <Pk as MiniscriptKey>::Hash160: Send + Sync,
§
### impl<Pk> Sync for Descriptor<Pk>
where Pk: Sync + Send, <Pk as MiniscriptKey>::Sha256: Sync + Send, <Pk as MiniscriptKey>::Hash256: Sync + Send, <Pk as MiniscriptKey>::Ripemd160: Sync + Send, <Pk as MiniscriptKey>::Hash160: Sync + Send,
§
### impl<Pk> Unpin for Descriptor<Pk>
where Pk: Unpin, <Pk as MiniscriptKey>::Sha256: Unpin, <Pk as MiniscriptKey>::Hash256: Unpin, <Pk as MiniscriptKey>::Ripemd160: Unpin, <Pk as MiniscriptKey>::Hash160: Unpin,
§
### impl<Pk> UnwindSafe for Descriptor<Pk>
where Pk: UnwindSafe + RefUnwindSafe, <Pk as MiniscriptKey>::Sha256: UnwindSafe + RefUnwindSafe, <Pk as MiniscriptKey>::Hash256: UnwindSafe + RefUnwindSafe, <Pk as MiniscriptKey>::Ripemd160: UnwindSafe + RefUnwindSafe, <Pk as MiniscriptKey>::Hash160: UnwindSafe + RefUnwindSafe,
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
