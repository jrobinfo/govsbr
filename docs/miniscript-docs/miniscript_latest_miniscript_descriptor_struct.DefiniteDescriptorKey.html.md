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
# Struct DefiniteDescriptorKeyCopy item path
Settings
Help
SummarySource
```
pub struct DefiniteDescriptorKey(/* private fields */);
```
Expand description
A `DescriptorPublicKey` without any wildcards.
## Implementations§
Source§
### impl DefiniteDescriptorKey
Source
#### pub fn derive_public_key<C: Verification>( &self, secp: &Secp256k1<C>, ) -> Result<PublicKey, ConversionError>
Computes the public key corresponding to this descriptor key. When deriving from an XOnlyPublicKey, it adds the default 0x02 y-coordinate and returns the obtained full `bitcoin::PublicKey`. All BIP32 derivations always return a compressed key
Will return an error if the descriptor key has any hardened derivation steps in its path. To avoid this error you should replace any such public keys first with `translate_pk`.
Source
#### pub fn master_fingerprint(&self) -> Fingerprint
The fingerprint of the master key associated with this key, `0x00000000` if none.
Source
#### pub fn full_derivation_path(&self) -> Option<DerivationPath>
Full path from the master key if not a multipath extended key.
Source
#### pub fn full_derivation_paths(&self) -> Vec<DerivationPath>
Full paths from the master key. The vector will contain just one path for single keys, and multiple ones for multipath extended keys
Source
#### pub fn as_descriptor_public_key(&self) -> &DescriptorPublicKey
Reference to the underlying `DescriptorPublicKey`
Source
#### pub fn into_descriptor_public_key(self) -> DescriptorPublicKey
Converts the definite key into a generic one
## Trait Implementations§
Source§
### impl AssetProvider<DefiniteDescriptorKey> for Assets
Source§
#### fn provider_lookup_ecdsa_sig(&self, pk: &DefiniteDescriptorKey) -> bool
Given a public key, look up an ECDSA signature with that key, return whether we found it
Source§
#### fn provider_lookup_tap_key_spend_sig( &self, pk: &DefiniteDescriptorKey, ) -> Option<usize>
Lookup the tap key spend sig and return its size
Source§
#### fn provider_lookup_tap_leaf_script_sig( &self, pk: &DefiniteDescriptorKey, tap_leaf_hash: &TapLeafHash, ) -> Option<usize>
Given a public key and a associated leaf hash, look up a schnorr signature with that key and return its size
Source§
#### fn provider_lookup_sha256(&self, hash: &Hash) -> bool
Given a SHA256 hash, look up its preimage, return whether we found it
Source§
#### fn provider_lookup_hash256(&self, hash: &Hash) -> bool
Given a HASH256 hash, look up its preimage, return whether we found it
Source§
#### fn provider_lookup_ripemd160(&self, hash: &Hash) -> bool
Given a RIPEMD160 hash, look up its preimage, return whether we found it
Source§
#### fn provider_lookup_hash160(&self, hash: &Hash) -> bool
Given a HASH160 hash, look up its preimage, return whether we found it
Source§
#### fn check_older(&self, s: LockTime) -> bool
Assert whether a relative locktime is satisfied
Source§
#### fn check_after(&self, l: LockTime) -> bool
Assert whether an absolute locktime is satisfied
Source§
#### fn provider_lookup_tap_control_block_map( &self, ) -> Option<&BTreeMap<ControlBlock, (ScriptBuf, LeafVersion)>>
Obtain a reference to the control block for a ver and script
Source§
#### fn provider_lookup_raw_pkh_pk(&self, _: &Hash) -> Option<PublicKey>
Given a raw `Pkh`, lookup corresponding `bitcoin::PublicKey`
Source§
#### fn provider_lookup_raw_pkh_x_only_pk(&self, _: &Hash) -> Option<XOnlyPublicKey>
Given a raw `Pkh`, lookup corresponding `bitcoin::secp256k1::XOnlyPublicKey`
Source§
#### fn provider_lookup_raw_pkh_ecdsa_sig(&self, _: &Hash) -> Option<PublicKey>
Given a keyhash, look up the EC signature and the associated key. Returns the key if a signature is found. Even if signatures for public key Hashes are not available, the users can use this map to provide pkh -> pk mapping which can be useful for dissatisfying pkh.
Source§
#### fn provider_lookup_raw_pkh_tap_leaf_script_sig( &self, _: &(Hash, TapLeafHash), ) -> Option<(XOnlyPublicKey, usize)>
Given a keyhash, look up the schnorr signature and the associated key. Returns the key and sig len if a signature is found. Even if signatures for public key Hashes are not available, the users can use this map to provide pkh -> pk mapping which can be useful for dissatisfying pkh.
Source§
### impl<'a> AssetProvider<DefiniteDescriptorKey> for LoggerAssetProvider<'a>
Source§
#### fn provider_lookup_ecdsa_sig(&self, pk: &DefiniteDescriptorKey) -> bool
Given a public key, look up an ECDSA signature with that key, return whether we found it
Source§
#### fn provider_lookup_tap_key_spend_sig( &self, pk: &DefiniteDescriptorKey, ) -> Option<usize>
Lookup the tap key spend sig and return its size
Source§
#### fn provider_lookup_tap_leaf_script_sig( &self, pk: &DefiniteDescriptorKey, leaf_hash: &TapLeafHash, ) -> Option<usize>
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
#### fn provider_lookup_sha256(&self, hash: &Hash) -> bool
Given a SHA256 hash, look up its preimage, return whether we found it
Source§
#### fn provider_lookup_hash256(&self, hash: &Hash) -> bool
Given a HASH256 hash, look up its preimage, return whether we found it
Source§
#### fn provider_lookup_ripemd160(&self, hash: &Hash) -> bool
Given a RIPEMD160 hash, look up its preimage, return whether we found it
Source§
#### fn provider_lookup_hash160(&self, hash: &Hash) -> bool
Given a HASH160 hash, look up its preimage, return whether we found it
Source§
#### fn check_older(&self, s: LockTime) -> bool
Assert whether a relative locktime is satisfied
Source§
#### fn check_after(&self, t: LockTime) -> bool
Assert whether an absolute locktime is satisfied
Source§
### impl Borrow<DescriptorPublicKey> for DefiniteDescriptorKey
Source§
#### fn borrow(&self) -> &DescriptorPublicKey
Immutably borrows from an owned value. Read more
Source§
### impl Clone for DefiniteDescriptorKey
Source§
#### fn clone(&self) -> DefiniteDescriptorKey
Returns a copy of the value. Read more
1.0.0 · Source§
#### fn clone_from(&mut self, source: &Self)
Performs copy-assignment from `source`. Read more
Source§
### impl Debug for DefiniteDescriptorKey
Source§
#### fn fmt(&self, f: &mut Formatter<'_>) -> Result
Formats the value using the given formatter. Read more
Source§
### impl Display for DefiniteDescriptorKey
Source§
#### fn fmt(&self, f: &mut Formatter<'_>) -> Result
Formats the value using the given formatter. Read more
Source§
### impl From<DefiniteDescriptorKey> for DescriptorPublicKey
Source§
#### fn from(d: DefiniteDescriptorKey) -> Self
Converts to this type from the input type.
Source§
### impl FromStr for DefiniteDescriptorKey
Source§
#### type Err = DescriptorKeyParseError
The associated error which can be returned from parsing.
Source§
#### fn from_str(s: &str) -> Result<Self, Self::Err>
Parses a string `s` to return a value of this type. Read more
Source§
### impl Hash for DefiniteDescriptorKey
Source§
#### fn hash<__H: Hasher>(&self, state: &mut __H)
Feeds this value into the given `Hasher`. Read more
1.3.0 · Source§
#### fn hash_slice<H>(data: &[Self], state: &mut H)
where H: Hasher, Self: Sized,
Feeds a slice of this type into the given `Hasher`. Read more
Source§
### impl MiniscriptKey for DefiniteDescriptorKey
Source§
#### type Sha256 = Hash
The associated `bitcoin::hashes::sha256::Hash` for this `MiniscriptKey`, used in the sha256 fragment.
Source§
#### type Hash256 = Hash
The associated `miniscript::hash256::Hash` for this `MiniscriptKey`, used in the hash256 fragment.
Source§
#### type Ripemd160 = Hash
The associated `bitcoin::hashes::ripemd160::Hash` for this `MiniscriptKey` type, used in the ripemd160 fragment.
Source§
#### type Hash160 = Hash
The associated `bitcoin::hashes::hash160::Hash` for this `MiniscriptKey` type, used in the hash160 fragment.
Source§
#### fn is_uncompressed(&self) -> bool
Returns true if the pubkey is uncompressed. Defaults to `false`.
Source§
#### fn is_x_only_key(&self) -> bool
Returns true if the pubkey is an x-only pubkey. Defaults to `false`.
Source§
#### fn num_der_paths(&self) -> usize
Returns the number of different derivation paths in this key. Only >1 for keys in BIP389 multipath descriptors.
Source§
### impl Ord for DefiniteDescriptorKey
Source§
#### fn cmp(&self, other: &DefiniteDescriptorKey) -> Ordering
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
### impl PartialEq for DefiniteDescriptorKey
Source§
#### fn eq(&self, other: &DefiniteDescriptorKey) -> bool
Tests for `self` and `other` values to be equal, and is used by `==`.
1.0.0 · Source§
#### fn ne(&self, other: &Rhs) -> bool
Tests for `!=`. The default implementation is almost always sufficient, and should not be overridden without very good reason.
Source§
### impl PartialOrd for DefiniteDescriptorKey
Source§
#### fn partial_cmp(&self, other: &DefiniteDescriptorKey) -> Option<Ordering>
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
### impl ToPublicKey for DefiniteDescriptorKey
Source§
#### fn to_public_key(&self) -> PublicKey
Converts an object to a public key
Source§
#### fn to_sha256(hash: &Hash) -> Hash
Converts the generic associated `MiniscriptKey::Sha256` to `sha256::Hash`
Source§
#### fn to_hash256(hash: &Hash) -> Hash
Converts the generic associated `MiniscriptKey::Hash256` to `hash256::Hash`
Source§
#### fn to_ripemd160(hash: &Hash) -> Hash
Converts the generic associated `MiniscriptKey::Ripemd160` to `ripemd160::Hash`
Source§
#### fn to_hash160(hash: &Hash) -> Hash
Converts the generic associated `MiniscriptKey::Hash160` to `hash160::Hash`
Source§
#### fn to_x_only_pubkey(&self) -> XOnlyPublicKey
Convert an object to x-only pubkey
Source§
#### fn to_pubkeyhash(&self, sig_type: SigType) -> Hash
Obtain the public key hash for this MiniscriptKey Expects an argument to specify the signature type. This would determine whether to serialize the key as 32 byte x-only pubkey or regular public key when computing the hash160
Source§
### impl Eq for DefiniteDescriptorKey
Source§
### impl StructuralPartialEq for DefiniteDescriptorKey
## Auto Trait Implementations§
§
### impl Freeze for DefiniteDescriptorKey
§
### impl RefUnwindSafe for DefiniteDescriptorKey
§
### impl Send for DefiniteDescriptorKey
§
### impl Sync for DefiniteDescriptorKey
§
### impl Unpin for DefiniteDescriptorKey
§
### impl UnwindSafe for DefiniteDescriptorKey
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
### impl<T> FromStrKey for T
where T: MiniscriptKey + FromStr, <T as MiniscriptKey>::Sha256: FromStr, <T as MiniscriptKey>::Hash256: FromStr, <T as MiniscriptKey>::Ripemd160: FromStr, <T as MiniscriptKey>::Hash160: FromStr, <T as FromStr>::Err: Debug + Display, <<T as MiniscriptKey>::Sha256 as FromStr>::Err: Debug + Display, <<T as MiniscriptKey>::Hash256 as FromStr>::Err: Debug + Display, <<T as MiniscriptKey>::Ripemd160 as FromStr>::Err: Debug + Display, <<T as MiniscriptKey>::Hash160 as FromStr>::Err: Debug + Display,
Source§
#### type _Sha256 = <T as MiniscriptKey>::Sha256
Dummy type. Do not use.
Source§
#### type _Sha256FromStrErr = <<T as MiniscriptKey>::Sha256 as FromStr>::Err
Dummy type. Do not use.
Source§
#### type _Hash256 = <T as MiniscriptKey>::Hash256
Dummy type. Do not use.
Source§
#### type _Hash256FromStrErr = <<T as MiniscriptKey>::Hash256 as FromStr>::Err
Dummy type. Do not use.
Source§
#### type _Ripemd160 = <T as MiniscriptKey>::Ripemd160
Dummy type. Do not use.
Source§
#### type _Ripemd160FromStrErr = <<T as MiniscriptKey>::Ripemd160 as FromStr>::Err
Dummy type. Do not use.
Source§
#### type _Hash160 = <T as MiniscriptKey>::Hash160
Dummy type. Do not use.
Source§
#### type _Hash160FromStrErr = <<T as MiniscriptKey>::Hash160 as FromStr>::Err
Dummy type. Do not use.
Source§
#### type _FromStrErr = <T as FromStr>::Err
Dummy type. Do not use.
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
