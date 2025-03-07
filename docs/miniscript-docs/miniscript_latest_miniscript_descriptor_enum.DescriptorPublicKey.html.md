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
# Enum DescriptorPublicKeyCopy item path
Settings
Help
SummarySource
```
pub enum DescriptorPublicKey {
  Single(SinglePub),
  XPub(DescriptorXKey<Xpub>),
  MultiXPub(DescriptorMultiXKey<Xpub>),
}
```
Expand description
The descriptor pubkey, either a single pubkey or an xpub.
## Variants§
§
### Single(SinglePub)
Single public key.
§
### XPub(DescriptorXKey<Xpub>)
Extended public key (xpub).
§
### MultiXPub(DescriptorMultiXKey<Xpub>)
Multiple extended public keys.
## Implementations§
Source§
### impl DescriptorPublicKey
Source
#### pub fn master_fingerprint(&self) -> Fingerprint
The fingerprint of the master key associated with this key, `0x00000000` if none.
Source
#### pub fn full_derivation_path(&self) -> Option<DerivationPath>
Full path, from the master key
For wildcard keys this will return the path up to the wildcard, so you can get full paths by appending one additional derivation step, according to the wildcard type (hardened or normal).
For multipath extended keys, this returns `None`.
Source
#### pub fn full_derivation_paths(&self) -> Vec<DerivationPath>
Returns a vector containing the full derivation paths from the master key. The vector will contain just one element for single keys, and multiple elements for multipath extended keys.
For wildcard keys this will return the path up to the wildcard, so you can get full paths by appending one additional derivation step, according to the wildcard type (hardened or normal).
Source
#### pub fn is_deriveable(&self) -> bool
👎Deprecated: use has_wildcard instead
Whether or not the key has a wildcard
Source
#### pub fn has_wildcard(&self) -> bool
Whether or not the key has a wildcard
Source
#### pub fn derive( self, index: u32, ) -> Result<DefiniteDescriptorKey, ConversionError>
👎Deprecated: use at_derivation_index instead
Deprecated name for `Self::at_derivation_index`.
Source
#### pub fn at_derivation_index( self, index: u32, ) -> Result<DefiniteDescriptorKey, ConversionError>
Replaces any wildcard (i.e. `/*`) in the key with a particular derivation index, turning it into a _definite_ key (i.e. one where all the derivation paths are set).
##### §Returns
  * If this key is not an xpub, returns `self`.
  * If this key is an xpub but does not have a wildcard, returns `self`.
  * Otherwise, returns the xpub at derivation `index` (removing the wildcard).


##### §Errors
  * If `index` is hardened.


Source
#### pub fn is_multipath(&self) -> bool
Whether or not this key has multiple derivation paths.
Source
#### pub fn into_single_keys(self) -> Vec<DescriptorPublicKey>
Get as many keys as derivation paths in this key.
For raw public key and single-path extended keys it will return the key itself. For multipath extended keys it will return a single-path extended key per derivation path.
## Trait Implementations§
Source§
### impl Borrow<DescriptorPublicKey> for DefiniteDescriptorKey
Source§
#### fn borrow(&self) -> &DescriptorPublicKey
Immutably borrows from an owned value. Read more
Source§
### impl Clone for DescriptorPublicKey
Source§
#### fn clone(&self) -> DescriptorPublicKey
Returns a copy of the value. Read more
1.0.0 · Source§
#### fn clone_from(&mut self, source: &Self)
Performs copy-assignment from `source`. Read more
Source§
### impl Debug for DescriptorPublicKey
Source§
#### fn fmt(&self, f: &mut Formatter<'_>) -> Result
Formats the value using the given formatter. Read more
Source§
### impl Display for DescriptorPublicKey
Source§
#### fn fmt(&self, f: &mut Formatter<'_>) -> Result
Formats the value using the given formatter. Read more
Source§
### impl From<DefiniteDescriptorKey> for DescriptorPublicKey
Source§
#### fn from(d: DefiniteDescriptorKey) -> Self
Converts to this type from the input type.
Source§
### impl FromIterator<DescriptorPublicKey> for Assets
Source§
#### fn from_iter<I: IntoIterator<Item = DescriptorPublicKey>>(iter: I) -> Self
Creates a value from an iterator. Read more
Source§
### impl FromStr for DescriptorPublicKey
Source§
#### type Err = DescriptorKeyParseError
The associated error which can be returned from parsing.
Source§
#### fn from_str(s: &str) -> Result<Self, Self::Err>
Parses a string `s` to return a value of this type. Read more
Source§
### impl Hash for DescriptorPublicKey
Source§
#### fn hash<__H: Hasher>(&self, state: &mut __H)
Feeds this value into the given `Hasher`. Read more
1.3.0 · Source§
#### fn hash_slice<H>(data: &[Self], state: &mut H)
where H: Hasher, Self: Sized,
Feeds a slice of this type into the given `Hasher`. Read more
Source§
### impl IntoAssets for DescriptorPublicKey
Source§
#### fn into_assets(self) -> Assets
Convert `self` into a `Assets` struct
Source§
### impl MiniscriptKey for DescriptorPublicKey
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
### impl Ord for DescriptorPublicKey
Source§
#### fn cmp(&self, other: &DescriptorPublicKey) -> Ordering
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
### impl PartialEq for DescriptorPublicKey
Source§
#### fn eq(&self, other: &DescriptorPublicKey) -> bool
Tests for `self` and `other` values to be equal, and is used by `==`.
1.0.0 · Source§
#### fn ne(&self, other: &Rhs) -> bool
Tests for `!=`. The default implementation is almost always sufficient, and should not be overridden without very good reason.
Source§
### impl PartialOrd for DescriptorPublicKey
Source§
#### fn partial_cmp(&self, other: &DescriptorPublicKey) -> Option<Ordering>
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
### impl Eq for DescriptorPublicKey
Source§
### impl StructuralPartialEq for DescriptorPublicKey
## Auto Trait Implementations§
§
### impl Freeze for DescriptorPublicKey
§
### impl RefUnwindSafe for DescriptorPublicKey
§
### impl Send for DescriptorPublicKey
§
### impl Sync for DescriptorPublicKey
§
### impl Unpin for DescriptorPublicKey
§
### impl UnwindSafe for DescriptorPublicKey
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
