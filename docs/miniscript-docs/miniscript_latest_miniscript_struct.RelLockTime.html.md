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
# Struct RelLockTimeCopy item path
Settings
Help
SummarySource
```
pub struct RelLockTime(/* private fields */);
```
Expand description
A relative locktime which implements `Ord`.
## Implementations§
Source§
### impl RelLockTime
Source
#### pub const ZERO: Self
The “0 blocks” constant.
Source
#### pub fn from_consensus(n: u32) -> Result<Self, RelLockTimeError>
Constructs an `RelLockTime` from an nLockTime value or the argument to `CHEKCLOCKTIMEVERIFY`.
Source
#### pub fn to_consensus_u32(self) -> u32
Returns the inner `u32` value. This is the value used when creating this `LockTime` i.e., `n OP_CHECKSEQUENCEVERIFY` or `nSequence`.
Source
#### pub fn from_height(height: u16) -> Self
Takes a 16-bit number of blocks and produces a relative locktime from it.
Source
#### pub fn from_512_second_intervals(time: u16) -> Self
Takes a 16-bit number of 512-second time intervals and produces a relative locktime from it.
Source
#### pub fn is_height_locked(&self) -> bool
Whether this timelock is blockheight-based.
Source
#### pub fn is_time_locked(&self) -> bool
Whether this timelock is time-based.
## Trait Implementations§
Source§
### impl Clone for RelLockTime
Source§
#### fn clone(&self) -> RelLockTime
Returns a copy of the value. Read more
1.0.0 · Source§
#### fn clone_from(&mut self, source: &Self)
Performs copy-assignment from `source`. Read more
Source§
### impl Debug for RelLockTime
Source§
#### fn fmt(&self, f: &mut Formatter<'_>) -> Result
Formats the value using the given formatter. Read more
Source§
### impl Display for RelLockTime
Source§
#### fn fmt(&self, f: &mut Formatter<'_>) -> Result
Formats the value using the given formatter. Read more
Source§
### impl From<RelLockTime> for LockTime
Source§
#### fn from(lock_time: RelLockTime) -> LockTime
Converts to this type from the input type.
Source§
### impl From<RelLockTime> for Sequence
Source§
#### fn from(lock_time: RelLockTime) -> Sequence
Converts to this type from the input type.
Source§
### impl Hash for RelLockTime
Source§
#### fn hash<__H: Hasher>(&self, state: &mut __H)
Feeds this value into the given `Hasher`. Read more
1.3.0 · Source§
#### fn hash_slice<H>(data: &[Self], state: &mut H)
where H: Hasher, Self: Sized,
Feeds a slice of this type into the given `Hasher`. Read more
Source§
### impl Ord for RelLockTime
Source§
#### fn cmp(&self, other: &Self) -> Ordering
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
### impl PartialEq for RelLockTime
Source§
#### fn eq(&self, other: &RelLockTime) -> bool
Tests for `self` and `other` values to be equal, and is used by `==`.
1.0.0 · Source§
#### fn ne(&self, other: &Rhs) -> bool
Tests for `!=`. The default implementation is almost always sufficient, and should not be overridden without very good reason.
Source§
### impl PartialOrd for RelLockTime
Source§
#### fn partial_cmp(&self, other: &Self) -> Option<Ordering>
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
### impl<Pk: MiniscriptKey + ToPublicKey> Satisfier<Pk> for RelLockTime
Source§
#### fn check_older(&self, n: LockTime) -> bool
Assert whether an relative locktime is satisfied Read more
Source§
#### fn lookup_ecdsa_sig(&self, _: &Pk) -> Option<Signature>
Given a public key, look up an ECDSA signature with that key
Source§
#### fn lookup_tap_key_spend_sig(&self) -> Option<Signature>
Lookup the tap key spend sig
Source§
#### fn lookup_tap_leaf_script_sig( &self, _: &Pk, _: &TapLeafHash, ) -> Option<Signature>
Given a public key and a associated leaf hash, look up an schnorr signature with that key
Source§
#### fn lookup_tap_control_block_map( &self, ) -> Option<&BTreeMap<ControlBlock, (ScriptBuf, LeafVersion)>>
Obtain a reference to the control block for a ver and script
Source§
#### fn lookup_raw_pkh_pk(&self, _: &Hash) -> Option<PublicKey>
Given a raw `Pkh`, lookup corresponding `bitcoin::PublicKey`
Source§
#### fn lookup_raw_pkh_x_only_pk(&self, _: &Hash) -> Option<XOnlyPublicKey>
Given a raw `Pkh`, lookup corresponding `bitcoin::secp256k1::XOnlyPublicKey`
Source§
#### fn lookup_raw_pkh_ecdsa_sig(&self, _: &Hash) -> Option<(PublicKey, Signature)>
Given a keyhash, look up the EC signature and the associated key Even if signatures for public key Hashes are not available, the users can use this map to provide pkh -> pk mapping which can be useful for dissatisfying pkh.
Source§
#### fn lookup_raw_pkh_tap_leaf_script_sig( &self, _: &(Hash, TapLeafHash), ) -> Option<(XOnlyPublicKey, Signature)>
Given a keyhash, look up the schnorr signature and the associated key Even if signatures for public key Hashes are not available, the users can use this map to provide pkh -> pk mapping which can be useful for dissatisfying pkh.
Source§
#### fn lookup_sha256(&self, _: &Pk::Sha256) -> Option<Preimage32>
Given a SHA256 hash, look up its preimage
Source§
#### fn lookup_hash256(&self, _: &Pk::Hash256) -> Option<Preimage32>
Given a HASH256 hash, look up its preimage
Source§
#### fn lookup_ripemd160(&self, _: &Pk::Ripemd160) -> Option<Preimage32>
Given a RIPEMD160 hash, look up its preimage
Source§
#### fn lookup_hash160(&self, _: &Pk::Hash160) -> Option<Preimage32>
Given a HASH160 hash, look up its preimage
Source§
#### fn check_after(&self, _: LockTime) -> bool
Assert whether a absolute locktime is satisfied Read more
Source§
### impl TryFrom<Sequence> for RelLockTime
Source§
#### type Error = RelLockTimeError
The type returned in the event of a conversion error.
Source§
#### fn try_from(seq: Sequence) -> Result<Self, RelLockTimeError>
Performs the conversion.
Source§
### impl Copy for RelLockTime
Source§
### impl Eq for RelLockTime
Source§
### impl StructuralPartialEq for RelLockTime
## Auto Trait Implementations§
§
### impl Freeze for RelLockTime
§
### impl RefUnwindSafe for RelLockTime
§
### impl Send for RelLockTime
§
### impl Sync for RelLockTime
§
### impl Unpin for RelLockTime
§
### impl UnwindSafe for RelLockTime
## Blanket Implementations§
Source§
### impl<T> Any for T
where T: 'static + ?Sized,
Source§
#### fn type_id(&self) -> TypeId
Gets the `TypeId` of `self`. Read more
Source§
### impl<T, Pk> AssetProvider<Pk> for T
where T: Satisfier<Pk>, Pk: MiniscriptKey + ToPublicKey,
Source§
#### fn provider_lookup_ecdsa_sig(&self, pk: &Pk) -> bool
Given a public key, look up an ECDSA signature with that key, return whether we found it
Source§
#### fn provider_lookup_tap_key_spend_sig(&self, _: &Pk) -> Option<usize>
Lookup the tap key spend sig and return its size
Source§
#### fn provider_lookup_tap_leaf_script_sig( &self, pk: &Pk, leaf_hash: &TapLeafHash, ) -> Option<usize>
Given a public key and a associated leaf hash, look up a schnorr signature with that key and return its size
Source§
#### fn provider_lookup_tap_control_block_map( &self, ) -> Option<&BTreeMap<ControlBlock, (ScriptBuf, LeafVersion)>>
Obtain a reference to the control block for a ver and script
Source§
#### fn provider_lookup_raw_pkh_pk(&self, hash: &Hash) -> Option<PublicKey>
Given a raw `Pkh`, lookup corresponding `bitcoin::PublicKey`
Source§
#### fn provider_lookup_raw_pkh_x_only_pk( &self, hash: &Hash, ) -> Option<XOnlyPublicKey>
Given a raw `Pkh`, lookup corresponding `bitcoin::secp256k1::XOnlyPublicKey`
Source§
#### fn provider_lookup_raw_pkh_ecdsa_sig(&self, hash: &Hash) -> Option<PublicKey>
Given a keyhash, look up the EC signature and the associated key. Returns the key if a signature is found. Even if signatures for public key Hashes are not available, the users can use this map to provide pkh -> pk mapping which can be useful for dissatisfying pkh.
Source§
#### fn provider_lookup_raw_pkh_tap_leaf_script_sig( &self, hash: &(Hash, TapLeafHash), ) -> Option<(XOnlyPublicKey, usize)>
Given a keyhash, look up the schnorr signature and the associated key. Returns the key and sig len if a signature is found. Even if signatures for public key Hashes are not available, the users can use this map to provide pkh -> pk mapping which can be useful for dissatisfying pkh.
Source§
#### fn provider_lookup_sha256(&self, hash: &<Pk as MiniscriptKey>::Sha256) -> bool
Given a SHA256 hash, look up its preimage, return whether we found it
Source§
#### fn provider_lookup_hash256(&self, hash: &<Pk as MiniscriptKey>::Hash256) -> bool
Given a HASH256 hash, look up its preimage, return whether we found it
Source§
#### fn provider_lookup_ripemd160( &self, hash: &<Pk as MiniscriptKey>::Ripemd160, ) -> bool
Given a RIPEMD160 hash, look up its preimage, return whether we found it
Source§
#### fn provider_lookup_hash160(&self, hash: &<Pk as MiniscriptKey>::Hash160) -> bool
Given a HASH160 hash, look up its preimage, return whether we found it
Source§
#### fn check_older(&self, s: LockTime) -> bool
Assert whether a relative locktime is satisfied
Source§
#### fn check_after(&self, l: LockTime) -> bool
Assert whether an absolute locktime is satisfied
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
